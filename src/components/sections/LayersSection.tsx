'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';


interface LayersSectionProps {
  className?: string;
}

const LayersSection: React.FC<LayersSectionProps> = ({ className }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const layersElement = document.getElementById('layers-section');
    if (layersElement) {
      observer.observe(layersElement);
    }

    return () => {
      if (layersElement) {
        observer.unobserve(layersElement);
      }
    };
  }, []);

  const layers = [
    {
      title: "IaaS",
      description: "NexusRust-HV (hypervisor), MicroVM, SecureGPU, Edge nodes, AI Appliance."
    },
    {
      title: "PaaS", 
      description: "FleetMgr (unified orchestration), LLMOps (training/serving), Lake (lakehouse), Enclave (confidential compute)."
    },
    {
      title: "SaaS",
      description: "Analytics (NL BI), Insight (AIOps/observability), Guard (data protection)."
    }
  ];

  return (
    <section id="layers-section" className={cn('w-full overflow-hidden', className)}>
      <div className="bg-[var(--light-3)] flex flex-col gap-6 md:gap-7 items-center justify-center px-4 md:px-[70px] py-[36px] relative w-full max-w-full">
        {/* Header Content */}
        <div className={`flex flex-col gap-2 items-center transition-all duration-800 ease-out delay-200 ${
          isVisible 
            ? 'opacity-100 transform translate-y-0' 
            : 'opacity-0 transform translate-y-4'
        }`}>
          {/* Title */}
          <h2 className="text-h2 font-semibold text-[var(--dark-3)] text-center">
            <span>ONE CLOUD, </span>
            <span className="text-[var(--primary-dark-1)]">THREE LAYERS</span>
          </h2>
        </div>

        {/* Layers Content */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-[14px] items-start w-full max-w-[996px] overflow-hidden">
          {layers.map((layer, index) => (
            <div
              key={index}
              className={`flex flex-col gap-2 items-center justify-center p-[14px] rounded-[10px] text-center transition-all duration-800 ease-out bg-white border border-[var(--primary-dark-1)] shadow-lg hover:shadow-xl hover:bg-gray-50 ${
                isVisible 
                  ? 'opacity-100 transform translate-y-0' 
                  : 'opacity-0 transform translate-y-4'
              }`}
              style={{ 
                transitionDelay: `${400 + (index * 200)}ms`,
                width: '100%',
                minHeight: '216px'
              }}
            >
              {/* Layer Title */}
              <h3 className="text-body-medium font-semibold text-[var(--primary-dark-1)] w-full">
                {layer.title}
              </h3>
              
              {/* Layer Description */}
              <p className="text-body-small font-medium text-[var(--primary-dark-3)] w-full leading-[1.3]">
                {layer.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LayersSection;
