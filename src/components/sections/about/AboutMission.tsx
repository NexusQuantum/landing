'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import Button from '@/components/ui/Button';
import { MessageCircle, ArrowRight, Building2 } from 'lucide-react';

interface AboutMissionProps {
  className?: string;
}

const highlights = [
  { label: 'Rust R&D since', value: '2020' },
  { label: 'Platform type', value: 'Vertically integrated' },
  { label: 'Built for', value: 'Agentic AI' },
];

const AboutMission: React.FC<AboutMissionProps> = ({ className }) => {
  return (
    <div className={cn('flex flex-col', className)}>
      {/* Mission hero */}
      <div className="flex flex-col items-center px-4 pb-10 pt-[60px] lg:px-[100px] lg:pb-14 lg:pt-[100px]">
        <div className="relative w-full max-w-[1128px] overflow-hidden rounded-2xl lg:rounded-[30px]">
          <div className="absolute inset-0 bg-[var(--dark-9)]" aria-hidden />
          <img
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-30"
            src="/illustration about us.jpg"
          />
          <div className="absolute inset-0 rounded-2xl border border-[var(--dark-1)]/30 lg:rounded-[30px]" aria-hidden />

          <div className="relative z-[1] flex flex-col items-center gap-4 px-6 py-10 text-center lg:gap-5 lg:p-[70px]">
            <p className="font-montserrat text-[24px] font-semibold leading-[1.3] lg:text-[54px]">
              <span className="text-[var(--primary-dark-2)]">OUR </span>
              <span className="text-[var(--light)]">MISSION</span>
            </p>
            <p className="max-w-3xl font-montserrat text-[14px] font-normal leading-[1.5] text-[var(--light)] lg:text-[18px] lg:leading-[1.4]">
              Build the next generation of AI infrastructure for the Agentic era—where models reason,
              act, and learn across secure, sovereign clouds. We focus on AI data centers, LLM platforms,
              business intelligence, analytics, and data lake solutions that move organizations from
              experimentation to durable advantage.
            </p>
          </div>
        </div>
      </div>

      {/* About NQ */}
      <section
        id="about-nq"
        aria-label="About Nexus Quantum"
        className="relative overflow-hidden border-t border-[var(--primary-1)] bg-[var(--light-2)]"
      >
        <div className="pointer-events-none absolute -left-24 top-1/4 h-64 w-64 rounded-full bg-[var(--primary-1)]/40 blur-3xl" aria-hidden />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-56 w-56 rounded-full bg-[var(--primary-2)]/35 blur-3xl" aria-hidden />

        <div className="relative mx-auto w-full max-w-[1128px] px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          {/* Header */}
          <div className="mb-8 lg:mb-10">
            <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-[var(--primary-2)] bg-[var(--primary-1)]/60 px-3.5 py-1 font-montserrat text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--primary-dark-2)]">
              <Building2 className="h-3.5 w-3.5" aria-hidden />
              Company
            </span>
            <h2 className="font-montserrat text-[28px] font-semibold leading-tight sm:text-[32px] lg:text-[36px]">
              <span className="text-[var(--primary-dark-1)]">ABOUT </span>
              <span className="text-[var(--dark-9)]">NQ</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-[1fr_420px] lg:gap-8 xl:grid-cols-[1fr_480px]">
            {/* Content */}
            <article className="liquid-glass-light flex flex-col gap-6 rounded-2xl p-6 sm:p-8 lg:p-9">
              <p className="font-montserrat text-body-small leading-relaxed text-[var(--dark-6)] sm:text-[15px] md:text-body-medium md:leading-[1.65]">
                Nexus Quantum Technologies delivers the world&apos;s first vertically integrated,
                Rust-powered cloud platform designed for the Agentic AI era. We combine memory-safe
                systems software with GPU-efficient AI platforms and business-facing SaaS solutions.
              </p>
              <p className="font-montserrat text-body-small leading-relaxed text-[var(--dark-6)] sm:text-[15px] md:text-body-medium md:leading-[1.65]">
                Built on five years of intensive R&D investment in Rust technologies since 2020, we
                have pioneered enterprise-scale implementations that leverage Rust&apos;s unique
                advantages in systems programming, concurrent processing, and memory safety for AI
                workloads. Our mission is democratizing enterprise-grade AI infrastructure with
                uncompromising security, performance, and operational simplicity for organizations
                worldwide.
              </p>

              {/* Highlights */}
              <div className="grid grid-cols-1 gap-3 border-t border-[var(--primary-1)] pt-5 sm:grid-cols-3">
                {highlights.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl border border-[var(--primary-1)] bg-[var(--light)]/70 px-4 py-3"
                  >
                    <p className="font-montserrat text-[11px] font-medium uppercase tracking-[0.06em] text-[var(--dark-4)]">
                      {item.label}
                    </p>
                    <p className="mt-1 font-montserrat text-[15px] font-semibold text-[var(--primary-dark-1)]">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-auto flex flex-col gap-3 sm:flex-row">
                <Button
                  variant="white"
                  size="sm"
                  icon={<MessageCircle />}
                  iconPosition="left"
                  fullWidth
                  className="border border-[var(--primary-1)] sm:w-auto"
                >
                  Talk to Engineer
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  icon={<ArrowRight />}
                  iconPosition="right"
                  fullWidth
                  className="sm:w-auto"
                >
                  Book Demo
                </Button>
              </div>
            </article>

            {/* Video */}
            <div className="liquid-glass-light overflow-hidden rounded-2xl p-2 sm:p-3">
              <div className="relative h-[240px] overflow-hidden rounded-xl sm:h-[320px] lg:h-full lg:min-h-[420px]">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  controlsList="nodownload"
                  className="h-full w-full object-cover"
                >
                  <source src="/video/video-aboutus.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutMission;
