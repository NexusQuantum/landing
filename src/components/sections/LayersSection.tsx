'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';
import SectionHeader from '@/components/ui/SectionHeader';
import ProgressRing from '@/components/ui/ProgressRing';
import LiquidGlassSurface from '@/components/liquid/LiquidGlassSurface';
import {
  Cloud,
  Layers,
  Server,
  Bot,
  ChevronRight,
  Activity,
  type LucideIcon,
} from 'lucide-react';

interface LayersSectionProps {
  className?: string;
}

interface CloudLayer {
  id: string;
  title: string;
  label: string;
  description: string;
  icon: LucideIcon;
  services: string[];
  metric: { label: string; value: string };
}

const AUTOPLAY_MS = 5500;
const TICK_MS = 50;

const layers: CloudLayer[] = [
  {
    id: 'iaas',
    title: 'IaaS',
    label: 'Infrastructure Layer',
    description:
      'Rust-native hypervisor, microVM isolation, and GPU-aware compute — the secure foundation every agent runs on.',
    icon: Server,
    services: ['NexusRust-HV', 'MicroVM', 'SecureGPU', 'Edge Nodes', 'AI Appliance'],
    metric: { label: 'Boot time', value: '<50ms' },
  },
  {
    id: 'paas',
    title: 'PaaS',
    label: 'Platform Layer',
    description:
      'Unified orchestration, LLM lifecycle management, and confidential compute — where agents are trained, deployed, and scaled.',
    icon: Layers,
    services: ['FleetMgr', 'LLMOps', 'Lake', 'Enclave'],
    metric: { label: 'Orchestration', value: 'Auto-scale' },
  },
  {
    id: 'saas',
    title: 'SaaS',
    label: 'Application Layer',
    description:
      'Intelligent analytics, AIOps observability, and data protection — agent-ready applications on day one.',
    icon: Cloud,
    services: ['Analytics', 'Insight', 'Guard'],
    metric: { label: 'Time-to-value', value: 'Day 1' },
  },
];

function CloudStackDiagram({
  activeIndex,
  onSelect,
}: {
  activeIndex: number;
  onSelect: (index: number) => void;
}) {
  return (
    <LiquidGlassSurface autoGlow tilt={false} className="mx-auto w-full max-w-[400px] p-6 sm:p-8">
      <div className="relative flex h-[260px] w-full items-center justify-center sm:h-[300px]">
        {/* Central cloud nucleus */}
        <div className="absolute z-10 flex flex-col items-center">
          <div className="agent-nucleus-light relative flex h-20 w-20 items-center justify-center rounded-full border border-[var(--primary-2)] bg-[var(--light)]/90 backdrop-blur-xl sm:h-24 sm:w-24">
            <div className="agent-nucleus-ring-light absolute inset-0 rounded-full" aria-hidden />
            <Cloud className="relative h-8 w-8 text-[var(--primary-dark-1)] sm:h-9 sm:w-9" aria-hidden />
          </div>
          <span className="mt-2 font-montserrat text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--dark-4)]">
            Nexus Cloud
          </span>
        </div>

        {/* Orbiting layer nodes */}
        {layers.map((layer, i) => {
          const angle = (i * 120 - 90) * (Math.PI / 180);
          const radius = 110;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          const isActive = activeIndex === i;
          const Icon = layer.icon;

          return (
            <React.Fragment key={layer.id}>
              <svg
                className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
                viewBox="0 0 360 280"
                preserveAspectRatio="xMidYMid meet"
                aria-hidden
              >
                <line
                  x1={180}
                  y1={140}
                  x2={180 + x}
                  y2={140 + y}
                  stroke={isActive ? 'var(--primary-dark-1)' : 'rgba(209,209,209,0.6)'}
                  strokeWidth={isActive ? 2 : 1}
                  strokeDasharray={isActive ? undefined : '4 4'}
                  className="transition-all duration-500"
                />
                {isActive && (
                  <circle r="3" fill="var(--primary-dark-1)" className="agent-packet">
                    <animateMotion
                      dur="2s"
                      repeatCount="indefinite"
                      path={`M ${180 + x} ${140 + y} L 180 140`}
                    />
                  </circle>
                )}
              </svg>

              <button
                type="button"
                aria-pressed={isActive}
                aria-label={`Select ${layer.title} layer`}
                onClick={() => onSelect(i)}
                className={cn(
                  'absolute z-20 flex flex-col items-center gap-1.5 transition-all duration-500',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-dark-1)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--light-2)]',
                  isActive ? 'opacity-100' : 'opacity-65 hover:opacity-100'
                )}
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                  transform: `translate(-50%, -50%) scale(${isActive ? 1.1 : 1})`,
                }}
              >
                <div
                  className={cn(
                    'relative flex h-14 w-14 items-center justify-center rounded-2xl border backdrop-blur-xl transition-all duration-500 sm:h-16 sm:w-16',
                    isActive
                      ? 'border-[var(--primary-dark-1)]/40 bg-[var(--light)] shadow-[0_8px_24px_rgba(242,101,34,0.18)]'
                      : 'border-[var(--primary-1)] bg-[var(--light-2)]/80'
                  )}
                >
                  {isActive && (
                    <div
                      className="absolute inset-0 rounded-2xl bg-[var(--primary-1)]/40"
                      aria-hidden
                    />
                  )}
                  <Icon
                    className={cn(
                      'relative h-6 w-6 sm:h-7 sm:w-7',
                      isActive ? 'text-[var(--primary-dark-1)]' : 'text-[var(--dark-3)]'
                    )}
                    aria-hidden
                  />
                </div>
                <span
                  className={cn(
                    'font-montserrat text-[11px] font-bold uppercase tracking-wider transition-colors duration-300',
                    isActive ? 'text-[var(--primary-dark-1)]' : 'text-[var(--dark-4)]'
                  )}
                >
                  {layer.title}
                </span>
              </button>
            </React.Fragment>
          );
        })}

        {/* Ambient rings */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden>
          <div className="agent-orbit-ring-light h-[190px] w-[190px] rounded-full border sm:h-[230px] sm:w-[230px]" />
          <div className="agent-orbit-ring-light agent-orbit-ring--slow absolute h-[250px] w-[250px] rounded-full border sm:h-[290px] sm:w-[290px]" />
        </div>
      </div>
    </LiquidGlassSurface>
  );
}

const LayersSection: React.FC<LayersSectionProps> = ({ className }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 }
    );
    const el = sectionRef.current;
    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  useEffect(() => {
    setProgress(0);
  }, [activeIndex]);

  /* Always auto-cycle when section is visible */
  useEffect(() => {
    if (!isVisible) return;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + (TICK_MS / AUTOPLAY_MS) * 100;
        if (next >= 100) {
          setActiveIndex((i) => (i + 1) % layers.length);
          return 0;
        }
        return next;
      });
    }, TICK_MS);

    return () => clearInterval(timer);
  }, [isVisible, activeIndex]);

  const handleSelect = useCallback((index: number) => {
    setActiveIndex(index);
    setProgress(0);
  }, []);

  const activeLayer = layers[activeIndex];
  const ActiveIcon = activeLayer.icon;

  return (
    <section
      ref={sectionRef}
      id="layers-section"
      aria-label="Cloud architecture layers"
      className={cn(
        'liquid-glass-light-section relative w-full overflow-hidden border-b border-[var(--primary-1)]',
        className
      )}
    >
      <div className="pointer-events-none absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-[var(--primary-1)]/50 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -right-32 bottom-1/4 h-80 w-80 rounded-full bg-[var(--primary-2)]/40 blur-3xl" aria-hidden />
      <div className="section-grid-bg-light pointer-events-none absolute inset-0 opacity-60" aria-hidden />

      <div
        className={cn(
          'relative mx-auto w-full max-w-[1200px] px-4 py-14 transition-all duration-700 ease-out sm:px-6 sm:py-16 md:px-10 md:py-20 lg:px-12',
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        )}
      >
        <SectionHeader
          badge="Cloud Architecture"
          title={
            <>
              <span className="text-[var(--dark-9)]">ONE CLOUD, </span>
              <span className="bg-gradient-to-r from-[var(--primary-dark-1)] to-[var(--primary-3)] bg-clip-text text-transparent">
                THREE LAYERS
              </span>
            </>
          }
          subtitle="A unified stack from silicon to software — built for autonomous agents at every scale."
        />

        {/* Agent pipeline bar */}
        <LiquidGlassSurface autoGlow tilt={false} className="agent-terminal mb-8 px-4 py-3 sm:px-5">
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-2">
              <span className="agent-pulse-dot-light h-2 w-2 rounded-full" aria-hidden />
              <Bot className="h-4 w-4 text-[var(--primary-dark-1)]" aria-hidden />
              <span className="font-montserrat text-[12px] font-medium text-[var(--dark-6)]">
                Agent Pipeline
              </span>
            </div>
            <div className="hidden h-4 w-px bg-[var(--dark-1)] sm:block" aria-hidden />
            <div className="flex flex-wrap items-center gap-1.5 font-montserrat text-[11px] sm:text-[12px]">
              {layers.map((layer, i) => (
                <React.Fragment key={layer.id}>
                  <span
                    className={cn(
                      'rounded px-2 py-0.5 transition-all duration-300',
                      i === activeIndex
                        ? 'bg-[var(--primary-1)] text-[var(--primary-dark-1)] font-semibold'
                        : i < activeIndex
                          ? 'text-[var(--dark-3)] line-through'
                          : 'text-[var(--dark-2)]'
                    )}
                  >
                    {layer.title}
                  </span>
                  {i < layers.length - 1 && (
                    <ChevronRight className="h-3 w-3 text-[var(--dark-2)]" aria-hidden />
                  )}
                </React.Fragment>
              ))}
            </div>
            <div className="ml-auto flex items-center gap-2">
              <Activity className="h-3.5 w-3.5 text-[var(--primary-dark-1)]" aria-hidden />
              <span className="font-montserrat text-[11px] text-[var(--primary-dark-1)]">active</span>
            </div>
          </div>
        </LiquidGlassSurface>

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2 lg:gap-8">
          {/* Diagram + pills */}
          <div className="order-2 flex flex-col gap-4 lg:order-1">
            <CloudStackDiagram activeIndex={activeIndex} onSelect={handleSelect} />

            <div className="flex items-center justify-center gap-2">
              {layers.map((layer, i) => {
                const Icon = layer.icon;
                const isActive = activeIndex === i;
                return (
                  <button
                    key={layer.id}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => handleSelect(i)}
                    className={cn(
                      'group flex items-center gap-2 rounded-full border px-3 py-2 transition-all duration-300',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-dark-1)]',
                      isActive
                        ? 'liquid-glass-light liquid-glass-light--active border-[var(--primary-dark-1)]/40'
                        : 'border-[var(--primary-1)] bg-[var(--light)]/70 hover:border-[var(--primary-2)]'
                    )}
                  >
                    {isActive ? (
                      <ProgressRing progress={progress} size={28} strokeWidth={2}>
                        <Icon className="h-3 w-3 text-[var(--primary-dark-1)]" aria-hidden />
                      </ProgressRing>
                    ) : (
                      <Icon className="h-3.5 w-3.5 text-[var(--dark-3)] group-hover:text-[var(--primary-dark-1)]" aria-hidden />
                    )}
                    <span
                      className={cn(
                        'font-montserrat text-[12px] font-semibold',
                        isActive ? 'text-[var(--primary-dark-1)]' : 'text-[var(--dark-5)]'
                      )}
                    >
                      {layer.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Detail panel */}
          <LiquidGlassSurface
            key={activeLayer.id}
            autoGlow
            active
            className="order-1 p-6 sm:p-8 lg:order-2"
          >
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="mb-5 flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--primary-1)] bg-[var(--primary-1)]/50">
                    <ActiveIcon className="h-6 w-6 text-[var(--primary-dark-1)]" aria-hidden />
                  </div>
                  <div>
                    <p className="font-montserrat text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--primary-dark-1)]">
                      {activeLayer.label}
                    </p>
                    <h3 className="font-montserrat text-h1 font-semibold text-[var(--dark-9)]">
                      {activeLayer.title}
                    </h3>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="rounded-full border border-[var(--primary-1)] bg-[var(--light)] px-2.5 py-0.5 font-montserrat text-[10px] text-[var(--dark-4)]">
                    L{activeIndex + 1}
                  </span>
                  <span className="font-montserrat text-[12px] font-semibold text-[var(--primary-dark-1)]">
                    {activeLayer.metric.value}
                  </span>
                  <span className="font-montserrat text-[10px] text-[var(--dark-4)]">
                    {activeLayer.metric.label}
                  </span>
                </div>
              </div>

              <p className="mb-6 font-montserrat text-body-small leading-relaxed text-[var(--dark-6)] sm:text-[15px] md:text-body-medium md:leading-[1.65]">
                {activeLayer.description}
              </p>

              <div className="mb-6">
                <p className="mb-3 flex items-center gap-2 font-montserrat text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--dark-4)]">
                  <span className="font-montserrat text-[var(--primary-dark-1)]">&gt;</span>
                  Core Services
                </p>
                <div className="flex flex-wrap gap-2">
                  {activeLayer.services.map((service, i) => (
                    <span
                      key={service}
                      className="agent-tag rounded-lg border border-[var(--primary-1)] bg-[var(--light)]/80 px-3 py-1.5 font-montserrat text-[13px] font-medium text-[var(--dark-7)] transition-all duration-300 hover:border-[var(--primary-dark-1)]/40 hover:bg-[var(--primary-1)]/60 hover:text-[var(--primary-dark-1)]"
                      style={{ animationDelay: `${i * 70}ms` }}
                    >
                      <span className="mr-1.5 font-montserrat text-[10px] text-[var(--dark-3)]">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 border-t border-[var(--primary-1)] pt-5">
                <div className="flex flex-1 items-end gap-1.5">
                  {layers.map((layer, i) => (
                    <div
                      key={layer.id}
                      className={cn(
                        'flex-1 rounded-t-md transition-all duration-500',
                        i === activeIndex ? 'agent-bar-active' : 'opacity-50'
                      )}
                      style={{
                        height: `${24 + i * 12}px`,
                        background:
                          i <= activeIndex
                            ? 'linear-gradient(to top, var(--primary-dark-1), var(--primary-3))'
                            : 'var(--dark-1)',
                        borderTop: i === activeIndex ? '2px solid var(--primary-dark-1)' : 'none',
                      }}
                      aria-hidden
                    />
                  ))}
                </div>
                <span className="shrink-0 font-montserrat text-[11px] text-[var(--dark-4)]">
                  Agent-ready at every layer
                </span>
              </div>
            </div>
          </LiquidGlassSurface>
        </div>
      </div>
    </section>
  );
};

export default LayersSection;
