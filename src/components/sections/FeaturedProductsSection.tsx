'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

// Image assets from Figma
const imgFeaturedProduct = "http://localhost:3845/assets/bcb3dc5173e194019661369237c5466095327a75.png";

interface ProductCardProps {
  name: string;
  description: string;
  height?: string;
  className?: string;
  productUrl?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ name, description, height = "h-[309px]", className, productUrl }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Check if mobile on mount and resize
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isMobile) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setMousePosition({ x, y });
  };

  const handleProductClick = () => {
    if (productUrl) {
      router.push(productUrl);
    }
  };

  return (
    <div
      ref={cardRef}
      className={cn(
        "relative overflow-hidden rounded-xl p-7 cursor-pointer transition-all duration-500",
        "bg-transparent border border-[#b0b0b0]",
        isMobile ? "h-auto" : (isHovered ? "min-h-fit" : height),
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
      style={!isMobile ? {
        transform: isHovered 
          ? `perspective(1000px) rotateX(${((mousePosition.y - 150) / 150) * 3}deg) rotateY(${((150 - mousePosition.x) / 150) * 3}deg) scale3d(1.02, 1.02, 1.02)` 
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        filter: isHovered 
          ? `blur(0.5px) saturate(140%) contrast(120%)` 
          : 'blur(0px) saturate(100%) contrast(100%)'
      } : {}}
    >
      {/* Liquid glass effect overlay - Desktop only */}
      {!isMobile && (
        <div 
          className="absolute inset-0 opacity-0 transition-opacity duration-500 rounded-xl"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 255, 255, 0.15) 0%, transparent 50%)`,
            opacity: isHovered ? 1 : 0,
            transform: isHovered 
              ? `translate(${(mousePosition.x - 150) * 0.05}px, ${(mousePosition.y - 150) * 0.05}px) scale(1.02)` 
              : 'translate(0px, 0px) scale(1)',
            filter: isHovered 
              ? `blur(0.5px) saturate(140%)` 
              : 'blur(0px) saturate(100%)'
          }}
        />
      )}
      
      {/* Chromatic aberration effect - Desktop only */}
      {!isMobile && isHovered && (
        <div 
          className="absolute inset-0 opacity-0 transition-opacity duration-300 rounded-xl pointer-events-none"
          style={{
            background: `conic-gradient(from ${mousePosition.x}deg at ${mousePosition.x}px ${mousePosition.y}px, 
              rgba(255, 0, 150, 0.08), 
              rgba(0, 255, 255, 0.08), 
              rgba(255, 255, 0, 0.08), 
              rgba(255, 0, 150, 0.08))`,
            opacity: 0.6,
            mixBlendMode: 'screen'
          }}
        />
      )}
      
      {/* Floating Button - Primary */}
      <div 
        className={cn(
          "absolute top-4 right-4 z-20 transition-all duration-500",
          isMobile 
            ? "opacity-100 transform scale-100" 
            : (isHovered 
              ? "opacity-100 transform scale-100" 
              : "opacity-0 transform scale-75")
        )}
      >
        <button 
          onClick={handleProductClick}
          className="w-8 h-8 bg-[#f26522] rounded-lg flex items-center justify-center hover:bg-[#e55a1e] transition-colors duration-300 shadow-lg hover:shadow-xl"
        >
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </button>
      </div>
      
      {/* Content */}
      <div className={cn(
        "relative z-10 flex flex-col text-center transition-all duration-500",
        isMobile 
          ? "justify-start" 
          : (isHovered ? "justify-start" : "justify-center h-full")
      )}>
        {/* Title */}
        <div className={cn(
          "transition-all duration-500",
          (isMobile || isHovered) ? "mb-4" : "mb-0"
        )}>
          <p className="font-montserrat font-medium text-[#fffefd] text-base leading-[1.3] px-2">
            {name}
          </p>
        </div>
        
        {/* Description - Always visible on mobile, hover on desktop */}
        <div className={cn(
          "transition-all duration-500",
          (isMobile || isHovered)
            ? "opacity-100 transform translate-y-0" 
            : "opacity-0 transform translate-y-4"
        )}>
          <p className="font-montserrat font-normal text-[#fffefd] text-sm leading-[1.4] px-2">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

interface FeaturedProductsSectionProps {
  className?: string;
}

const FeaturedProductsSection: React.FC<FeaturedProductsSectionProps> = ({ className }) => {
  return (
    <section className={cn('relative overflow-hidden', className)}>
      {/* Background */}
      <div className="absolute inset-0 bg-[#dc5d21]">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            alt="Featured Product Background" 
            className="absolute h-[185.3%] left-[29%] max-w-none top-[-42.65%] w-full object-cover" 
            src={imgFeaturedProduct} 
          />
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex items-center justify-between px-[70px] relative z-10">
        {/* Title Section */}
        <div className="flex flex-col gap-2 items-start justify-center leading-[1.3] shrink-0">
          <p className="font-montserrat font-semibold text-[#551d00] text-[32px]">
            FEATURED
          </p>
          <p className="font-montserrat font-bold text-[#fffefd] text-[54px]">
            PRODUCTS
          </p>
        </div>

        {/* Products Grid - Desktop with Scroll */}
        <div className="flex gap-[14px] h-[327px] items-start justify-center px-[38px] overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent hover:scrollbar-thumb-white/40">
          {/* Column 1 */}
          <div className="flex flex-col gap-[14px] w-[271px]">
            <ProductCard 
              name="NQRust-HV Hypervisor" 
              description="Memory-safe enterprise hypervisor with sub-second provisioning and hardware-enforced isolation."
              height="h-[180px]"
              productUrl="/products/nqrust-hv-hypervisor"
            />
            <ProductCard 
              name="NQRust-MicroVM" 
              description="Container-speed, VM-grade security, perfect for serverless AI and regulated workloads."
              height="h-[160px]"
              productUrl="/products/nqrust-microvm"
            />
            <ProductCard 
              name="NQRust-Storage" 
              description="Memory-safe distributed storage achieving 9x faster I/O performance and 90% cost reduction."
              height="h-[170px]"
              productUrl="/products/nqrust-storage"
            />
            <ProductCard 
              name="NQRust-FleetMgr" 
              description="Unified Git-native control plane for managing MicroVMs, containers, and GPU resources with 9x faster deployments."
              height="h-[150px]"
              productUrl="/products/nqrust-fleetmgr"
            />
            <ProductCard 
              name="NQRust-SecureGPU" 
              description="GPU partitioning and orchestration for high utilization without noisy neighbors."
              height="h-[160px]"
              productUrl="/products/nqrust-securegpu"
            />
            <ProductCard 
              name="NQRust-Enclave" 
              description="Confidential computing with hardware TEEs, remote attestation, and verifiable execution."
              height="h-[155px]"
              productUrl="/products/nqrust-enclave"
            />
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-[14px] w-[271px]">
            <ProductCard 
              name="NQRust-Lake" 
              description="A Rust-powered lakehouse plus NL analytics for instant answers over unified data."
              height="h-[165px]"
              productUrl="/products/nqrust-lake"
            />
            <ProductCard 
              name="NQRust-Analytics" 
              description="Advanced analytics platform with real-time processing and business intelligence capabilities."
              height="h-[155px]"
              productUrl="/products/nqrust-analytics"
            />
            <ProductCard 
              name="NQRust-Insight" 
              description="AI-powered insights and monitoring for enterprise infrastructure and application performance."
              height="h-[170px]"
              productUrl="/products/nqrust-insight"
            />
            <ProductCard 
              name="NQRust-Guard" 
              description="Immutable backups, air-gapped restores, and policy-driven data protection for enterprise workloads."
              height="h-[160px]"
              productUrl="/products/nqrust-guard"
            />
            <ProductCard 
              name="NQRust-Edge" 
              description="Autonomous edge runtime with offline resilience and smart backhaul reduction capabilities."
              height="h-[175px]"
              productUrl="/products/nqrust-edge"
            />
            <ProductCard 
              name="NQRust-AI Appliance" 
              description="AI cloud-in-a-box for on-prem pilots or sovereign deployments with full control."
              height="h-[160px]"
              productUrl="/products/nqrust-ai-appliance"
            />
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-[14px] w-[271px]">
            <ProductCard 
              name="NQRust-LLMOps" 
              description="Opinionated pipelines for fine-tuning, evaluation, and GPU-efficient serving of models."
              height="h-[150px]"
              productUrl="/products/nqrust-llmops"
            />
            <ProductCard 
              name="NQRust-Identity" 
              description="Universal Single Sign-On across applications with OAuth 2.0, OpenID Connect, and SAML compliance."
              height="h-[160px]"
              productUrl="/products/nqrust-identity"
            />
            <ProductCard 
              name="NQRust-ZeroCode" 
              description="9x faster API development with drag-and-drop GUI for legacy system integration and automation."
              height="h-[155px]"
              productUrl="/products/nqrust-zerocode"
            />
            <ProductCard 
              name="NQRust-BPMN" 
              description="Process automation using BPMN notation and DMN decision engine with 300% productivity improvement."
              height="h-[165px]"
              productUrl="/products/nqrust-bpmn"
            />
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden bg-[#dc5d21] flex flex-col gap-7 items-start px-4 pt-6 relative z-10">
        {/* Title Section - Mobile */}
        <div className="flex flex-col gap-2 items-start justify-center leading-[1.3]">
          <p className="font-montserrat font-normal text-[#551d00] text-lg">
            FEATURED
          </p>
          <p className="font-montserrat font-semibold text-[#fffefd] text-2xl">
            PRODUCTS
          </p>
        </div>

        {/* Products Grid - Mobile - 2 columns side by side */}
        <div className="flex gap-[14px] items-start w-full">
          {/* Column 1 */}
          <div className="flex flex-col gap-[14px] flex-1">
            <ProductCard 
              name="NQRust-HV Hypervisor" 
              description="Memory-safe enterprise hypervisor with sub-second provisioning and hardware-enforced isolation."
              productUrl="/products/nqrust-hv-hypervisor"
            />
            <ProductCard 
              name="NQRust-MicroVM" 
              description="Container-speed, VM-grade security, perfect for serverless AI and regulated workloads."
              productUrl="/products/nqrust-microvm"
            />
            <ProductCard 
              name="NQRust-Storage" 
              description="Memory-safe distributed storage achieving 9x faster I/O performance and 90% cost reduction."
              productUrl="/products/nqrust-storage"
            />
            <ProductCard 
              name="NQRust-FleetMgr" 
              description="Unified Git-native control plane for managing MicroVMs, containers, and GPU resources with 9x faster deployments."
              productUrl="/products/nqrust-fleetmgr"
            />
            <ProductCard 
              name="NQRust-SecureGPU" 
              description="GPU partitioning and orchestration for high utilization without noisy neighbors."
              productUrl="/products/nqrust-securegpu"
            />
            <ProductCard 
              name="NQRust-Enclave" 
              description="Confidential computing with hardware TEEs, remote attestation, and verifiable execution."
              productUrl="/products/nqrust-enclave"
            />
            <ProductCard 
              name="NQRust-Lake" 
              description="A Rust-powered lakehouse plus NL analytics for instant answers over unified data."
              productUrl="/products/nqrust-lake"
            />
            <ProductCard 
              name="NQRust-Analytics" 
              description="Advanced analytics platform with real-time processing and business intelligence capabilities."
              productUrl="/products/nqrust-analytics"
            />
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-[14px] flex-1">
            <ProductCard 
              name="NQRust-Insight" 
              description="AI-powered insights and monitoring for enterprise infrastructure and application performance."
              productUrl="/products/nqrust-insight"
            />
            <ProductCard 
              name="NQRust-Guard" 
              description="Immutable backups, air-gapped restores, and policy-driven data protection for enterprise workloads."
              productUrl="/products/nqrust-guard"
            />
            <ProductCard 
              name="NQRust-Edge" 
              description="Autonomous edge runtime with offline resilience and smart backhaul reduction capabilities."
              productUrl="/products/nqrust-edge"
            />
            <ProductCard 
              name="NQRust-AI Appliance" 
              description="AI cloud-in-a-box for on-prem pilots or sovereign deployments with full control."
              productUrl="/products/nqrust-ai-appliance"
            />
            <ProductCard 
              name="NQRust-LLMOps" 
              description="Opinionated pipelines for fine-tuning, evaluation, and GPU-efficient serving of models."
              productUrl="/products/nqrust-llmops"
            />
            <ProductCard 
              name="NQRust-Identity" 
              description="Universal Single Sign-On across applications with OAuth 2.0, OpenID Connect, and SAML compliance."
              productUrl="/products/nqrust-identity"
            />
            <ProductCard 
              name="NQRust-ZeroCode" 
              description="9x faster API development with drag-and-drop GUI for legacy system integration and automation."
              productUrl="/products/nqrust-zerocode"
            />
            <ProductCard 
              name="NQRust-BPMN" 
              description="Process automation using BPMN notation and DMN decision engine with 300% productivity improvement."
              productUrl="/products/nqrust-bpmn"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProductsSection;
