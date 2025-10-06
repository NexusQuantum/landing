import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

interface ProductCardProps {
  name: string;
  description: string;
  href: string;
  layout: 'carousel' | 'cards';
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ name, description, href, layout, className }) => {
  return (
    <Link href={href} className={cn('group block', className)}>
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-lg transition-all duration-300 group-hover:border-[#f26522] group-hover:scale-105">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-900 group-hover:text-[#f26522] transition-colors">
            {name}
          </h3>
          <span className={cn(
            "px-2 py-1 rounded-full text-xs font-medium",
            layout === 'carousel' 
              ? "bg-[#f26522] text-white" 
              : "bg-[#dc5d21] text-white"
          )}>
            {layout === 'carousel' ? 'Carousel' : 'Cards'}
          </span>
        </div>
        <p className="text-gray-600 text-sm leading-relaxed">
          {description}
        </p>
        <div className="mt-4 flex items-center text-[#f26522] text-sm font-medium group-hover:text-[#dc5d21] transition-colors">
          View Details
          <svg className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
};

export default function ProductsPage() {
  const products = [
    // Design 1 - Carousel Layout
    {
      name: "NQRust HV Hypervisor",
      description: "A memory-safe enterprise hypervisor for modern AI workloads with sub-second VM provisioning and hardware acceleration.",
      href: "/products/nqrust-hv-hypervisor",
      layout: "carousel" as const
    },
    {
      name: "NQRust MicroVM",
      description: "Container-speed, VM-grade security for serverless AI and regulated workloads with perfect balance of performance and isolation.",
      href: "/products/nqrust-microvm",
      layout: "carousel" as const
    },
    {
      name: "NQRust Storage",
      description: "High-performance, distributed storage system with built-in encryption and data integrity guarantees for enterprise workloads.",
      href: "/products/nqrust-storage",
      layout: "carousel" as const
    },
    {
      name: "NQRust FleetMgr",
      description: "Unified fleet management for containers, microVMs, GPUs, and edge deployments with Git-native workflows.",
      href: "/products/nqrust-fleetmgr",
      layout: "carousel" as const
    },
    {
      name: "NQRust SecureGPU",
      description: "GPU partitioning and orchestration for high utilization without noisy neighbors and secure multi-tenant access.",
      href: "/products/nqrust-securegpu",
      layout: "carousel" as const
    },
    {
      name: "NQRust Enclave",
      description: "Confidential computing with hardware TEEs, remote attestation, and verifiable execution for sensitive data processing.",
      href: "/products/nqrust-enclave",
      layout: "carousel" as const
    },
    {
      name: "NQRust Lake",
      description: "A Rust-powered data lakehouse with unified data storage, processing, and analytics capabilities for modern data workloads.",
      href: "/products/nqrust-lake",
      layout: "carousel" as const
    },
    {
      name: "NQRust Analytics",
      description: "Natural language analytics for instant answers over unified data with AI-powered insights and recommendations.",
      href: "/products/nqrust-analytics",
      layout: "carousel" as const
    },
    // Design 2 - Cards Layout
    {
      name: "NQRust Guard",
      description: "Immutable backups, air-gapped restores, and policy-driven data protection for enterprise workloads.",
      href: "/products/nqrust-guard",
      layout: "cards" as const
    },
    {
      name: "NQRust Edge",
      description: "Autonomous edge runtime with offline resilience and smart backhaul reduction capabilities for distributed computing.",
      href: "/products/nqrust-edge",
      layout: "cards" as const
    },
    {
      name: "NQRust AI Appliance",
      description: "AI cloud-in-a-box for on-premises pilots or sovereign deployments with full control over your AI infrastructure.",
      href: "/products/nqrust-ai-appliance",
      layout: "cards" as const
    },
    {
      name: "NQRust LLMOps",
      description: "Opinionated pipelines for fine-tuning, evaluation, and GPU-efficient serving of large language models.",
      href: "/products/nqrust-llmops",
      layout: "cards" as const
    },
    {
      name: "NQRust Identity",
      description: "Zero-trust identity and access management with hardware-backed authentication and fine-grained authorization controls.",
      href: "/products/nqrust-identity",
      layout: "cards" as const
    },
    {
      name: "NQRust ZeroCode",
      description: "Visual workflow builder for creating enterprise applications without writing code, with AI-assisted development.",
      href: "/products/nqrust-zerocode",
      layout: "cards" as const
    },
    {
      name: "NQRust BPMN",
      description: "Business Process Model and Notation engine for designing, executing, and monitoring complex business workflows.",
      href: "/products/nqrust-bpmn",
      layout: "cards" as const
    },
    {
      name: "NQRust Insight",
      description: "Advanced analytics and monitoring platform for gaining deep insights into system performance and operational metrics.",
      href: "/products/nqrust-insight",
      layout: "cards" as const
    }
  ];

  const carouselProducts = products.filter(p => p.layout === 'carousel');
  const cardsProducts = products.filter(p => p.layout === 'cards');

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-[80px]">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Our <span className="text-[#f26522]">Products</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our comprehensive suite of Rust-powered solutions for modern AI infrastructure and enterprise workloads.
          </p>
        </div>

        {/* Carousel Layout Products */}
        <div className="mb-16">
          <div className="flex items-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mr-4">Carousel Layout Products</h2>
            <span className="bg-[#f26522] text-white px-3 py-1 rounded-full text-sm font-medium">
              {carouselProducts.length} products
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {carouselProducts.map((product, index) => (
              <ProductCard
                key={index}
                name={product.name}
                description={product.description}
                href={product.href}
                layout={product.layout}
              />
            ))}
          </div>
        </div>

        {/* Cards Layout Products */}
        <div>
          <div className="flex items-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mr-4">Cards Layout Products</h2>
            <span className="bg-[#dc5d21] text-white px-3 py-1 rounded-full text-sm font-medium">
              {cardsProducts.length} products
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {cardsProducts.map((product, index) => (
              <ProductCard
                key={index}
                name={product.name}
                description={product.description}
                href={product.href}
                layout={product.layout}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
