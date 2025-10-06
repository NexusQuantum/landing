'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import Button from '@/components/ui/Button';
import { ArrowRight, Instagram, Linkedin, Youtube } from 'lucide-react';

// Image assets from Figma
const imgLinkedinLogo = "http://localhost:3845/assets/e1df4a30443792d9a8e0be5ac40f8afe6060f92f.png";
const imgLineIcon = "http://localhost:3845/assets/965ca9ff34e8e5d2fc6dd10d8a2b0498fc981752.svg";

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  const products = [
    'NQRust-HV Hypervisor',
    'NQRust-MicroVM',
    'NQRust-Storage',
    'NQRust-FleetMgr',
    'NQRust-SecureGPU',
    'NQRust-Enclave',
    'NQRust-Lake',
    'NQRust-Analytics',
    'NQRust-Insight',
    'NQRust-Guard',
    'NQRust-Edge',
    'NQRust-AI Appliance',
    'NQRust-LLMOps',
    'NQRust-Identity',
    'NQRust-ZeroCode',
    'NQRust-BPMN'
  ];

  const sitemapLinks = [
    'Home',
    'About NQ',
    'Solutions',
    'Pricing',
    'Products',
    'Platform'
  ];

  const socialLinks = [
    { name: 'Instagram', icon: <Instagram />, href: '#' },
    { name: 'LinkedIn', icon: <Linkedin />, href: '#' },
    { name: 'YouTube', icon: <Youtube />, href: '#' }
  ];

  const legalLinks = [
    'Acceptable Use',
    'Terms & Conditions',
    'Privacy Policy',
    'Partnership Ecosystem'
  ];

  return (
    <footer className={cn('w-full', className)}>
      {/* CTA Section */}
      <div className="bg-[var(--primary-dark-1)] flex items-center justify-center px-4 md:px-[70px] py-[14px] gap-7">
        <div className="text-body-large font-medium text-white text-center">
          AGENTIC AI DATA CENTER
        </div>
        <a href="/under-construction">
          <Button
            variant="primary-outline"
            size="sm"
            icon={<ArrowRight />}
            iconPosition="right"
            className="bg-white text-[#551D00] border-[#551D00] hover:bg-[#551D00]/10 focus:ring-[#551D00]/50"
          >
            Start Free Trial
          </Button>
        </a>
      </div>

      {/* Main Content */}
      <div className="bg-[var(--primary-dark-3)] flex flex-col items-center px-0 py-7 gap-[14px]">
        {/* Desktop Layout */}
        <div className="hidden md:flex gap-9 items-start justify-center w-full max-w-6xl">
          {/* Products Section */}
          <div className="flex flex-col gap-2 items-center justify-center w-[450px]">
            <h3 className="text-body-large font-semibold text-white text-center w-full">
              Products
            </h3>
            <div className="grid grid-cols-2 gap-3 w-full">
              {products.map((product, index) => (
                <Button
                  key={index}
                  variant="tertiary"
                  size="sm"
                  className="justify-start px-[14px] py-0 h-auto text-body-small font-normal text-white hover:bg-white/10 hover:text-white whitespace-nowrap"
                >
                  {product}
                </Button>
              ))}
            </div>
          </div>

          {/* Sitemap Section */}
          <div className="flex flex-col gap-3 items-center justify-center">
            <h3 className="text-body-large font-semibold text-white text-center">
              Sitemap
            </h3>
            <div className="grid grid-cols-1 gap-3 w-[160px]">
              {sitemapLinks.map((link, index) => (
                <Button
                  key={index}
                  variant="tertiary"
                  size="sm"
                  className="justify-start px-[14px] py-0 h-auto text-body-small font-normal text-white hover:bg-white/10 hover:text-white whitespace-nowrap"
                >
                  {link}
                </Button>
              ))}
            </div>
          </div>

          {/* Follow Us Section */}
          <div className="flex flex-col gap-3 items-start justify-center w-[154px]">
            <h3 className="text-body-large font-semibold text-white text-center w-full">
              Follow Us
            </h3>
            <div className="grid grid-cols-1 gap-1 w-full">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="flex items-center p-[14px] rounded hover:bg-white/10 transition-colors"
                >
                  <div className="w-[22px] h-[22px] flex items-center justify-center">
                    {social.icon}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden flex flex-col gap-9 items-start w-full px-4">
          {/* Products Section */}
          <div className="flex flex-col gap-2 items-center justify-center w-full">
            <h3 className="text-body-large font-semibold text-white text-center w-full">
              Products
            </h3>
            <div className="grid grid-cols-2 gap-3 w-full">
              {products.map((product, index) => (
                <Button
                  key={index}
                  variant="tertiary"
                  size="sm"
                  className="justify-start px-[14px] py-0 h-auto text-body-small font-normal text-white hover:bg-white/10 hover:text-white whitespace-nowrap"
                >
                  {product}
                </Button>
              ))}
            </div>
          </div>

          {/* Sitemap and Follow Us Wrapper */}
          <div className="flex gap-9 items-start w-full">
            {/* Sitemap Section */}
            <div className="flex flex-col gap-3 items-center justify-center">
              <h3 className="text-body-large font-semibold text-white text-center">
                Sitemap
              </h3>
              <div className="grid grid-cols-1 gap-3 w-[160px]">
                {sitemapLinks.map((link, index) => (
                  <Button
                    key={index}
                    variant="tertiary"
                    size="sm"
                    className="justify-start px-[14px] py-0 h-auto text-body-small font-normal text-white hover:bg-white/10 hover:text-white whitespace-nowrap"
                  >
                    {link}
                  </Button>
                ))}
              </div>
            </div>

            {/* Follow Us Section */}
            <div className="flex flex-col gap-3 items-start justify-center w-[154px]">
              <h3 className="text-body-large font-semibold text-white text-center w-full">
                Follow Us
              </h3>
              <div className="grid grid-cols-1 gap-1 w-full">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="flex items-center p-[14px] rounded hover:bg-white/10 transition-colors"
                  >
                    <div className="w-[22px] h-[22px] flex items-center justify-center">
                      {social.icon}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>


        {/* Divider Line */}
        <div className="w-full h-0 relative">
          <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
            <img alt="" className="w-full h-full" src={imgLineIcon} />
          </div>
        </div>

        {/* Legal Links */}
        <div className="flex flex-wrap gap-[14px] items-start justify-center px-4 md:px-[70px] w-full">
          <div className="flex flex-wrap gap-[14px] items-center justify-center">
            {legalLinks.map((link, index) => {
              const getHref = (linkName: string) => {
                switch (linkName) {
                  case 'Terms & Conditions':
                    return '/terms-and-conditions';
                  case 'Privacy Policy':
                    return '/privacy-policy';
                  case 'Acceptable Use':
                    return '/acceptable-use';
                  case 'Partnership Ecosystem':
                    return '/partnership-ecosystem';
                  default:
                    return '#';
                }
              };

              return (
                <a
                  key={index}
                  href={getHref(link)}
                  className="flex items-center justify-center p-[14px] text-body-small font-medium text-white hover:bg-white/10 transition-colors rounded-lg"
                >
                  {link}
                </a>
              );
            })}
          </div>
        </div>

        {/* Copyright */}
        <div className="text-body-small text-white text-center w-[323px]">
          © 2025 NexusQuantum.id. All Rights Reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
