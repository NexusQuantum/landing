'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import {
  ArrowUpRight,
  Building2,
  Factory,
  Truck,
  DollarSign,
  ShoppingCart,
  Heart,
  Wrench,
  Shield,
  Landmark,
  Sprout,
  type LucideIcon,
} from 'lucide-react';

const INDUSTRY_DOC_BASE = '/Industry_solution_finalized_document/';

export interface IndustryItem {
  id: string;
  name: string;
  description: string;
  docFilename: string;
  icon: LucideIcon;
}

const industriesData: IndustryItem[] = [
  {
    id: 'government',
    name: 'Government',
    description: 'Secure, sovereign infrastructure solutions for government agencies and public sector organizations.',
    docFilename: '[Nexus] Government - Industry Solution.pdf',
    icon: Landmark,
  },
  {
    id: 'agribusiness',
    name: 'Agribusiness',
    description: 'Data-driven solutions for agricultural operations, supply chain management, and farm analytics.',
    docFilename: '[Nexus] Agribusiness - Industry Solution.pdf',
    icon: Sprout,
  },
  {
    id: 'mining',
    name: 'Mining (Oil Gas, Coal)',
    description: 'Robust infrastructure for mining operations, resource management, and energy sector applications.',
    docFilename: '[Nexus] Mining & OilGas - Industry Solution.pdf',
    icon: Wrench,
  },
  {
    id: 'finance',
    name: 'Finance',
    description: 'Compliant, secure computing solutions for financial services, banking, and fintech applications.',
    docFilename: '[Nexus] Finance - Industry Solution.pdf',
    icon: DollarSign,
  },
  {
    id: 'fmcg',
    name: 'FMCG',
    description: 'Scalable solutions for fast-moving consumer goods, retail operations, and supply chain optimization.',
    docFilename: '[Nexus] FMCG - Industry Solution.pdf',
    icon: ShoppingCart,
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    description: 'HIPAA-compliant infrastructure for healthcare providers, medical data management, and patient care systems.',
    docFilename: '[Nexus] Healthcare & Pharmaceutical - Industry Solution.pdf',
    icon: Heart,
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing',
    description: 'Industrial IoT, production analytics, and smart manufacturing solutions for modern factories.',
    docFilename: '[Nexus] Manufacturing - Industry Solution.pdf',
    icon: Factory,
  },
  {
    id: 'logistics',
    name: 'Logistic and Distributions',
    description: 'Real-time tracking, route optimization, and warehouse management for logistics and distribution networks.',
    docFilename: '[Nexus] Transportation & Logistics - Industry Solution.pdf',
    icon: Truck,
  },
  {
    id: 'military',
    name: 'Military',
    description: 'High-security, mission-critical infrastructure for defense applications and military operations.',
    docFilename: '[Nexus] Military - Industry Solution.pdf',
    icon: Shield,
  },
  {
    id: 'bumn',
    name: 'BUMN - State Own Enterprise',
    description: 'Sovereign cloud solutions tailored for state-owned enterprises with compliance and security requirements.',
    docFilename: '[Nexus] BUMN - Industry Solution.pdf',
    icon: Building2,
  },
];

function IndustryCard({ item }: { item: IndustryItem }) {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = item.icon;
  const docUrl = INDUSTRY_DOC_BASE + encodeURIComponent(item.docFilename);

  return (
    <a
      href={docUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-2xl border border-[#d1d1d1] bg-[#fffefd]',
        'shadow-[0px_1px_2px_0px_rgba(0,0,0,0.3),0px_2px_6px_2px_rgba(0,0,0,0.15)]',
        'transition-all duration-300 hover:shadow-[0px_4px_16px_4px_rgba(0,0,0,0.12),0px_2px_8px_0px_rgba(242,101,34,0.15)]',
        'hover:-translate-y-1 hover:border-[#f26522]/50',
        'focus:outline-none focus:ring-2 focus:ring-[#f26522]/50 focus:ring-offset-2',
        'cursor-pointer'
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
        </div>

        <h3 className="mb-2 font-montserrat text-[18px] font-semibold leading-[1.3] text-[#121212] transition-colors duration-300 group-hover:text-[#551d00]">
          {item.name}
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

interface IndustrySolutionsContentProps {
  className?: string;
}

const IndustrySolutionsContent: React.FC<IndustrySolutionsContentProps> = ({ className }) => {
  return (
    <div className={cn('flex w-full flex-col items-center', className)}>
      {/* Hero */}
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden px-4 py-16 lg:py-24">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/bgUseCase.png"
            alt="Industry Solutions Background"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        </div>
        <div className="relative z-10 flex max-w-3xl flex-col items-center gap-4 text-center">
          <span className="rounded-full border border-[#f26522]/40 bg-[#f26522]/10 px-4 py-1.5 font-montserrat text-[12px] font-medium uppercase tracking-widest text-[#f26522]">
            Industry Solutions
          </span>
          <h1 className="font-montserrat text-[32px] font-bold leading-tight text-white sm:text-[43px] lg:text-[54px]">
            <span className="text-[#f26522]">Industry</span> Solutions
          </h1>
          <p className="font-montserrat text-[16px] font-normal leading-relaxed text-white/90 lg:text-[18px]">
            Discover how Nexus Quantum solutions are tailored to meet the unique needs and challenges of your industry.
          </p>
        </div>
      </div>

      {/* Cards grid */}
      <div className="w-full bg-[#fffefd] px-4 py-12 lg:px-[70px] lg:py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {industriesData.map((item) => (
            <IndustryCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default IndustrySolutionsContent;
