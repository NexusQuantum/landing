'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { getReleaseCtaUrls } from '@/components/sections/ProductDetailCtaButtons';
import { brochureMapping, BROCHURE_DIR } from '@/config/brochures';
import {
  BarChart3,
  MessageSquare,
  Database,
  FileText,
  Search,
  Brain,
  Sparkles,
  BookOpen,
  Layers,
  Bot,
  LineChart,
  ShieldCheck,
  CheckCircle2,
  Headset,
  Cloud,
  Landmark,
  Building2,
  BadgeCheck,
  Download,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  Gauge,
  Lock,
  Users,
  Briefcase,
  Scale,
  Network,
  Cpu,
  AlertTriangle,
  Code2,
  KeyRound,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { triggerDownload } from '@/lib/download';
import { useAutoplay } from '@/hooks/useAutoplay';
import SectionHeading from '@/components/ui/ProductSectionHeading';

/* ------------------------------------------------------------------ */
/* Static content & resource config                                    */
/* ------------------------------------------------------------------ */

const PRODUCT_TITLE = 'Analytics';

const HERO_SUPPORTING =
  'Natural Language Analytics Platform for Sovereign Enterprise Data';

const HERO_DESCRIPTION =
  'Ask questions across structured databases and unstructured documents using natural language, with transparent SQL generation, document-based answers, and sovereign AI processing.';

const HERO_POSITIONING =
  'Built by Indonesian engineering teams for organizations that need faster insight access without compromising data control, security, or jurisdiction.';

const BROCHURE_URL = (() => {
  const file = brochureMapping[PRODUCT_TITLE];
  return file ? `${BROCHURE_DIR}/${file}` : '#';
})();

const WHITEPAPER_URL = '';

const RELEASE_ID = 'nqrust-analytics';

const HERO_DEMO_IMAGE = '/Analythic-demo.png';

const heroBadges = [
  'Natural Language Analytics',
  'SQL Generation',
  'Document Intelligence',
  'RAG-Powered Answers',
  '14 LLM Providers',
  'Sovereign Deployment',
];

const overviewSlides: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: 'Structured Data Analytics',
    icon: BarChart3,
    description:
      'Generate SQL from natural language questions, execute queries against connected data sources, and display results as tables or charts with SQL transparency.',
  },
  {
    title: 'Document Intelligence',
    icon: BookOpen,
    description:
      'Upload documents into the Document Library and ask questions based on document content using retrieval augmented generation with references to relevant sections.',
  },
];

const comparisonSlides: { title: string; description: string; icon: LucideIcon; highlight?: boolean }[] = [
  {
    title: 'Traditional Analytics',
    icon: AlertTriangle,
    description: 'Requires dashboards, SQL knowledge, or analyst support for every new question.',
  },
  {
    title: 'Manual Document Search',
    icon: Search,
    description: 'Contracts, reports, and policy documents are slow to search and difficult to analyze manually.',
  },
  {
    title: 'NQRust Analytics',
    icon: Sparkles,
    highlight: true,
    description:
      'Combines database analytics and document intelligence in one natural language interface.',
  },
];

const architectureLayers: { title: string; tagline: string; icon: LucideIcon; items: string[] }[] = [
  {
    title: 'User Interaction',
    tagline: 'Top Layer',
    icon: MessageSquare,
    items: ['Ask Questions', 'Upload Documents', 'Define Semantics', 'Connect Data Sources'],
  },
  {
    title: 'Analytics Service',
    tagline: 'Middle Layer',
    icon: Brain,
    items: [
      'Retrieval',
      'Prompt Orchestration',
      'Output Processing',
      'Document Indexer',
      'Vector Database',
      '14 LLM Providers',
    ],
  },
  {
    title: 'Analytics Engine',
    tagline: 'Bottom Layer',
    icon: Database,
    items: [
      'Metastore',
      'Core Engine',
      'Data Source Connectors',
      'Documents',
      'Databases',
      'SQL Data Sources',
    ],
  },
];

const benefits: { id: number; title: string; description: string; icon: LucideIcon }[] = [
  {
    id: 1,
    title: 'Ask Data in Natural Language',
    icon: MessageSquare,
    description:
      'Enable executives, managers, and business teams to ask questions directly without waiting for analyst queues.',
  },
  {
    id: 2,
    title: 'Analyze Databases and Documents',
    icon: Layers,
    description:
      'Explore structured databases and unstructured documents from one interface using SQL generation and RAG-based answers.',
  },
  {
    id: 3,
    title: 'Faster Decisions with Transparency',
    icon: LineChart,
    description:
      'Display results as tables or charts while showing the executed SQL for verification and trust.',
  },
];

const capabilityGroups: { title: string; tagline: string; icon: LucideIcon; items: string[] }[] = [
  {
    title: 'Natural Language to SQL',
    tagline: 'Structured analytics',
    icon: Code2,
    items: [
      'Natural Language Query',
      'SQL Generation',
      'SQL Query Transparency',
      'Table Output',
      'Chart Output',
    ],
  },
  {
    title: 'Document Intelligence',
    tagline: 'Unstructured content',
    icon: BookOpen,
    items: [
      'Document Library',
      'Retrieval Augmented Generation',
      'Document References',
      'Vector Search',
      'Answer Generation',
    ],
  },
  {
    title: 'Semantic Modeling',
    tagline: 'Accuracy layer',
    icon: Scale,
    items: [
      'Metric Definitions',
      'Table Relationships',
      'Business Terminology',
      'Accuracy Improvement',
      'Analyst Validation',
    ],
  },
  {
    title: 'Enterprise Integration',
    tagline: 'Platform connectivity',
    icon: Network,
    items: [
      'PostgreSQL Connector',
      'MySQL Connector',
      'SQL Data Warehouse Connector',
      '14 LLM Provider Support',
      'OIDC Integration with NQRust Identity',
    ],
  },
];

const advantages: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: 'Hybrid Analytics',
    icon: Layers,
    description:
      'Query structured databases with generated SQL and ask questions to unstructured documents using retrieval augmented generation.',
  },
  {
    title: 'Sovereign Deployment with LLM Flexibility',
    icon: Cloud,
    description:
      'Run analytics processing, query execution, RAG, and output generation on infrastructure controlled by the organization, with support for 14 LLM providers.',
  },
  {
    title: 'Semantic Modeling and Data Integration',
    icon: Database,
    description:
      'Improve answer accuracy through metric definitions, table relationships, business terminology, and enterprise data connectors.',
  },
  {
    title: 'Built by Indonesian Engineering',
    icon: BadgeCheck,
    description:
      'Designed, developed, and operated by Indonesian engineering teams with local support, local roadmap ownership, and national jurisdiction alignment.',
  },
];

const useCases: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: 'Executive and Manager Data Access',
    icon: Briefcase,
    description:
      'Let leaders ask questions about performance, sales, or operational metrics without waiting for analyst support.',
  },
  {
    title: 'Self-Service Analytics',
    icon: Users,
    description: 'Help marketing, sales, finance, and operations teams get faster answers from business data.',
  },
  {
    title: 'Internal Document Q&A',
    icon: FileText,
    description: 'Search contracts, policy documents, and reports through the Document Library.',
  },
  {
    title: 'Data Analyst Accelerator',
    icon: Code2,
    description: 'Generate initial SQL queries that analysts can review, validate, modify, and expand.',
  },
  {
    title: 'Internal Data Platform',
    icon: Lock,
    description:
      'Provide controlled access to organizational data with authorization managed through NQRust Identity.',
  },
];

const sovereignItems: { label: string; icon: LucideIcon }[] = [
  { label: 'On-Premise Ready', icon: Building2 },
  { label: 'Private Cloud Ready', icon: Cloud },
  { label: 'Data Residency Control', icon: Database },
  { label: 'Local LLM Support', icon: Cpu },
  { label: '14 LLM Providers', icon: Bot },
  { label: 'No Single Vendor Lock-In', icon: ShieldCheck },
  { label: 'NQRust Identity Integration', icon: KeyRound },
  { label: 'Indonesian Engineering Support', icon: Headset },
];

/* ------------------------------------------------------------------ */
/* Shared carousel helpers                                             */
/* ------------------------------------------------------------------ */

function CarouselDots({
  count,
  index,
  onSelect,
  labelPrefix,
}: {
  count: number;
  index: number;
  onSelect: (i: number) => void;
  labelPrefix: string;
}) {
  return (
    <div className="mt-5 flex items-center justify-center gap-2.5">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          aria-label={`${labelPrefix} ${i + 1}`}
          aria-current={i === index}
          className={`h-2 rounded-full transition-all duration-300 ${
            i === index
              ? 'w-8 bg-[var(--primary-dark-1)]'
              : 'w-2 bg-[var(--primary-2)] hover:bg-[var(--primary-3)]'
          }`}
        />
      ))}
    </div>
  );
}

function CarouselArrows({ onPrev, onNext }: { onPrev: () => void; onNext: () => void }) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onPrev}
        aria-label="Previous slide"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--primary-2)] bg-[var(--light)] text-[var(--primary-dark-1)] transition-all duration-300 hover:scale-105 hover:bg-[var(--primary-1)]/50 active:scale-95"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
      </button>
      <button
        onClick={onNext}
        aria-label="Next slide"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--primary-2)] bg-[var(--light)] text-[var(--primary-dark-1)] transition-all duration-300 hover:scale-105 hover:bg-[var(--primary-1)]/50 active:scale-95"
      >
        <ArrowRight className="h-4 w-4" aria-hidden />
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Overview tabbed carousel                                            */
/* ------------------------------------------------------------------ */

function OverviewCarousel() {
  const [index, setIndex] = useAutoplay(overviewSlides.length);
  const active = overviewSlides[index];
  const ActiveIcon = active.icon;

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,280px)_1fr]">
      <div className="flex gap-2.5 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
        {overviewSlides.map((slide, i) => {
          const Icon = slide.icon;
          const isActive = i === index;
          return (
            <button
              key={slide.title}
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
              <p
                className={`font-montserrat text-[14px] font-semibold ${
                  isActive ? 'text-[var(--dark-9)]' : 'text-[var(--dark-6)]'
                }`}
              >
                {slide.title}
              </p>
            </button>
          );
        })}
      </div>

      <div key={index} className="liquid-glass-light relative overflow-hidden rounded-2xl p-6 sm:p-8">
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[var(--primary-2)]/30 blur-3xl" aria-hidden />
        <div className="relative">
          <div className="mb-4 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--primary-dark-1)] text-white shadow-[0px_6px_18px_rgba(242,101,34,0.35)]">
              <ActiveIcon className="h-7 w-7" aria-hidden />
            </div>
            <h3 className="font-montserrat text-[20px] font-semibold text-[var(--dark-9)] sm:text-[24px]">
              {active.title}
            </h3>
          </div>
          <p className="font-montserrat text-[14px] leading-[1.6] text-[var(--dark-6)] sm:text-[16px]">
            {active.description}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Comparison carousel                                                 */
/* ------------------------------------------------------------------ */

function ComparisonCarousel() {
  const [index, setIndex] = useAutoplay(comparisonSlides.length);
  const total = comparisonSlides.length;
  const go = useCallback((next: number) => setIndex(((next % total) + total) % total), [total, setIndex]);

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-2xl">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {comparisonSlides.map((slide) => {
            const Icon = slide.icon;
            return (
              <div key={slide.title} className="w-full shrink-0 px-0.5">
                <div
                  className={cn(
                    'liquid-glass-light relative overflow-hidden rounded-2xl p-6 sm:p-8',
                    slide.highlight && 'liquid-glass-light--active border-2 border-[var(--primary-dark-1)]/30'
                  )}
                >
                  {slide.highlight && (
                    <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[var(--primary-2)]/30 blur-2xl" aria-hidden />
                  )}
                  <div className="relative">
                    <div
                      className={cn(
                        'mb-4 flex h-12 w-12 items-center justify-center rounded-xl',
                        slide.highlight
                          ? 'bg-[var(--primary-dark-1)] text-white shadow-[0px_6px_18px_rgba(242,101,34,0.35)]'
                          : 'bg-[var(--primary-1)]/50 text-[var(--primary-dark-1)]'
                      )}
                    >
                      <Icon className="h-6 w-6" aria-hidden />
                    </div>
                    <h3 className="mb-3 font-montserrat text-[18px] font-semibold text-[var(--dark-9)] sm:text-[20px]">
                      {slide.title}
                    </h3>
                    <p className="font-montserrat text-[14px] leading-[1.6] text-[var(--dark-6)] sm:text-[15px]">
                      {slide.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          {comparisonSlides.map((slide, i) => (
            <button
              key={slide.title}
              onClick={() => go(i)}
              aria-label={`Show ${slide.title}`}
              aria-current={i === index}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === index
                  ? 'w-8 bg-[var(--primary-dark-1)]'
                  : 'w-2 bg-[var(--primary-2)] hover:bg-[var(--primary-3)]'
              }`}
            />
          ))}
        </div>
        <CarouselArrows onPrev={() => go(index - 1)} onNext={() => go(index + 1)} />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Architecture tabbed carousel                                        */
/* ------------------------------------------------------------------ */

function ArchitectureCarousel() {
  const [index, setIndex] = useAutoplay(architectureLayers.length);
  const active = architectureLayers[index];
  const ActiveIcon = active.icon;

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,300px)_1fr]">
      <div className="flex gap-2.5 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
        {architectureLayers.map((layer, i) => {
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
/* Capabilities grouped carousel                                       */
/* ------------------------------------------------------------------ */

function CapabilitiesCarousel() {
  const [index, setIndex] = useAutoplay(capabilityGroups.length);
  const active = capabilityGroups[index];
  const ActiveIcon = active.icon;

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,300px)_1fr]">
      <div className="flex gap-2.5 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
        {capabilityGroups.map((group, i) => {
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
        <CarouselArrows onPrev={() => go(index - 1)} onNext={() => go(index + 1)} />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Use cases carousel                                                  */
/* ------------------------------------------------------------------ */

function UseCasesCarousel() {
  const [index, setIndex] = useAutoplay(useCases.length);
  const total = useCases.length;
  const go = useCallback((next: number) => setIndex(((next % total) + total) % total), [total, setIndex]);
  const active = useCases[index];
  const ActiveIcon = active.icon;

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-2xl">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {useCases.map((useCase) => {
            const Icon = useCase.icon;
            return (
              <div key={useCase.title} className="w-full shrink-0 px-0.5">
                <div className="liquid-glass-light flex flex-col gap-4 rounded-2xl p-6 sm:flex-row sm:items-center sm:gap-8 sm:p-8">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[var(--primary-dark-1)] text-white shadow-[0px_6px_18px_rgba(242,101,34,0.35)] sm:h-16 sm:w-16">
                    <Icon className="h-7 w-7 sm:h-8 sm:w-8" aria-hidden />
                  </div>
                  <div>
                    <h3 className="mb-2 font-montserrat text-[18px] font-semibold text-[var(--dark-9)] sm:text-[22px]">
                      {useCase.title}
                    </h3>
                    <p className="font-montserrat text-[14px] leading-[1.6] text-[var(--dark-6)] sm:text-[16px]">
                      {useCase.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ActiveIcon className="hidden h-4 w-4 text-[var(--primary-dark-1)] sm:block" aria-hidden />
          <span className="font-montserrat text-[13px] font-medium text-[var(--dark-5)]">
            {index + 1} / {total}
          </span>
        </div>
        <CarouselArrows onPrev={() => go(index - 1)} onNext={() => go(index + 1)} />
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

      <CarouselDots
        count={sovereignItems.length}
        index={index}
        onSelect={setIndex}
        labelPrefix="Show sovereign item"
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Hero section                                                        */
/* ------------------------------------------------------------------ */

function AnalyticsHero({
  demoUrl,
  docsUrl,
}: {
  demoUrl: string;
  docsUrl: string;
}) {
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
        <Image src="/bg-product.jpg" alt="" fill className="object-cover opacity-20" priority />
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

        <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4">
          <a
            href="#overview"
            className="inline-flex items-center justify-center gap-2 rounded-[10px] bg-[var(--primary-dark-1)] px-6 py-3.5 font-montserrat text-[15px] font-semibold text-white shadow-[0px_8px_24px_rgba(242,101,34,0.35)] transition-all duration-300 hover:scale-105 hover:bg-[var(--primary-dark-2)] active:scale-95"
          >
            Explore Product
            <ChevronRight className="h-[18px] w-[18px] shrink-0" aria-hidden />
          </a>
          <a
            href={demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-[10px] border border-white/25 bg-white/10 px-6 py-3.5 font-montserrat text-[15px] font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/20 active:scale-95"
          >
            Try Demo
          </a>
          <a
            href={docsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 px-4 py-3.5 font-montserrat text-[15px] font-semibold text-white/80 transition-all duration-300 hover:text-white"
          >
            View Docs
            <ChevronRight className="h-[16px] w-[16px] shrink-0" aria-hidden />
          </a>
        </div>

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
              <Image
                src={HERO_DEMO_IMAGE}
                alt="NQRust Analytics dashboard with natural language query history and sales overview charts"
                width={1920}
                height={1080}
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

export default function NQRustAnalyticsPage() {
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

      <AnalyticsHero demoUrl={demoUrl} docsUrl={docsUrl} />

      {/* ===================== PRODUCT OVERVIEW (#overview) ===================== */}
      <section id="overview" className="relative z-20 scroll-mt-24 bg-[var(--light)]">
        <div className="section-grid-bg-light pointer-events-none absolute inset-0 opacity-50" aria-hidden />
        <div className="relative mx-auto w-full max-w-[1128px] px-4 py-14 sm:px-6 sm:py-16 md:px-10 md:py-20 lg:px-12">
          <SectionHeading
            badge="Product Overview"
            title="Ask Questions Across All Enterprise Data"
            subtitle="NQRust Analytics enables users to ask questions across organizational data in natural language, covering both structured databases and unstructured documents such as reports, contracts, and policy documents."
            badgeIcon={MessageSquare}
          />
          <OverviewCarousel />
        </div>
      </section>

      {/* ===================== WHY ANALYTICS? ===================== */}
      <section className="liquid-glass-light-section relative w-full overflow-hidden border-y border-[var(--primary-1)]">
        <div className="pointer-events-none absolute -right-40 top-0 h-96 w-96 rounded-full bg-[var(--primary-2)]/40 blur-3xl" aria-hidden />
        <div className="relative mx-auto w-full max-w-[900px] px-4 py-14 sm:px-6 sm:py-16 md:px-10 md:py-20 lg:px-12">
          <SectionHeading
            badge="Comparison"
            title="Why Natural Language Analytics?"
            badgeIcon={Scale}
          />
          <ComparisonCarousel />
        </div>
      </section>

      {/* ===================== HYBRID ANALYTICS ARCHITECTURE ===================== */}
      <section className="relative w-full overflow-hidden bg-[var(--light)]">
        <div className="section-grid-bg-light pointer-events-none absolute inset-0 opacity-50" aria-hidden />
        <div className="relative mx-auto w-full max-w-[1200px] px-4 py-14 sm:px-6 sm:py-16 md:px-10 md:py-20 lg:px-12">
          <SectionHeading
            badge="Architecture"
            title="Hybrid Analytics Architecture"
            subtitle="Analytics combines natural language interaction, SQL generation, retrieval augmented generation, semantic modeling, and LLM orchestration into one enterprise analytics workflow."
            badgeIcon={Layers}
          />
          <ArchitectureCarousel />
        </div>
      </section>

      {/* ===================== BENEFIT ANALYTICS ===================== */}
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

      {/* ===================== ENTERPRISE ANALYTICS CAPABILITIES ===================== */}
      <section className="relative w-full overflow-hidden bg-[var(--light-2)]">
        <div className="section-grid-bg-light pointer-events-none absolute inset-0 opacity-50" aria-hidden />
        <div className="relative mx-auto w-full max-w-[1200px] px-4 py-14 sm:px-6 sm:py-16 md:px-10 md:py-20 lg:px-12">
          <SectionHeading
            badge="Enterprise Platform"
            title="Enterprise Analytics Capabilities"
            badgeIcon={BarChart3}
          />
          <CapabilitiesCarousel />
        </div>
      </section>

      {/* ===================== FOUR ENTERPRISE ADVANTAGES ===================== */}
      <section className="liquid-glass-light-section relative w-full overflow-hidden border-y border-[var(--primary-1)]">
        <div className="pointer-events-none absolute -left-40 bottom-0 h-80 w-80 rounded-full bg-[var(--primary-1)]/50 blur-3xl" aria-hidden />
        <div className="relative mx-auto w-full max-w-[1000px] px-4 py-14 sm:px-6 sm:py-16 md:px-10 md:py-20 lg:px-12">
          <SectionHeading
            badge="Why NQRust Analytics"
            title="Four Enterprise Advantages"
            badgeIcon={Sparkles}
          />
          <AdvantagesCarousel />
        </div>
      </section>

      {/* ===================== USE CASES ===================== */}
      <section className="relative w-full overflow-hidden bg-[var(--light)]">
        <div className="section-grid-bg-light pointer-events-none absolute inset-0 opacity-50" aria-hidden />
        <div className="relative mx-auto w-full max-w-[900px] px-4 py-14 sm:px-6 sm:py-16 md:px-10 md:py-20 lg:px-12">
          <SectionHeading
            badge="Use Cases"
            title="Designed for Enterprise Data Access"
            badgeIcon={Landmark}
          />
          <UseCasesCarousel />
        </div>
      </section>

      {/* ===================== SOVEREIGN ANALYTICS ===================== */}
      <section className="liquid-glass-light-section relative w-full overflow-hidden border-y border-[var(--primary-1)]">
        <div className="pointer-events-none absolute -right-40 top-0 h-96 w-96 rounded-full bg-[var(--primary-2)]/40 blur-3xl" aria-hidden />
        <div className="relative mx-auto w-full max-w-[1128px] px-4 py-14 sm:px-6 sm:py-16 md:px-10 md:py-20 lg:px-12">
          <SectionHeading
            badge="Sovereign Infrastructure"
            title="Sovereign Analytics Without Losing Data Control"
            subtitle="NQRust Analytics keeps data access, AI processing, query execution, document retrieval, and output generation within infrastructure controlled by the organization."
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
            subtitle="Access supporting materials to evaluate NQRust Analytics in more detail."
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
              Ready to Ask Questions Across All Your{' '}
              <span className="bg-gradient-to-r from-[#FF5001] to-[#FF9C6D] bg-clip-text text-transparent">
                Enterprise Data?
              </span>
            </h2>

            <p className="mx-auto mb-8 max-w-2xl font-montserrat text-[15px] leading-[1.6] text-white/70 sm:text-[17px]">
              Turn databases and documents into accessible, governed, and sovereign natural language insights with
              NQRust Analytics.
            </p>

            <div className="mb-9 flex flex-wrap items-center justify-center gap-2.5">
              {['Natural Language', 'SQL + RAG', 'Sovereign AI', 'Local Support'].map((chip) => (
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
