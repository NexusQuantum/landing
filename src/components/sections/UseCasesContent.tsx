'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import {
  ArrowUpRight,
  BarChart3,
  Building2,
  Cloud,
  Cpu,
  Database,
  Lock,
  Shield,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';

export interface UseCaseItem {
  id: string;
  title: string;
  industry: string;
  description: string;
  docUrl: string;
  uploadDate: string;
  icon: LucideIcon;
}

const useCasesData: UseCaseItem[] = [
  {
    id: 'secure-ai-dc',
    title: 'Secure AI Data Center',
    industry: 'Enterprise',
    description: 'Best practices and architecture for building secure, sovereign, and production-ready AI data centers.',
    docUrl: '/Finalized Whitepaper/[Nexus] NexusRust Secure-AI-DC v1.0.pdf',
    uploadDate: 'Jan 15, 2025',
    icon: Shield,
  },
  {
    id: 'financial-compliance',
    title: 'Financial Services & Compliance',
    industry: 'Finance',
    description: 'Confidential computing for sensitive data, audit trails, and regulatory compliance in the financial sector.',
    docUrl: '/Finalized Brochure/[Nexus] Brochure NQRust-Enclave v1.0.pdf',
    uploadDate: 'Dec 20, 2024',
    icon: Building2,
  },
  {
    id: 'llm-ops',
    title: 'LLM Operations & AI Workloads',
    industry: 'AI / ML',
    description: 'Fine-tuning, evaluation, GPU-efficient serving, and guardrails for language model operations.',
    docUrl: '/Finalized Whitepaper/[Nexus] NQRust-LLMOps v1.0.pdf',
    uploadDate: 'Jan 10, 2025',
    icon: Sparkles,
  },
  {
    id: 'bi-analytics',
    title: 'Business Intelligence & Analytics',
    industry: 'Analytics',
    description: 'Native lakehouse, large-scale analytics, and natural language queries for business decision-making.',
    docUrl: '/Finalized Brochure/[Nexus] Brochure NQRust-Analytics v1.0.pdf',
    uploadDate: 'Dec 18, 2024',
    icon: BarChart3,
  },
  {
    id: 'edge-ai',
    title: 'Edge AI & IoT',
    industry: 'Edge',
    description: 'Edge inference, low latency, offline-first capabilities, and smart sync for distributed devices.',
    docUrl: '/Finalized Whitepaper/[Nexus] NQRust-Edge v1.0.pdf',
    uploadDate: 'Jan 8, 2025',
    icon: Cpu,
  },
  {
    id: 'serverless-compute',
    title: 'Serverless & MicroVM Compute',
    industry: 'Infrastructure',
    description: 'Sub-second provisioning, VM-grade isolation, and inference scaling without shared-kernel risk.',
    docUrl: '/Finalized Whitepaper/[Nexus] NQRust-MicroVM v1.0.pdf',
    uploadDate: 'Jan 5, 2025',
    icon: Cloud,
  },
  {
    id: 'data-protection',
    title: 'Data Protection & Resilience',
    industry: 'Security',
    description: 'Immutable snapshots, WORM retention, policy-based restoration, and ransomware-resistant recovery.',
    docUrl: '/Finalized Brochure/[Nexus] Brochure NQRust-Guard v1.0.pdf',
    uploadDate: 'Dec 22, 2024',
    icon: Lock,
  },
  {
    id: 'identity-access',
    title: 'Identity & Access Management',
    industry: 'Security',
    description: 'Universal SSO, OAuth 2.0, OpenID Connect, and SAML for enterprise applications.',
    docUrl: '/Finalized Whitepaper/[Nexus] NQRust-Identity v1.0.pdf',
    uploadDate: 'Jan 12, 2025',
    icon: Lock,
  },
  {
    id: 'storage-lakehouse',
    title: 'Storage & Lakehouse',
    industry: 'Data',
    description: 'Memory-safe distributed storage, columnar lakehouse, vector-ready, and low-latency queries.',
    docUrl: '/Finalized Whitepaper/[Nexus] NQRust-Lake v2.0.pdf',
    uploadDate: 'Jan 3, 2025',
    icon: Database,
  },
];

function UseCaseCard({ item }: { item: UseCaseItem }) {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = item.icon;
  const encodedUrl = item.docUrl
    .split('/')
    .map((s) => encodeURIComponent(s))
    .join('/');

  return (
    <a
      href={encodedUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-2xl border border-[#d1d1d1] bg-[#fffefd]',
        'shadow-[0px_1px_2px_0px_rgba(0,0,0,0.3),0px_2px_6px_2px_rgba(0,0,0,0.15)]',
        'transition-all duration-300 hover:shadow-[0px_4px_16px_4px_rgba(0,0,0,0.12),0px_2px_8px_0px_rgba(242,101,34,0.15)]',
        'hover:-translate-y-1 hover:border-[#f26522]/50',
        'focus:outline-none focus:ring-2 focus:ring-[#f26522]/50 focus:ring-offset-2'
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top accent bar */}
      <div
        className={cn(
          'absolute top-0 left-0 right-0 h-1 rounded-t-2xl bg-gradient-to-r transition-all duration-300',
          isHovered ? 'from-[#f26522] to-[#dc5d21]' : 'from-[#888888] to-[#6d6d6d]'
        )}
      />

      <div className="flex flex-1 flex-col p-6 lg:p-7">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div
            className={cn(
              'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#d1d1d1] bg-[#fffbf8] transition-all duration-300',
              isHovered && 'scale-110 border-[#f26522]/40 bg-[#f26522]/10'
            )}
          >
            <Icon
              className={cn(
                'h-5 w-5 transition-colors duration-300',
                isHovered ? 'text-[#f26522]' : 'text-[#551d00]'
              )}
            />
          </div>
          <span
            className={cn(
              'rounded-lg px-2.5 py-1 text-[11px] font-medium transition-colors duration-300',
              'border border-[#d1d1d1] bg-[#fffbf8] text-[#6d6d6d]',
              isHovered && 'border-[#f26522]/40 bg-[#f26522]/10 text-[#f26522]'
            )}
          >
            {item.uploadDate}
          </span>
        </div>

        <span
          className={cn(
            'mb-2 inline-block w-fit rounded-md px-2 py-0.5 font-montserrat text-[11px] font-medium uppercase tracking-wider',
            'bg-[#fff3ed] text-[#551d00]'
          )}
        >
          {item.industry}
        </span>

        <h3 className="font-montserrat text-[18px] font-semibold leading-[1.3] text-[#121212] transition-colors duration-300 group-hover:text-[#551d00]">
          {item.title}
        </h3>

        <p className="mt-2 flex-1 font-montserrat text-[14px] font-normal leading-[1.45] text-[#454545]">
          {item.description}
        </p>

        <div className="mt-5 flex items-center gap-2 font-montserrat text-[14px] font-medium text-[#f26522] transition-all duration-300 group-hover:gap-3">
          <span>View document</span>
          <ArrowUpRight
            className={cn('h-4 w-4 shrink-0 transition-transform duration-300', isHovered && 'translate-x-0.5 -translate-y-0.5')}
          />
        </div>
      </div>
    </a>
  );
}

interface UseCasesContentProps {
  className?: string;
}

const UseCasesContent: React.FC<UseCasesContentProps> = ({ className }) => {
  return (
    <div className={cn('flex w-full flex-col items-center', className)}>
      {/* Hero */}
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden px-4 py-16 lg:py-24">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/bgUseCase.png"
            alt="Use Cases Background"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        </div>
        <div className="relative z-10 flex max-w-3xl flex-col items-center gap-4 text-center">
          <span className="rounded-full border border-[#f26522]/40 bg-[#f26522]/10 px-4 py-1.5 font-montserrat text-[12px] font-medium uppercase tracking-widest text-[#f26522]">
            Document Library
          </span>
          <h1 className="font-montserrat text-[32px] font-bold leading-tight text-white sm:text-[43px] lg:text-[54px]">
            <span className="text-[#f26522]">Use</span> Cases
          </h1>
          <p className="font-montserrat text-[16px] font-normal leading-relaxed text-white/90 lg:text-[18px]">
            Explore case studies and implementation documents of Nexus Quantum solutions across various industries and enterprise scenarios.
          </p>
        </div>
      </div>

      {/* Cards grid */}
      <div className="w-full bg-[#fffefd] px-4 py-12 lg:px-[70px] lg:py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {useCasesData.map((item) => (
            <UseCaseCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UseCasesContent;
