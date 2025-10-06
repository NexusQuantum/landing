'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

// Image assets from Figma
const imgFrame66 = "http://localhost:3845/assets/70faf7b4d3adbde087fafc756203bcba791e5e2f.svg";
const imgFrame65 = "http://localhost:3845/assets/e33490db36c745cfed4910abf026fb437f169190.svg";
const imgFrame67 = "http://localhost:3845/assets/d6c1ff5c48629025c83633e70093074ba9f67a22.svg";

interface TargetAudience {
  id: string;
  title: string;
  description: string;
  icon: string;
}

const targetAudiences: TargetAudience[] = [
  {
    id: 'infrastructure',
    title: 'Infrastructure Leaders',
    description: 'modernizing virtualization and GPU fleets',
    icon: imgFrame66
  },
  {
    id: 'data-ai',
    title: 'Data & AI Teams',
    description: 'shipping LLM features safely, quickly, and repeatedly',
    icon: imgFrame65
  },
  {
    id: 'regulated',
    title: 'Regulated Industries',
    description: 'that need sovereignty and verifiable controls—without losing velocity.',
    icon: imgFrame67
  }
];

const carouselWords = ['WHO', 'WE', 'SERVE'];

interface WhoWeServeSectionProps {
  className?: string;
}

const WhoWeServeSection: React.FC<WhoWeServeSectionProps> = ({ className }) => {
  const [currentIndex, setCurrentIndex] = useState(1); // Start with "WE" (index 1)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [cardHovered, setCardHovered] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Auto-rotate carousel (both words and cards together)
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselWords.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // Handle click to change carousel position
  const handleWordClick = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false); // Stop auto-play when manually clicked
    
    // Resume auto-play after 5 seconds
    setTimeout(() => {
      setIsAutoPlaying(true);
    }, 5000);
  };

  // Handle mouse events for liquid glass effect
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>, cardIndex: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
  };

  const handleCardMouseEnter = (cardIndex: number) => {
    setCardHovered(cardIndex);
  };

  const handleCardMouseLeave = () => {
    setCardHovered(null);
  };

  return (
    <section className={cn('bg-[#fff3ed] relative overflow-hidden', className)}>
      {/* Desktop Layout */}
      <div className="hidden lg:flex gap-9 items-center justify-center p-[70px]">
        {/* Target Audience Cards */}
        <div className="flex flex-col gap-10 h-[254px] items-start justify-center overflow-hidden w-[463px]">
          {targetAudiences.map((audience, index) => (
            <div
              key={audience.id}
              className={cn(
                "flex flex-col gap-[14px] h-[254px] items-start justify-center p-7 rounded-[10px] w-full transition-all duration-500 cursor-pointer relative overflow-hidden",
                "bg-white/10 backdrop-blur-sm border border-[#f26522]/30",
                index === currentIndex 
                  ? "opacity-100 transform translate-y-0" 
                  : "opacity-0 transform -translate-y-8 absolute"
              )}
              onMouseMove={(e) => handleCardMouseMove(e, index)}
              onMouseEnter={() => handleCardMouseEnter(index)}
              onMouseLeave={handleCardMouseLeave}
              style={{
                transform: cardHovered === index && index === currentIndex
                  ? `perspective(1000px) rotateX(${((mousePosition.y - 127) / 127) * 3}deg) rotateY(${((127 - mousePosition.x) / 127) * 3}deg) scale3d(1.02, 1.02, 1.02)`
                  : index === currentIndex 
                    ? 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
                    : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
                filter: cardHovered === index && index === currentIndex
                  ? `blur(0.5px) saturate(140%) contrast(120%)`
                  : 'blur(0px) saturate(100%) contrast(100%)'
              }}
            >
              {/* Liquid glass effect overlay */}
              {cardHovered === index && index === currentIndex && (
                <div 
                  className="absolute inset-0 opacity-0 transition-opacity duration-300 rounded-[10px]"
                  style={{
                    background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 255, 255, 0.15) 0%, transparent 50%)`,
                    opacity: 1,
                    transform: `translate(${(mousePosition.x - 127) * 0.05}px, ${(mousePosition.y - 127) * 0.05}px) scale(1.02)`,
                    filter: `blur(0.5px) saturate(140%)`
                  }}
                />
              )}
              
              {/* Chromatic aberration effect */}
              {cardHovered === index && index === currentIndex && (
                <div 
                  className="absolute inset-0 opacity-0 transition-opacity duration-300 rounded-[10px] pointer-events-none"
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
              
              {/* Icon */}
              <div className="h-[7px] w-[29px] relative z-10">
                <img 
                  alt="" 
                  className="block max-w-none size-full" 
                  src={audience.icon} 
                />
              </div>
              
              {/* Content */}
              <div className="flex flex-col gap-2 items-start leading-[1.3] w-full relative z-10">
                <p className="font-montserrat font-semibold text-[#f26522] text-base w-full">
                  {audience.title}
                </p>
                <p className="font-montserrat font-medium text-[#551d00] text-sm w-full">
                  {audience.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Words */}
        <div className="flex flex-col gap-[14px] items-start">
          {carouselWords.map((word, index) => (
            <div
              key={word}
              className={cn(
                "flex gap-[10px] items-center w-[200px] transition-all duration-500 cursor-pointer",
                index === currentIndex 
                  ? "transform scale-105" 
                  : "transform scale-100 hover:scale-102"
              )}
              onClick={() => handleWordClick(index)}
            >
              <p className={cn(
                "font-montserrat font-bold leading-[1.3] text-[54px] text-center whitespace-nowrap transition-colors duration-500",
                index === currentIndex 
                  ? "text-[#f26522]" 
                  : "text-[#888888] hover:text-[#f26522]/70"
              )}>
                {word}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden flex flex-col gap-9 items-center justify-center px-4 py-[70px]">
        {/* Carousel Words */}
        <div className="flex flex-col gap-[14px] items-center">
          {carouselWords.map((word, index) => (
            <div
              key={word}
              className={cn(
                "flex gap-[10px] items-center w-[200px] transition-all duration-500 cursor-pointer",
                index === currentIndex 
                  ? "transform scale-105" 
                  : "transform scale-100 hover:scale-102"
              )}
              onClick={() => handleWordClick(index)}
            >
              <p className={cn(
                "font-montserrat font-bold leading-[1.3] text-[54px] text-center whitespace-nowrap transition-colors duration-500",
                index === currentIndex 
                  ? "text-[#f26522]" 
                  : "text-[#888888] hover:text-[#f26522]/70"
              )}>
                {word}
              </p>
            </div>
          ))}
        </div>

        {/* Target Audience Cards - Mobile */}
        <div className="flex flex-col gap-10 h-[254px] items-start justify-center overflow-hidden w-full">
          {targetAudiences.map((audience, index) => (
            <div
              key={audience.id}
              className={cn(
                "flex flex-col gap-[14px] h-[254px] items-start justify-center p-7 rounded-[10px] w-full transition-all duration-500 cursor-pointer relative overflow-hidden",
                "bg-white/10 backdrop-blur-sm border border-[#f26522]/30",
                index === currentIndex 
                  ? "opacity-100 transform translate-y-0" 
                  : "opacity-0 transform -translate-y-8 absolute"
              )}
              onMouseMove={(e) => handleCardMouseMove(e, index)}
              onMouseEnter={() => handleCardMouseEnter(index)}
              onMouseLeave={handleCardMouseLeave}
              style={{
                transform: cardHovered === index && index === currentIndex
                  ? `perspective(1000px) rotateX(${((mousePosition.y - 127) / 127) * 3}deg) rotateY(${((127 - mousePosition.x) / 127) * 3}deg) scale3d(1.02, 1.02, 1.02)`
                  : index === currentIndex 
                    ? 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
                    : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
                filter: cardHovered === index && index === currentIndex
                  ? `blur(0.5px) saturate(140%) contrast(120%)`
                  : 'blur(0px) saturate(100%) contrast(100%)'
              }}
            >
              {/* Liquid glass effect overlay */}
              {cardHovered === index && index === currentIndex && (
                <div 
                  className="absolute inset-0 opacity-0 transition-opacity duration-300 rounded-[10px]"
                  style={{
                    background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 255, 255, 0.15) 0%, transparent 50%)`,
                    opacity: 1,
                    transform: `translate(${(mousePosition.x - 127) * 0.05}px, ${(mousePosition.y - 127) * 0.05}px) scale(1.02)`,
                    filter: `blur(0.5px) saturate(140%)`
                  }}
                />
              )}
              
              {/* Chromatic aberration effect */}
              {cardHovered === index && index === currentIndex && (
                <div 
                  className="absolute inset-0 opacity-0 transition-opacity duration-300 rounded-[10px] pointer-events-none"
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
              
              {/* Icon */}
              <div className="h-[7px] w-[29px] relative z-10">
                <img 
                  alt="" 
                  className="block max-w-none size-full" 
                  src={audience.icon} 
                />
              </div>
              
              {/* Content */}
              <div className="flex flex-col gap-2 items-start leading-[1.3] w-full relative z-10">
                <p className="font-montserrat font-semibold text-[#f26522] text-base w-full">
                  {audience.title}
                </p>
                <p className="font-montserrat font-medium text-[#551d00] text-sm w-full">
                  {audience.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoWeServeSection;
