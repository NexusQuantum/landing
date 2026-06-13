'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface CrabRunnerProps {
  className?: string;
  // When true, the widget drops its panel/title chrome and renders with a
  // transparent backdrop so it blends into the surrounding section. The ground
  // sits at the very bottom edge so the crab/buildings ride the section border.
  embedded?: boolean;
}

type GameState = 'idle' | 'running' | 'over';

// Logical canvas resolution. We render at this size and scale uniformly via CSS
// aspect-ratio so byte pixels stay square (no horizontal stretch).
const VIEW_W = 800;
const VIEW_H = 128;
const PIXEL = 4; // one "byte" block — crab ~40×28 px, buildings snap to this grid
const GROUND_Y = VIEW_H - PIXEL - 1;
const GRAVITY = 0.5;
const JUMP_VELOCITY = -10;

// Brand palette (byte vector style)
const COLORS = {
  sky: '#0d0d1f',
  grid: 'rgba(255,255,255,0.05)',
  ground: '#FF5001',
  crab: '#FF5001',
  crabDark: '#DC5D21',
  crabLight: '#FF9C6D',
  building: '#1c1c3a',
  buildingEdge: '#FF9C6D',
  window: '#FFDECE',
  text: '#FFFBF8',
};

interface Building {
  x: number;
  w: number;
  h: number;
}

interface Crab {
  x: number;
  y: number; // top-left of bounding box
  w: number;
  h: number;
  vy: number;
  onGround: boolean;
}

// Side-view crab running right.
// 1 = carapace, 2 = chela/legs, 3 = eyestalk tip
const CRAB_SPRITE: number[][] = [
  [0, 0, 0, 3, 0, 0, 0, 3, 0, 0], // eyestalks
  [0, 0, 0, 3, 0, 0, 0, 3, 0, 0], // eyes
  [0, 0, 0, 1, 1, 1, 1, 0, 0, 0], // carapace dome
  [0, 2, 2, 1, 1, 1, 1, 1, 0, 0], // rear chela + shell
  [0, 0, 0, 1, 1, 1, 1, 1, 2, 2], // body + main claw (upper)
  [0, 0, 0, 0, 1, 1, 1, 2, 2, 0], // abdomen + lower claw finger
  [0, 0, 2, 0, 2, 0, 2, 0, 2, 0], // walking legs
];

const CRAB_W = CRAB_SPRITE[0].length * PIXEL; // 10 * 4 = 40
const CRAB_H = CRAB_SPRITE.length * PIXEL; // 7 * 4 = 28

const CrabRunner: React.FC<CrabRunnerProps> = ({ className, embedded = false }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  const [gameState, setGameState] = useState<GameState>('idle');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const highRef = useRef(0);

  // Mutable game world kept in a ref so the animation loop doesn't re-create.
  const world = useRef({
    crab: {
      x: 56,
      y: GROUND_Y - CRAB_H,
      w: CRAB_W,
      h: CRAB_H,
      vy: 0,
      onGround: true,
    } as Crab,
    buildings: [] as Building[],
    speed: 4,
    distance: 0,
    spawnTimer: 0,
    legPhase: 0,
    state: 'idle' as GameState,
  });

  const resetWorld = useCallback(() => {
    const w = world.current;
    w.crab = {
      x: 56,
      y: GROUND_Y - CRAB_H,
      w: CRAB_W,
      h: CRAB_H,
      vy: 0,
      onGround: true,
    };
    w.buildings = [];
    w.speed = 5;
    w.distance = 0;
    w.spawnTimer = 40;
    w.legPhase = 0;
  }, []);

  const jump = useCallback(() => {
    const w = world.current;
    if (w.state !== 'running') return;
    if (w.crab.onGround) {
      w.crab.vy = JUMP_VELOCITY;
      w.crab.onGround = false;
    }
  }, []);

  const startGame = useCallback(() => {
    resetWorld();
    setScore(0);
    world.current.state = 'running';
    setGameState('running');
  }, [resetWorld]);

  // ---- Drawing helpers ---------------------------------------------------
  const drawSprite = (
    ctx: CanvasRenderingContext2D,
    sprite: number[][],
    ox: number,
    oy: number,
  ) => {
    for (let row = 0; row < sprite.length; row++) {
      for (let col = 0; col < sprite[row].length; col++) {
        const v = sprite[row][col];
        if (v === 0) continue;
        ctx.fillStyle = v === 1 ? COLORS.crab : v === 2 ? COLORS.crabDark : COLORS.crabLight;
        ctx.fillRect(ox + col * PIXEL, oy + row * PIXEL, PIXEL, PIXEL);
      }
    }
  };

  const drawScene = useCallback(
    (ctx: CanvasRenderingContext2D, displayScore: number) => {
      const w = world.current;

      // Background. In embedded mode we keep the canvas transparent so the
      // host section's background shows through and the game blends in.
      ctx.clearRect(0, 0, VIEW_W, VIEW_H);
      if (!embedded) {
        ctx.fillStyle = COLORS.sky;
        ctx.fillRect(0, 0, VIEW_W, VIEW_H);
      }

      // Faint byte grid
      ctx.fillStyle = COLORS.grid;
      for (let gx = (w.distance % 32); gx < VIEW_W; gx += 32) {
        ctx.fillRect(gx, 0, 1, GROUND_Y);
      }
      for (let gy = 0; gy < GROUND_Y; gy += 32) {
        ctx.fillRect(0, gy, VIEW_W, 1);
      }

      // Buildings (obstacles)
      for (const b of w.buildings) {
        ctx.fillStyle = COLORS.building;
        ctx.fillRect(b.x, GROUND_Y - b.h, b.w, b.h);
        // glowing edge
        ctx.fillStyle = COLORS.buildingEdge;
        ctx.fillRect(b.x, GROUND_Y - b.h, b.w, PIXEL);
        ctx.fillRect(b.x, GROUND_Y - b.h, PIXEL, b.h);
        ctx.fillRect(b.x + b.w - PIXEL, GROUND_Y - b.h, PIXEL, b.h);
        // windows
        ctx.fillStyle = COLORS.window;
        for (let wy = GROUND_Y - b.h + PIXEL * 2; wy < GROUND_Y - PIXEL; wy += PIXEL * 3) {
          for (let wx = b.x + PIXEL * 2; wx < b.x + b.w - PIXEL * 2; wx += PIXEL * 3) {
            ctx.fillRect(wx, wy, PIXEL, PIXEL);
          }
        }
      }

      // Ground line (dashed bytes)
      ctx.fillStyle = COLORS.ground;
      for (let gx = (-w.distance % 20); gx < VIEW_W; gx += 20) {
        ctx.fillRect(gx, GROUND_Y, 12, PIXEL);
      }

      // Crab
      const c = w.crab;
      drawSprite(ctx, CRAB_SPRITE, c.x, c.y);
      // Animated legs — alternate the four walking legs on the bottom row
      if (c.onGround) {
        const flip = Math.floor(w.legPhase) % 2 === 0;
        ctx.fillStyle = COLORS.crabDark;
        if (flip) {
          ctx.fillRect(c.x + PIXEL * 2, c.y + c.h, PIXEL, PIXEL);
          ctx.fillRect(c.x + PIXEL * 6, c.y + c.h, PIXEL, PIXEL);
        } else {
          ctx.fillRect(c.x + PIXEL * 4, c.y + c.h, PIXEL, PIXEL);
          ctx.fillRect(c.x + PIXEL * 8, c.y + c.h, PIXEL, PIXEL);
        }
      }

      // Score (monospace byte readout)
      ctx.fillStyle = COLORS.text;
      ctx.font = 'bold 12px "Courier New", monospace';
      ctx.textAlign = 'right';
      ctx.fillText(String(displayScore).padStart(5, '0'), VIEW_W - 12, 20);

      // High score readout (only embedded mode, since the title bar is hidden)
      if (embedded) {
        ctx.fillStyle = COLORS.crabLight;
        ctx.font = 'bold 9px "Courier New", monospace';
        ctx.textAlign = 'left';
        ctx.fillText(`HI ${String(highRef.current).padStart(5, '0')}`, 12, 18);
      }
    },
    [embedded],
  );

  // ---- Main loop ---------------------------------------------------------
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let localScore = 0;

    const loop = () => {
      const w = world.current;

      if (w.state === 'running') {
        const c = w.crab;

        // Physics
        c.vy += GRAVITY;
        c.y += c.vy;
        if (c.y >= GROUND_Y - c.h) {
          c.y = GROUND_Y - c.h;
          c.vy = 0;
          c.onGround = true;
        }

        // World movement
        w.distance += w.speed;
        w.legPhase += w.speed / 6;
        w.speed = Math.min(9, 4 + w.distance / 2200);

        // Spawn buildings
        w.spawnTimer -= 1;
        if (w.spawnTimer <= 0) {
          // Snap to pixel grid — narrow towers with varied height
          const cols = 3 + Math.floor(Math.random() * 4); // 3–6 cols → 12–24 px wide
          const rows = 3 + Math.floor(Math.random() * 12); // 3–14 rows → 12–56 px tall
          const bw = cols * PIXEL;
          const h = rows * PIXEL;
          w.buildings.push({ x: VIEW_W + 10, w: bw, h });
          // gap scales a bit with speed so it stays fair
          w.spawnTimer = Math.floor(55 + Math.random() * 45 + w.speed * 2);
        }

        // Move + cull buildings, detect collisions
        for (let i = w.buildings.length - 1; i >= 0; i--) {
          const b = w.buildings[i];
          b.x -= w.speed;
          if (b.x + b.w < 0) {
            w.buildings.splice(i, 1);
            continue;
          }
          // AABB collision with a small forgiving inset
          const inset = 4;
          const cx1 = c.x + inset;
          const cx2 = c.x + c.w - inset;
          const cy1 = c.y + inset;
          const cy2 = c.y + c.h;
          const bx1 = b.x;
          const bx2 = b.x + b.w;
          const by1 = GROUND_Y - b.h;
          if (cx2 > bx1 && cx1 < bx2 && cy2 > by1 && cy1 < GROUND_Y) {
            w.state = 'over';
            setGameState('over');
            highRef.current = Math.max(highRef.current, localScore);
            setHighScore((prev) => Math.max(prev, localScore));
            break;
          }
        }

        // Score from distance
        const next = Math.floor(w.distance / 10);
        if (next !== localScore) {
          localScore = next;
          setScore(next);
        }
      }

      drawScene(ctx, localScore);
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [drawScene]);

  // ---- Input -------------------------------------------------------------
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.key === ' ' || e.code === 'ArrowUp') {
        // Only hijack space when the game is active so the page stays usable.
        if (world.current.state === 'running') {
          e.preventDefault();
          jump();
        } else if (world.current.state === 'idle' || world.current.state === 'over') {
          // allow space to (re)start when the widget is focused
          const active = document.activeElement;
          if (active && active.getAttribute('data-crab-game') === 'true') {
            e.preventDefault();
            startGame();
          }
        }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [jump, startGame]);

  const handlePointer = useCallback(() => {
    if (world.current.state === 'running') {
      jump();
    } else {
      startGame();
    }
  }, [jump, startGame]);

  return (
    <div
      className={cn(
        'relative w-full select-none',
        embedded
          ? 'block'
          : 'max-w-[886px] mx-auto rounded-[20px] overflow-hidden bg-black/30 backdrop-blur-xl border border-white/20',
        className,
      )}
      data-crab-game="true"
      tabIndex={0}
      role="button"
      aria-label="Crab Runner mini game. Press space or tap to jump."
      onClick={handlePointer}
      style={{ outline: 'none' }}
    >
      {/* Title bar (panel mode only) */}
      {!embedded && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-white/10">
          <span className="font-mono text-[11px] tracking-[0.2em] text-[var(--primary-3)] uppercase">
            ▮ Crab.Runner — jump the skyline
          </span>
          <span className="font-mono text-[11px] text-[var(--primary-1)]">
            HI {String(highScore).padStart(5, '0')}
          </span>
        </div>
      )}

      {/* Canvas stage — aspect-ratio keeps pixels square at any viewport width */}
      <div
        className={cn(
          'relative w-full',
          embedded && 'mx-auto max-h-[92px] sm:max-h-[100px]',
        )}
        style={embedded ? { aspectRatio: `${VIEW_W} / ${VIEW_H}` } : undefined}
      >
        <canvas
          ref={canvasRef}
          width={VIEW_W}
          height={VIEW_H}
          className={cn('block w-full', embedded ? 'h-full' : 'h-auto')}
          style={{
            imageRendering: 'pixelated',
            touchAction: 'manipulation',
            ...(embedded ? {} : { aspectRatio: `${VIEW_W} / ${VIEW_H}` }),
          }}
        />

        {/* Idle overlay */}
        {gameState === 'idle' && (
          <div className={cn(
            'absolute inset-0 flex flex-col items-center justify-center',
            embedded ? 'gap-1.5 bg-black/15' : 'gap-4 bg-black/40 backdrop-blur-sm',
          )}>
            <p className={cn(
              'font-mono text-[var(--light)] text-center px-4',
              embedded ? 'text-[10px] leading-tight' : 'text-sm md:text-base',
            )}>
              Press <span className="text-[var(--primary-3)] font-bold">SPACE</span> to jump over buildings
            </p>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                startGame();
              }}
              className={cn(
                'font-mono font-bold uppercase tracking-[0.12em] rounded-md border-2 border-[var(--primary-dark-1)] bg-[var(--primary-dark-1)] text-[var(--light)] hover:bg-[var(--primary-dark-2)] transition-colors',
                embedded
                  ? 'text-[10px] px-3 py-1 shadow-[0_0_12px_rgba(242,101,34,0.4)]'
                  : 'text-sm px-6 py-3 shadow-[0_0_20px_rgba(242,101,34,0.5)]',
              )}
            >
              ▶ Start
            </button>
          </div>
        )}

        {/* Game over overlay */}
        {gameState === 'over' && (
          <div className={cn(
            'absolute inset-0 flex flex-col items-center justify-center',
            embedded ? 'gap-1 bg-black/30' : 'gap-3 bg-black/55 backdrop-blur-sm',
          )}>
            <p className={cn(
              'font-mono text-[var(--primary-3)] font-bold tracking-[0.15em] uppercase',
              embedded ? 'text-[11px]' : 'text-lg md:text-xl',
            )}>
              Game Over
            </p>
            <p className={cn(
              'font-mono text-[var(--light)]',
              embedded ? 'text-[9px]' : 'text-sm',
            )}>
              Score {String(score).padStart(5, '0')} · Hi {String(highScore).padStart(5, '0')}
            </p>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                startGame();
              }}
              className={cn(
                'font-mono font-bold uppercase tracking-[0.12em] rounded-md border-2 border-[var(--primary-dark-1)] bg-[var(--primary-dark-1)] text-[var(--light)] hover:bg-[var(--primary-dark-2)] transition-colors',
                embedded
                  ? 'text-[10px] px-3 py-1 shadow-[0_0_12px_rgba(242,101,34,0.4)]'
                  : 'text-sm px-6 py-3 shadow-[0_0_20px_rgba(242,101,34,0.5)]',
              )}
            >
              ↻ Play again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CrabRunner;
