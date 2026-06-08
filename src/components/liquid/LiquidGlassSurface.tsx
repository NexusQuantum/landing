'use client';

import React, { useRef, useState, useCallback, useEffect } from 'react';
import { cn } from '@/lib/utils';

type LiquidGlassSurfaceProps = {
  children: React.ReactNode;
  className?: string;
  tilt?: boolean;
  autoGlow?: boolean;
  active?: boolean;
  onClick?: () => void;
} & (
  | ({ as?: 'div' | 'article' } & React.HTMLAttributes<HTMLDivElement>)
  | ({ as: 'button' } & React.ButtonHTMLAttributes<HTMLButtonElement>)
);

export const LiquidGlassSurface: React.FC<LiquidGlassSurfaceProps> = ({
  children,
  className,
  tilt = true,
  autoGlow = false,
  active = false,
  as = 'div',
  onClick,
  ...rest
}) => {
  const ref = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [tiltDeg, setTiltDeg] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePos({ x, y });

      if (tilt && rect.width > 0 && rect.height > 0) {
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        setTiltDeg({
          x: ((y - cy) / cy) * -4,
          y: ((x - cx) / cx) * 4,
        });
      }
    },
    [tilt]
  );

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setTiltDeg({ x: 0, y: 0 });
  }, []);

  const [autoPos, setAutoPos] = useState(0);
  useEffect(() => {
    if (!autoGlow) return;
    const id = setInterval(() => setAutoPos((p) => (p + 1) % 360), 40);
    return () => clearInterval(id);
  }, [autoGlow]);

  const glowX = isHovered
    ? mousePos.x
    : autoGlow
      ? `${50 + Math.sin((autoPos * Math.PI) / 180) * 30}%`
      : '50%';
  const glowY = isHovered
    ? mousePos.y
    : autoGlow
      ? `${50 + Math.cos((autoPos * Math.PI) / 180) * 20}%`
      : '50%';

  const surfaceStyle: React.CSSProperties = tilt
    ? {
        transform: `perspective(900px) rotateX(${tiltDeg.x}deg) rotateY(${tiltDeg.y}deg)`,
        transition: isHovered ? 'transform 0.08s ease-out' : 'transform 0.45s ease-out',
      }
    : {};

  const glowStyle: React.CSSProperties = {
    background: `radial-gradient(circle at ${typeof glowX === 'number' ? `${glowX}px` : glowX} ${typeof glowY === 'number' ? `${glowY}px` : glowY}, rgba(255,222,206,0.55) 0%, rgba(253,191,162,0.2) 35%, transparent 65%)`,
    opacity: isHovered || autoGlow || active ? 1 : 0.35,
  };

  const sharedProps = {
    ref: ref as React.Ref<HTMLDivElement & HTMLButtonElement>,
    className: cn(
      'liquid-glass-light relative overflow-hidden rounded-2xl transition-all duration-500',
      active && 'liquid-glass-light--active',
      as === 'button' && 'cursor-pointer text-left',
      className
    ),
    style: surfaceStyle,
    onMouseMove: handleMouseMove,
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: handleMouseLeave,
    onClick,
  };

  const inner = (
    <>
      <div className="pointer-events-none absolute inset-0 transition-opacity duration-500" style={glowStyle} aria-hidden />
      {isHovered && (
        <div
          className="pointer-events-none absolute inset-0 opacity-40 mix-blend-soft-light"
          style={{
            background: `conic-gradient(from ${mousePos.x}deg at ${mousePos.x}px ${mousePos.y}px, rgba(242,101,34,0.06), rgba(255,156,109,0.08), rgba(255,222,206,0.06), rgba(242,101,34,0.06))`,
          }}
          aria-hidden
        />
      )}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent" aria-hidden />
      <div className="relative z-[1]">{children}</div>
    </>
  );

  if (as === 'button') {
    const buttonRest = rest as React.ButtonHTMLAttributes<HTMLButtonElement>;
    return (
      <button type="button" {...sharedProps} {...buttonRest}>
        {inner}
      </button>
    );
  }

  const divRest = rest as React.HTMLAttributes<HTMLDivElement>;
  return (
    <div {...sharedProps} {...divRest}>
      {inner}
    </div>
  );
};

export default LiquidGlassSurface;
