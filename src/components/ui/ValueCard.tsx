'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import Button from '@/components/ui/Button';
import LiquidGlassSurface from '@/components/liquid/LiquidGlassSurface';
import { ArrowUpRight, Download, type LucideIcon } from 'lucide-react';

interface ValueCardProps {
  title: string;
  description: string;
  image?: string;
  icon?: LucideIcon;
  tagline?: string;
  stat?: string;
  index?: number;
  total?: number;
  isActive?: boolean;
  compact?: boolean;
  className?: string;
}

const ValueCard: React.FC<ValueCardProps> = ({
  title,
  description,
  image,
  icon: Icon,
  tagline,
  stat,
  index = 0,
  total = 4,
  isActive = false,
  compact = false,
  className,
}) => {
  const router = useRouter();
  const [imageError, setImageError] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);

  const handleContactClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push('/contact');
  };

  if (compact) {
    return (
      <div className={cn('p-5', className)}>
        <div className="mb-4 flex items-start justify-between gap-4">
          <h3 className="font-montserrat text-h1 font-semibold text-[var(--dark-9)]">{title}</h3>
          {Icon && (
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[var(--primary-1)] bg-[var(--primary-1)]/50">
              <Icon className="h-4 w-4 text-[var(--primary-dark-1)]" aria-hidden />
            </div>
          )}
        </div>
        <p className="font-montserrat text-body-small leading-relaxed text-[var(--dark-6)]">{description}</p>
      </div>
    );
  }

  return (
    <LiquidGlassSurface
      autoGlow
      active={isActive}
      className={cn(
        isActive ? 'animate-in fade-in slide-in-from-bottom-3 duration-500' : '',
        className
      )}
    >
      <div className="p-6 sm:p-8">
        {/* Visual area */}
        <div className="relative mb-6 overflow-hidden rounded-xl border border-[var(--primary-1)]">
          <div
            className="absolute inset-0 z-[1] bg-gradient-to-t from-[var(--light-2)]/90 via-transparent to-[var(--primary-1)]/20"
            aria-hidden
          />

          {image && !imageError ? (
            <img
              src={image}
              alt=""
              className="h-[200px] w-full object-cover transition-transform duration-700 sm:h-[220px]"
              style={{ transform: isHovered ? 'scale(1.04)' : 'scale(1)' }}
              onError={() => setImageError(true)}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            />
          ) : (
            <div className="flex h-[200px] items-center justify-center bg-gradient-to-br from-[var(--light-2)] to-[var(--light-3)] sm:h-[220px]">
              {Icon && (
                <div className="relative">
                  <div
                    className="absolute inset-0 rounded-full bg-[var(--primary-2)]/60 blur-3xl"
                    aria-hidden
                  />
                  <Icon className="relative h-16 w-16 text-[var(--primary-dark-1)]" aria-hidden />
                </div>
              )}
            </div>
          )}

          <div className="absolute bottom-0 left-0 right-0 z-[3] flex items-end justify-between p-4">
            {tagline && (
              <span className="rounded-full border border-[var(--primary-1)] bg-[var(--light)]/90 px-3 py-1 font-montserrat text-[12px] font-medium text-[var(--primary-dark-1)] backdrop-blur-sm">
                {tagline}
              </span>
            )}
            {stat && (
              <span className="rounded-full border border-[var(--primary-1)] bg-[var(--light)]/90 px-2.5 py-1 font-montserrat text-[10px] text-[var(--dark-5)] backdrop-blur-sm">
                {stat}
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="mb-4">
          <p className="mb-1 font-montserrat text-[11px] font-medium text-[var(--dark-3)]">
            pillar_{String(index + 1).padStart(2, '0')}.rs
          </p>
          <h3 className="font-montserrat text-h1 font-semibold text-[var(--dark-9)]">{title}</h3>
        </div>

        <p className="mb-6 font-montserrat text-body-small leading-relaxed text-[var(--dark-6)] sm:text-[15px] md:text-body-medium md:leading-[1.65]">
          {description}
        </p>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            variant="primary-outline"
            size="sm"
            icon={<ArrowUpRight />}
            iconPosition="right"
            className="w-full border-[var(--primary-dark-1)]/60 bg-[var(--primary-dark-1)]/5 text-[var(--primary-dark-1)] hover:bg-[var(--primary-dark-1)]/15 sm:w-auto"
            onClick={handleContactClick}
          >
            Contact Us
          </Button>
          <Button
            variant="tertiary-orange"
            size="sm"
            icon={<Download />}
            iconPosition="left"
            className="w-full sm:w-auto"
          >
            Get Brochure
          </Button>
        </div>

        {/* Auto progress segments */}
        <div className="mt-6 flex items-center gap-3 border-t border-[var(--primary-1)] pt-5">
          <div className="flex flex-1 gap-1">
            {Array.from({ length: total }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  'h-1 flex-1 rounded-full transition-all duration-500',
                  i <= index ? 'bg-gradient-to-r from-[var(--primary-dark-1)] to-[var(--primary-3)]' : 'bg-[var(--dark-1)]'
                )}
                aria-hidden
              />
            ))}
          </div>
          <span className="shrink-0 font-montserrat text-[11px] tabular-nums text-[var(--dark-4)]">
            {String(index + 1).padStart(2, '0')}/{String(total).padStart(2, '0')}
          </span>
        </div>
      </div>
    </LiquidGlassSurface>
  );
};

export default ValueCard;
