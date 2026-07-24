'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import Button from '@/components/ui/Button';
import { PUBLIC_PRODUCTS } from '@/config/products';
import { ArrowRight, Instagram, Linkedin, Youtube } from 'lucide-react';

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  const getProductUrl = (productName: string): string =>
    PUBLIC_PRODUCTS.find((product) => product.name === productName)?.href ?? '#';

  // Function to convert sitemap link to URL
  const getSitemapUrl = (linkName: string): string => {
    const sitemapMap: { [key: string]: string } = {
      'Home': '/',
      'About NQ': '/about',
      'Solutions': '/solution',
      'Industry solutions': '/use-cases',
      'Pricing': '/pricing',
      'Products': '/products'
    };
    return sitemapMap[linkName] || '#';
  };

  const products = PUBLIC_PRODUCTS.map((product) => product.name);

  const sitemapLinks = [
    'Home',
    'About NQ',
    'Solutions',
    'Industry solutions',
    'Pricing',
    'Products'
  ];

  const socialLinks = [
    { name: 'Instagram', icon: <Instagram />, href: 'https://www.instagram.com/nqrusttech/' },
    { name: 'LinkedIn', icon: <Linkedin />, href: 'https://www.linkedin.com/company/nqrust-tech/' },
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
        <div className="hidden md:flex gap-6 lg:gap-9 items-start justify-center w-full max-w-7xl px-4">
          {/* Products Section */}
          <div className="flex flex-col gap-2 items-center justify-center w-[400px] lg:w-[450px]">
            <h3 className="text-body-large font-semibold text-white text-center w-full">
              Products
            </h3>
            <div className="grid grid-cols-2 gap-3 w-full">
              {products.map((product, index) => (
                <Link
                  key={index}
                  href={getProductUrl(product)}
                  className="flex items-center justify-start px-[14px] py-0 h-auto text-body-small font-normal text-white hover:bg-white/10 hover:text-white whitespace-nowrap rounded transition-colors"
                >
                  {product}
                </Link>
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
                <Link
                  key={index}
                  href={getSitemapUrl(link)}
                  className="flex items-center justify-start px-[14px] py-0 h-auto text-body-small font-normal text-white hover:bg-white/10 hover:text-white whitespace-nowrap rounded transition-colors"
                >
                  {link}
                </Link>
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
                  target={social.href !== '#' ? '_blank' : undefined}
                  rel={social.href !== '#' ? 'noopener noreferrer' : undefined}
                  aria-label={social.name}
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
                <Link
                  key={index}
                  href={getProductUrl(product)}
                  className="flex items-center justify-start px-[14px] py-0 h-auto text-body-small font-normal text-white hover:bg-white/10 hover:text-white whitespace-nowrap rounded transition-colors"
                >
                  {product}
                </Link>
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
                  <Link
                    key={index}
                    href={getSitemapUrl(link)}
                    className="flex items-center justify-start px-[14px] py-0 h-auto text-body-small font-normal text-white hover:bg-white/10 hover:text-white whitespace-nowrap rounded transition-colors"
                  >
                    {link}
                  </Link>
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
                    target={social.href !== '#' ? '_blank' : undefined}
                    rel={social.href !== '#' ? 'noopener noreferrer' : undefined}
                    aria-label={social.name}
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
        <div className="w-full h-px bg-white/15" />

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
