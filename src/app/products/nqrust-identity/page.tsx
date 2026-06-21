'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductDetailCtaButtons, { getReleaseCtaUrls } from '@/components/sections/ProductDetailCtaButtons';
import { getProductReleaseItem } from '@/config/product-releases';
import DemoAccessCards from '@/components/sections/DemoAccessCards';
import { brochureMapping, BROCHURE_DIR } from '@/config/brochures';
import {
  ShieldCheck,
  Activity,
  Server,
  Network,
  Database,
  Lock,
  LayoutDashboard,
  Cpu,
  CheckCircle2,
  Headset,
  Layers,
  Gauge,
  Cloud,
  Landmark,
  Building2,
  BadgeCheck,
  Download,
  FileText,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  Sparkles,
  KeyRound,
  Users,
  Fingerprint,
  Settings,
  AlertTriangle,
  Globe,
  TrendingDown,
  Code2,
  Key,
  Shield,
  Timer,
  Smartphone,
  GitBranch,
  Scale,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { triggerDownload } from '@/lib/download';
import { useAutoplay } from '@/hooks/useAutoplay';
import SectionHeading from '@/components/ui/ProductSectionHeading';

/* ------------------------------------------------------------------ */
/* Static content & resource config                                    */
/* ------------------------------------------------------------------ */

const PRODUCT_TITLE = 'Identity';

const HERO_SUPPORTING =
  'Enterprise Identity and Access Management for Sovereign Infrastructure';

const HERO_DESCRIPTION =
  'Provides Universal Single Sign-On across applications with support for OAuth 2.0, OpenID Connect, and SAML, enabling faster authentication integration, centralized access control, and stronger identity governance.';

const HERO_POSITIONING =
  'NQRust Identity is an enterprise IAM platform developed and operated by Nexus Quantum for government institutions and corporations in Indonesia. It is designed as a trust center for digital assets, applications, APIs, and internal identity sources such as LDAP and Active Directory.';

const BROCHURE_URL = (() => {
  const file = brochureMapping[PRODUCT_TITLE];
  return file ? `${BROCHURE_DIR}/${file}` : '#';
})();

const WHITEPAPER_URL = '/Finalized Whitepaper/[Nexus] NQRust-Identity v1.0.pdf';

const RELEASE_ID = 'nqrust-identity';

const heroBadges = [
  'Universal SSO',
  'OAuth 2.0',
  'OpenID Connect',
  'SAML 2.0',
  'Zero-Trust Access',
  'Sovereign IAM',
  'LDAP & Active Directory',
];

const overviewCapabilities: { label: string; icon: LucideIcon }[] = [
  { label: 'Universal Single Sign-On', icon: KeyRound },
  { label: 'Fine-Grained Access Control', icon: Lock },
  { label: 'Centralized Identity Governance', icon: Users },
  { label: 'Multi-Factor Authentication', icon: Fingerprint },
  { label: 'Audit Logging', icon: FileText },
  { label: 'Enterprise IAM Operations', icon: Settings },
];

const comparisonCards: { title: string; description: string; icon: LucideIcon; highlight?: boolean }[] = [
  {
    title: 'Fragmented Access',
    icon: AlertTriangle,
    description:
      'Separate logins, inconsistent permissions, and limited audit visibility increase operational risk.',
  },
  {
    title: 'Cloud-Only IAM',
    icon: Cloud,
    description:
      'Global cloud IAM can reduce complexity, but may introduce dependency, data residency concerns, and limited infrastructure control.',
  },
  {
    title: 'NQRust Identity',
    icon: ShieldCheck,
    highlight: true,
    description:
      'A sovereign IAM platform that combines open-standard protocols, centralized access governance, auditable controls, and local enterprise support.',
  },
];

const foundationLayers: { title: string; tagline: string; icon: LucideIcon; items: string[] }[] = [
  {
    title: 'Applications & Services',
    tagline: 'Top Layer',
    icon: Globe,
    items: ['Web Apps', 'Mobile Apps', 'Internal Systems', 'APIs', 'Partner Portals'],
  },
  {
    title: 'NQRust Identity',
    tagline: 'Middle Layer',
    icon: Shield,
    items: ['SSO', 'MFA', 'RBAC', 'Token Service', 'Audit Logging', 'Identity Brokering'],
  },
  {
    title: 'Identity Sources & Infrastructure',
    tagline: 'Bottom Layer',
    icon: Server,
    items: ['LDAP', 'Active Directory', 'Private Cloud', 'On-Premise', 'NQRust Ecosystem'],
  },
];

const benefits: { id: number; title: string; description: string; icon: LucideIcon }[] = [
  {
    id: 1,
    title: 'Seamless Single Sign-On Everywhere',
    icon: KeyRound,
    description:
      'Give employees, partners, and users one secure login across cloud, on-premise, legacy, and modern applications using standards such as SAML, OIDC, OAuth 2.0, and LDAP.',
  },
  {
    id: 2,
    title: 'Zero-Trust Access Reduces Risk',
    icon: ShieldCheck,
    description:
      'Apply stronger access control through MFA, role-based access, policy-driven authorization, and auditable identity events.',
  },
  {
    id: 3,
    title: 'Lower IAM Costs and Tickets',
    icon: TrendingDown,
    description:
      'Centralize authentication and access governance to reduce password resets, duplicated identity workflows, and manual access management overhead.',
  },
];

const enterpriseCapabilities: { label: string; icon: LucideIcon }[] = [
  { label: 'Single Sign-On', icon: KeyRound },
  { label: 'Multi-Factor Authentication', icon: Fingerprint },
  { label: 'TOTP / HOTP', icon: Timer },
  { label: 'FIDO2 Security Key', icon: Key },
  { label: 'Passkey / WebAuthn', icon: ShieldCheck },
  { label: 'LDAP Integration', icon: Network },
  { label: 'Active Directory Integration', icon: Server },
  { label: 'Social Login', icon: Users },
  { label: 'Identity Brokering', icon: GitBranch },
  { label: 'Role-Based Access Control', icon: Lock },
  { label: 'Fine-Grained Authorization', icon: Scale },
  { label: 'OAuth 2.0 Token Service', icon: Code2 },
  { label: 'Token Introspection', icon: Activity },
  { label: 'Audit Logging', icon: FileText },
  { label: 'Realm-Based Identity Separation', icon: Layers },
];

const advantages: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: 'Open Technology and Industry Standards',
    icon: Globe,
    description:
      'NQRust Identity is built on enterprise open-source IAM foundations and supports SAML 2.0, OpenID Connect, and OAuth 2.0 to improve interoperability, transparency, and auditability.',
  },
  {
    title: 'Enterprise IAM Capabilities',
    icon: ShieldCheck,
    description:
      'Supports SSO, MFA, LDAP and Active Directory federation, identity brokering, RBAC, fine-grained authorization, audit logging, OAuth 2.0 token issuance, scope management, and token introspection.',
  },
  {
    title: 'Sovereign Identity Deployment',
    icon: Landmark,
    description:
      'Core IAM data such as user profiles, credential records, sessions, configurations, and audit logs can be stored and processed on infrastructure controlled by the organization.',
  },
  {
    title: 'Production Configuration and Local Support',
    icon: Headset,
    description:
      'Provides standardized deployment tooling, production configuration guidance, security hardening, NQRust ecosystem integration through OIDC client configuration, and local Nexus Quantum engineering support.',
  },
];

const useCases: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: 'Enterprise Single Sign-On',
    icon: KeyRound,
    description:
      'Centralize authentication across internal, external, legacy, and modern applications.',
  },
  {
    title: 'API Authorization Server',
    icon: Code2,
    description:
      'Issue access tokens, manage scopes, and support token introspection for internal or external APIs.',
  },
  {
    title: 'Public Service and E-Government Portals',
    icon: Landmark,
    description:
      'Support authentication and access control for large-scale public-facing services with MFA and audit logging.',
  },
  {
    title: 'Organization and Partner Federation',
    icon: Users,
    description:
      'Enable cross-organization access without duplicating user accounts across domains.',
  },
  {
    title: 'Developer Portal and Infrastructure Platform IAM',
    icon: LayoutDashboard,
    description:
      'Provide identity and role-based access control for developer portals, data platforms, cloud platforms, and internal systems.',
  },
];

const sovereignItems: { label: string; icon: LucideIcon }[] = [
  { label: 'On-Premise Ready', icon: Building2 },
  { label: 'Private Cloud Ready', icon: Cloud },
  { label: 'Data Residency Control', icon: Database },
  { label: 'Audit-Ready IAM', icon: FileText },
  { label: 'Local Engineering Support', icon: Headset },
  { label: 'Indonesian Operational Context', icon: BadgeCheck },
];

/* ------------------------------------------------------------------ */
/* Identity hub hero visual                                            */
/* ------------------------------------------------------------------ */

const hubNodes: { label: string; icon: LucideIcon; angle: number }[] = [
  { label: 'Web Apps', icon: Globe, angle: -90 },
  { label: 'Mobile', icon: Smartphone, angle: -30 },
  { label: 'APIs', icon: Code2, angle: 30 },
  { label: 'LDAP', icon: Network, angle: 90 },
  { label: 'Active Directory', icon: Server, angle: 150 },
  { label: 'Partners', icon: Users, angle: 210 },
];

function IdentityHubVisual() {
  const radius = 38;

  return (
    <div
      className="relative mx-auto aspect-[16/10] w-full max-w-3xl overflow-hidden rounded-t-xl sm:rounded-t-2xl"
      aria-hidden
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a0f08]/80 via-[#120a06]/90 to-[#0c0704]" />

      {/* Zero-trust boundary ring */}
      <div className="absolute left-1/2 top-1/2 h-[72%] w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[var(--primary-3)]/25" />
      <div className="absolute left-1/2 top-1/2 h-[88%] w-[88%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5" />

      {/* Token flow lines */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 250">
        {hubNodes.map((node) => {
          const rad = (node.angle * Math.PI) / 180;
          const cx = 200 + Math.cos(rad) * 130;
          const cy = 125 + Math.sin(rad) * 80;
          return (
            <line
              key={node.label}
              x1="200"
              y1="125"
              x2={cx}
              y2={cy}
              stroke="url(#tokenGradient)"
              strokeWidth="1.5"
              strokeDasharray="6 4"
              className="identity-flow-line"
            />
          );
        })}
        <defs>
          <linearGradient id="tokenGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(242,101,34,0.15)" />
            <stop offset="50%" stopColor="rgba(255,156,109,0.55)" />
            <stop offset="100%" stopColor="rgba(242,101,34,0.15)" />
          </linearGradient>
        </defs>
      </svg>

      {/* Central identity hub */}
      <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
        <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-[var(--primary-dark-1)]/50 bg-[rgba(242,101,34,0.15)] shadow-[0_0_40px_rgba(242,101,34,0.25)] backdrop-blur-md sm:h-24 sm:w-24">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[var(--primary-dark-1)]/20 to-transparent" />
          <Shield className="relative h-9 w-9 text-[var(--primary-3)] sm:h-10 sm:w-10" />
        </div>
        <p className="mt-2 text-center font-montserrat text-[10px] font-semibold uppercase tracking-[0.14em] text-white/60 sm:text-[11px]">
          Identity Trust Hub
        </p>
      </div>

      {/* Application nodes */}
      {hubNodes.map((node) => {
        const Icon = node.icon;
        const rad = (node.angle * Math.PI) / 180;
        const x = 50 + Math.cos(rad) * radius;
        const y = 50 + Math.sin(rad) * (radius * 0.62);
        return (
          <div
            key={node.label}
            className="absolute z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1"
            style={{ left: `${x}%`, top: `${y}%` }}
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/15 bg-white/[0.06] backdrop-blur-sm sm:h-10 sm:w-10">
              <Icon className="h-4 w-4 text-white/75 sm:h-[18px] sm:w-[18px]" />
            </div>
            <span className="max-w-[72px] text-center font-montserrat text-[9px] font-medium text-white/50 sm:text-[10px]">
              {node.label}
            </span>
          </div>
        );
      })}

      {/* Secure access gateway label */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 backdrop-blur-sm">
        <Lock className="h-3 w-3 text-[var(--primary-3)]" />
        <span className="font-montserrat text-[10px] font-medium text-white/55 sm:text-[11px]">
          Secure Access Gateway · Token Flow
        </span>
      </div>
    </div>
  );
}

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
  const firstRow = enterpriseCapabilities.slice(0, 8);
  const secondRow = enterpriseCapabilities.slice(8);

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

function IdentityHero() {
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

        <p className="mx-auto mb-4 max-w-2xl font-montserrat text-[14px] leading-[1.5] text-white/65 sm:text-[15px]">
          {HERO_DESCRIPTION}
        </p>

        <p className="mx-auto mb-5 max-w-2xl font-montserrat text-[13px] leading-[1.55] text-white/50 sm:text-[14px]">
          {HERO_POSITIONING}
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
              <IdentityHubVisual />
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

export default function NQRustIdentityPage() {
  const [activeBenefit, setActiveBenefit] = useAutoplay(benefits.length);
  const [isDownloadingBrochure, setIsDownloadingBrochure] = useState(false);
  const [isDownloadingWhitepaper, setIsDownloadingWhitepaper] = useState(false);

  const releaseCtas = getReleaseCtaUrls(RELEASE_ID);
  const releaseItem = getProductReleaseItem(RELEASE_ID);
  const demoUrl = releaseCtas?.tryDemo.href ?? '#';
  const docsUrl = releaseCtas?.viewDocs.href ?? '#';
  const demoSites = releaseItem?.demoSites ?? [];

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

      <IdentityHero />

      {/* ===================== PRODUCT OVERVIEW (#overview) ===================== */}
      <section id="overview" className="relative z-20 scroll-mt-24 bg-[var(--light)]">
        <div className="section-grid-bg-light pointer-events-none absolute inset-0 opacity-50" aria-hidden />
        <div className="relative mx-auto w-full max-w-[1128px] px-4 py-14 sm:px-6 sm:py-16 md:px-10 md:py-20 lg:px-12">
          <SectionHeading
            badge="Product Overview"
            title="Built as the Trust Center for Enterprise Access"
            subtitle="NQRust Identity consolidates identity and access management into a unified system built on zero-trust principles. It provides fine-grained access control, centralized identity governance, and strong security foundations for modern distributed systems."
            badgeIcon={Shield}
          />
          <p className="mx-auto mb-10 max-w-3xl text-center font-montserrat text-[14px] leading-relaxed text-[var(--dark-5)] sm:text-[15px] md:mb-14 md:text-[16px]">
            NQRust Identity is designed to control who can access specific resources, when access is granted, and under
            what context access is used. Every authentication process, API call, and sensitive transaction can be
            governed through auditable identity and authorization controls.
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

      {/* ===================== WHY IDENTITY? ===================== */}
      <section className="liquid-glass-light-section relative w-full overflow-hidden border-y border-[var(--primary-1)]">
        <div className="pointer-events-none absolute -right-40 top-0 h-96 w-96 rounded-full bg-[var(--primary-2)]/40 blur-3xl" aria-hidden />
        <div className="relative mx-auto w-full max-w-[1200px] px-4 py-14 sm:px-6 sm:py-16 md:px-10 md:py-20 lg:px-12">
          <SectionHeading
            badge="Comparison"
            title="Why Identity Matters"
            subtitle="Identity and access management is not just an additional enterprise component. IAM is the trust foundation that determines access across applications, APIs, users, services, and sensitive transactions."
            badgeIcon={Scale}
          />
          <div className="grid gap-5 md:grid-cols-3">
            {comparisonCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className={cn(
                    'liquid-glass-light relative overflow-hidden rounded-2xl p-6 sm:p-8',
                    card.highlight && 'liquid-glass-light--active border-2 border-[var(--primary-dark-1)]/30'
                  )}
                >
                  {card.highlight && (
                    <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[var(--primary-2)]/30 blur-2xl" aria-hidden />
                  )}
                  <div className="relative">
                    <div
                      className={cn(
                        'mb-4 flex h-12 w-12 items-center justify-center rounded-xl',
                        card.highlight
                          ? 'bg-[var(--primary-dark-1)] text-white shadow-[0px_6px_18px_rgba(242,101,34,0.35)]'
                          : 'bg-[var(--primary-1)]/50 text-[var(--primary-dark-1)]'
                      )}
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

      {/* ===================== OPEN STANDARD IAM FOUNDATION ===================== */}
      <section className="relative w-full overflow-hidden bg-[var(--light)]">
        <div className="section-grid-bg-light pointer-events-none absolute inset-0 opacity-50" aria-hidden />
        <div className="relative mx-auto w-full max-w-[1200px] px-4 py-14 sm:px-6 sm:py-16 md:px-10 md:py-20 lg:px-12">
          <SectionHeading
            badge="Technology Foundation"
            title="Built on Open IAM Standards"
            subtitle="NQRust Identity supports modern IAM protocols such as SAML 2.0 for enterprise single sign-on, OpenID Connect for modern authentication, and OAuth 2.0 for API authorization."
            badgeIcon={Globe}
          />
          <p className="mx-auto mb-10 max-w-3xl text-center font-montserrat text-[14px] leading-relaxed text-[var(--dark-5)] sm:text-[15px] md:mb-14 md:text-[16px]">
            It can integrate with existing identity sources such as LDAP and Active Directory, helping organizations
            modernize access control without replacing their entire identity environment.
          </p>
          <FoundationCarousel />
        </div>
      </section>

      {/* ===================== BENEFIT IDENTITY ===================== */}
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

      {/* ===================== ENTERPRISE IAM CAPABILITIES (marquee) ===================== */}
      <section className="relative w-full overflow-hidden bg-[var(--light-2)]">
        <div className="section-grid-bg-light pointer-events-none absolute inset-0 opacity-50" aria-hidden />
        <div className="relative mx-auto w-full max-w-[1200px] px-4 py-14 sm:px-6 sm:py-16 md:px-10 md:py-20 lg:px-12">
          <SectionHeading
            badge="Enterprise Platform"
            title="Enterprise IAM Capabilities"
            subtitle="NQRust Identity provides the core capabilities required for enterprise identity operations, including SSO, MFA, user federation, identity brokering, role-based access control, fine-grained authorization, OAuth 2.0 authorization server capabilities, token management, and audit logging."
            badgeIcon={Lock}
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
            badge="Why NQRust Identity"
            title="Four Enterprise Advantages"
            subtitle="A sovereign IAM platform that combines open-standard protocols, enterprise-grade capabilities, sovereign deployment, and local engineering support for regulated environments."
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
            title="Designed for Enterprise, Government, and Regulated Access"
            badgeIcon={Landmark}
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

      {/* ===================== SOVEREIGN IDENTITY INFRASTRUCTURE ===================== */}
      <section className="liquid-glass-light-section relative w-full overflow-hidden border-y border-[var(--primary-1)]">
        <div className="pointer-events-none absolute -right-40 top-0 h-96 w-96 rounded-full bg-[var(--primary-2)]/40 blur-3xl" aria-hidden />
        <div className="relative mx-auto w-full max-w-[1128px] px-4 py-14 sm:px-6 sm:py-16 md:px-10 md:py-20 lg:px-12">
          <SectionHeading
            badge="Sovereign Infrastructure"
            title="Sovereign IAM Without Foreign Cloud Dependency"
            subtitle="NQRust Identity enables organizations to control where IAM data is stored, where authentication is processed, how administrative access is governed, and how identity policies are enforced."
            badgeIcon={ShieldCheck}
          />
          <SovereignCarousel />
        </div>
      </section>

      {/* ===================== DEMO ACCESS ===================== */}
      {demoSites.length > 0 && (
        <section className="relative w-full overflow-hidden bg-[var(--light-2)]">
          <div className="section-grid-bg-light pointer-events-none absolute inset-0 opacity-50" aria-hidden />
          <div className="relative mx-auto w-full max-w-[1128px] px-4 py-14 sm:px-6 sm:py-16 md:px-10 md:py-20 lg:px-12">
            <SectionHeading
              badge="Live Demo"
              title="Try NQRust Identity"
              subtitle="Explore the demo portal for end-user SSO experience, or access the IDM console for identity administration and configuration."
              badgeIcon={KeyRound}
            />
            <DemoAccessCards sites={demoSites} />
          </div>
        </section>
      )}

      {/* ===================== PRODUCT RESOURCES ===================== */}
      <section className="relative w-full overflow-hidden bg-[var(--light)]">
        <div className="section-grid-bg-light pointer-events-none absolute inset-0 opacity-50" aria-hidden />
        <div className="relative mx-auto w-full max-w-[1128px] px-4 py-14 sm:px-6 sm:py-16 md:px-10 md:py-20 lg:px-12">
          <SectionHeading
            badge="Resources"
            title="Product Resources"
            subtitle="Access supporting materials to evaluate NQRust Identity in more detail."
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
              Ready to Strengthen Enterprise{' '}
              <span className="bg-gradient-to-r from-[#FF5001] to-[#FF9C6D] bg-clip-text text-transparent">
                Identity and Access?
              </span>
            </h2>

            <p className="mx-auto mb-8 max-w-2xl font-montserrat text-[15px] leading-[1.6] text-white/70 sm:text-[17px]">
              Centralize authentication, authorization, and identity governance with a sovereign IAM platform built for
              enterprise and regulated environments.
            </p>

            <div className="mb-9 flex flex-wrap items-center justify-center gap-2.5">
              {['Universal SSO', 'Zero-Trust Ready', 'Sovereign IAM', 'Local Support'].map((chip) => (
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
