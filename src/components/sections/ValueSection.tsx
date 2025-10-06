'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import ValueCard from '@/components/ui/ValueCard';

// Image assets from Figma
const imgSubtract1 = "http://localhost:3845/assets/5eb55e288ca5d631fe8da240260d146b4dd6a07a.png";

interface ValueSectionProps {
  className?: string;
}

const ValueSection: React.FC<ValueSectionProps> = ({ className }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const valueElement = document.getElementById('value-section');
    if (valueElement) {
      observer.observe(valueElement);
    }

    return () => {
      if (valueElement) {
        observer.unobserve(valueElement);
      }
    };
  }, []);

  const valuePillars = [
    {
      title: "Security by Construction",
      description: "Rust across the stack: hypervisor, microVM, GPU, orchestration, observability. Memory safety, strict isolation, and zero-trust defaults.",
      image: "/value-pillar/security.png"
    },
    {
      title: "Performance Without Compromise",
      description: "MicroVM-class startup, GPU-aware scheduling, and low-latency pipelines, end-to-end.",
      image: "/value-pillar/performance.png"
    },
    {
      title: "Sovereign & Compliant",
      description: "Residency controls, auditability, and confidential computing baked in.",
      image: "/value-pillar/Sovereign.png"
    },
    {
      title: "Built for Builders",
      description: "Clean APIs, Git-native workflows, CLI and UI parity, and docs you'll actually enjoy reading.",
      image: "/value-pillar/Built.png"
    }
  ];

  const handleCardClick = (index: number) => {
    if (index === activeCardIndex || isAnimating) return; // Prevent multiple clicks during animation
    
    setIsAnimating(true);
    
    // Start width and stepper animation first
    setTimeout(() => {
      setActiveCardIndex(index);
    }, 50); // Reduced delay for smoother transition
    
    // Reset animation state after all animations complete
    setTimeout(() => {
      setIsAnimating(false);
    }, 600); // Increased duration for smoother transition
  };

  return (
    <section id="value-section" className={cn('w-full', className)}>
      <div className="bg-[var(--light-2)] flex flex-col gap-10 items-center justify-center px-4 md:px-0 py-[60px] relative">
        {/* Header Content */}
        <div className={`flex flex-col gap-1 items-center transition-all duration-800 ease-out delay-200 ${
          isVisible 
            ? 'opacity-100 transform translate-y-0' 
            : 'opacity-0 transform translate-y-4'
        }`}>
          {/* Title */}
          <h2 className="text-h2 md:text-h2 font-semibold text-center">
            <span className="text-[var(--primary-dark-1)] md:text-[var(--primary-dark-1)]">VALUE</span>
            <span className="text-[var(--dark-3)]"> PILLARS</span>
          </h2>
          
          {/* Decorative Line */}
          <div 
            className="h-[13px] w-[278px] md:w-[278px] bg-center bg-cover bg-no-repeat opacity-40"
            style={{ backgroundImage: `url('${imgSubtract1}')` }}
          />
        </div>

        {/* Value Pillars Content */}
        <div className="flex flex-col md:flex-row gap-7 items-center w-full max-w-[1200px] px-4 md:pl-[70px] md:pr-0">
          {/* All Value Pillars - Dynamic width based on active state */}
          {valuePillars.map((pillar, index) => (
            <div
              key={index}
              className={`transition-all duration-500 ease-in-out w-full ${
                activeCardIndex === index 
                  ? 'md:w-[569px]' 
                  : 'md:w-[302px]'
              } ${
                isVisible 
                  ? 'opacity-100 transform translate-y-0' 
                  : 'opacity-0 transform translate-y-4'
              }`}
              style={{ transitionDelay: `${400 + (index * 200)}ms` }}
            >
              <ValueCard
                title={pillar.title}
                description={pillar.description}
                image={pillar.image}
                isActive={activeCardIndex === index}
                isAnimating={isAnimating}
                onClick={() => handleCardClick(index)}
              />
            </div>
          ))}
        </div>

        {/* Progress Stepper */}
        <div className={`flex items-center justify-center transition-all duration-800 ease-out delay-1200 ${
          isVisible 
            ? 'opacity-100 transform translate-y-0' 
            : 'opacity-0 transform translate-y-4'
        }`}>
          <div className="relative w-[298px] h-[8px] bg-[var(--primary-1)] rounded-full">
            <div 
              className="absolute top-[2px] h-[4px] bg-[var(--primary-dark-1)] rounded-full transition-all duration-500 ease-in-out"
              style={{
                left: `${3 + (activeCardIndex * 73)}px`, // 3px base + (index * 73px per step)
                width: '88px'
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueSection;
