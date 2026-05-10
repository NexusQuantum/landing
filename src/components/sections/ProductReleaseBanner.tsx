'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  productReleasesConfig,
  isPrimaryCtaExternal,
  type ProductReleaseItem,
  type ProductReleasePrimaryCta,
} from '@/config/product-releases';

interface ProductReleaseBannerProps {
  className?: string;
}

const defaultHeadlineSuffix = 'is now available';

function PrimaryCtaButton({ cta }: { cta: ProductReleasePrimaryCta }) {
  const external = isPrimaryCtaExternal(cta.href);
  const className = cn(
    'font-montserrat inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg px-5 py-3 text-body-medium font-medium',
    'bg-[var(--primary-dark-1)] text-white shadow-[0px_2px_6px_2px_rgba(0,0,0,0.15),0px_1px_2px_0px_rgba(0,0,0,0.3)]',
    'transition-all duration-300 hover:bg-[var(--primary-dark-2)] hover:shadow-[0px_4px_8px_2px_rgba(0,0,0,0.2),0px_2px_4px_0px_rgba(0,0,0,0.4)]',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-dark-1)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f0f23]'
  );

  if (external) {
    return (
      <a href={cta.href} target="_blank" rel="noopener noreferrer" className={className}>
        {cta.label}
        <ArrowUpRight className="h-[18px] w-[18px] shrink-0" aria-hidden />
      </a>
    );
  }

  return (
    <Link href={cta.href} className={className}>
      {cta.label}
      <ChevronRight className="h-[18px] w-[18px] shrink-0" aria-hidden />
    </Link>
  );
}

function ReleaseSlide({
  item,
  defaultBadge,
}: {
  item: ProductReleaseItem;
  defaultBadge: string;
}) {
  const badge = item.badge ?? defaultBadge;
  const suffix = item.headlineSuffix ?? defaultHeadlineSuffix;

  return (
    <div className="flex w-full min-w-0 flex-shrink-0 flex-col gap-6 px-0 md:flex-row md:items-center md:justify-between md:gap-10">
      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <span className="inline-flex w-fit items-center rounded-lg bg-[rgba(242,101,34,0.2)] px-3 py-1.5 font-montserrat text-body-xsmall font-semibold uppercase tracking-wide text-[var(--primary-3)] md:text-body-small">
          {badge}
        </span>
        <div className="flex flex-col gap-2">
          <h2 className="font-montserrat text-h1 font-semibold leading-[1.25] text-[var(--light)] md:text-h2">
            <span className="bg-gradient-to-b from-[#FF5001] to-[#FF9C6D] bg-clip-text text-transparent">{item.productName}</span>{' '}
            <span className="text-[var(--light)]">{suffix}</span>
          </h2>
          <p className="max-w-xl font-montserrat text-body-small font-normal leading-[1.5] text-[var(--light)]/80 md:text-body-medium">
            {item.description}
          </p>
        </div>
      </div>

      <div className="flex w-full flex-shrink-0 flex-col gap-3 sm:flex-row sm:items-center md:w-auto md:flex-col md:items-stretch lg:flex-row lg:items-center">
        <PrimaryCtaButton cta={item.primaryCta} />
        {item.secondaryCta ? (
          <Link
            href={item.secondaryCta.href}
            className={cn(
              'font-montserrat inline-flex min-h-[44px] items-center justify-center rounded-lg border border-white/25 px-5 py-3 text-body-medium font-medium text-[var(--light)]',
              'transition-all duration-300 hover:border-white/40 hover:bg-white/5',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f0f23]'
            )}
          >
            {item.secondaryCta.label}
          </Link>
        ) : null}
      </div>
    </div>
  );
}

const ProductReleaseBanner: React.FC<ProductReleaseBannerProps> = ({ className }) => {
  const { enabled, items, defaultBadge = 'New release', autoRotateIntervalMs } = productReleasesConfig;

  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const count = items.length;
  const showCarousel = count > 1;

  const go = useCallback(
    (dir: -1 | 1) => {
      setIndex((i) => (i + dir + count) % count);
    },
    [count]
  );

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

  return (
    <section
      aria-label={showCarousel ? 'New product releases' : 'New product release'}
      className={cn('relative w-full overflow-hidden border-b border-white/10 bg-[#0f0f23]', className)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--primary-dark-1)] to-transparent opacity-90"
        aria-hidden
      />

      <div className="mx-auto w-full max-w-[996px] px-4 py-8 md:px-[70px] md:py-10">
        {showCarousel ? (
          <div className="flex flex-col gap-6">
            <div className="relative flex items-stretch gap-2 md:gap-3">
              <button
                type="button"
                onClick={() => go(-1)}
                className={cn(
                  'hidden shrink-0 self-center rounded-lg border border-white/20 p-2 text-[var(--light)] transition-colors md:flex',
                  'hover:border-white/40 hover:bg-white/5',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f0f23]'
                )}
                aria-label="Previous release"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden />
              </button>

              <div
                ref={containerRef}
                tabIndex={0}
                className="min-w-0 flex-1 outline-none"
                role="group"
                aria-roledescription="carousel"
                aria-label={`Release ${index + 1} of ${count}`}
              >
                <div className="w-full overflow-hidden rounded-xl">
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
                        className="box-border min-w-0 shrink-0"
                        style={{ flex: `0 0 calc(100% / ${count})` }}
                        inert={i !== index ? true : undefined}
                      >
                        <ReleaseSlide item={item} defaultBadge={defaultBadge} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => go(1)}
                className={cn(
                  'hidden shrink-0 self-center rounded-lg border border-white/20 p-2 text-[var(--light)] transition-colors md:flex',
                  'hover:border-white/40 hover:bg-white/5',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f0f23]'
                )}
                aria-label="Next release"
              >
                <ChevronRight className="h-5 w-5" aria-hidden />
              </button>
            </div>

            <div className="flex justify-center gap-2 md:hidden">
              <button
                type="button"
                onClick={() => go(-1)}
                className="rounded-lg border border-white/20 px-3 py-2 text-body-small font-medium text-[var(--light)]"
                aria-label="Previous release"
              >
                Prev
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                className="rounded-lg border border-white/20 px-3 py-2 text-body-small font-medium text-[var(--light)]"
                aria-label="Next release"
              >
                Next
              </button>
            </div>

            <div className="flex justify-center gap-2" aria-label="Choose release">
              {items.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  aria-label={`Show ${item.productName}`}
                  aria-current={i === index ? 'true' : undefined}
                  onClick={() => setIndex(i)}
                  className={cn(
                    'h-2.5 rounded-full transition-all duration-300',
                    i === index ? 'w-8 bg-[var(--primary-dark-1)]' : 'w-2.5 bg-white/30 hover:bg-white/50'
                  )}
                />
              ))}
            </div>
          </div>
        ) : (
          <ReleaseSlide item={items[0]} defaultBadge={defaultBadge} />
        )}
      </div>
    </section>
  );
};

export default ProductReleaseBanner;
