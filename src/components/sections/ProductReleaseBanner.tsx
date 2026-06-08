'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ArrowUpRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import {
  DEFAULT_RELEASE_CTA_LABELS,
  productReleasesConfig,
  isReleaseCtaExternal,
  type ProductReleaseCtaLink,
  type ProductReleaseCtas,
  type ProductReleaseItem,
} from '@/config/product-releases';

interface ProductReleaseBannerProps {
  className?: string;
}

const defaultHeadlineSuffix = 'is now available';

const glassCardClass =
  'relative overflow-hidden rounded-2xl border border-white/10 bg-black/35 shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:rounded-[20px]';

type CtaVariant = 'primary' | 'outline' | 'ghost';

function ctaClassName(variant: CtaVariant, extra?: string) {
  const base = cn(
    'font-montserrat inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-[13px] font-medium sm:min-h-[46px] sm:px-5 sm:py-3 sm:text-body-small md:text-body-medium',
    'transition-all duration-300 active:scale-[0.98]',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f0f23]',
    extra
  );

  if (variant === 'primary') {
    return cn(
      base,
      'bg-[var(--primary-dark-1)] text-white shadow-[0px_2px_6px_2px_rgba(0,0,0,0.15),0px_1px_2px_0px_rgba(0,0,0,0.3)]',
      'hover:bg-[var(--primary-dark-2)] hover:shadow-[0px_4px_12px_2px_rgba(242,101,34,0.25)]',
      'focus-visible:ring-[var(--primary-dark-1)]'
    );
  }

  if (variant === 'outline') {
    return cn(
      base,
      'border border-[var(--primary-dark-1)]/80 bg-[var(--primary-dark-1)]/5 text-[var(--primary-3)]',
      'hover:border-[var(--primary-dark-1)] hover:bg-[var(--primary-dark-1)]/15',
      'focus-visible:ring-[var(--primary-dark-1)]'
    );
  }

  return cn(
    base,
    'border border-white/20 bg-white/[0.03] text-[var(--light)]',
    'hover:border-white/35 hover:bg-white/[0.07]',
    'focus-visible:ring-white/40'
  );
}

function ReleaseCtaButton({
  cta,
  label,
  variant,
  className,
}: {
  cta: ProductReleaseCtaLink;
  label: string;
  variant: CtaVariant;
  className?: string;
}) {
  const external = isReleaseCtaExternal(cta.href);
  const styles = ctaClassName(variant, className);
  const disabled = cta.href === '#';

  if (disabled) {
    return (
      <span
        className={cn(styles, 'cursor-not-allowed opacity-45 saturate-50')}
        aria-disabled="true"
        title="Link coming soon"
      >
        <span className="truncate">{label}</span>
        <span className="shrink-0 rounded bg-white/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white/50 sm:text-[11px]">
          Soon
        </span>
      </span>
    );
  }

  if (external) {
    return (
      <a href={cta.href} target="_blank" rel="noopener noreferrer" className={styles}>
        <span className="truncate">{label}</span>
        <ArrowUpRight className="h-4 w-4 shrink-0 sm:h-[18px] sm:w-[18px]" aria-hidden />
      </a>
    );
  }

  return (
    <Link href={cta.href} className={styles}>
      <span className="truncate">{label}</span>
      {variant === 'primary' ? (
        <ChevronRight className="h-4 w-4 shrink-0 sm:h-[18px] sm:w-[18px]" aria-hidden />
      ) : null}
    </Link>
  );
}

type ReleaseCtaLabels = {
  exploreProduct: string;
  tryDemo: string;
  viewDocs: string;
};

function ReleaseCtaGroup({
  ctas,
  labels,
}: {
  ctas: ProductReleaseCtas;
  labels: ReleaseCtaLabels;
}) {
  return (
    <div className="w-full shrink-0 lg:w-[min(100%,300px)] xl:w-[min(100%,320px)]">
      <div className="flex flex-col gap-2.5 sm:gap-3">
        <ReleaseCtaButton
          cta={ctas.exploreProduct}
          label={ctas.exploreProduct.label ?? labels.exploreProduct}
          variant="primary"
        />
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3 lg:grid-cols-1">
          <ReleaseCtaButton
            cta={ctas.tryDemo}
            label={ctas.tryDemo.label ?? labels.tryDemo}
            variant="outline"
          />
          <ReleaseCtaButton
            cta={ctas.viewDocs}
            label={ctas.viewDocs.label ?? labels.viewDocs}
            variant="ghost"
          />
        </div>
      </div>
    </div>
  );
}

function ReleaseSlide({
  item,
  defaultBadge,
  ctaLabels,
}: {
  item: ProductReleaseItem;
  defaultBadge: string;
  ctaLabels: ReleaseCtaLabels;
}) {
  const badge = item.badge ?? defaultBadge;
  const suffix = item.headlineSuffix ?? defaultHeadlineSuffix;

  return (
    <div className="flex w-full min-w-0 flex-col gap-6 sm:gap-7 lg:flex-row lg:items-center lg:justify-between lg:gap-10 xl:gap-14">
      <div className="flex min-w-0 flex-1 flex-col gap-3 sm:gap-4">
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-[var(--primary-dark-1)]/30 bg-[rgba(242,101,34,0.15)] px-3 py-1 font-montserrat text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--primary-3)] sm:px-3.5 sm:py-1.5 sm:text-body-xsmall md:text-body-small">
          <Sparkles className="h-3 w-3 shrink-0 sm:h-3.5 sm:w-3.5" aria-hidden />
          {badge}
        </span>

        <div className="flex flex-col gap-2 sm:gap-2.5">
          <h2 className="font-montserrat text-[22px] font-semibold leading-[1.2] text-[var(--light)] sm:text-h1 md:text-h2 md:leading-[1.25]">
            <span className="bg-gradient-to-b from-[#FF5001] to-[#FF9C6D] bg-clip-text text-transparent">
              {item.productName}
            </span>
            <span className="mt-1 block text-[var(--light)] sm:mt-0 sm:inline sm:pl-1.5">{suffix}</span>
          </h2>
          <p className="max-w-2xl font-montserrat text-body-small font-normal leading-[1.55] text-[var(--light)]/75 sm:text-[15px] md:text-body-medium md:leading-[1.6]">
            {item.description}
          </p>
        </div>
      </div>

      <div className="w-full shrink-0 lg:max-w-[320px]">
        <div
          className="mb-3 hidden h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent lg:block"
          aria-hidden
        />
        <div
          className="mb-3 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent lg:hidden"
          aria-hidden
        />
        <ReleaseCtaGroup ctas={item.ctas} labels={ctaLabels} />
      </div>
    </div>
  );
}

function AmbientBackground() {
  return (
    <>
      <div
        className="pointer-events-none absolute -left-24 top-0 h-56 w-56 rounded-full bg-[#FF5001]/15 blur-3xl sm:-left-16 sm:h-72 sm:w-72"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-0 h-56 w-56 rounded-full bg-[#FF9C6D]/10 blur-3xl sm:-right-16 sm:h-72 sm:w-72"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--primary-dark-1)]/80 to-transparent"
        aria-hidden
      />
    </>
  );
}

function CarouselNavButton({
  direction,
  onClick,
  className,
}: {
  direction: 'prev' | 'next';
  onClick: () => void;
  className?: string;
}) {
  const Icon = direction === 'prev' ? ChevronLeft : ChevronRight;
  const label = direction === 'prev' ? 'Previous release' : 'Next release';

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={cn(
        'flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-black/50 text-[var(--light)] backdrop-blur-sm transition-all',
        'hover:border-white/30 hover:bg-white/10 active:scale-95',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f0f23]',
        'sm:h-10 sm:w-10',
        className
      )}
    >
      <Icon className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden />
    </button>
  );
}

const ProductReleaseBanner: React.FC<ProductReleaseBannerProps> = ({ className }) => {
  const {
    enabled,
    items,
    defaultBadge = 'New release',
    defaultCtaLabels = DEFAULT_RELEASE_CTA_LABELS,
    autoRotateIntervalMs,
  } = productReleasesConfig;

  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const count = items.length;
  const showCarousel = count > 1;

  const go = useCallback(
    (dir: -1 | 1) => {
      setIndex((i) => (i + dir + count) % count);
    },
    [count]
  );

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!showCarousel || !autoRotateIntervalMs || autoRotateIntervalMs <= 0 || isPaused) return;

    const t = window.setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, autoRotateIntervalMs);

    return () => window.clearInterval(t);
  }, [showCarousel, autoRotateIntervalMs, isPaused, count]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || !showCarousel) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        go(-1);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        go(1);
      }
    };

    el.addEventListener('keydown', onKeyDown);
    return () => el.removeEventListener('keydown', onKeyDown);
  }, [showCarousel, go]);

  if (!enabled || count === 0) {
    return null;
  }

  const slideContent = showCarousel ? (
    <div className="flex flex-col gap-5 sm:gap-6">
      <div className="flex items-center justify-between gap-3 px-0.5 sm:px-1">
        <p className="font-montserrat text-body-xsmall font-medium uppercase tracking-wider text-white/45 sm:text-body-small">
          Latest releases
        </p>
        <p className="font-montserrat text-body-xsmall font-medium tabular-nums text-white/50 sm:text-body-small" aria-live="polite">
          {index + 1} / {count}
        </p>
      </div>

      <div className="flex items-stretch gap-2 sm:gap-3 md:gap-4">
        <CarouselNavButton
          direction="prev"
          onClick={() => go(-1)}
          className="hidden self-center md:flex"
        />

        <div
          ref={containerRef}
          tabIndex={0}
          className="min-w-0 flex-1 outline-none"
          role="group"
          aria-roledescription="carousel"
          aria-label={`Release ${index + 1} of ${count}: ${items[index]?.productName}`}
        >
          <div className="w-full overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out motion-reduce:transition-none"
              style={{
                width: `${count * 100}%`,
                transform: `translateX(calc(-100% * ${index} / ${count}))`,
              }}
            >
              {items.map((item, i) => (
                <div
                  key={item.id}
                  style={{ flex: `0 0 calc(100% / ${count})` }}
                  aria-hidden={i !== index ? true : undefined}
                  className={cn(
                    'box-border min-w-0 shrink-0 px-0.5 sm:px-1',
                    i !== index && 'pointer-events-none opacity-40'
                  )}
                >
                  <ReleaseSlide item={item} defaultBadge={defaultBadge} ctaLabels={defaultCtaLabels} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <CarouselNavButton
          direction="next"
          onClick={() => go(1)}
          className="hidden self-center md:flex"
        />
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-white/10 pt-4 sm:pt-5">
        <div className="flex items-center gap-2 md:hidden">
          <CarouselNavButton direction="prev" onClick={() => go(-1)} />
          <CarouselNavButton direction="next" onClick={() => go(1)} />
        </div>

        <div className="ml-auto flex flex-1 items-center justify-center gap-2 md:ml-0 md:flex-none" aria-label="Choose release">
          {items.map((item, i) => (
            <button
              key={item.id}
              type="button"
              aria-label={`Show ${item.productName}`}
              aria-current={i === index ? 'true' : undefined}
              onClick={() => setIndex(i)}
              className={cn(
                'h-2 rounded-full transition-all duration-300',
                i === index ? 'w-7 bg-[var(--primary-dark-1)] sm:w-8' : 'w-2 bg-white/25 hover:bg-white/45'
              )}
            />
          ))}
        </div>
      </div>
    </div>
  ) : (
    <ReleaseSlide item={items[0]} defaultBadge={defaultBadge} ctaLabels={defaultCtaLabels} />
  );

  return (
    <section
      ref={sectionRef}
      aria-label={showCarousel ? 'New product releases' : 'New product release'}
      className={cn('relative w-full overflow-hidden border-b border-white/10 bg-[#0f0f23]', className)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setIsPaused(false);
      }}
    >
      <AmbientBackground />

      <div
        className={cn(
          'mx-auto w-full max-w-[1100px] px-4 py-6 transition-all duration-700 ease-out sm:px-6 sm:py-8 md:px-10 md:py-10 lg:px-12',
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
        )}
      >
        <div className={cn(glassCardClass, 'p-5 sm:p-6 md:p-8 lg:p-9')}>
          <div
            className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-br from-white/[0.06] via-transparent to-[var(--primary-dark-1)]/[0.04]"
            aria-hidden
          />
          <div className="relative z-[1]">{slideContent}</div>
        </div>
      </div>
    </section>
  );
};

export default ProductReleaseBanner;
