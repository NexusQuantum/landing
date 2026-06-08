'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';
import SectionHeader from '@/components/ui/SectionHeader';
import ProgressRing from '@/components/ui/ProgressRing';
import LiquidGlassSurface from '@/components/liquid/LiquidGlassSurface';
import ValueCard from '@/components/ui/ValueCard';
import { Shield, Zap, Globe, Code2, type LucideIcon } from 'lucide-react';

interface ValueSectionProps {
  className?: string;
}

interface ValuePillar {
  title: string;
  description: string;
  image: string;
  icon: LucideIcon;
  tagline: string;
  stat: string;
}

const AUTOPLAY_MS = 6500;
const TICK_MS = 50;

const valuePillars: ValuePillar[] = [
  {
    title: 'Security by Construction',
    tagline: 'Memory-safe by default',
    description:
      'Rust across the stack: hypervisor, microVM, GPU, orchestration, observability. Memory safety, strict isolation, and zero-trust defaults.',
    image: '/value-pillar/security.jpg',
    icon: Shield,
    stat: 'Zero-trust',
  },
  {
    title: 'Performance Without Compromise',
    tagline: 'Speed at every layer',
    description:
      'MicroVM-class startup, GPU-aware scheduling, and low-latency pipelines, end-to-end.',
    image: '/value-pillar/performance.jpg',
    icon: Zap,
    stat: '3.6× faster',
  },
  {
    title: 'Sovereign & Compliant',
    tagline: 'Your data, your rules',
    description:
      'Residency controls, auditability, and confidential computing baked in.',
    image: '/value-pillar/Sovereign.jpg',
    icon: Globe,
    stat: 'Data sovereignty',
  },
  {
    title: 'Built for Builders',
    tagline: 'Developer-first experience',
    description:
      "Clean APIs, Git-native workflows, CLI and UI parity, and docs you'll actually enjoy reading.",
    image: '/value-pillar/Built.jpg',
    icon: Code2,
    stat: 'DX-first',
  },
];

function PillarNavCard({
  pillar,
  index,
  isActive,
  progress,
  onSelect,
}: {
  pillar: ValuePillar;
  index: number;
  isActive: boolean;
  progress: number;
  onSelect: (index: number) => void;
}) {
  const Icon = pillar.icon;

  return (
    <LiquidGlassSurface
      as="button"
      autoGlow={isActive}
      active={isActive}
      tilt={false}
      onClick={() => onSelect(index)}
      aria-pressed={isActive}
      className="w-full p-4 text-left"
    >
      <div className="flex items-center gap-3">
        {isActive ? (
          <ProgressRing progress={progress} size={44} strokeWidth={2}>
            <Icon className="h-4 w-4 text-[var(--primary-dark-1)]" aria-hidden />
          </ProgressRing>
        ) : (
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[var(--primary-1)] bg-[var(--light)]/80 transition-all duration-300">
            <Icon className="h-5 w-5 text-[var(--dark-4)]" aria-hidden />
          </div>
        )}

        <div className="min-w-0 flex-1">
          <p
            className={cn(
              'font-montserrat text-[11px] font-semibold uppercase tracking-[0.08em] transition-colors duration-300',
              isActive ? 'text-[var(--primary-dark-1)]' : 'text-[var(--dark-4)]'
            )}
          >
            {pillar.tagline}
          </p>
          <p
            className={cn(
              'truncate font-montserrat text-[14px] font-semibold leading-snug transition-colors duration-300',
              isActive ? 'text-[var(--dark-9)]' : 'text-[var(--dark-6)]'
            )}
          >
            {pillar.title}
          </p>
        </div>

        <span
          className={cn(
            'shrink-0 rounded-full px-2 py-0.5 font-montserrat text-[10px] font-semibold transition-all duration-300',
            isActive
              ? 'bg-[var(--primary-1)] text-[var(--primary-dark-1)]'
              : 'text-[var(--dark-3)]'
          )}
        >
          {pillar.stat}
        </span>
      </div>
    </LiquidGlassSurface>
  );
}

const ValueSection: React.FC<ValueSectionProps> = ({ className }) => {
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

  useEffect(() => {
    if (!isVisible) return;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + (TICK_MS / AUTOPLAY_MS) * 100;
        if (next >= 100) {
          setActiveIndex((i) => (i + 1) % valuePillars.length);
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

  const activePillar = valuePillars[activeIndex];

  return (
    <section
      ref={sectionRef}
      id="value-section"
      aria-label="Value pillars"
      className={cn(
        'liquid-glass-light-section relative w-full overflow-hidden border-b border-[var(--primary-1)] bg-[var(--light-2)]',
        className
      )}
    >
      <div className="pointer-events-none absolute -right-40 top-0 h-96 w-96 rounded-full bg-[var(--primary-2)]/45 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-80 w-80 rounded-full bg-[var(--primary-1)]/50 blur-3xl" aria-hidden />
      <div className="section-grid-bg-light pointer-events-none absolute inset-0 opacity-50" aria-hidden />

      <div
        className={cn(
          'relative mx-auto w-full max-w-[1200px] px-4 py-14 transition-all duration-700 ease-out sm:px-6 sm:py-16 md:px-10 md:py-20 lg:px-12',
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        )}
      >
        <SectionHeader
          badge="Why Nexus"
          title={
            <>
              <span className="bg-gradient-to-r from-[var(--primary-dark-1)] to-[var(--primary-3)] bg-clip-text text-transparent">
                VALUE
              </span>
              <span className="text-[var(--dark-9)]"> PILLARS</span>
            </>
          }
          subtitle="The principles that power every autonomous agent on the Nexus platform."
        />

        {/* Desktop */}
        <div className="hidden lg:grid lg:grid-cols-[minmax(0,320px)_1fr] lg:gap-5">
          <nav className="flex flex-col gap-2.5" aria-label="Value pillar navigation">
            {valuePillars.map((pillar, index) => (
              <PillarNavCard
                key={pillar.title}
                pillar={pillar}
                index={index}
                isActive={activeIndex === index}
                progress={activeIndex === index ? progress : 0}
                onSelect={handleSelect}
              />
            ))}
          </nav>

          <ValueCard
            key={activeIndex}
            title={activePillar.title}
            description={activePillar.description}
            image={activePillar.image}
            icon={activePillar.icon}
            tagline={activePillar.tagline}
            stat={activePillar.stat}
            index={activeIndex}
            total={valuePillars.length}
            isActive
          />
        </div>

        {/* Mobile / Tablet */}
        <div className="flex flex-col gap-3 lg:hidden">
          <ValueCard
            key={`featured-${activeIndex}`}
            title={activePillar.title}
            description={activePillar.description}
            image={activePillar.image}
            icon={activePillar.icon}
            tagline={activePillar.tagline}
            stat={activePillar.stat}
            index={activeIndex}
            total={valuePillars.length}
            isActive
          />

          <div className="grid grid-cols-2 gap-2">
            {valuePillars.map((pillar, index) => {
              const Icon = pillar.icon;
              const isActive = activeIndex === index;
              return (
                <LiquidGlassSurface
                  key={pillar.title}
                  as="button"
                  autoGlow={isActive}
                  active={isActive}
                  tilt={false}
                  onClick={() => handleSelect(index)}
                  aria-pressed={isActive}
                  className="p-3 text-left"
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className={cn(
                        'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border',
                        isActive
                          ? 'border-[var(--primary-dark-1)]/30 bg-[var(--primary-1)]/50'
                          : 'border-[var(--primary-1)] bg-[var(--light)]/80'
                      )}
                    >
                      <Icon
                        className={cn(
                          'h-4 w-4',
                          isActive ? 'text-[var(--primary-dark-1)]' : 'text-[var(--dark-4)]'
                        )}
                        aria-hidden
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate font-montserrat text-[12px] font-semibold text-[var(--dark-9)]">
                        {pillar.title}
                      </p>
                      <p className="truncate font-montserrat text-[10px] text-[var(--dark-4)]">
                        {pillar.stat}
                      </p>
                    </div>
                  </div>
                </LiquidGlassSurface>
              );
            })}
          </div>
        </div>

        {/* Progress dots */}
        <div className="mt-10 flex items-center justify-center gap-3">
          {valuePillars.map((pillar, i) => (
            <button
              key={pillar.title}
              type="button"
              aria-label={`Show ${pillar.title}`}
              aria-current={i === activeIndex ? 'true' : undefined}
              onClick={() => handleSelect(i)}
              className="group flex flex-col items-center gap-1.5"
            >
              {i === activeIndex ? (
                <ProgressRing progress={progress} size={32} strokeWidth={2}>
                  <span className="font-montserrat text-[9px] font-bold text-[var(--primary-dark-1)]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </ProgressRing>
              ) : (
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--primary-1)] bg-[var(--light)]/80 font-montserrat text-[9px] text-[var(--dark-3)] transition-all duration-300 group-hover:border-[var(--primary-2)] group-hover:text-[var(--dark-6)]">
                  {String(i + 1).padStart(2, '0')}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueSection;
