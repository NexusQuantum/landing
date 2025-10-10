'use client';

import React from 'react';
import { cn } from '@/lib/utils';

// Image assets from public folder
const imgContactusIllustration = "/contactus illustration.png";
const imgUser = "/icons/user.svg";
const imgMessage = "/icons/message.svg";
const imgLocation = "/icons/location.svg";
const imgMail = "/icons/mail.svg";
const imgSupport = "/icons/support.svg";

interface ContactContentProps {
  className?: string;
}

const ContactContent: React.FC<ContactContentProps> = ({ className }) => {
  return (
    <div className={cn('bg-white flex flex-col items-center justify-center pb-[60px] pt-[100px] md:pt-[153px] px-4 md:px-[100px] relative', className)}>
      {/* Desktop Layout */}
      <div className="hidden md:flex gap-[48px] items-center relative w-[1128px]">
        {/* Contact Illustration - Left Side */}
        <div className="basis-0 flex flex-row grow items-center self-stretch shrink-0">
          <div className="basis-0 grow h-full min-h-px min-w-px relative rounded-[20px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.3),0px_2px_6px_2px_rgba(0,0,0,0.15)] shrink-0">
            <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[20px]">
              <img 
                alt="Contact Us Illustration" 
                className="absolute h-[137.01%] left-0 max-w-none top-[-11.51%] w-full" 
                src={imgContactusIllustration} 
              />
            </div>
          </div>
        </div>

        {/* Contact Form - Right Side */}
        <div className="flex flex-col gap-[28px] items-start relative shrink-0 w-[651px]">
          {/* Header Section */}
          <div className="flex flex-col gap-[14px] items-start relative shrink-0 w-full">
            <div className="flex flex-col gap-[14px] items-start relative shrink-0 w-full">
              <h1 className="font-['Montserrat:SemiBold',_sans-serif] font-semibold leading-[1.3] text-[#121212] text-[32px] w-full">
                Contact Us
              </h1>
            </div>
            <p className="font-['Montserrat:Regular',_sans-serif] font-normal leading-[1.3] text-[#3d3d3d] text-[14px] w-full">
              Connect with our AI infrastructure experts to discuss your specific requirements, schedule a platform demo, or explore deployment options tailored to your organization&apos;s needs.
            </p>
          </div>

          {/* Contact Form */}
          <div className="flex flex-col gap-[14px] items-start relative shrink-0 w-full">
            <div className="flex flex-col gap-[14px] items-start relative shrink-0 w-full">
              {/* First Row: Name and Email */}
              <div className="flex gap-[14px] items-start relative shrink-0 w-full">
                <div className="basis-0 bg-[rgba(0,0,0,0)] box-border flex gap-[10px] grow items-center min-h-px min-w-px p-[10px] relative rounded-[5px] shrink-0">
                  <div aria-hidden="true" className="absolute border border-[#b0b0b0] border-solid inset-0 pointer-events-none rounded-[5px]" />
                  <input
                    type="text"
                    className="font-['Montserrat:Regular',_sans-serif] font-normal leading-[1.3] text-[#888888] text-[16px] bg-transparent border-none outline-none w-full"
                    placeholder="Your Name"
                  />
                </div>
                <div className="bg-[rgba(0,0,0,0)] box-border flex items-center justify-between p-[10px] relative rounded-[5px] shrink-0 w-[264px]">
                  <div aria-hidden="true" className="absolute border border-[#b0b0b0] border-solid inset-0 pointer-events-none rounded-[5px]" />
                  <input
                    type="email"
                    className="font-['Montserrat:Regular',_sans-serif] font-normal leading-[1.3] text-[#888888] text-[16px] bg-transparent border-none outline-none flex-1"
                    placeholder="Work Email"
                  />
                  <span className="font-['Montserrat:Medium',_sans-serif] font-medium leading-[1.3] text-[#888888] text-[16px]">@</span>
                </div>
              </div>

              {/* Second Row: Company and Role */}
              <div className="flex gap-[14px] items-start relative shrink-0 w-full">
                <div className="basis-0 bg-[rgba(0,0,0,0)] box-border flex gap-[10px] grow items-center min-h-px min-w-px p-[10px] relative rounded-[5px] shrink-0">
                  <div aria-hidden="true" className="absolute border border-[#b0b0b0] border-solid inset-0 pointer-events-none rounded-[5px]" />
                  <input
                    type="text"
                    className="font-['Montserrat:Regular',_sans-serif] font-normal leading-[1.3] text-[#888888] text-[16px] bg-transparent border-none outline-none w-full"
                    placeholder="Company Name"
                  />
                </div>
                <div className="bg-[rgba(0,0,0,0)] box-border flex items-center justify-between p-[10px] relative rounded-[5px] shrink-0 w-[264px]">
                  <div aria-hidden="true" className="absolute border border-[#b0b0b0] border-solid inset-0 pointer-events-none rounded-[5px]" />
                  <input
                    type="text"
                    className="font-['Montserrat:Regular',_sans-serif] font-normal leading-[1.3] text-[#888888] text-[16px] bg-transparent border-none outline-none flex-1"
                    placeholder="Role"
                  />
                  <div className="overflow-clip relative shrink-0 size-[18px]">
                    <div className="absolute inset-[8.33%_16.67%]">
                      <img alt="" className="block max-w-none size-full" src={imgUser} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Message Textarea */}
              <div className="bg-[rgba(0,0,0,0)] box-border flex gap-[10px] h-[112px] items-start p-[10px] relative rounded-[5px] shrink-0 w-full">
                <div aria-hidden="true" className="absolute border border-[#b0b0b0] border-solid inset-0 pointer-events-none rounded-[5px]" />
                <textarea
                  className="font-['Montserrat:Regular',_sans-serif] font-normal leading-[1.3] text-[#888888] text-[16px] bg-transparent border-none outline-none w-full h-full resize-none"
                  placeholder="Enter Your Message Here..."
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-[14px] items-center relative shrink-0 w-full">
              <button className="basis-0 bg-[#fffefd] box-border flex gap-[10px] grow items-center justify-center min-h-px min-w-px px-[14px] py-[10px] relative rounded-[8px] shrink-0">
                <div aria-hidden="true" className="absolute border border-[#f26522] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_2px_6px_2px_rgba(0,0,0,0.15),0px_1px_2px_0px_rgba(0,0,0,0.3)]" />
                <span className="font-['Montserrat:Medium',_sans-serif] font-medium leading-[1.3] text-[#f26522] text-[14px]">
                  Submit Message
                </span>
                <div className="overflow-clip relative shrink-0 size-[18px]">
                  <div className="absolute inset-[4.167%]">
                    <img alt="" className="block max-w-none size-full" src={imgMessage} />
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-[#fff3ed] box-border flex flex-wrap gap-[14px] items-center p-[14px] relative rounded-[10px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.3),0px_2px_6px_2px_rgba(0,0,0,0.15)] shrink-0 w-full">
            <div className="bg-[rgba(0,0,0,0)] box-border flex gap-[10px] items-center justify-center p-[10px] relative rounded-[5px] shrink-0 w-[203px]">
              <img src={imgLocation} alt="Location" className="w-[18px] h-[18px]" />
              <span className="font-['Montserrat:Medium',_sans-serif] font-medium leading-[1.3] text-[#3d3d3d] text-[14px]">
                HQ: Jakarta, Indonesia
              </span>
            </div>
            <div className="bg-[rgba(0,0,0,0)] box-border flex gap-[10px] items-center justify-center p-[10px] relative rounded-[5px] shrink-0 w-[312px]">
              <img src={imgMail} alt="Email" className="w-[18px] h-[18px]" />
              <span className="font-['Montserrat:Medium',_sans-serif] font-medium leading-[1.3] text-[#3d3d3d] text-[14px]">
                Sales: enterprise@nexusquantum.id
              </span>
            </div>
            <div className="bg-[rgba(0,0,0,0)] box-border flex gap-[10px] items-center justify-center p-[10px] relative rounded-[5px] shrink-0 w-[290px]">
              <img src={imgMail} alt="Email" className="w-[18px] h-[18px]" />
              <span className="font-['Montserrat:Medium',_sans-serif] font-medium leading-[1.3] text-[#3d3d3d] text-[14px]">
                General: hello@nexusquantum.id
              </span>
            </div>
            <div className="bg-[rgba(0,0,0,0)] box-border flex gap-[10px] items-center justify-center p-[10px] relative rounded-[5px] shrink-0 w-[317px]">
              <img src={imgSupport} alt="Support" className="w-[18px] h-[18px]" />
              <span className="font-['Montserrat:Medium',_sans-serif] font-medium leading-[1.3] text-[#3d3d3d] text-[14px]">
                Support: support@nexusquantum.id
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout - Optimized for Mobile */}
      <div className="md:hidden bg-[#fffefd] flex flex-col gap-4 items-center justify-center px-4 py-8 relative w-full min-h-screen">
        <div className="flex flex-col gap-4 items-start relative w-full max-w-sm">
          {/* Header Section */}
          <div className="flex flex-col gap-3 items-center relative w-full">
            <h1 className="font-['Montserrat:SemiBold',_sans-serif] font-semibold leading-[1.3] text-[#121212] text-[24px] text-center w-full">
              Contact Us
            </h1>
            <p className="font-['Montserrat:Regular',_sans-serif] font-normal leading-[1.4] text-[#3d3d3d] text-[14px] text-center w-full">
              Ready to get started? Let&apos;s talk about how we can help your organization with our cutting-edge AI infrastructure solutions.
            </p>
          </div>

          {/* Contact Form */}
          <div className="flex flex-col gap-4 items-start relative w-full">
            <div className="flex flex-col gap-4 items-start relative w-full">
              {/* Work Email */}
              <div className="bg-white box-border flex items-center justify-between p-3 relative rounded-[8px] w-full border border-[#b0b0b0]">
                <input
                  type="email"
                  className="font-['Montserrat:Regular',_sans-serif] font-normal leading-[1.3] text-[#121212] text-[16px] bg-transparent border-none outline-none flex-1 placeholder:text-[#888888]"
                  placeholder="Work Email"
                />
                <span className="font-['Montserrat:Medium',_sans-serif] font-medium leading-[1.3] text-[#888888] text-[16px] ml-2">@</span>
              </div>

              {/* Your Name */}
              <div className="bg-white box-border flex items-center p-3 relative rounded-[8px] w-full border border-[#b0b0b0]">
                <input
                  type="text"
                  className="font-['Montserrat:Regular',_sans-serif] font-normal leading-[1.3] text-[#121212] text-[16px] bg-transparent border-none outline-none w-full placeholder:text-[#888888]"
                  placeholder="Your Name"
                />
              </div>

              {/* Company Name */}
              <div className="bg-white box-border flex items-center p-3 relative rounded-[8px] w-full border border-[#b0b0b0]">
                <input
                  type="text"
                  className="font-['Montserrat:Regular',_sans-serif] font-normal leading-[1.3] text-[#121212] text-[16px] bg-transparent border-none outline-none w-full placeholder:text-[#888888]"
                  placeholder="Company Name"
                />
              </div>

              {/* Role */}
              <div className="bg-white box-border flex items-center justify-between p-3 relative rounded-[8px] w-full border border-[#b0b0b0]">
                <input
                  type="text"
                  className="font-['Montserrat:Regular',_sans-serif] font-normal leading-[1.3] text-[#121212] text-[16px] bg-transparent border-none outline-none flex-1 placeholder:text-[#888888]"
                  placeholder="Role"
                />
                <div className="overflow-clip relative shrink-0 size-[18px] ml-2">
                  <div className="absolute inset-[8.33%_16.67%]">
                    <img alt="" className="block max-w-none size-full" src={imgUser} />
                  </div>
                </div>
              </div>

              {/* Message Textarea */}
              <div className="bg-white box-border flex items-start p-3 relative rounded-[8px] w-full border border-[#b0b0b0] h-[100px]">
                <textarea
                  className="font-['Montserrat:Regular',_sans-serif] font-normal leading-[1.3] text-[#121212] text-[16px] bg-transparent border-none outline-none w-full h-full resize-none placeholder:text-[#888888]"
                  placeholder="Enter Your Message Here..."
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex items-center relative w-full">
              <button className="bg-[#fffefd] box-border flex gap-2 items-center justify-center px-4 py-3 relative rounded-[8px] w-full border border-[#f26522] shadow-[0px_2px_6px_2px_rgba(0,0,0,0.15),0px_1px_2px_0px_rgba(0,0,0,0.3)] hover:bg-[#f26522] hover:text-white transition-all duration-300">
                <span className="font-['Montserrat:Medium',_sans-serif] font-medium leading-[1.3] text-[#f26522] text-[14px] group-hover:text-white">
                  Submit Message
                </span>
                <div className="overflow-clip relative shrink-0 size-[18px]">
                  <div className="absolute inset-[4.167%]">
                    <img alt="" className="block max-w-none size-full" src={imgMessage} />
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-[#fff3ed] box-border flex flex-col gap-3 items-center p-4 relative rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.3),0px_2px_6px_2px_rgba(0,0,0,0.15)] w-full">
            <div className="bg-white/50 box-border flex items-center justify-center gap-2 p-3 relative rounded-[8px] w-full">
              <img src={imgLocation} alt="Location" className="w-[18px] h-[18px] flex-shrink-0" />
              <span className="font-['Montserrat:Medium',_sans-serif] font-medium leading-[1.3] text-[#3d3d3d] text-[14px] text-center">
                HQ: Jakarta, Indonesia
              </span>
            </div>
            <div className="bg-white/50 box-border flex items-center justify-center gap-2 p-3 relative rounded-[8px] w-full">
              <img src={imgMail} alt="Email" className="w-[18px] h-[18px] flex-shrink-0" />
              <span className="font-['Montserrat:Medium',_sans-serif] font-medium leading-[1.3] text-[#3d3d3d] text-[14px] text-center break-all">
                Sales: enterprise@nexusquantum.id
              </span>
            </div>
            <div className="bg-white/50 box-border flex items-center justify-center gap-2 p-3 relative rounded-[8px] w-full">
              <img src={imgMail} alt="Email" className="w-[18px] h-[18px] flex-shrink-0" />
              <span className="font-['Montserrat:Medium',_sans-serif] font-medium leading-[1.3] text-[#3d3d3d] text-[14px] text-center break-all">
                General: hello@nexusquantum.id
              </span>
            </div>
            <div className="bg-white/50 box-border flex items-center justify-center gap-2 p-3 relative rounded-[8px] w-full">
              <img src={imgSupport} alt="Support" className="w-[18px] h-[18px] flex-shrink-0" />
              <span className="font-['Montserrat:Medium',_sans-serif] font-medium leading-[1.3] text-[#3d3d3d] text-[14px] text-center break-all">
                Support: support@nexusquantum.id
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactContent;


