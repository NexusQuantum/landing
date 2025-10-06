'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { MessageSquare, Server, Layers, Users, Package } from 'lucide-react';

// Image assets from Figma
const imgPrimaryNoBackgroundWithOrangeText3 = "http://localhost:3845/assets/1679420ca1a44cace7bdb3c4b6fb19476177e026.png";
const imgIllustrationPricing = "http://localhost:3845/assets/25ada818176299492deb7d2eb73b12605171a145.png";
const img = "http://localhost:3845/assets/fcada072977cfd43f02dc316500b35f1cae9e8b8.svg";

interface PricingContentProps {
  className?: string;
}

const PricingContent: React.FC<PricingContentProps> = ({ className }) => {
  return (
    <div className={cn('bg-white flex flex-col items-start relative w-full', className)}>
      {/* Desktop Layout */}
      <div className="hidden lg:block bg-white flex flex-col gap-[10px] items-center justify-center overflow-hidden pb-[60px] pt-[153px] px-[100px] w-full">
        <div className="flex gap-[60px] items-stretch w-[1128px]">
          {/* Left Content */}
          <div className="flex flex-col gap-[36px] items-start w-[651px]">
            {/* Header Section */}
            <div className="flex flex-col gap-[14px] items-start w-full">
              <div className="h-[49px] relative w-[136px]">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <img 
                    alt="" 
                    className="absolute h-[200%] left-[-5.15%] max-w-none top-[-49.68%] w-[112.39%]" 
                    src={imgPrimaryNoBackgroundWithOrangeText3} 
                  />
                </div>
              </div>
              <p className="font-montserrat font-semibold leading-[1.3] text-[#121212] text-[32px]">
                Flexible Solutions for Every Need
              </p>
              <p className="font-montserrat font-normal leading-[1.3] text-[18px] text-black">
                Flexible Solutions for Every Need Choose the pricing model that best fits your infrastructure, platform, and software requirements. Whether you need the flexibility of usage-based IaaS, the structured approach of per-cluster or per-seat PaaS, or the simple scalability of per-host or per-user SaaS, we have a plan for you.
              </p>
            </div>

            {/* Pricing Cards */}
            <div className="flex flex-col gap-[28px] items-start w-full">
              {/* Cloud Services Section */}
              <div className="flex flex-col gap-[8px] items-start w-full">
                {/* IaaS Card - Best Value */}
                <div className="bg-[#fff3ed] flex gap-[28px] items-center p-[28px] relative rounded-[15px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.3),0px_2px_6px_2px_rgba(0,0,0,0.15)] w-full">
                  <div className="flex flex-col gap-[8px] items-start leading-[1.3] w-[529px]">
                    <p className="font-montserrat font-normal text-[#121212] text-[14px] w-full">
                      Cloud Service
                    </p>
                    <p className="font-montserrat font-semibold text-[16px] text-black w-full">
                      IaaS (Infrastructure-as-a-Service)
                    </p>
                    <p className="font-montserrat font-normal text-[#121212] text-[14px] w-full">
                      Usage-based compute, GPU hours, storage capacity with multi-region sovereign options.
                    </p>
                  </div>
                  <div className="bg-[#551d00] flex gap-[10px] items-center justify-center p-[10px] relative rounded-[8px]">
                    <div className="absolute border border-[#551d00] inset-0 pointer-events-none rounded-[8px] shadow-[0px_2px_6px_2px_rgba(0,0,0,0.15),0px_1px_2px_0px_rgba(0,0,0,0.3)]" />
                    <Server className="w-[18px] h-[18px] text-white" />
                  </div>
                  <div className="absolute bg-[#f26522] flex gap-[10px] items-center justify-center left-[26px] p-[10px] rounded-[10px] top-[-16px]">
                    <p className="font-montserrat font-normal leading-[1.3] text-[#fffefd] text-[14px] whitespace-nowrap">
                      Best Value
                    </p>
                  </div>
                </div>

                {/* PaaS Card */}
                <div className="bg-transparent flex gap-[28px] items-center p-[28px] relative rounded-[15px] w-full">
                  <div className="absolute border border-[#d1d1d1] inset-0 pointer-events-none rounded-[15px]" />
                  <div className="flex flex-col gap-[8px] items-start leading-[1.3] w-[529px]">
                    <p className="font-montserrat font-normal text-[#121212] text-[14px] w-full">
                      Cloud Service
                    </p>
                    <p className="font-montserrat font-semibold text-[16px] text-black w-full">
                      PaaS (Platform-as-a-Service)
                    </p>
                    <p className="font-montserrat font-normal text-[#121212] text-[14px] w-full">
                      Per-cluster or per-seat enterprise SLAs from POV through production deployment.
                    </p>
                  </div>
                  <div className="bg-[#551d00] flex gap-[10px] items-center justify-center p-[10px] relative rounded-[8px]">
                    <div className="absolute border border-[#551d00] inset-0 pointer-events-none rounded-[8px] shadow-[0px_2px_6px_2px_rgba(0,0,0,0.15),0px_1px_2px_0px_rgba(0,0,0,0.3)]" />
                    <Layers className="w-[18px] h-[18px] text-white" />
                  </div>
                </div>

                {/* SaaS Card */}
                <div className="bg-transparent flex gap-[28px] items-center p-[28px] relative rounded-[15px] w-full">
                  <div className="absolute border border-[#d1d1d1] inset-0 pointer-events-none rounded-[15px]" />
                  <div className="flex flex-col gap-[8px] items-start leading-[1.3] w-[529px]">
                    <p className="font-montserrat font-normal text-[#121212] text-[14px] w-full">
                      Cloud Service
                    </p>
                    <p className="font-montserrat font-semibold text-[16px] text-black w-full">
                      SaaS (Software-as-a-Service)
                    </p>
                    <p className="font-montserrat font-normal text-[#121212] text-[14px] w-full">
                      Per-user or per-asset tiers with on-premises variants for data sovereignty.
                    </p>
                  </div>
                  <div className="bg-[#551d00] flex gap-[10px] items-center justify-center p-[10px] relative rounded-[8px]">
                    <div className="absolute border border-[#551d00] inset-0 pointer-events-none rounded-[8px] shadow-[0px_2px_6px_2px_rgba(0,0,0,0.15),0px_1px_2px_0px_rgba(0,0,0,0.3)]" />
                    <Users className="w-[18px] h-[18px] text-white" />
                  </div>
                </div>
              </div>

              {/* Hardware Appliance Card */}
              <div className="bg-transparent flex gap-[28px] items-center p-[28px] relative rounded-[15px] w-full">
                <div className="absolute border border-[#d1d1d1] inset-0 pointer-events-none rounded-[15px]" />
                <div className="flex flex-col gap-[8px] items-start leading-[1.3] w-[529px]">
                  <p className="font-montserrat font-semibold text-[16px] text-black w-full">
                    Hardware Appliance
                  </p>
                  <p className="font-montserrat font-normal text-[#121212] text-[14px] w-full">
                    Turnkey pre-integrated systems with single-vendor support and factory optimization.
                  </p>
                </div>
                <div className="bg-[#551d00] flex gap-[10px] items-center justify-center p-[10px] relative rounded-[8px]">
                  <div className="absolute border border-[#551d00] inset-0 pointer-events-none rounded-[8px] shadow-[0px_2px_6px_2px_rgba(0,0,0,0.15),0px_1px_2px_0px_rgba(0,0,0,0.3)]" />
                  <Package className="w-[18px] h-[18px] text-white" />
                </div>
                <div className="absolute bg-[#fdbfa2] flex gap-[10px] items-center justify-center left-[26px] p-[10px] rounded-[10px] top-[-16px]">
                  <p className="font-montserrat font-normal leading-[1.3] text-[#551d00] text-[14px] whitespace-nowrap">
                    Appliance-based Model
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex-1 flex items-center justify-center min-h-full">
            <div className="w-full h-full min-h-[600px] relative rounded-[20px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.3),0px_2px_6px_2px_rgba(0,0,0,0.15)] overflow-hidden">
              <img 
                alt="Pricing illustration" 
                className="w-full h-full object-cover rounded-[20px]" 
                src="/illustration pricing.png" 
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden flex flex-col items-center w-full">
        {/* Header Section */}
        <div className="flex flex-col gap-[14px] h-[297px] items-center justify-end overflow-hidden px-4 py-[30px] w-full">
          <div className="h-[27px] relative w-[76px]">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <img 
                alt="" 
                className="absolute h-[200%] left-[-5.15%] max-w-none top-[-49.68%] w-[112.39%]" 
                src={imgPrimaryNoBackgroundWithOrangeText3} 
              />
            </div>
          </div>
          <p className="font-montserrat font-medium leading-[1.3] text-[#121212] text-[18px] text-center">
            Flexible Solutions for Every Need
          </p>
          <p className="font-montserrat font-normal leading-[1.3] text-[#3d3d3d] text-[14px] text-center">
            Flexible Solutions for Every Need Choose the pricing model that best fits your infrastructure, platform, and software requirements. Whether you need the flexibility of usage-based IaaS, the structured approach of per-cluster or per-seat PaaS, or the simple scalability of per-host or per-user SaaS, we have a plan for you.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="bg-[#fffefd] flex gap-7 items-center justify-center overflow-hidden px-4 py-10 w-full">
          <div className="flex flex-col gap-7 items-start w-[380px]">
            {/* IaaS Card - Best Value */}
            <div className="bg-[#fff3ed] flex flex-col gap-7 items-start justify-center p-7 relative rounded-[15px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.3),0px_2px_6px_2px_rgba(0,0,0,0.15)] w-full">
              <div className="flex flex-col gap-2 items-start leading-[1.3] w-full">
                <p className="font-montserrat font-normal text-[#121212] text-[14px] w-full">
                  Cloud Service
                </p>
                <p className="font-montserrat font-semibold text-[16px] text-black w-full">
                  IaaS (Infrastructure-as-a-Service)
                </p>
                <p className="font-montserrat font-normal text-[#121212] text-[14px] w-full">
                  Usage-based compute, GPU hours, storage capacity with multi-region sovereign options.
                </p>
              </div>
              <div className="bg-[#551d00] flex gap-[10px] items-center justify-center p-[10px] relative rounded-[8px]">
                <div className="absolute border border-[#551d00] inset-0 pointer-events-none rounded-[8px] shadow-[0px_2px_6px_2px_rgba(0,0,0,0.15),0px_1px_2px_0px_rgba(0,0,0,0.3)]" />
                <Server className="w-[18px] h-[18px] text-white" />
              </div>
              <div className="absolute bg-[#f26522] flex gap-[10px] items-center justify-center left-[26px] p-[10px] rounded-[10px] top-[-16px]">
                <p className="font-montserrat font-normal leading-[1.3] text-[#fffefd] text-[14px] whitespace-nowrap">
                  Best Value
                </p>
              </div>
            </div>

            {/* PaaS Card */}
            <div className="bg-transparent flex flex-col gap-7 items-start justify-center p-7 relative rounded-[15px] w-full">
              <div className="absolute border border-[#d1d1d1] inset-0 pointer-events-none rounded-[15px]" />
              <div className="flex flex-col gap-2 items-start leading-[1.3] w-full">
                <p className="font-montserrat font-normal text-[#121212] text-[14px] w-full">
                  Cloud Service
                </p>
                <p className="font-montserrat font-semibold text-[16px] text-black w-full">
                  PaaS (Platform-as-a-Service)
                </p>
                <p className="font-montserrat font-normal text-[#121212] text-[14px] w-full">
                  Per-cluster or per-seat enterprise SLAs from POV through production deployment.
                </p>
              </div>
              <div className="bg-[#551d00] flex gap-[10px] items-center justify-center p-[10px] relative rounded-[8px]">
                <div className="absolute border border-[#551d00] inset-0 pointer-events-none rounded-[8px] shadow-[0px_2px_6px_2px_rgba(0,0,0,0.15),0px_1px_2px_0px_rgba(0,0,0,0.3)]" />
                <Layers className="w-[18px] h-[18px] text-white" />
              </div>
            </div>

            {/* SaaS Card */}
            <div className="bg-transparent flex flex-col gap-7 items-start justify-center p-7 relative rounded-[15px] w-full">
              <div className="absolute border border-[#d1d1d1] inset-0 pointer-events-none rounded-[15px]" />
              <div className="flex flex-col gap-2 items-start leading-[1.3] w-full">
                <p className="font-montserrat font-normal text-[#121212] text-[14px] w-full">
                  Cloud Service
                </p>
                <p className="font-montserrat font-semibold text-[16px] text-black w-full">
                  SaaS (Software-as-a-Service)
                </p>
                <p className="font-montserrat font-normal text-[#121212] text-[14px] w-full">
                  Per-user or per-asset tiers with on-premises variants for data sovereignty.
                </p>
              </div>
              <div className="bg-[#551d00] flex gap-[10px] items-center justify-center p-[10px] relative rounded-[8px]">
                <div className="absolute border border-[#551d00] inset-0 pointer-events-none rounded-[8px] shadow-[0px_2px_6px_2px_rgba(0,0,0,0.15),0px_1px_2px_0px_rgba(0,0,0,0.3)]" />
                <Users className="w-[18px] h-[18px] text-white" />
              </div>
            </div>

            {/* Hardware Appliance Card */}
            <div className="bg-transparent flex flex-col gap-7 items-start justify-center p-7 relative rounded-[15px] w-full">
              <div className="absolute border border-[#d1d1d1] inset-0 pointer-events-none rounded-[15px]" />
              <div className="flex flex-col gap-2 items-start leading-[1.3] w-full">
                <p className="font-montserrat font-semibold text-[16px] text-black w-full">
                  Hardware Appliance
                </p>
                <p className="font-montserrat font-normal text-[#121212] text-[14px] w-full">
                  Turnkey pre-integrated systems with single-vendor support and factory optimization.
                </p>
              </div>
              <div className="bg-[#551d00] flex gap-[10px] items-center justify-center p-[10px] relative rounded-[8px]">
                <div className="absolute border border-[#551d00] inset-0 pointer-events-none rounded-[8px] shadow-[0px_2px_6px_2px_rgba(0,0,0,0.15),0px_1px_2px_0px_rgba(0,0,0,0.3)]" />
                <Package className="w-[18px] h-[18px] text-white" />
              </div>
              <div className="absolute bg-[#fdbfa2] flex gap-[10px] items-center justify-center left-[26px] p-[10px] rounded-[10px] top-[-16px]">
                <p className="font-montserrat font-normal leading-[1.3] text-[#551d00] text-[14px] whitespace-nowrap">
                  Appliance-based Model
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingContent;
