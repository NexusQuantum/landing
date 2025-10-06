'use client';

import React from 'react';
import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { LiquidGlassCard } from '@/components/liquid/LiquidGlassCard';

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
}

export default function ProductDetailLayout2({
  productName,
  productTitle,
  description,
  benefits,
  backgroundImage = "/bg-product.png"
}: ProductDetailLayout2Props) {
  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <Navbar />
      
      {/* Main Content with Background */}
      <div className="relative min-h-screen">
        {/* Background Image */}
        <div className="absolute inset-0">
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
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-8 lg:px-[70px] mb-4">
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
                <span className="text-[#ff6b2b]">NQRust </span>
                <span className="text-[#fffefd]">{productTitle}</span>
              </h1>
              <p className="font-medium text-base sm:text-lg lg:text-[18px] leading-[1.3] text-[#fffefd]">
                {description}
              </p>
            </LiquidGlassCard>
          </div>

          {/* Benefits Grid */}
          <div className="w-full max-w-4xl">
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
                    flex: index === 0 ? '0 0 297px' : '1'
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
                    justifyContent: 'center'
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
