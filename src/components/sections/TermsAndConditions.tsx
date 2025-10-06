'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

interface TermsAndConditionsProps {
  className?: string;
}

const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({ className }) => {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState('terms');

  const handleSectionClick = (sectionId: string) => {
    setActiveSection(sectionId);
    switch (sectionId) {
      case 'acceptable-use':
        router.push('/acceptable-use');
        break;
      case 'terms':
        router.push('/terms-and-conditions');
        break;
      case 'privacy':
        router.push('/privacy-policy');
        break;
      case 'partnership-ecosystem':
        router.push('/partnership-ecosystem');
        break;
      default:
        break;
    }
  };

  const sections = [
    { id: 'acceptable-use', title: 'Acceptable Use' },
    { id: 'terms', title: 'Terms & Conditions' },
    { id: 'privacy', title: 'Privacy Policy' },
    { id: 'partnership-ecosystem', title: 'Partnership Ecosystem' }
  ];

  const termsContent = [
    {
      title: "Terms & Conditions (Plain-Language Summary)",
      effectiveDate: "Effective 20 May 2025",
      introduction: "These Terms govern access to and use of NQ's products and services (\"Services\"). By using the Services, you agree to these Terms",
      sections: [
        {
          number: "1",
          title: "Use & Accounts",
          content: "You're responsible for actions under your account. No unlawful activity, IP infringement, reverse engineering where prohibited, or system abuse."
        },
        {
          number: "2",
          title: "Customer Data",
          content: "You own your data. We process it to provide and improve the Services as described in our Privacy Policy. On-prem/sovereign deployments can disable outbound telemetry."
        },
        {
          number: "3",
          title: "Service Levels",
          content: "We aim to meet published SLAs. Credits are the exclusive remedy for SLA shortfalls."
        },
        {
          number: "4",
          title: "Security",
          content: "We implement access controls, encryption, logging, and optional confidential computing/attestation"
        },
        {
          number: "5",
          title: "Confidentiality",
          content: "Both parties protect non-public information; audits are available under agreed terms."
        },
        {
          number: "6",
          title: "IP & Open Source",
          content: "NQ software may include OSS components; licenses are provided on request."
        },
        {
          number: "7",
          title: "Warranties & Disclaimers",
          content: "Services are provided \"as is\" except as expressly stated."
        },
        {
          number: "8",
          title: "Liability",
          content: "No indirect or consequential damages; aggregate liability limited to fees paid in the prior 12 months."
        },
        {
          number: "9",
          title: "Governing Law",
          content: "Indonesian law, unless otherwise agreed in a master agreement."
        },
        {
          number: "10",
          title: "Changes",
          content: "We may update Terms; continued use indicates acceptance."
        }
      ]
    }
  ];

  return (
    <div className={cn('bg-white flex flex-col items-start relative w-full min-h-screen', className)}>
      {/* Navbar */}
      <Navbar />

      {/* Desktop Layout */}
      <div className="hidden md:flex bg-[#fffefd] gap-[28px] items-start justify-center overflow-clip pb-[60px] pt-[153px] px-[100px] relative shrink-0 w-full">
        {/* Side Menu */}
        <div className="bg-[#fffefd] box-border flex flex-col gap-[14px] h-[239px] items-start p-[14px] relative rounded-[10px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.3),0px_2px_6px_2px_rgba(0,0,0,0.15)] shrink-0 w-[250px]">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => handleSectionClick(section.id)}
              className={cn(
                "box-border flex gap-[10px] items-center px-[14px] py-[10px] relative rounded-[8px] shrink-0 w-full transition-colors duration-200",
                activeSection === section.id
                  ? "bg-[rgba(242,101,34,0.1)] border-[#f26522] border-[0px_0px_1px] border-solid"
                  : "hover:bg-gray-50"
              )}
            >
              <p className="font-montserrat font-medium leading-[1.3] relative shrink-0 text-[#551d00] text-[14px] text-nowrap whitespace-pre">
                {section.title}
              </p>
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="basis-0 bg-[#fffefd] box-border flex flex-col gap-[14px] grow items-start min-h-px min-w-px p-[28px] relative rounded-[10px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.3),0px_2px_6px_2px_rgba(0,0,0,0.15)] shrink-0">
          <div className="flex flex-col gap-[8px] items-start relative shrink-0 w-full">
            <p className="font-montserrat font-semibold leading-[1.3] relative shrink-0 text-[#0b1f3a] text-[32px] text-center w-full">
              {termsContent[0].title}
            </p>
            <div className="flex flex-col gap-[14px] items-start relative shrink-0 w-full">
              <p className="font-poppins leading-[1.3] not-italic relative shrink-0 text-[14px] text-center text-neutral-800 w-full">
                {termsContent[0].effectiveDate}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-[14px] items-start relative shrink-0 w-full">
            <p className="font-montserrat font-normal leading-[1.3] relative shrink-0 text-[#3d3d3d] text-[16px] w-full">
              {termsContent[0].introduction}
            </p>
          </div>

          {termsContent[0].sections.map((section, index) => (
            <div key={index} className="flex flex-col gap-[14px] items-start relative shrink-0 w-full">
              <p className="font-montserrat font-semibold leading-[1.3] relative shrink-0 text-[#3d3d3d] text-[18px] w-full">
                {section.number}. {section.title}
              </p>
              <p className="font-montserrat font-normal leading-[1.3] relative shrink-0 text-[#3d3d3d] text-[16px] w-full">
                {section.content}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden bg-[#fffefd] flex flex-col gap-[14px] h-[1480px] items-center justify-end overflow-clip px-[16px] py-[30px] relative shrink-0 w-full">
        <div className="box-border flex flex-col gap-[14px] items-start px-0 py-[28px] relative shrink-0 w-[380px]">
          <div className="flex flex-col gap-[8px] items-start relative shrink-0 w-full">
            <p className="font-montserrat font-medium leading-[1.3] relative shrink-0 text-[#121212] text-[18px] text-center w-full">
              {termsContent[0].title}
            </p>
            <div className="flex flex-col gap-[14px] items-start relative shrink-0 w-full">
              <p className="font-poppins leading-[1.3] not-italic relative shrink-0 text-[14px] text-center text-neutral-800 w-full">
                {termsContent[0].effectiveDate}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-[14px] items-start relative shrink-0 w-full">
            <p className="font-montserrat font-normal leading-[1.3] relative shrink-0 text-[#3d3d3d] text-[14px] w-full">
              {termsContent[0].introduction}
            </p>
          </div>

          {termsContent[0].sections.map((section, index) => (
            <div key={index} className="flex flex-col gap-[14px] items-start relative shrink-0 w-full">
              <p className="font-montserrat font-medium leading-[1.3] relative shrink-0 text-[#3d3d3d] text-[16px] w-full">
                {section.number}. {section.title}
              </p>
              <p className="font-montserrat font-normal leading-[1.3] relative shrink-0 text-[#3d3d3d] text-[14px] w-full">
                {section.content}
              </p>
            </div>
          ))}
        </div>

        {/* Mobile Side Menu */}
        <div className="bg-[#fffefd] box-border flex flex-col gap-[14px] h-[239px] items-start p-[14px] relative rounded-[10px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.3),0px_2px_6px_2px_rgba(0,0,0,0.15)] shrink-0 w-full">
          <p className="font-montserrat font-medium leading-[1.3] relative shrink-0 text-[#f26522] text-[18px] text-center w-full">
            Continue reading for related details
          </p>
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => handleSectionClick(section.id)}
              className={cn(
                "box-border flex gap-[10px] items-center px-[14px] py-[10px] relative rounded-[8px] shrink-0 w-full transition-colors duration-200",
                activeSection === section.id
                  ? "bg-[rgba(242,101,34,0.1)] border-[#f26522] border-[0px_0px_1px] border-solid"
                  : "hover:bg-gray-50"
              )}
            >
              <p className="font-montserrat font-medium leading-[1.3] relative shrink-0 text-[#551d00] text-[14px] text-nowrap whitespace-pre">
                {section.title}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default TermsAndConditions;
