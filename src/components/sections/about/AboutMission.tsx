'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import Button from '@/components/ui/Button';
import { MessageCircle, ArrowRight } from 'lucide-react';

// Image assets from public folder

interface AboutMissionProps {
  className?: string;
}

const AboutMission: React.FC<AboutMissionProps> = ({ className }) => {
  return (
    <div className={cn('bg-white flex flex-col items-center justify-center pt-[60px] pb-8 px-4 lg:pt-[100px] lg:pb-12 lg:px-[100px]', className)}>
      {/* Mission Section with Background */}
      <div className="flex flex-col gap-8 lg:gap-12 items-center justify-end w-full max-w-[1128px]">
        {/* Mission Card with Background Image */}
        <div className="flex flex-col gap-[14px] items-center p-4 lg:p-[70px] relative rounded-[12px] lg:rounded-[30px] w-full">
          <div className="absolute inset-0 pointer-events-none rounded-[12px] lg:rounded-[30px]">
            <div className="absolute bg-black inset-0 rounded-[12px] lg:rounded-[30px]" />
            <img 
              alt="" 
              className="absolute max-w-none object-cover opacity-30 rounded-[12px] lg:rounded-[30px] size-full" 
              src="/illustration about us.png" 
            />
          </div>
          <div className="absolute border border-[#d1d1d1] inset-0 pointer-events-none rounded-[12px] lg:rounded-[30px]" />
          <p className="font-montserrat font-semibold leading-[1.3] relative text-[#dc5d21] text-[24px] lg:text-[54px] text-center w-full">
            <span>OUR </span>
            <span className="text-[#fffefd]">MISSION</span>
          </p>
          <p className="font-montserrat font-normal lg:font-medium leading-[1.3] relative text-[#fffefd] text-[14px] lg:text-[18px] text-center w-full">
            Build the next generation of AI infrastructure for the Agentic era—where models reason, act, and learn across secure, sovereign clouds. We focus on AI data centers, LLM platforms, business intelligence, analytics, and data lake solutions that move organizations from experimentation to durable advantage.
          </p>
        </div>

        {/* About NQ Section with Video */}
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-[36px] items-stretch relative w-full">
          {/* Left Content */}
          <div className="bg-transparent flex flex-col gap-4 lg:gap-[24px] items-start p-4 lg:p-[36px] relative rounded-[20px] w-full lg:flex-1">
            <div className="absolute border border-[#888888] inset-0 pointer-events-none rounded-[20px]" />
            <p className="font-montserrat font-medium lg:font-semibold leading-[1.3] text-[18px] lg:text-[24px] text-left w-full">
              <span className="text-[#f26522]">ABOUT</span> <span className="text-[#551d00]">NQ</span>
            </p>
            <p className="font-montserrat font-normal lg:font-medium leading-[1.3] text-[#3d3d3d] text-[14px] lg:text-[16px] text-left">
              Nexus Quantum Technologies delivers the world&apos;s first vertically integrated, Rust-powered cloud platform designed for the Agentic AI era. We combine memory-safe systems software with GPU-efficient AI platforms and business-facing SaaS solutions. Built on five years of intensive R&D investment in Rust technologies since 2020, we have pioneered enterprise-scale implementations that leverage Rust&apos;s unique advantages in systems programming, concurrent processing, and memory safety for AI workloads. Our mission is democratizing enterprise-grade AI infrastructure with uncompromising security, performance, and operational simplicity for organizations worldwide.
            </p>
            <div className="flex flex-col lg:flex-row gap-[14px] items-start w-full">
              <Button
                variant="white"
                size="sm"
                icon={<MessageCircle />}
                iconPosition="left"
                fullWidth
                className="lg:w-auto"
              >
                Talk to Engineer
              </Button>
              
              <Button
                variant="primary"
                size="sm"
                icon={<ArrowRight />}
                iconPosition="right"
                fullWidth
                className="lg:w-auto"
              >
                Book Demo
              </Button>
            </div>
          </div>
          
          {/* Right Video */}
          <div className="h-[200px] lg:h-full relative rounded-[20px] w-full lg:w-[495px]">
            <video 
              autoPlay 
              className="absolute max-w-none object-cover rounded-[20px] size-full" 
              controlsList="nodownload" 
              loop 
              playsInline
            >
              <source src="/video/video-aboutus.mp4" />
            </video>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMission;
