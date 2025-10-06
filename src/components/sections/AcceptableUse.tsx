'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

interface AcceptableUseProps {
  className?: string;
}

const AcceptableUse: React.FC<AcceptableUseProps> = ({ className }) => {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState('acceptable-use');

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

  const acceptableUseContent = [
    {
      title: "Acceptable Use Policy",
      effectiveDate: "Effective 20 May 2025",
      introduction: "This Acceptable Use Policy (\"AUP\") governs your use of NQ's products and services (\"Services\"). By using the Services, you agree to comply with this AUP.",
      content: "No illegal content, abuse, malware, or attempts to disrupt or gain unauthorized access. No mining customer data for competitive intelligence without consent. Respect rate limits and API terms."
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
              {acceptableUseContent[0].title}
            </p>
            <div className="flex flex-col gap-[14px] items-start relative shrink-0 w-full">
              <p className="font-poppins leading-[1.3] not-italic relative shrink-0 text-[14px] text-center text-neutral-800 w-full">
                {acceptableUseContent[0].effectiveDate}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-[14px] items-start relative shrink-0 w-full">
            <p className="font-montserrat font-normal leading-[1.3] relative shrink-0 text-[#3d3d3d] text-[16px] w-full">
              {acceptableUseContent[0].introduction}
            </p>
          </div>

          <div className="flex flex-col gap-[14px] items-start relative shrink-0 w-full">
            <p className="font-montserrat font-normal leading-[1.3] relative shrink-0 text-[#3d3d3d] text-[16px] w-full">
              {acceptableUseContent[0].content}
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden bg-[#fffefd] flex flex-col gap-[14px] h-[1480px] items-center justify-end overflow-clip px-[16px] py-[30px] relative shrink-0 w-full">
        <div className="box-border flex flex-col gap-[14px] items-start px-0 py-[28px] relative shrink-0 w-[380px]">
          <div className="flex flex-col gap-[8px] items-start relative shrink-0 w-full">
            <p className="font-montserrat font-medium leading-[1.3] relative shrink-0 text-[#121212] text-[18px] text-center w-full">
              {acceptableUseContent[0].title}
            </p>
            <div className="flex flex-col gap-[14px] items-start relative shrink-0 w-full">
              <p className="font-poppins leading-[1.3] not-italic relative shrink-0 text-[14px] text-center text-neutral-800 w-full">
                {acceptableUseContent[0].effectiveDate}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-[14px] items-start relative shrink-0 w-full">
            <p className="font-montserrat font-normal leading-[1.3] relative shrink-0 text-[#3d3d3d] text-[14px] w-full">
              {acceptableUseContent[0].introduction}
            </p>
          </div>

          <div className="flex flex-col gap-[14px] items-start relative shrink-0 w-full">
            <p className="font-montserrat font-normal leading-[1.3] relative shrink-0 text-[#3d3d3d] text-[14px] w-full">
              {acceptableUseContent[0].content}
            </p>
          </div>
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

export default AcceptableUse;
