'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { ArrowUpRight } from 'lucide-react';

// Image assets from Figma
const imgLine4 = "http://localhost:3845/assets/3e08bd5c9b3d1b3abb8989fa2b54a813e00e1cea.svg";
const img = "http://localhost:3845/assets/c85e7b8a8c9721f83d08f12bc7955c53456793f2.svg";
const imgLine5 = "http://localhost:3845/assets/52a03cc4929b7b9de869be07711a5ac3802d97ca.svg";
const imgLine6 = "http://localhost:3845/assets/d935a75e367296fa27333c3d475b64869908c610.svg";

interface SolutionProductsProps {
  className?: string;
}

const SolutionProducts: React.FC<SolutionProductsProps> = ({ className }) => {
  return (
    <div className={cn('bg-white flex flex-col items-center relative w-full', className)}>
      {/* Business Intelligence & Analytics (SaaS) - Desktop */}
      <div className="hidden lg:block bg-[#fffefd] flex flex-col gap-12 items-center justify-center overflow-hidden pb-9 pt-[153px] px-[100px] w-full">
        <div className="flex h-[301px] items-start max-w-[1024px] overflow-hidden relative rounded-[15px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.3),0px_2px_6px_2px_rgba(0,0,0,0.15)] w-full mx-auto">
          <div className="flex-1 bg-[#fffbf8] flex flex-col gap-[14px] h-full items-start justify-center px-9 py-7">
            <p className="font-montserrat font-medium leading-[1.3] text-[#121212] text-[18px]">
              Business Intelligence & Analytics (SaaS)
            </p>
            <div className="h-0 relative w-full">
              <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
                <img alt="" className="block max-w-none size-full" src={imgLine4} />
              </div>
            </div>
            <ul className="block font-montserrat font-normal leading-0 text-[14px] text-black">
              <li className="mb-0 ms-[21px]">
                <span className="leading-[1.3]">NQRust-Analytics — Ask in natural language, analyze at lakehouse scale. Governed, cached, and explainable.</span>
              </li>
              <li className="ms-[21px]">
                <span className="leading-[1.3]">
                  NQRust-Lake — A Rust-native lakehouse: columnar storage, vector-ready, and built for low-latency queries.
                  <br aria-hidden="true" />
                  <br aria-hidden="true" />
                </span>
              </li>
            </ul>
            <div className="flex gap-[10px] items-center justify-center px-[14px] py-[10px] rounded-[8px]">
              <ArrowUpRight className="w-[18px] h-[18px] text-[#454545]" />
              <p className="font-montserrat font-medium leading-[1.3] text-[#454545] text-[14px] whitespace-nowrap">
                See Product
              </p>
            </div>
          </div>
          <div className="h-full relative shadow-[0px_1px_2px_0px_rgba(0,0,0,0.3),0px_2px_6px_2px_rgba(0,0,0,0.15)] w-[300px]">
            <video 
              autoPlay 
              className="absolute max-w-none object-cover size-full" 
              controlsList="nodownload" 
              loop 
              playsInline
              muted
            >
              <source src="/video-solution/Business Intelligence & Analytics (SaaS).mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>

      {/* Business Intelligence & Analytics (SaaS) - Mobile */}
      <div className="lg:hidden flex flex-col gap-[14px] items-center justify-end overflow-hidden px-4 py-[30px] w-full">
        <div className="flex flex-col h-[682px] items-start overflow-hidden relative rounded-[15px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.3),0px_2px_6px_2px_rgba(0,0,0,0.15)] w-full">
          <div className="flex-1 relative shadow-[0px_1px_2px_0px_rgba(0,0,0,0.3),0px_2px_6px_2px_rgba(0,0,0,0.15)] w-full">
            <video 
              autoPlay 
              className="absolute max-w-none object-cover size-full" 
              controlsList="nodownload" 
              loop 
              playsInline
              muted
            >
              <source src="/video-solution/Business Intelligence & Analytics (SaaS).mp4" type="video/mp4" />
            </video>
          </div>
          <div className="bg-[#fffbf8] flex flex-col gap-[14px] items-start justify-center px-7 py-[14px] w-full">
            <p className="font-montserrat font-medium leading-[1.3] text-[#121212] text-[18px]">
              Business Intelligence & Analytics (SaaS)
            </p>
            <div className="h-0 relative w-full">
              <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
                <img alt="" className="block max-w-none size-full" src={imgLine4} />
              </div>
            </div>
            <ul className="block font-montserrat font-normal leading-0 text-[14px] text-black">
              <li className="mb-0 ms-[21px]">
                <span className="leading-[1.3]">NQRust-Analytics — Ask in natural language, analyze at lakehouse scale. Governed, cached, and explainable.</span>
              </li>
              <li className="ms-[21px]">
                <span className="leading-[1.3]">
                  NQRust-Lake — A Rust-native lakehouse: columnar storage, vector-ready, and built for low-latency queries.
                  <br aria-hidden="true" />
                  <br aria-hidden="true" />
                </span>
              </li>
            </ul>
            <div className="flex gap-[10px] items-center justify-center px-[14px] py-[10px] rounded-[8px]">
              <ArrowUpRight className="w-[18px] h-[18px] text-[#454545]" />
              <p className="font-montserrat font-medium leading-[1.3] text-[#454545] text-[14px] whitespace-nowrap">
                See Product
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* LLM Operations (PaaS) - Desktop */}
      <div className="hidden lg:flex flex-col gap-[10px] items-center px-[100px] py-9 w-full">
        <div className="flex h-[301px] items-start max-w-[1024px] overflow-hidden relative rounded-[15px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.3),0px_2px_6px_2px_rgba(0,0,0,0.15)] w-full">
          <div className="h-full relative shadow-[0px_1px_2px_0px_rgba(0,0,0,0.3),0px_2px_6px_2px_rgba(0,0,0,0.15)] w-[412px]">
            <video 
              autoPlay 
              className="absolute max-w-none object-cover size-full" 
              controlsList="nodownload" 
              loop 
              playsInline
              muted
            >
              <source src="/video-solution/LLM Operations PaaS).mp4" type="video/mp4" />
            </video>
          </div>
          <div className="flex-1 bg-[#fffbf8] flex flex-col gap-[14px] h-full items-start justify-center p-7">
            <p className="font-montserrat font-medium leading-[1.3] text-[#551d00] text-[18px] whitespace-nowrap">
              LLM Operations (PaaS)
            </p>
            <div className="h-0 relative w-full">
              <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
                <img alt="" className="block max-w-none size-full" src={imgLine5} />
              </div>
            </div>
            <p className="font-montserrat font-normal leading-[1.3] text-[14px] text-black">
              NQRust-LLMOps — Fine-tuning, evals, safety checks, and GPU-efficient serving. Canary rollouts and guardrails out-of-the-box.
            </p>
            <div className="flex gap-[10px] items-center justify-center px-[14px] py-[10px] rounded-[8px]">
              <ArrowUpRight className="w-[18px] h-[18px] text-[#454545]" />
              <p className="font-montserrat font-medium leading-[1.3] text-[#454545] text-[14px] whitespace-nowrap">
                See Product
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* LLM Operations (PaaS) - Mobile */}
      <div className="lg:hidden flex flex-col gap-[14px] items-center justify-end overflow-hidden px-4 py-[30px] w-full">
        <div className="flex flex-col h-[456px] items-start overflow-hidden relative rounded-[15px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.3),0px_2px_6px_2px_rgba(0,0,0,0.15)] w-full">
          <div className="flex-1 relative shadow-[0px_1px_2px_0px_rgba(0,0,0,0.3),0px_2px_6px_2px_rgba(0,0,0,0.15)] w-full">
            <video 
              autoPlay 
              className="absolute max-w-none object-cover size-full" 
              controlsList="nodownload" 
              loop 
              playsInline
              muted
            >
              <source src="/video-solution/LLM Operations PaaS).mp4" type="video/mp4" />
            </video>
          </div>
          <div className="bg-[#fffbf8] flex flex-col gap-[14px] items-start justify-center px-7 py-[14px] w-full">
            <p className="font-montserrat font-medium leading-[1.3] text-[#121212] text-[18px]">
              LLM Operations (PaaS)
            </p>
            <div className="h-0 relative w-full">
              <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
                <img alt="" className="block max-w-none size-full" src={imgLine4} />
              </div>
            </div>
            <ul className="block font-montserrat font-normal leading-0 text-[14px] text-black">
              <li className="ms-[21px]">
                <span className="leading-[1.3]">NQRust-LLMOps — Fine-tuning, evals, safety checks, and GPU-efficient serving. Canary rollouts and guardrails out-of-the-box.</span>
              </li>
            </ul>
            <div className="flex gap-[10px] items-center justify-center px-[14px] py-[10px] rounded-[8px]">
              <ArrowUpRight className="w-[18px] h-[18px] text-[#454545]" />
              <p className="font-montserrat font-medium leading-[1.3] text-[#454545] text-[14px] whitespace-nowrap">
                See Product
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* IaaS + PaaS Section - Desktop */}
      <div className="hidden lg:flex flex-col gap-[10px] items-center px-[100px] py-9 w-full">
        <div className="h-[396px] max-w-[1024px] relative rounded-[15px] w-[1024px]">
          <div className="flex h-[396px] items-start max-w-inherit overflow-hidden relative w-[1024px]">
            <div className="h-full relative shadow-[0px_1px_2px_0px_rgba(0,0,0,0.3),0px_2px_6px_2px_rgba(0,0,0,0.15)] w-[396px]">
              <video 
                autoPlay 
                className="absolute max-w-none object-cover size-full" 
                controlsList="nodownload" 
                loop 
                playsInline
              >
                <source src="/video-solution/Serverless-Grade Compute for AI.mp4" type="video/mp4" />
              </video>
            </div>
            <div className="flex-1 flex flex-col gap-7 h-full items-start justify-center p-7">
              <div className="flex flex-col gap-[14px] items-start leading-[1.3] w-full">
                <p className="font-montserrat font-medium text-[#551d00] text-[18px] w-full">
                  Serverless-Grade Compute for AI (IaaS + PaaS)
                </p>
                <p className="font-montserrat font-normal text-[14px] text-black w-full">
                  MicroVM + FleetMgr — 100ms-class starts with isolation you can trust. Scale inference and pipelines without shared-kernel risk.
                </p>
              </div>
              <div className="flex flex-col gap-[14px] items-start leading-[1.3] w-full">
                <p className="font-montserrat font-medium text-[#551d00] text-[18px] w-full">
                  Confidential Computing (IaaS + PaaS)
                </p>
                <p className="font-montserrat font-normal text-[14px] text-black w-full">
                  Enclave — Keep data encrypted in use. Attest the runtime, bind keys to policy, and prove integrity to your partners.
                </p>
              </div>
              <div className="h-0 relative w-full">
                <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
                  <img alt="" className="block max-w-none size-full" src={imgLine6} />
                </div>
              </div>
              <div className="flex flex-col gap-[14px] items-start leading-[1.3] w-full">
                <p className="font-montserrat font-medium text-[#551d00] text-[18px] w-full">
                  Edge AI (IaaS + PaaS)
                </p>
                <p className="font-montserrat font-normal text-[14px] text-black w-full">
                  NQRust-Edge — Run models close to events. Local decisioning with smart sync; cut backhaul and jitter, keep uptime high.
                </p>
              </div>
            </div>
          </div>
          <div className="absolute border border-[#b0b0b0] inset-0 pointer-events-none rounded-[15px]" />
        </div>
      </div>

      {/* IaaS + PaaS Section - Mobile */}
      <div className="lg:hidden flex flex-col gap-[14px] items-center justify-end overflow-hidden px-4 py-[30px] w-full">
        <div className="flex flex-col h-[769px] items-start overflow-hidden relative rounded-[15px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.3),0px_2px_6px_2px_rgba(0,0,0,0.15)] w-full">
          <div className="flex-1 relative shadow-[0px_1px_2px_0px_rgba(0,0,0,0.3),0px_2px_6px_2px_rgba(0,0,0,0.15)] w-full">
            <video 
              autoPlay 
              className="absolute max-w-none object-cover size-full" 
              controlsList="nodownload" 
              loop 
              playsInline
              muted
            >
              <source src="/video-solution/iaas-video.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="bg-[#fffefd] flex flex-col gap-7 items-start justify-center p-7 w-full">
            <div className="flex flex-col gap-[14px] items-start leading-[1.3] w-full">
              <p className="font-montserrat font-medium text-[#551d00] text-[18px] w-full">
                Serverless-Grade Compute for AI (IaaS + PaaS)
              </p>
              <p className="font-montserrat font-normal text-[14px] text-black w-full">
                MicroVM + FleetMgr — 100ms-class starts with isolation you can trust. Scale inference and pipelines without shared-kernel risk.
              </p>
            </div>
            <div className="flex flex-col gap-[14px] items-start leading-[1.3] w-full">
              <p className="font-montserrat font-medium text-[#551d00] text-[18px] w-full">
                Confidential Computing (IaaS + PaaS)
              </p>
              <p className="font-montserrat font-normal text-[14px] text-black w-full">
                Enclave — Keep data encrypted in use. Attest the runtime, bind keys to policy, and prove integrity to your partners.
              </p>
            </div>
            <div className="h-0 relative w-full">
              <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
                <img alt="" className="block max-w-none size-full" src={imgLine4} />
              </div>
            </div>
            <div className="flex flex-col gap-[14px] items-start leading-[1.3] w-full">
              <p className="font-montserrat font-medium text-[#551d00] text-[18px] w-full">
                Edge AI (IaaS + PaaS)
              </p>
              <p className="font-montserrat font-normal text-[14px] text-black w-full">
                NQRust-Edge — Run models close to events. Local decisioning with smart sync; cut backhaul and jitter, keep uptime high.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Data Protection & Resilience (SaaS) - Desktop */}
      <div className="hidden lg:flex flex-col gap-[10px] items-center px-[100px] py-9 w-full">
        <div className="h-[301px] max-w-[1024px] relative rounded-[15px] w-[1024px]">
          <div className="flex h-[301px] items-start max-w-inherit overflow-hidden relative w-[1024px]">
            <div className="flex-1 flex flex-col gap-[14px] h-full items-start justify-center p-7">
              <div className="flex flex-col gap-[14px] items-start leading-[1.3] w-full">
                <p className="font-montserrat font-medium text-[#551d00] text-[18px] w-full">
                  Data Protection & Resilience (SaaS)
                </p>
                <p className="font-montserrat font-normal text-[14px] text-black w-full">
                  NQRust-Guard — Immutable snapshots, WORM retention, policy-based restores. Built for ransomware-resistant recovery.
                </p>
              </div>
              <div className="h-0 relative w-full">
                <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
                  <img alt="" className="block max-w-none size-full" src={imgLine6} />
                </div>
              </div>
              <div className="flex flex-col gap-[14px] items-start leading-[1.3] w-full">
                <p className="font-montserrat font-medium text-[#551d00] text-[18px] w-full">
                  Observability for AI (SaaS)
                </p>
                <p className="font-montserrat font-normal text-[14px] text-black w-full">
                  NQRust-Insight — High-cardinality telemetry, model-aware SLOs, drift detection, and cost/perf dashboards for the whole stack.
                </p>
              </div>
            </div>
            <div className="h-full relative shadow-[0px_1px_2px_0px_rgba(0,0,0,0.3),0px_2px_6px_2px_rgba(0,0,0,0.15)] w-[396px]">
              <video 
                autoPlay 
                className="absolute max-w-none object-cover size-full" 
                controlsList="nodownload" 
                loop 
                playsInline
              >
                <source src="/video-solution/Data Protection & Resilience.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
          <div className="absolute border border-[#888888] inset-0 pointer-events-none rounded-[15px]" />
        </div>
      </div>

      {/* Data Protection & Resilience (SaaS) - Mobile */}
      <div className="lg:hidden flex flex-col gap-[14px] items-center justify-end overflow-hidden px-4 py-[30px] w-full">
        <div className="flex flex-col h-[531px] items-start overflow-hidden relative rounded-[15px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.3),0px_2px_6px_2px_rgba(0,0,0,0.15)] w-full">
          <div className="flex-1 relative shadow-[0px_1px_2px_0px_rgba(0,0,0,0.3),0px_2px_6px_2px_rgba(0,0,0,0.15)] w-full">
            <video 
              autoPlay 
              className="absolute max-w-none object-cover size-full" 
              controlsList="nodownload" 
              loop 
              playsInline
              muted
            >
              <source src="/video-solution/data-protection-video.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="flex flex-col gap-[14px] items-start justify-center p-7 w-full">
            <div className="flex flex-col gap-[14px] items-start leading-[1.3] w-full">
              <p className="font-montserrat font-medium text-[#551d00] text-[18px] w-full">
                Data Protection & Resilience (SaaS)
              </p>
              <p className="font-montserrat font-normal text-[14px] text-black w-full">
                NQRust-Guard — Immutable snapshots, WORM retention, policy-based restores. Built for ransomware-resistant recovery.
              </p>
            </div>
            <div className="h-0 relative w-full">
              <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
                <img alt="" className="block max-w-none size-full" src={imgLine4} />
              </div>
            </div>
            <div className="flex flex-col gap-[14px] items-start leading-[1.3] w-full">
              <p className="font-montserrat font-medium text-[#551d00] text-[18px] w-full">
                Observability for AI (SaaS)
              </p>
              <p className="font-montserrat font-normal text-[14px] text-black w-full">
                NQRust-Insight — High-cardinality telemetry, model-aware SLOs, drift detection, and cost/perf dashboards for the whole stack.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Hardware Appliance - Desktop */}
      <div className="hidden lg:flex flex-col gap-[10px] items-center px-[100px] py-9 w-full">
        <div className="flex h-[301px] items-start max-w-[1024px] overflow-hidden relative rounded-[15px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.3),0px_2px_6px_2px_rgba(0,0,0,0.15)] w-full">
          <div className="h-full relative shadow-[0px_1px_2px_0px_rgba(0,0,0,0.3),0px_2px_6px_2px_rgba(0,0,0,0.15)] w-[412px]">
            <video 
              autoPlay 
              className="absolute max-w-none object-cover size-full" 
              controlsList="nodownload" 
              loop 
              playsInline
              muted
            >
              <source src="/video-solution/Hardware Appliance.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="flex-1 bg-[#fffbf8] flex flex-col gap-[14px] h-full items-start justify-center p-7">
            <p className="font-montserrat font-medium leading-[1.3] text-[#551d00] text-[18px]">
              Hardware Appliance
            </p>
            <div className="h-0 relative w-full">
              <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
                <img alt="" className="block max-w-none size-full" src={imgLine5} />
              </div>
            </div>
            <p className="font-montserrat font-normal leading-[1.3] text-[14px] text-black whitespace-pre-wrap">
              Pre-integrated AI cloud-in-a-box featuring up to 16x H100 GPUs with NVLink, complete Nexus software stack, enterprise security, and less than 24 hour deployment to production readiness. 
            </p>
            <div className="flex gap-[10px] items-center justify-center px-[14px] py-[10px] rounded-[8px]">
              <ArrowUpRight className="w-[18px] h-[18px] text-[#454545]" />
              <p className="font-montserrat font-medium leading-[1.3] text-[#454545] text-[14px] whitespace-nowrap">
                See Product
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Hardware Appliance - Mobile */}
      <div className="lg:hidden flex flex-col gap-[14px] items-center justify-end overflow-hidden px-4 py-[30px] w-full">
        <div className="flex flex-col h-[531px] items-start overflow-hidden relative rounded-[15px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.3),0px_2px_6px_2px_rgba(0,0,0,0.15)] w-full">
          <div className="flex-1 relative shadow-[0px_1px_2px_0px_rgba(0,0,0,0.3),0px_2px_6px_2px_rgba(0,0,0,0.15)] w-full">
            <video 
              autoPlay 
              className="absolute max-w-none object-cover size-full" 
              controlsList="nodownload" 
              loop 
              playsInline
              muted
            >
              <source src="/video-solution/Hardware Appliance.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="flex-1 bg-[#fffbf8] flex flex-col gap-[14px] items-start justify-center p-7 w-full">
            <p className="font-montserrat font-medium leading-[1.3] text-[#551d00] text-[18px]">
              Hardware Appliance
            </p>
            <div className="h-0 relative w-full">
              <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
                <img alt="" className="block max-w-none size-full" src={imgLine4} />
              </div>
            </div>
            <p className="font-montserrat font-normal leading-[1.3] text-[14px] text-black whitespace-pre-wrap">
              Pre-integrated AI cloud-in-a-box featuring up to 16x H100 GPUs with NVLink, complete Nexus software stack, enterprise security, and less than 24 hour deployment to production readiness. 
            </p>
            <div className="flex gap-[10px] items-center justify-center px-[14px] py-[10px] rounded-[8px]">
              <ArrowUpRight className="w-[18px] h-[18px] text-[#454545]" />
              <p className="font-montserrat font-medium leading-[1.3] text-[#454545] text-[14px] whitespace-nowrap">
                See Product
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolutionProducts;
