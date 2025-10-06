'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { LiquidGlassCard } from '@/components/liquid/LiquidGlassCard';

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
              <span className="text-[#ff6b2b]">NQRust </span>
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
              <a
                href={brochureUrl}
                className="inline-flex items-center justify-center gap-2.5 px-3.5 py-2.5 bg-[#f26522] text-white text-sm font-medium rounded-lg shadow-[0px_2px_6px_2px_rgba(0,0,0,0.15),0px_1px_2px_0px_rgba(0,0,0,0.3)] hover:bg-[#e55a1f] transition-colors"
              >
                <DownloadIcon />
                Get Brochure
              </a>
              <a
                href={whitepaperUrl}
                className="inline-flex items-center justify-center gap-2.5 px-3.5 py-2.5 bg-[#fffefd] border border-[#551d00] text-[#551d00] text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                <ScrollTextIcon />
                Whitepaper
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
