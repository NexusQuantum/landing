'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AboutSection from '@/components/sections/about/AboutSection';
import ProductDetailCtaButtons, { getReleaseCtaUrls } from '@/components/sections/ProductDetailCtaButtons';
import { brochureMapping, BROCHURE_DIR } from '@/config/brochures';
import {
  ShieldCheck,
  ArrowLeftRight,
  Activity,
  Server,
  Network,
  Database,
  Lock,
  LayoutDashboard,
  HardDrive,
  Boxes,
  Cpu,
  CheckCircle2,
  Unlock,
  Headset,
  Layers,
  Gauge,
  Cloud,
  ShieldAlert,
  Landmark,
  Building2,
  WifiOff,
  BadgeCheck,
  Download,
  FileText,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/* Static content & resource config                                    */
/* ------------------------------------------------------------------ */

const PRODUCT_TITLE = 'HyperVisor';

const HERO_DESCRIPTION =
  'A Rust-based type-1 hypervisor that establishes a memory-safe foundation for the cloud, eliminating C/C++ vulnerabilities and enabling zero-compromise security.';

const ABOUT_DESCRIPTION =
  'NQRust-HV is a memory-safe enterprise hypervisor built with Rust, designed to deliver strong isolation, high performance, and significantly reduced attack surfaces.';

const BROCHURE_URL = (() => {
  const file = brochureMapping[PRODUCT_TITLE];
  return file ? `${BROCHURE_DIR}/${file}` : '#';
})();

const WHITEPAPER_URL = '/Finalized Whitepaper/[Nexus] NQRust-HV v2.pdf';

const RELEASE_ID = 'nqrust-hypervisor';

const positioningParagraphs = [
  'NQRust-HyperVisor is an enterprise virtualization platform built, integrated, and operated by Nexus Quantum for government institutions, regulated industries, and corporate data centers in Indonesia.',
  'NQRust-HyperVisor is delivered as a complete enterprise product layer, combining proven virtualization foundations with operational capabilities required for production environments.',
];

const foundationGroups: { title: string; tagline: string; icon: LucideIcon; items: string[] }[] = [
  {
    title: 'Enterprise Capabilities',
    tagline: 'Production operations',
    icon: Layers,
    items: ['HA Cluster', 'Live Migration', 'Multi-Tenant', 'Backup & Restore'],
  },
  {
    title: 'Integration Layer',
    tagline: 'Platform services',
    icon: Network,
    items: ['Storage', 'Networking', 'Identity & RBAC', 'Management Plane', 'Monitoring'],
  },
  {
    title: 'Virtualization Engine',
    tagline: 'Proven foundation',
    icon: Cpu,
    items: ['KVM', 'KubeVirt'],
  },
];

const benefits: { id: number; title: string; description: string; icon: LucideIcon }[] = [
  {
    id: 1,
    title: 'Memory Safe Architecture',
    icon: ShieldCheck,
    description:
      'Rust-based hypervisor architecture helps eliminate entire classes of vulnerabilities found in traditional C/C++ hypervisors, providing a stronger foundation for secure virtualization.',
  },
  {
    id: 2,
    title: 'Live Migration',
    icon: ArrowLeftRight,
    description:
      'Move running virtual machines between hosts with minimal disruption, supporting maintenance, workload balancing, and high-availability operations.',
  },
  {
    id: 3,
    title: 'Enterprise Observability',
    icon: Activity,
    description:
      'Gain integrated visibility into infrastructure health, VM performance, cluster status, and operational events through unified monitoring and observability.',
  },
];

const operationalCapabilities: { label: string; icon: LucideIcon }[] = [
  { label: 'Storage Replication', icon: Database },
  { label: 'Snapshot & Backup', icon: HardDrive },
  { label: 'VLAN & Network Bonding', icon: Network },
  { label: 'High Availability', icon: Server },
  { label: 'Identity & RBAC', icon: Lock },
  { label: 'Multi-Tenant Isolation', icon: Boxes },
  { label: 'Management Plane', icon: LayoutDashboard },
  { label: 'Monitoring & Observability', icon: Activity },
  { label: 'Infrastructure Hardening', icon: ShieldAlert },
  { label: 'Local Engineering Support', icon: Headset },
];

const advantages: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: 'Production-Grade Virtualization Engine',
    icon: Cpu,
    description:
      'NQRust-HyperVisor is built on mature virtualization foundations designed to support enterprise and critical workloads. It provides a proven base for running VM workloads with stability, reliability, and confidence.',
  },
  {
    title: 'Production-Ready Feature Set',
    icon: CheckCircle2,
    description:
      'NQRust-HyperVisor provides enterprise capabilities such as high-availability clusters, auto-failover, live migration, distributed storage, VM templating, cloning, VLAN, network bonding, RBAC, multi-tenant isolation, backup and restore, integrated monitoring, observability, and multi-cluster management.',
  },
  {
    title: 'Open Architecture Without Vendor Lock-In',
    icon: Unlock,
    description:
      'NQRust-HyperVisor uses an open architecture approach that gives customers greater control over their infrastructure assets. It supports standard VM image formats, portable storage, open API integration, and transparent scaling without hidden licensing constraints.',
  },
  {
    title: 'Local Enterprise Support',
    icon: Headset,
    description:
      'Nexus Quantum provides local engineering support from Indonesia, enabling faster response, clearer communication, and better alignment with local enterprise and government requirements. NQRust-HyperVisor supports sovereign on-premise deployment, regulated environments, and air-gapped infrastructure needs.',
  },
];

const sovereignItems: { label: string; icon: LucideIcon }[] = [
  { label: 'Sovereign Deployment', icon: Landmark },
  { label: 'On-Premise Ready', icon: Building2 },
  { label: 'Regulated Environment', icon: ShieldCheck },
  { label: 'Air-Gapped Support', icon: WifiOff },
  { label: 'TKDN-Ready', icon: BadgeCheck },
];

const AUTOPLAY_MS = 6000;

function useAutoplay(count: number, interval = AUTOPLAY_MS) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (count <= 1) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, interval);
    return () => clearInterval(timer);
  }, [count, interval]);

  return [index, setIndex] as const;
}

/* ------------------------------------------------------------------ */
/* Shared section header (homepage aligned)                            */
/* ------------------------------------------------------------------ */

function SectionHeading({
  badge,
  title,
  subtitle,
  align = 'center',
  badgeIcon: BadgeIcon = Cloud,
}: {
  badge: string;
  title: string;
  subtitle?: string;
  align?: 'center' | 'left';
  badgeIcon?: LucideIcon;
}) {
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

/* ------------------------------------------------------------------ */
/* Foundations tabbed carousel                                         */
/* ------------------------------------------------------------------ */

function FoundationsCarousel() {
  const [index, setIndex] = useAutoplay(foundationGroups.length);

  const active = foundationGroups[index];
  const ActiveIcon = active.icon;

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,300px)_1fr]">
      {/* Tabs */}
      <div className="flex gap-2.5 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
        {foundationGroups.map((group, i) => {
          const Icon = group.icon;
          const isActive = i === index;
          return (
            <button
              key={group.title}
              onClick={() => setIndex(i)}
              className={`flex min-w-[220px] flex-1 items-center gap-3 rounded-2xl border p-4 text-left transition-all duration-300 lg:min-w-0 ${
                isActive
                  ? 'liquid-glass-light--active border-[var(--primary-dark-1)]/45 bg-[var(--primary-1)]/40'
                  : 'border-[var(--primary-1)] bg-[var(--light)]/70 hover:border-[var(--primary-2)]'
              }`}
            >
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${
                  isActive ? 'bg-[var(--primary-dark-1)] text-white' : 'bg-[var(--light)] text-[var(--dark-4)]'
                }`}
              >
                <Icon className="h-5 w-5" aria-hidden />
              </div>
              <div className="min-w-0">
                <p
                  className={`font-montserrat text-[10px] font-semibold uppercase tracking-[0.08em] ${
                    isActive ? 'text-[var(--primary-dark-1)]' : 'text-[var(--dark-4)]'
                  }`}
                >
                  {group.tagline}
                </p>
                <p
                  className={`truncate font-montserrat text-[14px] font-semibold ${
                    isActive ? 'text-[var(--dark-9)]' : 'text-[var(--dark-6)]'
                  }`}
                >
                  {group.title}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active panel */}
      <div key={index} className="liquid-glass-light relative overflow-hidden rounded-2xl p-6 sm:p-8">
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[var(--primary-2)]/30 blur-3xl" aria-hidden />
        <div className="relative">
          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--primary-dark-1)] text-white shadow-[0px_6px_18px_rgba(242,101,34,0.35)]">
              <ActiveIcon className="h-7 w-7" aria-hidden />
            </div>
            <div>
              <p className="font-montserrat text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--primary-dark-1)]">
                {active.tagline}
              </p>
              <h3 className="font-montserrat text-[20px] font-semibold text-[var(--dark-9)] sm:text-[24px]">
                {active.title}
              </h3>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {active.items.map((item) => (
              <div
                key={item}
                className="flex items-center gap-2.5 rounded-xl border border-[var(--primary-1)] bg-[var(--light)]/70 px-4 py-3 font-montserrat text-[14px] font-medium text-[var(--dark-7)] sm:text-[15px]"
              >
                <CheckCircle2 className="h-4 w-4 shrink-0 text-[var(--primary-dark-1)]" aria-hidden />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Advantages autoplay carousel                                        */
/* ------------------------------------------------------------------ */

function AdvantagesCarousel() {
  const [index, setIndex] = useAutoplay(advantages.length);
  const total = advantages.length;

  const go = useCallback((next: number) => setIndex(((next % total) + total) % total), [total, setIndex]);

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-3xl">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {advantages.map((advantage, i) => {
            const Icon = advantage.icon;
            return (
              <div key={advantage.title} className="w-full shrink-0">
                <div className="liquid-glass-light relative mx-auto flex min-h-[320px] flex-col justify-center overflow-hidden rounded-3xl p-7 sm:min-h-[300px] sm:p-12">
                  <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-[var(--primary-2)]/30 blur-3xl" aria-hidden />
                  <div className="pointer-events-none absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-[var(--primary-1)]/40 blur-3xl" aria-hidden />
                  <div className="relative flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-8">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[var(--primary-dark-1)] text-white shadow-[0px_8px_24px_rgba(242,101,34,0.35)] sm:h-20 sm:w-20">
                      <Icon className="h-8 w-8 sm:h-10 sm:w-10" aria-hidden />
                    </div>
                    <div className="flex-1">
                      <span className="font-montserrat text-[13px] font-bold tracking-[0.1em] text-[var(--primary-2)]">
                        ADVANTAGE 0{i + 1} / 0{total}
                      </span>
                      <h3 className="mt-2 mb-3 font-montserrat text-[20px] font-semibold leading-[1.25] text-[var(--dark-9)] sm:text-[26px]">
                        {advantage.title}
                      </h3>
                      <p className="font-montserrat text-[14px] leading-[1.6] text-[var(--dark-6)] sm:text-[16px]">
                        {advantage.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Controls */}
      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          {advantages.map((advantage, i) => (
            <button
              key={advantage.title}
              onClick={() => go(i)}
              aria-label={`Show advantage ${i + 1}`}
              aria-current={i === index}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === index
                  ? 'w-8 bg-[var(--primary-dark-1)]'
                  : 'w-2 bg-[var(--primary-2)] hover:bg-[var(--primary-3)]'
              }`}
            />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => go(index - 1)}
            aria-label="Previous advantage"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--primary-2)] bg-[var(--light)] text-[var(--primary-dark-1)] transition-all duration-300 hover:scale-105 hover:bg-[var(--primary-1)]/50 active:scale-95"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
          </button>
          <button
            onClick={() => go(index + 1)}
            aria-label="Next advantage"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--primary-2)] bg-[var(--light)] text-[var(--primary-dark-1)] transition-all duration-300 hover:scale-105 hover:bg-[var(--primary-1)]/50 active:scale-95"
          >
            <ArrowRight className="h-4 w-4" aria-hidden />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Positioning autoplay carousel                                       */
/* ------------------------------------------------------------------ */

function PositioningCarousel() {
  const [index, setIndex] = useAutoplay(positioningParagraphs.length);
  const icons = [Landmark, Layers];

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-2xl">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {positioningParagraphs.map((paragraph, i) => {
            const Icon = icons[i];
            return (
              <div key={i} className="w-full shrink-0 px-0.5">
                <div className="liquid-glass-light rounded-2xl p-6 sm:p-8">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--primary-1)] bg-[var(--primary-1)]/40">
                    <Icon className="h-5 w-5 text-[var(--primary-dark-1)]" aria-hidden />
                  </div>
                  <p className="font-montserrat text-[15px] leading-[1.6] text-[var(--dark-7)] sm:text-[16px]">
                    {paragraph}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-center gap-2.5">
        {positioningParagraphs.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Show positioning slide ${i + 1}`}
            aria-current={i === index}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === index
                ? 'w-8 bg-[var(--primary-dark-1)]'
                : 'w-2 bg-[var(--primary-2)] hover:bg-[var(--primary-3)]'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Sovereign autoplay carousel                                         */
/* ------------------------------------------------------------------ */

function SovereignCarousel() {
  const [index, setIndex] = useAutoplay(sovereignItems.length);

  return (
    <div className="relative mx-auto max-w-2xl">
      <div className="overflow-hidden rounded-2xl">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {sovereignItems.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="w-full shrink-0 px-1">
                <div className="liquid-glass-light flex flex-col items-center gap-4 rounded-2xl px-8 py-10 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--primary-dark-1)] text-white shadow-[0px_6px_18px_rgba(242,101,34,0.35)]">
                    <Icon className="h-8 w-8" aria-hidden />
                  </div>
                  <span className="font-montserrat text-[18px] font-semibold text-[var(--dark-9)] sm:text-[20px]">
                    {item.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-2.5">
        {sovereignItems.map((item, i) => (
          <button
            key={item.label}
            onClick={() => setIndex(i)}
            aria-label={`Show ${item.label}`}
            aria-current={i === index}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === index
                ? 'w-8 bg-[var(--primary-dark-1)]'
                : 'w-2 bg-[var(--primary-2)] hover:bg-[var(--primary-3)]'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Operational capabilities marquee                                    */
/* ------------------------------------------------------------------ */

function CapabilityChip({ label, icon: Icon }: { label: string; icon: LucideIcon }) {
  return (
    <div className="mx-2 flex shrink-0 items-center gap-3 rounded-2xl border border-[var(--primary-1)] bg-[var(--light)] px-5 py-3.5 shadow-[0_2px_8px_rgba(242,101,34,0.06)]">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--primary-1)]/50">
        <Icon className="h-[18px] w-[18px] text-[var(--primary-dark-1)]" aria-hidden />
      </div>
      <span className="whitespace-nowrap font-montserrat text-[14px] font-medium text-[var(--dark-8)]">
        {label}
      </span>
    </div>
  );
}

function OperationalMarquee() {
  const firstRow = operationalCapabilities.slice(0, 5);
  const secondRow = operationalCapabilities.slice(5);

  return (
    <div className="flex flex-col gap-4">
      {/* Row 1 */}
      <div className="marquee-mask relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="marquee-track" style={{ ['--marquee-duration' as string]: '32s' }}>
          {[...firstRow, ...firstRow, ...firstRow, ...firstRow].map((cap, i) => (
            <CapabilityChip key={`r1-${i}`} label={cap.label} icon={cap.icon} />
          ))}
        </div>
      </div>
      {/* Row 2 (reverse) */}
      <div className="marquee-mask relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="marquee-track marquee-track--reverse" style={{ ['--marquee-duration' as string]: '38s' }}>
          {[...secondRow, ...secondRow, ...secondRow, ...secondRow].map((cap, i) => (
            <CapabilityChip key={`r2-${i}`} label={cap.label} icon={cap.icon} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Hero with scroll-linked product image                               */
/* ------------------------------------------------------------------ */

function HypervisorHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [imageTransform, setImageTransform] = useState({
    scale: 1,
    opacity: 1,
    translateY: 0,
    hidden: false,
  });

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    let raf = 0;

    const update = () => {
      const section = sectionRef.current;
      const nextSection = document.getElementById('product-overview');
      if (!section || !nextSection) return;

      const scrollY = window.scrollY;
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const nextTop = nextSection.offsetTop;

      const animStart = sectionTop + sectionHeight * 0.32;
      const animEnd = nextTop - window.innerHeight * 0.12;
      const range = Math.max(animEnd - animStart, 1);
      const progress = Math.min(Math.max((scrollY - animStart) / range, 0), 1);

      const scale = 1 + progress * 0.22;
      const opacity = 1 - progress * 1.1;
      const translateY = progress * -32;
      const hidden = progress >= 0.95 || opacity <= 0.02;

      setImageTransform({
        scale: Math.min(scale, 1.22),
        opacity: Math.max(opacity, 0),
        translateY,
        hidden,
      });
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#0c0704] px-4 pb-0 pt-28 sm:px-8 sm:pt-32 lg:px-[100px]"
    >
      <div className="absolute inset-0">
        <Image
          src="/bg-product.jpg"
          alt="Product background"
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0704]/90 via-[#160b04]/95 to-[#0c0704]" />
      </div>
      <div className="section-grid-bg pointer-events-none absolute inset-0 opacity-50" aria-hidden />
      <div
        className="pointer-events-none absolute -top-24 left-1/2 h-[460px] w-[680px] -translate-x-1/2 rounded-full bg-[var(--primary-dark-1)]/25 blur-[140px]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center pt-8 text-center sm:pt-12">
        <span className="agent-badge mb-6 inline-flex items-center gap-1.5 rounded-full border border-[var(--primary-dark-1)]/40 bg-[rgba(242,101,34,0.12)] px-3.5 py-1 font-montserrat text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--primary-3)]">
          <Cloud className="h-3.5 w-3.5" aria-hidden />
          Enterprise Virtualization
        </span>

        <h1 className="mb-5 font-montserrat text-4xl font-bold leading-[1.15] sm:text-5xl lg:text-[60px]">
          <span className="bg-gradient-to-b from-[#FF5001] to-[#FF9C6D] bg-clip-text text-transparent">
            NQRust{' '}
          </span>
          <span className="text-[#fffefd]">{PRODUCT_TITLE}</span>
        </h1>

        <p className="mx-auto mb-8 max-w-2xl font-montserrat text-base font-medium leading-[1.5] text-white/70 sm:text-lg lg:text-[18px]">
          {HERO_DESCRIPTION}
        </p>

        <ProductDetailCtaButtons releaseId={RELEASE_ID} />

        {/* Product showcase — zoom out + fade on scroll */}
        <div
          className="relative mt-14 w-full will-change-transform sm:mt-16"
          style={{
            transform: `scale(${imageTransform.scale}) translateY(${imageTransform.translateY}px)`,
            opacity: imageTransform.hidden ? 0 : imageTransform.opacity,
            visibility: imageTransform.hidden ? 'hidden' : 'visible',
            transformOrigin: 'center top',
            pointerEvents: imageTransform.hidden ? 'none' : 'auto',
          }}
        >
          <div
            className="pointer-events-none absolute inset-x-0 -top-10 mx-auto h-[60%] w-[85%] rounded-full bg-[var(--primary-dark-1)]/30 blur-[120px]"
            style={{ opacity: imageTransform.opacity }}
            aria-hidden
          />
          <div className="relative mx-auto max-w-4xl rounded-t-2xl border border-white/10 border-b-0 bg-white/[0.03] p-2 backdrop-blur-sm sm:rounded-t-3xl sm:p-3">
            <div className="overflow-hidden rounded-t-xl border border-white/10 border-b-0 sm:rounded-t-2xl">
              <Image
                src="/Hypervisor product.png"
                alt="NQRust HyperVisor product interface"
                width={1600}
                height={900}
                className="h-auto w-full object-cover object-top"
                priority
              />
            </div>
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-[#0c0704]"
              aria-hidden
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function NQRustHVHypervisorPage() {
  const [activeBenefit, setActiveBenefit] = useAutoplay(benefits.length);
  const [isDownloadingBrochure, setIsDownloadingBrochure] = useState(false);
  const [isDownloadingWhitepaper, setIsDownloadingWhitepaper] = useState(false);

  const releaseCtas = getReleaseCtaUrls(RELEASE_ID);
  const demoUrl = releaseCtas?.tryDemo.href ?? '#';
  const docsUrl = releaseCtas?.viewDocs.href ?? '#';

  const hasBrochure = BROCHURE_URL !== '#';
  const hasWhitepaper = WHITEPAPER_URL.trim() !== '';

  const downloadFile = async (url: string, setBusy: (v: boolean) => void, busy: boolean) => {
    if (!url || url === '#' || busy) return;
    setBusy(true);
    try {
      const response = await fetch(url);
      if (response.ok) {
        const blob = await response.blob();
        const objectUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = objectUrl;
        link.download = url.split('/').pop() || 'download.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(objectUrl);
      } else {
        window.open(url, '_blank');
      }
    } catch (error) {
      console.error('Download failed:', error);
      window.open(url, '_blank');
    } finally {
      setBusy(false);
    }
  };

  const handleBrochure = () => downloadFile(BROCHURE_URL, setIsDownloadingBrochure, isDownloadingBrochure);
  const handleWhitepaper = () =>
    downloadFile(WHITEPAPER_URL, setIsDownloadingWhitepaper, isDownloadingWhitepaper);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <HypervisorHero />

      {/* ===================== ABOUT PRODUCT (resource CTAs live here) ===================== */}
      <div id="product-overview" className="relative z-20 scroll-mt-24">
        <AboutSection
          title="About Product"
          description={ABOUT_DESCRIPTION}
          brochureUrl={BROCHURE_URL}
          whitepaperUrl={WHITEPAPER_URL}
          productTitle={PRODUCT_TITLE}
        />
      </div>

      {/* ===================== ENTERPRISE POSITIONING ===================== */}
      <section className="relative w-full overflow-hidden bg-[var(--light)]">
        <div className="section-grid-bg-light pointer-events-none absolute inset-0 opacity-50" aria-hidden />
        <div className="relative mx-auto w-full max-w-[1128px] px-4 py-14 sm:px-6 sm:py-16 md:px-10 md:py-20 lg:px-12">
          <SectionHeading
            badge="Enterprise Positioning"
            title="Engineered for Indonesia's Most Demanding Institutions"
            align="left"
            badgeIcon={Landmark}
          />
          <PositioningCarousel />
        </div>
      </section>

      {/* ===================== TECHNOLOGY FOUNDATION (carousel) ===================== */}
      <section className="liquid-glass-light-section relative w-full overflow-hidden border-y border-[var(--primary-1)]">
        <div className="pointer-events-none absolute -right-40 top-0 h-96 w-96 rounded-full bg-[var(--primary-2)]/40 blur-3xl" aria-hidden />
        <div className="relative mx-auto w-full max-w-[1200px] px-4 py-14 sm:px-6 sm:py-16 md:px-10 md:py-20 lg:px-12">
          <SectionHeading
            badge="Technology Foundation"
            title="Built on Proven Virtualization Foundations"
            subtitle="NQRust-HyperVisor runs VM workloads on top of KVM and KubeVirt, two proven virtualization foundations used in modern cloud and data center environments. This gives enterprises a mature base for running critical workloads while allowing Nexus Quantum to build the enterprise layer needed for governance, monitoring, operations, and long-term maintainability."
            badgeIcon={Cpu}
          />
          <FoundationsCarousel />
        </div>
      </section>

      {/* ===================== BENEFIT HYPERVISOR ===================== */}
      <section className="w-full bg-[var(--light)] px-4 py-14 sm:px-6 sm:py-16 md:px-8 md:py-20 lg:px-[100px]">
        <div className="mx-auto max-w-[1128px]">
          <div className="flex flex-col items-start justify-center gap-8 lg:flex-row lg:gap-[36px]">
            {/* Title - Left */}
            <div className="w-full flex-shrink-0 lg:w-[279px]">
              <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-[var(--primary-2)] bg-[var(--primary-1)]/60 px-3.5 py-1 font-montserrat text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--primary-dark-2)]">
                <Gauge className="h-3.5 w-3.5" aria-hidden />
                Key Benefits
              </span>
              <p className="font-montserrat text-[28px] font-semibold leading-[1.2] text-[var(--primary-dark-1)] sm:text-[34px] lg:text-[43px]">
                Benefit {PRODUCT_TITLE}
              </p>
            </div>

            {/* Content - Middle & Right */}
            <div className="flex w-full flex-1 flex-col gap-6 md:flex-row md:gap-8 lg:w-auto lg:gap-[36px]">
              {/* Sidebar Menu */}
              <div className="flex w-full flex-shrink-0 flex-col gap-3 md:w-[280px] lg:w-[336px]">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  const isActive = activeBenefit === index;
                  return (
                    <button
                      key={benefit.id}
                      onClick={() => setActiveBenefit(index)}
                      className={`flex w-full items-center gap-3.5 rounded-xl border p-3 text-left transition-all duration-300 ${
                        isActive
                          ? 'border-[var(--primary-dark-1)]/40 bg-[var(--primary-1)]/40 text-[var(--primary-dark-1)]'
                          : 'border-transparent text-[var(--dark-3)] hover:bg-[var(--light-3)]'
                      }`}
                    >
                      <div
                        className={`flex h-[43px] w-[43px] shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                          isActive ? 'scale-105 bg-[var(--primary-dark-1)]' : 'bg-[var(--dark-3)]'
                        }`}
                      >
                        <Icon className="h-5 w-5 text-white" aria-hidden />
                      </div>
                      <span className="flex-1 font-montserrat text-[14px] font-medium leading-[1.3] sm:text-[16px]">
                        {benefit.title}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Detail */}
              <div
                key={activeBenefit}
                className="liquid-glass-light flex w-full flex-shrink-0 flex-col gap-3.5 rounded-2xl p-6 md:flex-1 lg:w-[441px]"
              >
                <p className="font-montserrat text-[16px] font-semibold leading-[1.3] text-[var(--dark-9)] sm:text-[18px]">
                  {benefits[activeBenefit].title}
                </p>
                <p className="font-montserrat text-[14px] font-normal leading-[1.6] text-[var(--dark-7)] sm:text-[16px]">
                  {benefits[activeBenefit].description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== ENTERPRISE OPERATIONAL LAYER (marquee) ===================== */}
      <section className="relative w-full overflow-hidden bg-[var(--light-2)]">
        <div className="section-grid-bg-light pointer-events-none absolute inset-0 opacity-50" aria-hidden />
        <div className="relative mx-auto w-full max-w-[1200px] px-4 py-14 sm:px-6 sm:py-16 md:px-10 md:py-20 lg:px-12">
          <SectionHeading
            badge="Enterprise Operational Layer"
            title="More Than a Virtualization Engine"
            subtitle="A virtualization engine alone is not enough to run enterprise infrastructure. NQRust-HyperVisor adds the operational layer required for production environments, including storage replication, snapshot, backup, VLAN and network bonding, high availability, identity and RBAC, multi-tenant isolation, management plane, observability, monitoring, infrastructure hardening, and local engineering support."
            badgeIcon={Server}
          />
        </div>
        <div className="relative pb-14 sm:pb-16 md:pb-20">
          <OperationalMarquee />
        </div>
      </section>

      {/* ===================== FOUR ENTERPRISE ADVANTAGES (carousel) ===================== */}
      <section className="liquid-glass-light-section relative w-full overflow-hidden border-y border-[var(--primary-1)]">
        <div className="pointer-events-none absolute -left-40 bottom-0 h-80 w-80 rounded-full bg-[var(--primary-1)]/50 blur-3xl" aria-hidden />
        <div className="relative mx-auto w-full max-w-[1000px] px-4 py-14 sm:px-6 sm:py-16 md:px-10 md:py-20 lg:px-12">
          <SectionHeading
            badge="Why NQRust-HyperVisor"
            title="Four Enterprise Advantages"
            subtitle="A complete enterprise virtualization platform that pairs a proven foundation with the operational depth, openness, and local support that critical infrastructure demands."
            badgeIcon={Sparkles}
          />
          <AdvantagesCarousel />
        </div>
      </section>

      {/* ===================== SOVEREIGN INFRASTRUCTURE ===================== */}
      <section className="relative w-full overflow-hidden bg-[var(--light)]">
        <div className="section-grid-bg-light pointer-events-none absolute inset-0 opacity-50" aria-hidden />
        <div className="relative mx-auto w-full max-w-[1128px] px-4 py-14 sm:px-6 sm:py-16 md:px-10 md:py-20 lg:px-12">
          <SectionHeading
            badge="Sovereign Infrastructure"
            title="Built for Sovereign, On-Premise, and Regulated Infrastructure"
            subtitle="NQRust-HyperVisor is designed for organizations that need full control over their infrastructure, data, and operational environment. It supports sovereign deployment models, on-premise infrastructure, regulated enterprise environments, and isolated air-gapped deployments for institutions that require stronger governance and security boundaries."
            badgeIcon={ShieldCheck}
          />

          <SovereignCarousel />
        </div>
      </section>

      {/* ===================== FINAL CTA (redesigned) ===================== */}
      <section className="relative w-full overflow-hidden bg-[#1a0e06] px-4 py-20 sm:px-6 sm:py-24 md:px-10 lg:px-12">
        {/* Ambient background */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[var(--primary-dark-3)] via-[#2a1304] to-[#120a04]" aria-hidden />
        <div className="section-grid-bg pointer-events-none absolute inset-0 opacity-60" aria-hidden />
        <div className="pointer-events-none absolute -top-24 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[var(--primary-dark-1)]/25 blur-[120px]" aria-hidden />
        <div className="pointer-events-none absolute -bottom-32 -right-20 h-80 w-80 rounded-full bg-[var(--primary-3)]/15 blur-3xl" aria-hidden />

        <div className="relative mx-auto max-w-4xl">
          <div className="agent-panel agent-border-glow overflow-hidden rounded-[28px] px-6 py-12 text-center sm:px-12 sm:py-16">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--primary-dark-1)]/60 to-transparent" aria-hidden />

            <span className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-[var(--primary-dark-1)]/40 bg-[rgba(242,101,34,0.12)] px-3.5 py-1 font-montserrat text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--primary-3)]">
              <Sparkles className="h-3.5 w-3.5" aria-hidden />
              Get Started
            </span>

            <h2 className="mx-auto mb-4 max-w-2xl font-montserrat text-[28px] font-bold leading-[1.15] text-white sm:text-[38px] md:text-[44px]">
              Ready to Modernize Your{' '}
              <span className="bg-gradient-to-r from-[#FF5001] to-[#FF9C6D] bg-clip-text text-transparent">
                Virtualization Stack?
              </span>
            </h2>

            <p className="mx-auto mb-8 max-w-2xl font-montserrat text-[15px] leading-[1.6] text-white/70 sm:text-[17px]">
              Run enterprise virtual machines on a proven, open, memory-safe, and locally supported
              virtualization platform.
            </p>

            {/* Trust chips */}
            <div className="mb-9 flex flex-wrap items-center justify-center gap-2.5">
              {['Memory-Safe by Design', 'Open Architecture', 'Sovereign-Ready', 'Local Support'].map(
                (chip) => (
                  <span
                    key={chip}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 font-montserrat text-[12px] font-medium text-white/80"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-[var(--primary-3)]" aria-hidden />
                    {chip}
                  </span>
                )
              )}
            </div>

            {/* Primary actions */}
            <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
              <a
                href={demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 rounded-[10px] bg-[var(--primary-dark-1)] px-7 py-3.5 font-montserrat text-[15px] font-semibold text-white shadow-[0px_8px_24px_rgba(242,101,34,0.35)] transition-all duration-300 hover:scale-105 hover:bg-[var(--primary-dark-2)] active:scale-95"
              >
                Try Demo
                <ArrowRight className="h-[18px] w-[18px] transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
              </a>

              <a
                href={docsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-[10px] border border-white/25 bg-white/10 px-7 py-3.5 font-montserrat text-[15px] font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/20 active:scale-95"
              >
                <FileText className="h-[18px] w-[18px]" aria-hidden />
                View Docs
              </a>
            </div>

            {/* Secondary resource links */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              <button
                onClick={handleBrochure}
                disabled={!hasBrochure || isDownloadingBrochure}
                className="inline-flex items-center gap-1.5 font-montserrat text-[13px] font-medium text-white/60 underline-offset-4 transition-colors duration-300 hover:text-[var(--primary-3)] hover:underline disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Download className="h-4 w-4" aria-hidden />
                {isDownloadingBrochure ? 'Downloading…' : 'Get Brochure'}
              </button>
              <span className="hidden h-3 w-px bg-white/20 sm:inline-block" aria-hidden />
              <button
                onClick={handleWhitepaper}
                disabled={!hasWhitepaper || isDownloadingWhitepaper}
                className="inline-flex items-center gap-1.5 font-montserrat text-[13px] font-medium text-white/60 underline-offset-4 transition-colors duration-300 hover:text-[var(--primary-3)] hover:underline disabled:cursor-not-allowed disabled:opacity-50"
              >
                <FileText className="h-4 w-4" aria-hidden />
                {isDownloadingWhitepaper ? 'Downloading…' : 'Whitepaper'}
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
