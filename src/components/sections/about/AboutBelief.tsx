'use client';

import React from 'react';
import { cn } from '@/lib/utils';
// Image assets from Figma
const imgBeliefSection = "/belief section.png";
const img3 = "http://localhost:3845/assets/0bce868e426ddbcaf37424c57dd6edbd7204c43d.svg";

interface AboutBeliefProps {
  className?: string;
}

const AboutBelief: React.FC<AboutBeliefProps> = ({ className }) => {
  return (
    <section className={cn('relative overflow-hidden', className)}>
      {/* Background */}
      <div className="absolute inset-0 bg-[#f26522]" />
      <div className="absolute inset-0 opacity-40 overflow-hidden">
        <img 
          alt="" 
          className="absolute h-[175.45%] left-0 max-w-none top-[-5.56%] w-full" 
          src={imgBeliefSection} 
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col lg:flex-row gap-4 lg:gap-7 items-center justify-center px-4 lg:px-[279px] py-8 lg:py-[86px] min-h-[300px] lg:min-h-[469px]">
        {/* Our Belief */}
        <div className="w-full lg:w-[417px] bg-transparent border-0 rounded-[20px] p-4 lg:p-7 flex flex-col gap-[14px]">
          <h2 className="font-montserrat font-medium lg:font-semibold text-[18px] lg:text-[43px] leading-[1.3] text-[#fffefd]">
            <span className="text-[#fffefd]">OUR</span> <span className="text-[#551d00]">BELIEF</span>
          </h2>
          <p className="font-montserrat font-normal lg:font-medium text-[14px] lg:text-[18px] leading-[1.3] text-[#fffefd]">
            The future of AI infrastructure is memory-safe, zero-trust, and developer-obsessed. Rust gives us the foundation; rigorous engineering and product craft turn it into a platform that teams love to build on.
          </p>
        </div>

        {/* Whitepaper */}
        <div className="w-full lg:w-[417px] lg:h-[265px] bg-[rgba(18,18,18,0.2)] rounded-[20px] p-4 lg:p-7 flex flex-col gap-[14px] items-center justify-center">
          <h3 className="font-montserrat font-medium lg:font-semibold text-[16px] lg:text-[24px] leading-[1.3] text-[#fffefd] text-center">
            WHITEPAPER
          </h3>
          <p className="font-montserrat font-normal lg:font-medium text-[14px] lg:text-[18px] leading-[1.3] text-[#fffefd] text-center">
            Explore our vision and technology through the Nexus whitepaper
          </p>
          <div className="w-full bg-[#fffefd] flex gap-[10px] items-center justify-center px-[14px] py-[10px] relative rounded-[8px]">
            <div className="absolute border border-[#f26522] inset-0 pointer-events-none rounded-[8px] shadow-[0px_2px_6px_2px_rgba(0,0,0,0.15),0px_1px_2px_0px_rgba(0,0,0,0.3)]" />
            <div className="w-[18px] h-[18px] relative">
              <img alt="" className="block max-w-none w-full h-full" src={img3} />
            </div>
            <p className="font-montserrat font-medium leading-[1.3] text-[#f26522] text-[14px] whitespace-nowrap">
              Read Now
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutBelief;

