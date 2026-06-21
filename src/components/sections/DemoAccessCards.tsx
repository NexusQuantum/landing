'use client';

import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ProductReleaseDemoSite } from '@/config/product-releases';

interface DemoAccessCardsProps {
  sites: ProductReleaseDemoSite[];
  variant?: 'dark' | 'light';
  className?: string;
  columns?: 1 | 2;
}

export default function DemoAccessCards({
  sites,
  variant = 'light',
  className,
  columns = 2,
}: DemoAccessCardsProps) {
  if (!sites.length) return null;

  const isDark = variant === 'dark';

  return (
    <div
      className={cn(
        'grid gap-3',
        columns === 2 ? 'sm:grid-cols-2' : 'grid-cols-1',
        className
      )}
    >
      {sites.map((site) => (
        <div
          key={site.name}
          className={cn(
            'rounded-xl border p-4',
            isDark
              ? 'border-white/10 bg-white/[0.04]'
              : 'liquid-glass-light border-[var(--primary-1)]'
          )}
        >
          <div className="mb-3 flex items-center justify-between gap-2">
            <p
              className={cn(
                'font-montserrat text-[13px] font-semibold sm:text-[14px]',
                isDark ? 'text-white/90' : 'text-[var(--dark-9)]'
              )}
            >
              {site.name}
            </p>
            <a
              href={site.href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'inline-flex shrink-0 items-center gap-1 font-montserrat text-[12px] font-medium transition-colors',
                isDark
                  ? 'text-[var(--primary-3)] hover:text-[var(--primary-2)]'
                  : 'text-[var(--primary-dark-1)] hover:text-[var(--primary-dark-2)]'
              )}
            >
              Open
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
            </a>
          </div>
          <dl className="space-y-1.5 font-montserrat text-[12px] sm:text-[13px]">
            <div className="flex flex-wrap gap-x-2 gap-y-0.5">
              <dt className={isDark ? 'text-white/45' : 'text-[var(--dark-4)]'}>URL</dt>
              <dd className={cn('break-all', isDark ? 'text-white/70' : 'text-[var(--dark-6)]')}>
                {site.href.replace(/^https?:\/\//, '')}
              </dd>
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-0.5">
              <div className="flex gap-x-2">
                <dt className={isDark ? 'text-white/45' : 'text-[var(--dark-4)]'}>Username</dt>
                <dd className={cn('font-medium', isDark ? 'text-white/85' : 'text-[var(--dark-8)]')}>
                  {site.username}
                </dd>
              </div>
              <div className="flex gap-x-2">
                <dt className={isDark ? 'text-white/45' : 'text-[var(--dark-4)]'}>Password</dt>
                <dd className={cn('font-medium', isDark ? 'text-white/85' : 'text-[var(--dark-8)]')}>
                  {site.password}
                </dd>
              </div>
            </div>
          </dl>
        </div>
      ))}
    </div>
  );
}
