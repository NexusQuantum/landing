'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { LiquidGlassCard } from '@/components/liquid/LiquidGlassCard';

// Mapping product titles to whitepaper files
const whitepaperMapping: { [key: string]: string } = {
  'AI Appliance': '[Nexus] NQRust Secure-AI-DC v1.0.pdf',
  'Analytics': '[Nexus] NQRust-Analytics v2.0.pdf',
  'FleetMgr': '[Nexus] NQRust-FleetMgr v1.0.pdf',
  'HV Hypervisor': '[Nexus] NQRust-HV v1.0.pdf',
  'Lake': '[Nexus] NQRust-Lake v1.0.pdf',
  'MicroVM': '[Nexus] NQRust-MicroVM v1.0.pdf',
  'Storage': '[Nexus] NQRust-Storage v1.0.pdf',
  // Products without whitepaper files (will be disabled)
  'BPMN': '',
  'Edge': '',
  'Enclave': '',
  'Guard': '',
  'HV': '',
  'Identity': '',
  'Insight': '',
  'LLMOps': '',
  'SecureGPU': '',
  'ZeroCode': '',
};

interface Benefit {
  id: number;
  title: string;
  description: string;
}

interface ProductDetailLayout2Props {
  productName: string;
  productTitle: string;
  description: string;
  benefits: Benefit[];
  backgroundImage?: string;
  brochureUrl?: string;
  whitepaperUrl?: string;
}

export default function ProductDetailLayout2({
  productName,
  productTitle,
  description,
  benefits,
  backgroundImage = "/bg-product.png",
  brochureUrl = "#",
  whitepaperUrl = "#"
}: ProductDetailLayout2Props) {
  const [isDownloading, setIsDownloading] = useState(false);
  
  // Check if whitepaper file exists
  const whitepaperFileName = whitepaperMapping[productTitle];
  const hasWhitepaper = !!whitepaperFileName && whitepaperFileName.trim() !== '';
  const actualWhitepaperUrl = hasWhitepaper ? `/whitepaper-product/${whitepaperFileName}` : "#";

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
  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <Navbar />
      
      {/* Main Content with Background */}
      <div className="relative min-h-screen">
        {/* Background Image */}
        <div className="fixed inset-0 -z-10">
          <Image
            src={backgroundImage}
            alt="Product background"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Overlay and Content */}
        <div className="relative bg-black/80 min-h-screen flex flex-col items-center justify-center px-4 sm:px-8 lg:px-[100px] py-8 lg:py-12 pt-24">
          {/* Hero Section */}
          <div className="w-full max-w-5xl mx-auto text-center px-4 sm:px-8 lg:px-[70px] mb-4">
            <LiquidGlassCard
              style={{
                background: 'rgba(0, 0, 0, 0.3)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '30px',
                padding: '70px'
              }}
            >
              <h1 className="font-bold text-2xl sm:text-3xl lg:text-[54px] leading-[1.3] mb-4">
                <span className="bg-gradient-to-b from-[#FF5001] to-[#FF9C6D] bg-clip-text text-transparent">NQRust </span>
                <span className="text-[#fffefd]">{productTitle}</span>
              </h1>
              <p className="font-medium text-base sm:text-lg lg:text-[18px] leading-[1.3] text-[#fffefd] mb-6">
                {description}
              </p>
              
              {/* Brochure and Whitepaper Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href={brochureUrl}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#ff6b2b] text-white font-medium rounded-lg hover:bg-[#e55a20] hover:scale-105 hover:shadow-lg hover:shadow-[#ff6b2b]/25 transition-all duration-300 min-w-[180px] transform active:scale-95"
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 12.75L4.5 8.25H7.5V3H10.5V8.25H13.5L9 12.75Z" fill="currentColor"/>
                  </svg>
                  Get Brochure
                </a>
                <button
                  onClick={handleWhitepaperDownload}
                  disabled={!hasWhitepaper || isDownloading}
                  className={`inline-flex items-center justify-center gap-2 px-6 py-3 font-medium rounded-lg transition-all duration-300 min-w-[180px] transform ${
                    hasWhitepaper && !isDownloading
                      ? 'bg-transparent border-2 border-[#ff6b2b] text-[#ff6b2b] hover:bg-[#ff6b2b] hover:text-white hover:scale-105 hover:shadow-lg hover:shadow-[#ff6b2b]/25 cursor-pointer active:scale-95'
                      : hasWhitepaper && isDownloading
                      ? 'bg-[#ff6b2b] border-2 border-[#ff6b2b] text-white cursor-wait'
                      : 'bg-gray-400 border-2 border-gray-400 text-gray-600 cursor-not-allowed'
                  }`}
                >
                  {isDownloading ? (
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 6H15M3 9H15M3 12H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                  {isDownloading ? 'Downloading...' : hasWhitepaper ? 'Whitepaper' : 'Coming Soon'}
                </button>
              </div>
            </LiquidGlassCard>
          </div>

          {/* Benefits Grid */}
          <div className="w-full max-w-5xl px-4 sm:px-8 lg:px-[70px]">
            {/* Desktop Layout - 3 columns */}
            <div className="hidden lg:flex gap-3.5 w-full">
              {benefits.slice(0, 3).map((benefit, index) => (
                <LiquidGlassCard
                  key={benefit.id}
                  style={{
                    background: 'rgba(0, 0, 0, 0.2)',
                    backdropFilter: 'blur(15px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '10px',
                    padding: '14px',
                    textAlign: 'center',
                    color: '#fffefd',
                    flex: index === 0 ? '0 0 297px' : '1',
                    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 8px 32px'
                  }}
                >
                  <h3 className="font-semibold text-[16px] leading-[1.3] mb-2">
                    {benefit.title}
                  </h3>
                  <p className="font-normal text-[14px] leading-[1.3]">
                    {benefit.description}
                  </p>
                </LiquidGlassCard>
              ))}
            </div>

            {/* Mobile Layout - Stacked cards */}
            <div className="lg:hidden flex flex-col gap-4 w-full max-w-[380px] mx-auto">
              {benefits.slice(0, 3).map((benefit, index) => (
                <LiquidGlassCard
                  key={benefit.id}
                  style={{
                    background: 'rgba(0, 0, 0, 0.2)',
                    backdropFilter: 'blur(15px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '10px',
                    padding: '14px',
                    textAlign: 'center',
                    color: '#fffefd',
                    height: '204px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 8px 32px'
                  }}
                >
                  <h3 className="font-semibold text-[16px] leading-[1.3] mb-2">
                    {benefit.title}
                  </h3>
                  
                  {/* Decorative line */}
                  <div className="w-full h-px bg-gray-500 mb-2" />
                  
                  <p className="font-normal text-[14px] leading-[1.3]">
                    {benefit.description}
                  </p>
                </LiquidGlassCard>
              ))}
            </div>
          </div>

        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
