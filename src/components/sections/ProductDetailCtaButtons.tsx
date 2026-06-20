'use client';

import Link from 'next/link';
import { ArrowUpRight, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DEFAULT_RELEASE_CTA_LABELS,
  getProductReleaseItem,
  isReleaseCtaExternal,
  type ProductReleaseCtaLink,
} from '@/config/product-releases';

interface ProductDetailCtaButtonsProps {
  releaseId: string;
  className?: string;
}

function CtaLink({
  cta,
  label,
  variant,
  className,
}: {
  cta: ProductReleaseCtaLink;
  label: string;
  variant: 'primary' | 'outline' | 'ghost';
  className?: string;
}) {
  const external = isReleaseCtaExternal(cta.href);
  const disabled = cta.href === '#';

  const base = cn(
    'inline-flex items-center justify-center gap-2 rounded-[10px] px-6 py-3.5 font-montserrat text-[15px] font-semibold transition-all duration-300 active:scale-95',
    className
  );

  const styles =
    variant === 'primary'
      ? cn(
          base,
          'bg-[var(--primary-dark-1)] text-white shadow-[0px_8px_24px_rgba(242,101,34,0.35)] hover:scale-105 hover:bg-[var(--primary-dark-2)]',
          disabled && 'cursor-not-allowed opacity-45 saturate-50 hover:scale-100'
        )
      : variant === 'outline'
        ? cn(
            base,
            'border border-white/25 bg-white/10 text-white backdrop-blur-sm hover:scale-105 hover:bg-white/20',
            disabled && 'cursor-not-allowed opacity-45 saturate-50 hover:scale-100'
          )
        : cn(
            base,
            'gap-1.5 px-4 text-white/80 hover:text-white',
            disabled && 'cursor-not-allowed opacity-45 saturate-50'
          );

  if (disabled) {
    return (
      <span className={styles} aria-disabled="true" title="Link coming soon">
        {label}
        <span className="rounded bg-white/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white/50">
          Soon
        </span>
      </span>
    );
  }

  if (external) {
    return (
      <a href={cta.href} target="_blank" rel="noopener noreferrer" className={styles}>
        <span className="truncate">{label}</span>
        {variant === 'primary' ? (
          <ArrowUpRight className="h-[18px] w-[18px] shrink-0" aria-hidden />
        ) : variant === 'ghost' ? (
          <ChevronRight className="h-[16px] w-[16px] shrink-0" aria-hidden />
        ) : null}
      </a>
    );
  }

  return (
    <Link href={cta.href} className={styles}>
      <span className="truncate">{label}</span>
      {variant === 'primary' ? (
        <ChevronRight className="h-[18px] w-[18px] shrink-0" aria-hidden />
      ) : variant === 'ghost' ? (
        <ChevronRight className="h-[16px] w-[16px] shrink-0" aria-hidden />
      ) : null}
    </Link>
  );
}

export default function ProductDetailCtaButtons({ releaseId, className }: ProductDetailCtaButtonsProps) {
  const item = getProductReleaseItem(releaseId);
  if (!item) return null;

  const { ctas } = item;
  const labels = DEFAULT_RELEASE_CTA_LABELS;
  const exploreLabel = ctas.exploreProduct.label ?? labels.exploreProduct;
  const tryDemoLabel = ctas.tryDemo.label ?? labels.tryDemo;
  const viewDocsLabel = ctas.viewDocs.label ?? labels.viewDocs;

  return (
    <div
      className={cn(
        'flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4',
        className
      )}
    >
      <CtaLink cta={ctas.exploreProduct} label={exploreLabel} variant="primary" />
      <CtaLink cta={ctas.tryDemo} label={tryDemoLabel} variant="outline" />
      <CtaLink cta={ctas.viewDocs} label={viewDocsLabel} variant="ghost" />
    </div>
  );
}

export function getReleaseCtaUrls(releaseId: string) {
  const item = getProductReleaseItem(releaseId);
  if (!item) return null;
  return item.ctas;
}
