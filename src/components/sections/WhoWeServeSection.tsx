'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import SectionHeader from '@/components/ui/SectionHeader';
import { Building2, BrainCircuit, ShieldCheck, Users, type LucideIcon } from 'lucide-react';

interface WhoWeServeSectionProps {
  className?: string;
}

interface Audience {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

const audiences: Audience[] = [
  {
    id: 'infrastructure',
    title: 'Infrastructure Leaders',
    description: 'Modernizing virtualization and GPU fleets.',
    icon: Building2,
  },
  {
    id: 'data-ai',
    title: 'Data & AI Teams',
    description: 'Shipping LLM features safely, quickly, and repeatedly.',
    icon: BrainCircuit,
  },
  {
    id: 'regulated',
    title: 'Regulated Industries',
    description:
      'Organizations that need sovereignty and verifiable controls — without losing velocity.',
    icon: ShieldCheck,
  },
];

const WhoWeServeSection: React.FC<WhoWeServeSectionProps> = ({ className }) => {
  return (
    <section
      id="who-we-serve-section"
      aria-label="Who we serve"
      className={cn(
        'relative w-full overflow-hidden border-b border-[var(--primary-1)] bg-[var(--light-3)]',
        className
      )}
    >
      <div className="mx-auto w-full max-w-[1200px] px-4 py-14 sm:px-6 sm:py-16 md:px-10 md:py-20 lg:px-12">
        <SectionHeader
          badge="Our Audience"
          badgeIcon={Users}
          title={
            <>
              <span className="text-[var(--dark-9)]">WHO </span>
              <span className="bg-gradient-to-r from-[var(--primary-dark-1)] to-[var(--primary-3)] bg-clip-text text-transparent">
                WE SERVE
              </span>
            </>
          }
          subtitle="Built for the teams driving agentic AI — from infrastructure to regulated deployments."
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
          {audiences.map((audience) => {
            const Icon = audience.icon;
            return (
              <article
                key={audience.id}
                className="liquid-glass-light flex flex-col gap-4 rounded-2xl p-6 sm:p-7"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--primary-1)] bg-[var(--light)]">
                  <Icon className="h-5 w-5 text-[var(--primary-dark-1)]" aria-hidden />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-montserrat text-[16px] font-semibold text-[var(--primary-dark-1)] sm:text-[17px]">
                    {audience.title}
                  </h3>
                  <p className="font-montserrat text-body-small leading-relaxed text-[var(--primary-dark-3)]">
                    {audience.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhoWeServeSection;
