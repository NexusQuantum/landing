'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { LiquidGlassCard } from '@/components/liquid/LiquidGlassCard';

// Mapping product titles to whitepaper files
const whitepaperMapping: { [key: string]: string } = {
  'AI Appliance': '[Nexus] NexusRust Secure-AI-DC v1.0.pdf',
  'FleetMgr': '[Nexus] NQRust-FleetMgr v2.0.pdf',
  'HV Hypervisor': '[Nexus] NQRust-HV v2.0.pdf',
  'Lake': '[Nexus] NQRust-Lake v2.0.pdf',
  'MicroVM': '[Nexus] NQRust-MicroVM v1.0.pdf',
  'Storage': '[Nexus] NQRust-Storage v2.0.pdf',
  'Edge': '[Nexus] NQRust-Edge v1.0.pdf',
  'Identity': '[Nexus] NQRust-Identity v1.0.pdf',
  'LLMOps': '[Nexus] NQRust-LLMOps v1.0.pdf',
  'SecureGPU': '[Nexus] NQRust-SecureGPU v1.0.pdf',
  // Products without whitepaper files (will be disabled)
  'Analytics': '',
  'BPMN': '',
  'Enclave': '',
  'Guard': '',
  'HV': '',
  'Insight': '',
  'ZeroCode': '',
};

// Mapping product titles to brochure files
const brochureMapping: { [key: string]: string } = {
  'AI Appliance': '[Nexus] Brochure NQRust-AI Appliance v1.0.pdf',
  'Analytics': '[Nexus] Brochure NQRust-Analytics v1.0.pdf',
  'BPMN': '[Nexus] Brochure NQRust-BPMN v1.0.pdf',
  'Edge': '[Nexus] Brochure NQRust-Edge v1.0.pdf',
  'Enclave': '[Nexus] Brochure NQRust-Enclave v1.0.pdf',
  'FleetMgr': '[Nexus] Brochure NQRust-FleetMgr v1.0.pdf',
  'Guard': '[Nexus] Brochure NQRust-Guard v1.0.pdf',
  'HV': '[Nexus] Brochure NQRust-HV v1.0.pdf',
  'HV Hypervisor': '[Nexus] Brochure NQRust-HV v1.0.pdf',
  'Identity': '[Nexus] Brochure NQRust-Identity v1.0.pdf',
  'Insight': '[Nexus] Brochure NQRust-Insight v1.0.pdf',
  'Lake': '[Nexus] Brochure NQRust-Lake v1.0.pdf',
  'LLMOps': '[Nexus] Brochure NQRust-LLMOps v1.0.pdf',
  'MicroVM': '[Nexus] Brochure NQRust-MicroVM v1.0.pdf',
  'SecureGPU': '[Nexus] Brochure NQRust-SecureGPU v1.0.pdf',
  'Storage': '[Nexus] Brochure NQRust-Storage v1.0.pdf',
  'ZeroCode': '[Nexus] Brochure NQRust-ZeroCode v1.0.pdf',
};

// Icons
const DownloadIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 12.75L4.5 8.25H7.5V3H10.5V8.25H13.5L9 12.75Z" fill="currentColor"/>
  </svg>
);

const ScrollTextIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 6H15M3 9H15M3 12H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

interface Benefit {
  id: number;
  title: string;
  description: string;
}

interface ProductDetailLayout1Props {
  productName: string;
  productTitle: string;
  description: string;
  benefits: Benefit[];
  backgroundImage?: string;
  brochureUrl?: string;
  whitepaperUrl?: string;
}

export default function ProductDetailLayout1({
  productName,
  productTitle,
  description,
  benefits,
  backgroundImage = "/bg-product.png",
  brochureUrl = "#",
  whitepaperUrl = "#"
}: ProductDetailLayout1Props) {
  const [activeBenefit, setActiveBenefit] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isDownloadingBrochure, setIsDownloadingBrochure] = useState(false);
  
  // Check if whitepaper file exists
  const whitepaperFileName = whitepaperMapping[productTitle];
  const hasWhitepaper = !!whitepaperFileName && whitepaperFileName.trim() !== '';
  const actualWhitepaperUrl = hasWhitepaper ? `/Finalized Whitepaper/${whitepaperFileName}` : "#";

  // Check if brochure file exists
  const brochureFileName = brochureMapping[productTitle];
  const hasBrochure = !!brochureFileName && brochureFileName.trim() !== '';
  const actualBrochureUrl = hasBrochure ? `/Finalized Brochure/${brochureFileName}` : "#";

  // Handle whitepaper download
  const handleWhitepaperDownload = async () => {
    if (hasWhitepaper && !isDownloading) {
      setIsDownloading(true);
      try {
        // Fetch the file first to ensure it exists
        const response = await fetch(actualWhitepaperUrl);
        if (response.ok) {
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = whitepaperFileName;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
        } else {
          // Fallback: Open in new tab if fetch fails
          window.open(actualWhitepaperUrl, '_blank');
        }
      } catch (error) {
        console.error('Download failed:', error);
        // Fallback: Open in new tab
        window.open(actualWhitepaperUrl, '_blank');
      } finally {
        setIsDownloading(false);
      }
    }
  };

  // Handle brochure download
  const handleBrochureDownload = async () => {
    if (hasBrochure && !isDownloadingBrochure) {
      setIsDownloadingBrochure(true);
      try {
        // Fetch the file first to ensure it exists
        const response = await fetch(actualBrochureUrl);
        if (response.ok) {
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = brochureFileName;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
        } else {
          // Fallback: Open in new tab if fetch fails
          window.open(actualBrochureUrl, '_blank');
        }
      } catch (error) {
        console.error('Download failed:', error);
        // Fallback: Open in new tab
        window.open(actualBrochureUrl, '_blank');
      } finally {
        setIsDownloadingBrochure(false);
      }
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Navbar */}
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-[415px] flex items-center justify-center px-4 sm:px-8 lg:px-[100px] py-12 pt-24">
        <div className="absolute inset-0">
          <Image
            src={backgroundImage}
            alt="Product background"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-black/80" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-8 lg:px-[70px]">
          <LiquidGlassCard
            style={{
              background: 'rgba(0, 0, 0, 0.3)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '30px',
              padding: '70px'
            }}
          >
            <h1 className="font-bold text-3xl sm:text-4xl lg:text-[54px] leading-[1.3] mb-4">
              <span className="bg-gradient-to-b from-[#FF5001] to-[#FF9C6D] bg-clip-text text-transparent">NQRust </span>
              <span className="text-[#fffefd]">{productTitle}</span>
            </h1>
            <p className="font-medium text-base sm:text-lg lg:text-[18px] leading-[1.3] text-[#fffefd]">
              {description}
            </p>
          </LiquidGlassCard>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="px-4 sm:px-8 lg:px-[100px] py-12 lg:py-[60px]">
        <div className="flex flex-col lg:flex-row gap-7 max-w-6xl mx-auto lg:justify-center">
          {/* Sidebar Menu - Desktop */}
          <div className="hidden lg:flex flex-col gap-3.5 w-[270px] flex-shrink-0">
            {benefits.map((benefit, index) => (
              <button
                key={benefit.id}
                onClick={() => setActiveBenefit(index)}
                className={`flex items-center gap-3.5 p-0 transition-colors ${
                  activeBenefit === index ? 'text-[#f26522]' : 'text-[#888888]'
                }`}
              >
                <div
                  className={`w-[43px] h-[43px] rounded-full flex items-center justify-center flex-shrink-0 ${
                    activeBenefit === index ? 'bg-[#f26522]' : 'bg-[#888888]'
                  }`}
                >
                  <span className="font-medium text-[18px] text-white">
                    {index + 1}
                  </span>
                </div>
                <span className="font-medium text-[16px] leading-[1.3] text-left">
                  {benefit.title}
                </span>
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="w-[386px]">
            {/* Mobile Sidebar - Show on mobile */}
            <div className="lg:hidden mb-7">
              <div className="flex flex-col gap-3.5">
                {benefits.map((benefit, index) => (
                  <button
                    key={benefit.id}
                    onClick={() => setActiveBenefit(index)}
                    className={`flex items-center gap-3.5 p-0 transition-colors ${
                      activeBenefit === index ? 'text-[#f26522]' : 'text-[#888888]'
                    }`}
                  >
                    <div
                      className={`w-[43px] h-[43px] rounded-full flex items-center justify-center flex-shrink-0 ${
                        activeBenefit === index ? 'bg-[#f26522]' : 'bg-[#888888]'
                      }`}
                    >
                      <span className="font-medium text-[18px] text-white">
                        {index + 1}
                      </span>
                    </div>
                    <span className="font-medium text-[16px] leading-[1.3] text-left">
                      {benefit.title}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="mb-3.5">
              <p className="font-normal text-sm sm:text-base leading-[1.3] text-[#3d3d3d]">
                {benefits[activeBenefit]?.description || benefits[0]?.description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3.5">
              <button
                onClick={handleBrochureDownload}
                disabled={!hasBrochure || isDownloadingBrochure}
                className={`inline-flex items-center justify-center gap-2.5 px-3.5 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 transform ${
                  hasBrochure && !isDownloadingBrochure
                    ? 'bg-[#f26522] text-white shadow-[0px_2px_6px_2px_rgba(0,0,0,0.15),0px_1px_2px_0px_rgba(0,0,0,0.3)] hover:bg-[#e55a1f] hover:scale-105 hover:shadow-lg hover:shadow-[#f26522]/25 cursor-pointer active:scale-95'
                    : hasBrochure && isDownloadingBrochure
                    ? 'bg-[#f26522] border border-[#f26522] text-white cursor-wait'
                    : 'bg-gray-400 border border-gray-400 text-gray-600 cursor-not-allowed'
                }`}
              >
                {isDownloadingBrochure ? (
                  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <DownloadIcon />
                )}
                {isDownloadingBrochure ? 'Downloading...' : hasBrochure ? 'Get Brochure' : 'Coming Soon'}
              </button>
              <button
                onClick={handleWhitepaperDownload}
                disabled={!hasWhitepaper || isDownloading}
                className={`inline-flex items-center justify-center gap-2.5 px-3.5 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 transform ${
                  hasWhitepaper && !isDownloading
                    ? 'bg-[#fffefd] border border-[#551d00] text-[#551d00] hover:bg-gray-50 hover:scale-105 hover:shadow-lg cursor-pointer active:scale-95'
                    : hasWhitepaper && isDownloading
                    ? 'bg-[#f26522] border border-[#f26522] text-white cursor-wait'
                    : 'bg-gray-400 border border-gray-400 text-gray-600 cursor-not-allowed'
                }`}
              >
                {isDownloading ? (
                  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <ScrollTextIcon />
                )}
                {isDownloading ? 'Downloading...' : hasWhitepaper ? 'Whitepaper' : 'Coming Soon'}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
