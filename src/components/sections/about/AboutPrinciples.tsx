'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
// Image assets from public folder
const engineeringImages = {
  0: "/engineering principles/safety first.png",
  1: "/engineering principles/minimal surfaces.png", 
  2: "/engineering principles/deterministic.png",
  3: "/engineering principles/sovereignty.png"
};

interface AboutPrinciplesProps {
  className?: string;
}

interface Principle {
  title: string;
  description: string;
  isActive?: boolean;
}

const AboutPrinciples: React.FC<AboutPrinciplesProps> = ({ className }) => {
  const [activePrinciple, setActivePrinciple] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Auto-rotate principles
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setActivePrinciple((prev) => (prev + 1) % 4);
        setTimeout(() => {
          setIsTransitioning(false);
        }, 50);
      }, 400);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const principles: Principle[] = [
    {
      title: "Safety First",
      description: "Eliminate entire classes of memory errors and side-channel risks by design.",
      isActive: true
    },
    {
      title: "Minimal Surfaces",
      description: "Clean seams between IaaS, PaaS, and SaaS; everything scriptable, everything observable."
    },
    {
      title: "Deterministic Performance", 
      description: "Predictable latency, fast cold starts, and GPU efficiency you can measure."
    },
    {
      title: "Sovereignty as a Feature",
      description: "Residency, encryption, attestation, and auditable workflows—built-in, not bolted-on."
    }
  ];

  return (
    <section className={cn('bg-[#fffbf8] relative', className)}>
      {/* Desktop Layout */}
      <div className="hidden lg:block h-[622px] relative overflow-hidden">
        {/* Title */}
        <h2 className="absolute top-[57px] left-1/2 transform -translate-x-1/2 font-montserrat font-semibold text-[24px] leading-[1.3] text-center whitespace-nowrap">
          <span className="text-[#f26522]">ENGINEERING</span> <span className="text-[#121212]">PRINCIPLES</span>
        </h2>

        {/* Principles List */}
        <div className="absolute left-[753px] top-[138px] w-[528px] flex flex-col gap-[14px]">
          {principles.map((principle, index) => (
            <button
              key={index}
              onClick={() => {
                setIsTransitioning(true);
                setTimeout(() => {
                  setActivePrinciple(index);
                  setIsTransitioning(false);
                  setIsAutoPlaying(false); // Stop auto-play when manually clicked
                  // Resume auto-play after 5 seconds
                  setTimeout(() => {
                    setIsAutoPlaying(true);
                  }, 5000);
                }, 150);
              }}
              className={cn(
                "flex flex-col gap-[8px] items-start pb-[8px] pt-0 px-0 border-b border-[#b0b0b0] w-full text-left transition-all duration-300",
                index === activePrinciple ? "cursor-default" : "cursor-pointer hover:opacity-80"
              )}
            >
              <h3 className={cn(
                "font-montserrat font-semibold text-[18px] leading-[1.3] w-full transition-all duration-300",
                index === activePrinciple ? "text-[#551d00] transform scale-105" : "text-[#b0b0b0]"
              )}>
                {principle.title}
              </h3>
              <p className={cn(
                "font-montserrat font-medium text-[18px] leading-[1.3] w-full transition-all duration-300",
                index === activePrinciple ? "text-[#121212]" : "text-[#b0b0b0]"
              )}>
                {principle.description}
              </p>
            </button>
          ))}
        </div>

        {/* Visual Section */}
        <div className="absolute h-[341px] left-[315px] top-[171px] w-[385px] overflow-hidden rounded-[20px]">
          <img 
            key={activePrinciple}
            alt={principles[activePrinciple].title} 
            className={cn(
              "w-full h-full object-cover rounded-[20px] transition-all duration-500 ease-in-out",
              isTransitioning ? "opacity-0 scale-95 blur-sm" : "opacity-100 scale-100 blur-0"
            )} 
            style={{
              transition: 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out, filter 0.5s ease-in-out'
            }}
            src={engineeringImages[activePrinciple as keyof typeof engineeringImages]} 
          />
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden flex flex-col gap-6 items-center justify-center px-4 py-6 bg-[#fff3ed]">
        {/* Title */}
        <h2 className="font-montserrat font-medium text-[18px] leading-[1.3] text-center whitespace-nowrap">
          <span className="text-[#f26522]">ENGINEERING</span> <span className="text-[#121212]">PRINCIPLES</span>
        </h2>

        {/* Principles List */}
        <div className="flex flex-col gap-[14px] w-full">
          {principles.map((principle, index) => (
            <div
              key={index}
              className="flex flex-col gap-[8px] items-start pb-[8px] pt-0 px-0 border-b border-[#b0b0b0] w-full"
            >
              <h3 className={cn(
                "font-montserrat font-semibold text-[16px] leading-[1.3] w-full",
                index === 0 ? "text-[#551d00]" : "text-[#b0b0b0]"
              )}>
                {principle.title}
              </h3>
              <p className={cn(
                "font-montserrat font-normal text-[14px] leading-[1.3] w-full",
                index === 0 ? "text-[#121212]" : "text-[#b0b0b0]"
              )}>
                {principle.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutPrinciples;

