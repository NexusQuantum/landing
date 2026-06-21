import { Cloud, type LucideIcon } from 'lucide-react';

interface ProductSectionHeadingProps {
  badge: string;
  title: string;
  subtitle?: string;
  align?: 'center' | 'left';
  badgeIcon?: LucideIcon;
}

/**
 * Section heading used across the bespoke product pages (Identity, HyperVisor,
 * MicroVM). Markup is intentionally identical to the previous per-page copies
 * so the visual output is unchanged.
 */
export default function ProductSectionHeading({
  badge,
  title,
  subtitle,
  align = 'center',
  badgeIcon: BadgeIcon = Cloud,
}: ProductSectionHeadingProps) {
  return (
    <div
      className={`mb-10 flex flex-col gap-4 md:mb-14 ${
        align === 'center' ? 'items-center text-center' : 'items-start text-left'
      }`}
    >
      <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--primary-2)] bg-[var(--primary-1)]/60 px-3.5 py-1 font-montserrat text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--primary-dark-2)]">
        <BadgeIcon className="h-3.5 w-3.5" aria-hidden />
        {badge}
      </span>
      <h2 className="font-montserrat text-[26px] font-semibold leading-[1.15] text-[var(--dark-9)] sm:text-[32px] md:text-[36px]">
        {title}
      </h2>
      {subtitle && (
        <p className="max-w-3xl font-montserrat text-[14px] leading-relaxed text-[var(--dark-5)] sm:text-[15px] md:text-[16px]">
          {subtitle}
        </p>
      )}
    </div>
  );
}
