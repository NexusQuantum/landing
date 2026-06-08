'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Sparkles, type LucideIcon } from 'lucide-react';

interface SectionHeaderProps {
  badge: string;
  badgeIcon?: LucideIcon;
  title: React.ReactNode;
  subtitle: string;
  className?: string;
  light?: boolean;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  badge,
  badgeIcon: BadgeIcon = Sparkles,
  title,
  subtitle,
  className,
  light = true,
}) => (
  <div className={cn('mb-10 flex flex-col items-center gap-4 text-center md:mb-14', className)}>
    <span
      className={cn(
        'agent-badge inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1 font-montserrat text-[11px] font-semibold uppercase tracking-[0.12em] sm:text-body-xsmall',
        light
          ? 'border-[var(--primary-2)] bg-[var(--primary-1)]/60 text-[var(--primary-dark-2)]'
          : 'border-[var(--primary-dark-1)]/30 bg-[rgba(242,101,34,0.1)] text-[var(--primary-3)]'
      )}
    >
      <BadgeIcon className="h-3.5 w-3.5" aria-hidden />
      {badge}
    </span>
    <h2
      className={cn(
        'agent-title-shimmer font-montserrat text-[28px] font-semibold leading-[1.15] sm:text-h2 md:text-[36px]',
        light ? 'text-[var(--dark-9)]' : ''
      )}
    >
      {title}
    </h2>
    <p
      className={cn(
        'max-w-2xl font-montserrat text-body-small leading-relaxed sm:text-[15px] md:text-body-medium',
        light ? 'text-[var(--dark-5)]' : 'text-[var(--light)]/55'
      )}
    >
      {subtitle}
    </p>
  </div>
);

export default SectionHeader;
