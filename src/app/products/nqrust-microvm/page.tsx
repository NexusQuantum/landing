'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductDetailCtaButtons, { getReleaseCtaUrls } from '@/components/sections/ProductDetailCtaButtons';
import { brochureMapping, BROCHURE_DIR } from '@/config/brochures';
import {
  ShieldCheck,
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
  ChevronRight,
  Sparkles,
  Zap,
  Timer,
  Code2,
  GitBranch,
  Users,
  Bot,
  Brain,
  Workflow,
  Globe,
  Scale,
  Container,
  type LucideIcon,
} from 'lucide-react';
import { triggerDownload } from '@/lib/download';
import { useAutoplay } from '@/hooks/useAutoplay';
import SectionHeading from '@/components/ui/ProductSectionHeading';

/* ------------------------------------------------------------------ */
/* Static content & resource config                                    */
/* ------------------------------------------------------------------ */

const PRODUCT_TITLE = 'MicroVM';

const HERO_SUPPORTING =
  'Serverless and Function-as-a-Service Platform for Sovereign Infrastructure';

const HERO_DESCRIPTION =
  'Container-like agility with hardware-grade VM isolation, fast cold start, and strong workload separation for sovereign serverless infrastructure.';

const BROCHURE_URL = (() => {
  const file = brochureMapping[PRODUCT_TITLE];
  return file ? `${BROCHURE_DIR}/${file}` : '#';
})();

const WHITEPAPER_URL = '/Finalized Whitepaper/[Nexus] NQRust-MicroVM v1.0.pdf';

const RELEASE_ID = 'nqrust-microvm';

const heroBadges = [
  'Serverless Ready',
  'Hardware-Grade Isolation',
  'KVM-Based MicroVM',
  'Sovereign On-Premise',
];

const overviewCapabilities: { label: string; icon: LucideIcon }[] = [
  { label: 'Fast Cold Start', icon: Zap },
  { label: 'Lightweight Runtime', icon: Timer },
  { label: 'Dedicated Kernel Isolation', icon: ShieldCheck },
  { label: 'KVM-Based Foundation', icon: Cpu },
  { label: 'High-Density Workloads', icon: Layers },
  { label: 'Serverless Operations', icon: Cloud },
];

const comparisonCards: { title: string; description: string; icon: LucideIcon; highlight?: boolean }[] = [
  {
    title: 'Traditional VMs',
    icon: Server,
    description: 'Strong isolation, but heavier startup time and larger memory footprint.',
  },
  {
    title: 'Containers',
    icon: Container,
    description:
      'Fast and lightweight, but shared-kernel architecture is less ideal for security-critical multi-tenant workloads.',
  },
  {
    title: 'NQRust MicroVM',
    icon: ShieldCheck,
    highlight: true,
    description:
      'Lightweight, fast, and isolated. Each workload can run inside a dedicated microVM boundary with strong separation and efficient resource usage.',
  },
];

const foundationLayers: { title: string; tagline: string; icon: LucideIcon; items: string[] }[] = [
  {
    title: 'Dynamic Workloads',
    tagline: 'Top Layer',
    icon: Workflow,
    items: [
      'Functions',
      'API Backend',
      'Event Processor',
      'AI Agent Execution',
      'AI Inference',
      'Customer Code Sandbox',
    ],
  },
  {
    title: 'NQRust MicroVM',
    tagline: 'Middle Layer',
    icon: Boxes,
    items: [
      'Fast Startup',
      'Lightweight Runtime',
      'Dedicated Kernel',
      'Secure Isolation',
      'Lifecycle Automation',
    ],
  },
  {
    title: 'Infrastructure Foundation',
    tagline: 'Bottom Layer',
    icon: Server,
    items: ['KVM', 'Compute Nodes', 'Network', 'Storage', 'Observability'],
  },
];

const benefits: { id: number; title: string; description: string; icon: LucideIcon }[] = [
  {
    id: 1,
    title: 'Container Speed with VM Isolation',
    icon: Zap,
    description:
      'Run workloads with container-like agility while maintaining hardware-grade isolation boundaries.',
  },
  {
    id: 2,
    title: 'Compliant Multi-Tenant Platforms',
    icon: Users,
    description:
      'Enable stronger separation between users, teams, customers, or tenants for regulated and enterprise environments.',
  },
  {
    id: 3,
    title: 'Increase Density and Reduce Costs',
    icon: Scale,
    description:
      'Run short-lived and elastic workloads with lightweight resource usage, faster lifecycle management, and minimal idle cost.',
  },
];

const enterpriseCapabilities: { label: string; icon: LucideIcon }[] = [
  { label: 'Function Runtime', icon: Code2 },
  { label: 'Autoscaling by Demand', icon: Activity },
  { label: 'Cold Start Optimization', icon: Zap },
  { label: 'OCI Image Compatibility', icon: Container },
  { label: 'MicroVM Lifecycle Management', icon: GitBranch },
  { label: 'Multi-Tenant Isolation', icon: Boxes },
  { label: 'Observability & Metrics', icon: Activity },
  { label: 'Identity Integration', icon: Lock },
  { label: 'API Gateway Integration', icon: Network },
  { label: 'Audit-Ready Logging', icon: FileText },
  { label: 'Secure Sandbox Execution', icon: ShieldAlert },
  { label: 'Enterprise Operations', icon: Headset },
];

const advantages: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: 'Proven Lightweight MicroVM Engine',
    icon: Cpu,
    description:
      'Built on top of KVM and optimized for short-lived, high-density workloads that require fast execution and strong isolation.',
  },
  {
    title: 'Production-Ready Function-as-a-Service',
    icon: Cloud,
    description:
      'Supports runtimes such as Python, Node.js, Go, Java, and custom runtimes, with autoscaling, lifecycle automation, OCI image compatibility, metrics, and API gateway integration.',
  },
  {
    title: 'Security-First Architecture',
    icon: ShieldCheck,
    description:
      'Each function call can run inside its own microVM with a separate kernel, reducing shared-kernel risks and enabling audit-ready execution visibility.',
  },
  {
    title: 'Sovereign Deployment with Local Support',
    icon: Landmark,
    description:
      'Deploy on-premise, in air-gapped environments, or in sovereign cloud infrastructure in Indonesia, supported by local Nexus Quantum engineering teams.',
  },
];

const useCases: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: 'Internal Developer Platform',
    icon: LayoutDashboard,
    description:
      'Provide serverless and FaaS capabilities for internal teams without depending on foreign cloud providers.',
  },
  {
    title: 'Secure Code Execution Sandbox',
    icon: Bot,
    description:
      'Run AI agents, customer-submitted code, or untrusted workloads inside isolated microVM environments.',
  },
  {
    title: 'AI Inference Serving',
    icon: Brain,
    description:
      'Support AI inference workloads with spiky traffic patterns and tenant-level resource isolation.',
  },
  {
    title: 'Multi-Tenant SaaS',
    icon: Users,
    description:
      'Separate tenant workloads with stronger security boundaries for regulated industries.',
  },
  {
    title: 'Event-Driven Processing',
    icon: Workflow,
    description:
      'Run event processors and batch workloads with fast autoscaling and minimal idle cost.',
  },
  {
    title: 'API Backend and Function Workloads',
    icon: Code2,
    description:
      'Execute API handlers and function workloads with fast startup and isolated runtime boundaries.',
  },
];

const sovereignItems: { label: string; icon: LucideIcon }[] = [
  { label: 'Sovereign On-Premise', icon: Landmark },
  { label: 'Air-Gapped Ready', icon: WifiOff },
  { label: 'Data Residency Control', icon: Database },
  { label: 'Local Runtime Governance', icon: ShieldCheck },
  { label: 'TKDN-Ready', icon: BadgeCheck },
  { label: 'Local Engineering Support', icon: Headset },
];

/* ------------------------------------------------------------------ */
/* Foundation layered carousel                                         */
/* ------------------------------------------------------------------ */

function FoundationCarousel() {
  const [index, setIndex] = useAutoplay(foundationLayers.length);

  const active = foundationLayers[index];
  const ActiveIcon = active.icon;

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,300px)_1fr]">
      <div className="flex gap-2.5 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
        {foundationLayers.map((layer, i) => {
          const Icon = layer.icon;
          const isActive = i === index;
          return (
            <button
              key={layer.title}
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
                  {layer.tagline}
                </p>
                <p
                  className={`truncate font-montserrat text-[14px] font-semibold ${
                    isActive ? 'text-[var(--dark-9)]' : 'text-[var(--dark-6)]'
                  }`}
                >
                  {layer.title}
                </p>
              </div>
            </button>
          );
        })}
      </div>

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
/* Advantages carousel                                                 */
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
/* Sovereign carousel                                                  */
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
/* Enterprise capabilities marquee                                     */
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
  const firstRow = enterpriseCapabilities.slice(0, 6);
  const secondRow = enterpriseCapabilities.slice(6);

  return (
    <div className="flex flex-col gap-4">
      <div className="marquee-mask relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="marquee-track" style={{ ['--marquee-duration' as string]: '32s' }}>
          {[...firstRow, ...firstRow, ...firstRow, ...firstRow].map((cap, i) => (
            <CapabilityChip key={`r1-${i}`} label={cap.label} icon={cap.icon} />
          ))}
        </div>
      </div>
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
/* Hero section                                                        */
/* ------------------------------------------------------------------ */

function MicroVMHero() {
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
      const nextSection = document.getElementById('overview');
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
          alt=""
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

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center pt-4 text-center sm:pt-6">
        <span className="agent-badge mb-4 inline-flex items-center gap-1.5 rounded-full border border-[var(--primary-dark-1)]/40 bg-[rgba(242,101,34,0.12)] px-3.5 py-1 font-montserrat text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--primary-3)]">
          <Sparkles className="h-3.5 w-3.5" aria-hidden />
          Agentic AI Data Center
        </span>

        <h1 className="mb-3 font-montserrat text-4xl font-bold leading-[1.15] sm:text-5xl lg:text-[56px]">
          <span className="bg-gradient-to-b from-[#FF5001] to-[#FF9C6D] bg-clip-text text-transparent">
            NQRust{' '}
          </span>
          <span className="text-[#fffefd]">{PRODUCT_TITLE}</span>
        </h1>

        <p className="mx-auto mb-3 max-w-xl font-montserrat text-base font-semibold leading-[1.4] text-white/85 sm:text-lg">
          {HERO_SUPPORTING}
        </p>

        <p className="mx-auto mb-5 max-w-xl font-montserrat text-[14px] leading-[1.5] text-white/65 sm:text-[15px]">
          {HERO_DESCRIPTION}
        </p>

        <div className="mb-5 flex flex-wrap items-center justify-center gap-2">
          {heroBadges.map((badge) => (
            <span
              key={badge}
              className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-3 py-1 font-montserrat text-[11px] font-medium text-white/75 sm:text-[12px]"
            >
              <CheckCircle2 className="h-3 w-3 text-[var(--primary-3)]" aria-hidden />
              {badge}
            </span>
          ))}
        </div>

        <ProductDetailCtaButtons releaseId={RELEASE_ID} />

        {/* Product showcase — video in liquid glass frame */}
        <div
          className="relative mt-10 w-full will-change-transform sm:mt-12"
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
              <video
                autoPlay
                loop
                muted
                playsInline
                className="h-auto w-full object-cover object-top"
                aria-label="NQRust MicroVM product demo"
              >
                <source src="/microVM.mp4" type="video/mp4" />
              </video>
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

export default function NQRustMicroVMPage() {
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
      await triggerDownload(url);
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

      <MicroVMHero />

      {/* ===================== PRODUCT OVERVIEW (#overview) ===================== */}
      <section
        id="overview"
        className="relative z-20 scroll-mt-24 bg-[var(--light)]"
      >
        <div className="section-grid-bg-light pointer-events-none absolute inset-0 opacity-50" aria-hidden />
        <div className="relative mx-auto w-full max-w-[1128px] px-4 py-14 sm:px-6 sm:py-16 md:px-10 md:py-20 lg:px-12">
          <SectionHeading
            badge="Product Overview"
            title="Built for Secure Serverless Compute"
            subtitle="NQRust MicroVM bridges containers and traditional virtual machines by combining fast startup times, lightweight resource usage, and strong hardware-level isolation. It provides the agility of containers with the isolation guarantees of virtual machines, making it ideal for multi-tenant platforms, serverless workloads, and secure application sandboxes that require both performance and safety."
            badgeIcon={Cloud}
          />
          <p className="mx-auto mb-10 max-w-3xl text-center font-montserrat text-[14px] leading-relaxed text-[var(--dark-5)] sm:text-[15px] md:mb-14 md:text-[16px]">
            Each microVM runs with its own kernel on top of a KVM-based hypervisor. This provides stronger workload
            separation than standard containers while maintaining fast startup behavior and lightweight resource overhead
            for short-lived, high-density workloads.
          </p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {overviewCapabilities.map((cap) => {
              const Icon = cap.icon;
              return (
                <div
                  key={cap.label}
                  className="liquid-glass-light flex items-center gap-3 rounded-2xl p-4 sm:p-5"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--primary-dark-1)] text-white">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <span className="font-montserrat text-[14px] font-semibold text-[var(--dark-8)] sm:text-[15px]">
                    {cap.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================== WHY MICROVM? ===================== */}
      <section className="liquid-glass-light-section relative w-full overflow-hidden border-y border-[var(--primary-1)]">
        <div className="pointer-events-none absolute -right-40 top-0 h-96 w-96 rounded-full bg-[var(--primary-2)]/40 blur-3xl" aria-hidden />
        <div className="relative mx-auto w-full max-w-[1200px] px-4 py-14 sm:px-6 sm:py-16 md:px-10 md:py-20 lg:px-12">
          <SectionHeading
            badge="Comparison"
            title="Why MicroVM?"
            subtitle="Traditional virtual machines provide strong hardware-level isolation, but they are often too heavy for fast-moving cloud-native workloads. Containers provide fast startup and lightweight resource usage, but shared host kernels can create security limitations for multi-tenant and untrusted workloads."
            badgeIcon={Scale}
          />
          <div className="grid gap-5 md:grid-cols-3">
            {comparisonCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className={`liquid-glass-light relative overflow-hidden rounded-2xl p-6 sm:p-8 ${
                    card.highlight ? 'liquid-glass-light--active border-2 border-[var(--primary-dark-1)]/30' : ''
                  }`}
                >
                  {card.highlight && (
                    <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[var(--primary-2)]/30 blur-2xl" aria-hidden />
                  )}
                  <div className="relative">
                    <div
                      className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${
                        card.highlight
                          ? 'bg-[var(--primary-dark-1)] text-white shadow-[0px_6px_18px_rgba(242,101,34,0.35)]'
                          : 'bg-[var(--primary-1)]/50 text-[var(--primary-dark-1)]'
                      }`}
                    >
                      <Icon className="h-6 w-6" aria-hidden />
                    </div>
                    <h3 className="mb-3 font-montserrat text-[18px] font-semibold text-[var(--dark-9)] sm:text-[20px]">
                      {card.title}
                    </h3>
                    <p className="font-montserrat text-[14px] leading-[1.6] text-[var(--dark-6)] sm:text-[15px]">
                      {card.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================== KVM FOUNDATION ===================== */}
      <section className="relative w-full overflow-hidden bg-[var(--light)]">
        <div className="section-grid-bg-light pointer-events-none absolute inset-0 opacity-50" aria-hidden />
        <div className="relative mx-auto w-full max-w-[1200px] px-4 py-14 sm:px-6 sm:py-16 md:px-10 md:py-20 lg:px-12">
          <SectionHeading
            badge="Technology Foundation"
            title="KVM-Based MicroVM Foundation"
            subtitle="NQRust MicroVM runs on top of KVM, a proven virtualization foundation used across modern cloud infrastructure. The microVM layer optimizes this foundation for short-lived, high-density, and security-sensitive workload execution."
            badgeIcon={Cpu}
          />
          <FoundationCarousel />
        </div>
      </section>

      {/* ===================== BENEFIT MICROVM ===================== */}
      <section className="w-full bg-[var(--light)] px-4 py-14 sm:px-6 sm:py-16 md:px-8 md:py-20 lg:px-[100px]">
        <div className="mx-auto max-w-[1128px]">
          <div className="flex flex-col items-start justify-center gap-8 lg:flex-row lg:gap-[36px]">
            <div className="w-full flex-shrink-0 lg:w-[279px]">
              <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-[var(--primary-2)] bg-[var(--primary-1)]/60 px-3.5 py-1 font-montserrat text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--primary-dark-2)]">
                <Gauge className="h-3.5 w-3.5" aria-hidden />
                Key Benefits
              </span>
              <p className="font-montserrat text-[28px] font-semibold leading-[1.2] text-[var(--primary-dark-1)] sm:text-[34px] lg:text-[43px]">
                Benefit {PRODUCT_TITLE}
              </p>
            </div>

            <div className="flex w-full flex-1 flex-col gap-6 md:flex-row md:gap-8 lg:w-auto lg:gap-[36px]">
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

      {/* ===================== ENTERPRISE CAPABILITIES (marquee) ===================== */}
      <section className="relative w-full overflow-hidden bg-[var(--light-2)]">
        <div className="section-grid-bg-light pointer-events-none absolute inset-0 opacity-50" aria-hidden />
        <div className="relative mx-auto w-full max-w-[1200px] px-4 py-14 sm:px-6 sm:py-16 md:px-10 md:py-20 lg:px-12">
          <SectionHeading
            badge="Enterprise Platform"
            title="More Than a Lightweight Virtual Machine"
            subtitle="NQRust MicroVM is designed as an enterprise serverless and Function-as-a-Service platform. It includes the microVM engine, function runtime, management plane, observability, lifecycle automation, autoscaling, identity integration, API gateway integration, and operational support required for production environments."
            badgeIcon={Server}
          />
        </div>
        <div className="relative pb-14 sm:pb-16 md:pb-20">
          <OperationalMarquee />
        </div>
      </section>

      {/* ===================== FOUR ENTERPRISE ADVANTAGES ===================== */}
      <section className="liquid-glass-light-section relative w-full overflow-hidden border-y border-[var(--primary-1)]">
        <div className="pointer-events-none absolute -left-40 bottom-0 h-80 w-80 rounded-full bg-[var(--primary-1)]/50 blur-3xl" aria-hidden />
        <div className="relative mx-auto w-full max-w-[1000px] px-4 py-14 sm:px-6 sm:py-16 md:px-10 md:py-20 lg:px-12">
          <SectionHeading
            badge="Why NQRust MicroVM"
            title="Four Enterprise Advantages"
            subtitle="A complete serverless platform that pairs lightweight microVM isolation with production-ready FaaS capabilities, security-first architecture, and sovereign deployment options."
            badgeIcon={Sparkles}
          />
          <AdvantagesCarousel />
        </div>
      </section>

      {/* ===================== USE CASES ===================== */}
      <section className="relative w-full overflow-hidden bg-[var(--light)]">
        <div className="section-grid-bg-light pointer-events-none absolute inset-0 opacity-50" aria-hidden />
        <div className="relative mx-auto w-full max-w-[1200px] px-4 py-14 sm:px-6 sm:py-16 md:px-10 md:py-20 lg:px-12">
          <SectionHeading
            badge="Use Cases"
            title="Designed for Serverless, AI, and Secure Multi-Tenant Workloads"
            badgeIcon={Globe}
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {useCases.map((useCase) => {
              const Icon = useCase.icon;
              return (
                <div key={useCase.title} className="liquid-glass-light flex flex-col gap-4 rounded-2xl p-6 sm:p-7">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--primary-dark-1)] text-white shadow-[0px_6px_18px_rgba(242,101,34,0.35)]">
                    <Icon className="h-6 w-6" aria-hidden />
                  </div>
                  <h3 className="font-montserrat text-[16px] font-semibold text-[var(--dark-9)] sm:text-[18px]">
                    {useCase.title}
                  </h3>
                  <p className="font-montserrat text-[14px] leading-[1.6] text-[var(--dark-6)]">
                    {useCase.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================== SOVEREIGN INFRASTRUCTURE ===================== */}
      <section className="liquid-glass-light-section relative w-full overflow-hidden border-y border-[var(--primary-1)]">
        <div className="pointer-events-none absolute -right-40 top-0 h-96 w-96 rounded-full bg-[var(--primary-2)]/40 blur-3xl" aria-hidden />
        <div className="relative mx-auto w-full max-w-[1128px] px-4 py-14 sm:px-6 sm:py-16 md:px-10 md:py-20 lg:px-12">
          <SectionHeading
            badge="Sovereign Infrastructure"
            title="Serverless Without Foreign Cloud Dependency"
            subtitle="NQRust MicroVM brings modern serverless capabilities into sovereign Indonesian environments. Organizations can control where code runs, where data resides, how runtime policies are enforced, and how workload execution is governed."
            badgeIcon={ShieldCheck}
          />
          <SovereignCarousel />
        </div>
      </section>

      {/* ===================== PRODUCT RESOURCES ===================== */}
      <section className="relative w-full overflow-hidden bg-[var(--light)]">
        <div className="section-grid-bg-light pointer-events-none absolute inset-0 opacity-50" aria-hidden />
        <div className="relative mx-auto w-full max-w-[1128px] px-4 py-14 sm:px-6 sm:py-16 md:px-10 md:py-20 lg:px-12">
          <SectionHeading
            badge="Resources"
            title="Product Resources"
            subtitle="Access supporting materials to evaluate NQRust MicroVM in more detail."
            badgeIcon={FileText}
          />
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
            <button
              onClick={handleBrochure}
              disabled={!hasBrochure || isDownloadingBrochure}
              className="inline-flex w-full items-center justify-center gap-2 rounded-[10px] bg-[var(--primary-dark-1)] px-6 py-3.5 font-montserrat text-[15px] font-semibold text-white shadow-[0px_8px_24px_rgba(242,101,34,0.35)] transition-all duration-300 hover:scale-105 hover:bg-[var(--primary-dark-2)] active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
            >
              <Download className="h-[18px] w-[18px]" aria-hidden />
              {isDownloadingBrochure ? 'Downloading…' : 'Get Brochure'}
            </button>
            <button
              onClick={handleWhitepaper}
              disabled={!hasWhitepaper || isDownloadingWhitepaper}
              className="inline-flex w-full items-center justify-center gap-2 rounded-[10px] border border-[var(--primary-dark-1)] bg-[var(--light)] px-6 py-3.5 font-montserrat text-[15px] font-semibold text-[var(--primary-dark-1)] transition-all duration-300 hover:scale-105 hover:bg-[var(--primary-1)]/30 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
            >
              <FileText className="h-[18px] w-[18px]" aria-hidden />
              {isDownloadingWhitepaper ? 'Downloading…' : 'Whitepaper'}
            </button>
            <a
              href={docsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-[10px] border border-[var(--primary-2)] bg-[var(--light)] px-6 py-3.5 font-montserrat text-[15px] font-semibold text-[var(--primary-dark-1)] transition-all duration-300 hover:scale-105 hover:bg-[var(--primary-1)]/30 active:scale-95 sm:w-auto"
            >
              View Docs
              <ChevronRight className="h-[16px] w-[16px]" aria-hidden />
            </a>
          </div>
        </div>
      </section>

      {/* ===================== FINAL CTA ===================== */}
      <section className="relative w-full overflow-hidden bg-[#1a0e06] px-4 py-20 sm:px-6 sm:py-24 md:px-10 lg:px-12">
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
              Ready to Run Serverless Workloads with{' '}
              <span className="bg-gradient-to-r from-[#FF5001] to-[#FF9C6D] bg-clip-text text-transparent">
                Stronger Isolation?
              </span>
            </h2>

            <p className="mx-auto mb-8 max-w-2xl font-montserrat text-[15px] leading-[1.6] text-white/70 sm:text-[17px]">
              Launch secure, lightweight, and sovereign Function-as-a-Service workloads with NQRust MicroVM.
            </p>

            <div className="mb-9 flex flex-wrap items-center justify-center gap-2.5">
              {['Serverless Ready', 'Hardware Isolation', 'Sovereign-Ready', 'Local Support'].map((chip) => (
                <span
                  key={chip}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 font-montserrat text-[12px] font-medium text-white/80"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-[var(--primary-3)]" aria-hidden />
                  {chip}
                </span>
              ))}
            </div>

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

            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              <button
                onClick={handleBrochure}
                disabled={!hasBrochure || isDownloadingBrochure}
                className="inline-flex items-center gap-1.5 font-montserrat text-[13px] font-medium text-white/60 underline-offset-4 transition-colors duration-300 hover:text-[var(--primary-3)] hover:underline disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Download className="h-4 w-4" aria-hidden />
                {isDownloadingBrochure ? 'Downloading…' : 'Download Brochure'}
              </button>
              <span className="hidden h-3 w-px bg-white/20 sm:inline-block" aria-hidden />
              <button
                onClick={handleWhitepaper}
                disabled={!hasWhitepaper || isDownloadingWhitepaper}
                className="inline-flex items-center gap-1.5 font-montserrat text-[13px] font-medium text-white/60 underline-offset-4 transition-colors duration-300 hover:text-[var(--primary-3)] hover:underline disabled:cursor-not-allowed disabled:opacity-50"
              >
                <FileText className="h-4 w-4" aria-hidden />
                {isDownloadingWhitepaper ? 'Downloading…' : 'Read Whitepaper'}
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
