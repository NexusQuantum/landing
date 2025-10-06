'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface NavbarProps {
  className?: string;
  children?: React.ReactNode;
}

const Navbar: React.FC<NavbarProps> = ({ className, children }) => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const [isProductClicked, setIsProductClicked] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileProductOpen, setIsMobileProductOpen] = useState(false);

  // Determine active page
  const isHomePage = pathname === '/' || pathname === '/index';
  const isAboutPage = pathname === '/about';
  const isSolutionPage = pathname === '/solution';
  const isPricingPage = pathname === '/pricing';
  const isContactPage = pathname === '/contact';

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollThreshold = 100; // Threshold untuk mengubah state

      // Update scroll state - hanya ini yang diperlukan
      setIsScrolled(scrollTop > scrollThreshold);
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isProductDropdownOpen && !target.closest('.product-dropdown-container')) {
        setIsProductDropdownOpen(false);
        setIsProductClicked(false);
      }
    };

    if (isProductDropdownOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isProductDropdownOpen]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isMobileMenuOpen && !target.closest('.mobile-menu-container')) {
        setIsMobileMenuOpen(false);
        setIsMobileProductOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Base classes untuk navbar
  const baseClasses = cn(
    // Base styles
    'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out',
    'font-montserrat',
    className
  );

  // Conditional classes berdasarkan scroll state - dengan glassmorphism effects
  const containerClasses = cn(
    'transition-all duration-300 ease-in-out',
    {
      // Floating state (hero section) - glassmorphism effect dengan lebar yang lebih kecil di desktop
      'mx-2 md:mx-8 lg:mx-16 xl:mx-24 mt-4 rounded-xl glass-strong backdrop-blur-xl border border-white/20': !isScrolled,
      
      // Full width state (scrolled) - glassmorphism effect
      'mx-0 mt-0 rounded-none glass backdrop-blur-lg border-b border-white/10': isScrolled,
    }
  );

  const contentClasses = cn(
    'flex items-center justify-between transition-all duration-300',
    // Responsive padding sesuai Figma design
    'px-[16px] py-[14px] md:px-[70px]'
  );

  return (
    <nav className={baseClasses}>
      <div className={containerClasses}>
        <div className={contentClasses}>
              {/* Logo Section - dengan glassmorphism effects */}
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  {/* Logo dengan glassmorphism glow effect */}
                  <div className="w-[46px] h-[38px] rounded-lg shadow-lg hover:shadow-xl hover:shadow-[#f26522]/25 transition-all duration-300 hover:scale-105 overflow-hidden">
                    <img 
                      src="/nqr logo.png" 
                      alt="NQR Logo" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </div>

          {/* Navigation Links - Desktop only, dengan glassmorphism effects */}
          <div className="hidden md:flex items-center gap-1">
            {/* Navigation items dengan glassmorphism hover effects */}
             <a 
               href="/" 
               className={cn(
                 "px-[10px] py-[8px] text-[14px] font-medium leading-[1.3] relative group overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#f26522]/20",
                 isHomePage 
                   ? "text-[#f26522] border-b border-[#f26522]" 
                   : "text-[#888888] hover:text-[#f26522]"
               )}
             >
               <span className="relative z-10">Home</span>
               <div className="absolute inset-0 bg-gradient-to-r from-[#f26522]/10 to-[#f26522]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
               <div className={cn(
                 "absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#f26522] to-[#e55a1e] group-hover:h-1 transition-all duration-300",
                 isHomePage ? "w-full" : "w-0 group-hover:w-full"
               )}></div>
             </a>
             <a 
               href="/about" 
               className={cn(
                 "px-[10px] py-[8px] text-[14px] leading-[1.3] relative group overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#f26522]/20",
                 isAboutPage 
                   ? "text-[#f26522] font-medium border-b border-[#f26522]" 
                   : "text-[#888888] font-normal hover:text-[#f26522]"
               )}
             >
               <span className="relative z-10">About NQ</span>
               <div className="absolute inset-0 bg-gradient-to-r from-[#f26522]/10 to-[#f26522]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
               <div className={cn(
                 "absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#f26522] to-[#e55a1e] group-hover:h-1 transition-all duration-300",
                 isAboutPage ? "w-full" : "w-0 group-hover:w-full"
               )}></div>
             </a>
             <a 
               href="/solution" 
               className={cn(
                 "px-[10px] py-[8px] text-[14px] leading-[1.3] relative group overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#f26522]/20",
                 isSolutionPage 
                   ? "text-[#f26522] font-medium border-b border-[#f26522]" 
                   : "text-[#888888] font-normal hover:text-[#f26522]"
               )}
             >
               <span className="relative z-10">Solution</span>
               <div className="absolute inset-0 bg-gradient-to-r from-[#f26522]/10 to-[#f26522]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
               <div className={cn(
                 "absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#f26522] to-[#e55a1e] group-hover:h-1 transition-all duration-300",
                 isSolutionPage ? "w-full" : "w-0 group-hover:w-full"
               )}></div>
             </a>
            
            {/* Product Dropdown */}
            <div className="relative product-dropdown-container">
              <button 
                onClick={() => {
                  setIsProductClicked(!isProductClicked);
                  setIsProductDropdownOpen(!isProductDropdownOpen);
                }}
                onMouseEnter={() => {
                  if (!isProductClicked) {
                    setIsProductDropdownOpen(true);
                  }
                }}
                className="px-[10px] py-[8px] text-[#888888] text-[14px] font-normal leading-[1.3] flex items-center gap-1 relative group overflow-hidden transition-all duration-300 hover:text-[#f26522] hover:scale-105 hover:shadow-lg hover:shadow-[#f26522]/20"
              >
                <span className="relative z-10">Product</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#f26522]/10 to-[#f26522]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#f26522] to-[#e55a1e] group-hover:w-full transition-all duration-300"></div>
                <svg 
                  className={`w-3 h-3 transition-transform duration-300 relative z-10 ${isProductDropdownOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Product Dropdown Menu - 4x3 Layout */}
              {isProductDropdownOpen && (
                <>
                  {/* Backdrop Overlay */}
                  <div 
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40" 
                    onClick={() => {
                      setIsProductDropdownOpen(false);
                      setIsProductClicked(false);
                    }}
                  />
                  
                  {/* Dropdown Content */}
                  <div 
                    className="absolute top-full left-0 mt-[28px] w-[450px] bg-black/90 backdrop-blur-xl border border-white/30 rounded-2xl shadow-2xl z-50 animate-in slide-in-from-top-2 duration-300"
                    onMouseEnter={() => {
                      if (!isProductClicked) {
                        setIsProductDropdownOpen(true);
                      }
                    }}
                    onMouseLeave={() => {
                      if (!isProductClicked) {
                        setIsProductDropdownOpen(false);
                      }
                    }}
                  >
                  <div className="p-6">
                    {/* Header */}
                    <div className="mb-4 pb-3 border-b border-white/20">
                      <h3 className="text-white font-semibold text-lg">Our Products</h3>
                      <p className="text-white/70 text-sm">Explore our comprehensive suite of solutions</p>
                    </div>
                    
                        {/* 3x6 Grid Layout */}
                        <div className="grid grid-cols-3 gap-4">
                          {/* Column 1 */}
                          <div className="space-y-2">
                            <a 
                              href="/products/nqrust-hv-hypervisor" 
                              onClick={() => {
                                setIsProductDropdownOpen(false);
                                setIsProductClicked(false);
                              }}
                              className="block px-3 py-2 text-white text-sm hover:text-[#f26522] hover:bg-white/10 transition-all duration-300 rounded-lg"
                            >
                              NQRust-HV Hypervisor
                            </a>
                            <a 
                              href="/products/nqrust-microvm" 
                              onClick={() => {
                                setIsProductDropdownOpen(false);
                                setIsProductClicked(false);
                              }}
                              className="block px-3 py-2 text-white text-sm hover:text-[#f26522] hover:bg-white/10 transition-all duration-300 rounded-lg"
                            >
                              NQRust-MicroVM
                            </a>
                            <a 
                              href="/products/nqrust-storage" 
                              onClick={() => {
                                setIsProductDropdownOpen(false);
                                setIsProductClicked(false);
                              }}
                              className="block px-3 py-2 text-white text-sm hover:text-[#f26522] hover:bg-white/10 transition-all duration-300 rounded-lg"
                            >
                              NQRust-Storage
                            </a>
                            <a 
                              href="/products/nqrust-fleetmgr" 
                              onClick={() => {
                                setIsProductDropdownOpen(false);
                                setIsProductClicked(false);
                              }}
                              className="block px-3 py-2 text-white text-sm hover:text-[#f26522] hover:bg-white/10 transition-all duration-300 rounded-lg"
                            >
                              NQRust-FleetMgr
                            </a>
                            <a 
                              href="/products/nqrust-securegpu" 
                              onClick={() => {
                                setIsProductDropdownOpen(false);
                                setIsProductClicked(false);
                              }}
                              className="block px-3 py-2 text-white text-sm hover:text-[#f26522] hover:bg-white/10 transition-all duration-300 rounded-lg"
                            >
                              NQRust-SecureGPU
                            </a>
                            <a 
                              href="/products/nqrust-enclave" 
                              onClick={() => {
                                setIsProductDropdownOpen(false);
                                setIsProductClicked(false);
                              }}
                              className="block px-3 py-2 text-white text-sm hover:text-[#f26522] hover:bg-white/10 transition-all duration-300 rounded-lg"
                            >
                              NQRust-Enclave
                            </a>
                          </div>

                          {/* Column 2 */}
                          <div className="space-y-2">
                            <a 
                              href="/products/nqrust-lake" 
                              onClick={() => {
                                setIsProductDropdownOpen(false);
                                setIsProductClicked(false);
                              }}
                              className="block px-3 py-2 text-white text-sm hover:text-[#f26522] hover:bg-white/10 transition-all duration-300 rounded-lg"
                            >
                              NQRust-Lake
                            </a>
                            <a 
                              href="/products/nqrust-analytics" 
                              onClick={() => {
                                setIsProductDropdownOpen(false);
                                setIsProductClicked(false);
                              }}
                              className="block px-3 py-2 text-white text-sm hover:text-[#f26522] hover:bg-white/10 transition-all duration-300 rounded-lg"
                            >
                              NQRust-Analytics
                            </a>
                            <a 
                              href="/products/nqrust-insight" 
                              onClick={() => {
                                setIsProductDropdownOpen(false);
                                setIsProductClicked(false);
                              }}
                              className="block px-3 py-2 text-white text-sm hover:text-[#f26522] hover:bg-white/10 transition-all duration-300 rounded-lg"
                            >
                              NQRust-Insight
                            </a>
                            <a 
                              href="/products/nqrust-guard" 
                              onClick={() => {
                                setIsProductDropdownOpen(false);
                                setIsProductClicked(false);
                              }}
                              className="block px-3 py-2 text-white text-sm hover:text-[#f26522] hover:bg-white/10 transition-all duration-300 rounded-lg"
                            >
                              NQRust-Guard
                            </a>
                            <a 
                              href="/products/nqrust-edge" 
                              onClick={() => {
                                setIsProductDropdownOpen(false);
                                setIsProductClicked(false);
                              }}
                              className="block px-3 py-2 text-white text-sm hover:text-[#f26522] hover:bg-white/10 transition-all duration-300 rounded-lg"
                            >
                              NQRust-Edge
                            </a>
                            <a 
                              href="/products/nqrust-ai-appliance" 
                              onClick={() => {
                                setIsProductDropdownOpen(false);
                                setIsProductClicked(false);
                              }}
                              className="block px-3 py-2 text-white text-sm hover:text-[#f26522] hover:bg-white/10 transition-all duration-300 rounded-lg"
                            >
                              NQRust-AI Appliance
                            </a>
                          </div>

                          {/* Column 3 */}
                          <div className="space-y-2">
                            <a 
                              href="/products/nqrust-llmops" 
                              onClick={() => {
                                setIsProductDropdownOpen(false);
                                setIsProductClicked(false);
                              }}
                              className="block px-3 py-2 text-white text-sm hover:text-[#f26522] hover:bg-white/10 transition-all duration-300 rounded-lg"
                            >
                              NQRust-LLMOps
                            </a>
                            <a 
                              href="/products/nqrust-identity" 
                              onClick={() => {
                                setIsProductDropdownOpen(false);
                                setIsProductClicked(false);
                              }}
                              className="block px-3 py-2 text-white text-sm hover:text-[#f26522] hover:bg-white/10 transition-all duration-300 rounded-lg"
                            >
                              NQRust-Identity
                            </a>
                            <a 
                              href="/products/nqrust-zerocode" 
                              onClick={() => {
                                setIsProductDropdownOpen(false);
                                setIsProductClicked(false);
                              }}
                              className="block px-3 py-2 text-white text-sm hover:text-[#f26522] hover:bg-white/10 transition-all duration-300 rounded-lg"
                            >
                              NQRust-ZeroCode
                            </a>
                            <a 
                              href="/products/nqrust-bpmn" 
                              onClick={() => {
                                setIsProductDropdownOpen(false);
                                setIsProductClicked(false);
                              }}
                              className="block px-3 py-2 text-white text-sm hover:text-[#f26522] hover:bg-white/10 transition-all duration-300 rounded-lg"
                            >
                              NQRust-BPMN
                            </a>
                          </div>
                        </div>

                  </div>
                </div>
                </>
              )}
            </div>

             <a 
               href="/pricing" 
               className={cn(
                 "px-[10px] py-[8px] text-[14px] leading-[1.3] relative group overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#f26522]/20",
                 isPricingPage 
                   ? "text-[#f26522] font-medium border-b border-[#f26522]" 
                   : "text-[#888888] font-normal hover:text-[#f26522]"
               )}
             >
               <span className="relative z-10">Pricing</span>
               <div className="absolute inset-0 bg-gradient-to-r from-[#f26522]/10 to-[#f26522]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
               <div className={cn(
                 "absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#f26522] to-[#e55a1e] group-hover:h-1 transition-all duration-300",
                 isPricingPage ? "w-full" : "w-0 group-hover:w-full"
               )}></div>
             </a>
             <a 
               href="/contact" 
               className={cn(
                 "px-[10px] py-[8px] text-[14px] leading-[1.3] relative group overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#f26522]/20",
                 isContactPage 
                   ? "text-[#f26522] font-medium border-b border-[#f26522]" 
                   : "text-[#888888] font-normal hover:text-[#f26522]"
               )}
             >
               <span className="relative z-10">Contact</span>
               <div className="absolute inset-0 bg-gradient-to-r from-[#f26522]/10 to-[#f26522]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
               <div className={cn(
                 "absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#f26522] to-[#e55a1e] group-hover:h-1 transition-all duration-300",
                 isContactPage ? "w-full" : "w-0 group-hover:w-full"
               )}></div>
             </a>
          </div>

          {/* Action Buttons - responsive design sesuai Figma */}
          <div className="flex items-center gap-[14px]">
            {/* Desktop: CTA button dengan glassmorphism hover effect */}
            <a href="/under-construction" className="hidden md:block bg-white text-[#551D00] border border-[#551D00] px-[14px] py-[10px] rounded-lg shadow-[0px_2px_6px_2px_rgba(0,0,0,0.15),0px_1px_2px_0px_rgba(0,0,0,0.3)] text-[14px] font-medium leading-[1.3] hover:bg-[#551D00]/10 hover:shadow-[0px_4px_12px_2px_rgba(0,0,0,0.25),0px_2px_4px_0px_rgba(0,0,0,0.4)] hover:scale-105 transition-all duration-300 w-[139px] text-center">
              Start Free Trial
            </a>
            
            {/* Mobile: CTA button + Menu button sesuai Figma */}
            <div className="md:hidden flex items-center gap-[14px]">
              <a href="/under-construction" className="bg-white text-[#551D00] border border-[#551D00] px-[14px] py-[10px] rounded-lg shadow-[0px_2px_6px_2px_rgba(0,0,0,0.15),0px_1px_2px_0px_rgba(0,0,0,0.3)] text-[14px] font-medium leading-[1.3] hover:bg-[#551D00]/10 hover:shadow-[0px_4px_12px_2px_rgba(0,0,0,0.25),0px_2px_4px_0px_rgba(0,0,0,0.4)] hover:scale-105 transition-all duration-300 w-[139px] text-center">
                Start Free Trial
              </a>
                  <button 
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="bg-[#fffefd] border border-[#f26522] px-[14px] py-[10px] rounded-lg shadow-[0px_2px_6px_2px_rgba(0,0,0,0.15),0px_1px_2px_0px_rgba(0,0,0,0.3)] hover:bg-white/90 hover:shadow-[0px_4px_12px_2px_rgba(0,0,0,0.25),0px_2px_4px_0px_rgba(0,0,0,0.4)] hover:scale-105 transition-all duration-300"
                  >
                    <svg className="w-[18px] h-[18px] text-[#f26522]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
            </div>
          </div>

          {/* Custom children content */}
          {children}
        </div>
      </div>

      {/* Mobile Menu Full Screen */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop Overlay */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-in fade-in duration-300" 
            onClick={() => {
              setIsMobileMenuOpen(false);
              setIsMobileProductOpen(false);
            }}
          />
          
          {/* Mobile Menu Content */}
          <div className="mobile-menu-container fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col animate-in slide-in-from-right duration-500 ease-out">
            {/* Header with Close Button */}
            <div className="flex items-center justify-between p-6 border-b border-white/20 flex-shrink-0 animate-in slide-in-from-top duration-700 delay-100">
              <div className="flex items-center gap-3">
                <div className="w-[46px] h-[38px] rounded-lg overflow-hidden animate-in zoom-in duration-500 delay-200">
                  <img 
                    src="/nqr logo.png" 
                    alt="NQR Logo" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-white text-xl font-semibold animate-in fade-in duration-500 delay-300">Menu</span>
              </div>
              <button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsMobileProductOpen(false);
                }}
                className="p-2 text-white hover:text-[#f26522] hover:bg-white/10 rounded-lg transition-all duration-300 animate-in fade-in duration-500 delay-400 hover:scale-110"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Scrollable Menu Items */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-6 space-y-4">
              {/* Home */}
              <a 
                href="/" 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsMobileProductOpen(false);
                }}
                className={cn(
                  "block px-4 py-3 text-lg font-medium transition-all duration-300 rounded-lg animate-in slide-in-from-left duration-500 delay-200 hover:scale-105 hover:shadow-lg hover:shadow-[#f26522]/20",
                  isHomePage 
                    ? "text-[#f26522] bg-white/10" 
                    : "text-white hover:text-[#f26522] hover:bg-white/10"
                )}
              >
                Home
              </a>

              {/* About NQ */}
              <a 
                href="/about" 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsMobileProductOpen(false);
                }}
                className={cn(
                  "block px-4 py-3 text-lg font-medium transition-all duration-300 rounded-lg animate-in slide-in-from-left duration-500 delay-300 hover:scale-105 hover:shadow-lg hover:shadow-[#f26522]/20",
                  isAboutPage 
                    ? "text-[#f26522] bg-white/10" 
                    : "text-white hover:text-[#f26522] hover:bg-white/10"
                )}
              >
                About NQ
              </a>

              {/* Solution */}
              <a 
                href="/solution" 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsMobileProductOpen(false);
                }}
                className={cn(
                  "block px-4 py-3 text-lg font-medium transition-all duration-300 rounded-lg animate-in slide-in-from-left duration-500 delay-400 hover:scale-105 hover:shadow-lg hover:shadow-[#f26522]/20",
                  isSolutionPage 
                    ? "text-[#f26522] bg-white/10" 
                    : "text-white hover:text-[#f26522] hover:bg-white/10"
                )}
              >
                Solution
              </a>

              {/* Product Accordion */}
              <div className="space-y-2 animate-in slide-in-from-left duration-500 delay-500">
                <button 
                  onClick={() => setIsMobileProductOpen(!isMobileProductOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 text-white text-lg font-medium hover:text-[#f26522] hover:bg-white/10 transition-all duration-300 rounded-lg hover:scale-105 hover:shadow-lg hover:shadow-[#f26522]/20"
                >
                  <span>Product</span>
                  <svg 
                    className={`w-5 h-5 transition-transform duration-300 ${isMobileProductOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Product Submenu */}
                {isMobileProductOpen && (
                  <div className="ml-4 space-y-2 border-l-2 border-[#f26522]/30 pl-4 animate-in slide-in-from-left duration-400 delay-100">
                    {/* Column 1 */}
                    <div className="space-y-2">
                      <a 
                        href="/products/nqrust-hv-hypervisor" 
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          setIsMobileProductOpen(false);
                        }}
                        className="block px-4 py-2 text-white/80 text-base hover:text-[#f26522] hover:bg-white/5 transition-all duration-300 rounded-lg"
                      >
                        NQRust-HV Hypervisor
                      </a>
                      <a 
                        href="/products/nqrust-microvm" 
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          setIsMobileProductOpen(false);
                        }}
                        className="block px-4 py-2 text-white/80 text-base hover:text-[#f26522] hover:bg-white/5 transition-all duration-300 rounded-lg"
                      >
                        NQRust-MicroVM
                      </a>
                      <a 
                        href="/products/nqrust-storage" 
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          setIsMobileProductOpen(false);
                        }}
                        className="block px-4 py-2 text-white/80 text-base hover:text-[#f26522] hover:bg-white/5 transition-all duration-300 rounded-lg"
                      >
                        NQRust-Storage
                      </a>
                      <a 
                        href="/products/nqrust-fleetmgr" 
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          setIsMobileProductOpen(false);
                        }}
                        className="block px-4 py-2 text-white/80 text-base hover:text-[#f26522] hover:bg-white/5 transition-all duration-300 rounded-lg"
                      >
                        NQRust-FleetMgr
                      </a>
                      <a 
                        href="/products/nqrust-securegpu" 
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          setIsMobileProductOpen(false);
                        }}
                        className="block px-4 py-2 text-white/80 text-base hover:text-[#f26522] hover:bg-white/5 transition-all duration-300 rounded-lg"
                      >
                        NQRust-SecureGPU
                      </a>
                      <a 
                        href="/products/nqrust-enclave" 
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          setIsMobileProductOpen(false);
                        }}
                        className="block px-4 py-2 text-white/80 text-base hover:text-[#f26522] hover:bg-white/5 transition-all duration-300 rounded-lg"
                      >
                        NQRust-Enclave
                      </a>
                    </div>

                    {/* Column 2 */}
                    <div className="space-y-2">
                      <a 
                        href="/products/nqrust-lake" 
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          setIsMobileProductOpen(false);
                        }}
                        className="block px-4 py-2 text-white/80 text-base hover:text-[#f26522] hover:bg-white/5 transition-all duration-300 rounded-lg"
                      >
                        NQRust-Lake
                      </a>
                      <a 
                        href="/products/nqrust-analytics" 
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          setIsMobileProductOpen(false);
                        }}
                        className="block px-4 py-2 text-white/80 text-base hover:text-[#f26522] hover:bg-white/5 transition-all duration-300 rounded-lg"
                      >
                        NQRust-Analytics
                      </a>
                      <a 
                        href="/products/nqrust-insight" 
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          setIsMobileProductOpen(false);
                        }}
                        className="block px-4 py-2 text-white/80 text-base hover:text-[#f26522] hover:bg-white/5 transition-all duration-300 rounded-lg"
                      >
                        NQRust-Insight
                      </a>
                      <a 
                        href="/products/nqrust-guard" 
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          setIsMobileProductOpen(false);
                        }}
                        className="block px-4 py-2 text-white/80 text-base hover:text-[#f26522] hover:bg-white/5 transition-all duration-300 rounded-lg"
                      >
                        NQRust-Guard
                      </a>
                      <a 
                        href="/products/nqrust-edge" 
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          setIsMobileProductOpen(false);
                        }}
                        className="block px-4 py-2 text-white/80 text-base hover:text-[#f26522] hover:bg-white/5 transition-all duration-300 rounded-lg"
                      >
                        NQRust-Edge
                      </a>
                      <a 
                        href="/products/nqrust-ai-appliance" 
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          setIsMobileProductOpen(false);
                        }}
                        className="block px-4 py-2 text-white/80 text-base hover:text-[#f26522] hover:bg-white/5 transition-all duration-300 rounded-lg"
                      >
                        NQRust-AI Appliance
                      </a>
                    </div>

                    {/* Column 3 */}
                    <div className="space-y-2">
                      <a 
                        href="/products/nqrust-llmops" 
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          setIsMobileProductOpen(false);
                        }}
                        className="block px-4 py-2 text-white/80 text-base hover:text-[#f26522] hover:bg-white/5 transition-all duration-300 rounded-lg"
                      >
                        NQRust-LLMOps
                      </a>
                      <a 
                        href="/products/nqrust-identity" 
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          setIsMobileProductOpen(false);
                        }}
                        className="block px-4 py-2 text-white/80 text-base hover:text-[#f26522] hover:bg-white/5 transition-all duration-300 rounded-lg"
                      >
                        NQRust-Identity
                      </a>
                      <a 
                        href="/products/nqrust-zerocode" 
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          setIsMobileProductOpen(false);
                        }}
                        className="block px-4 py-2 text-white/80 text-base hover:text-[#f26522] hover:bg-white/5 transition-all duration-300 rounded-lg"
                      >
                        NQRust-ZeroCode
                      </a>
                      <a 
                        href="/products/nqrust-bpmn" 
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          setIsMobileProductOpen(false);
                        }}
                        className="block px-4 py-2 text-white/80 text-base hover:text-[#f26522] hover:bg-white/5 transition-all duration-300 rounded-lg"
                      >
                        NQRust-BPMN
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Pricing */}
              <a 
                href="/pricing" 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsMobileProductOpen(false);
                }}
                className={cn(
                  "block px-4 py-3 text-lg font-medium transition-all duration-300 rounded-lg animate-in slide-in-from-left duration-500 delay-600 hover:scale-105 hover:shadow-lg hover:shadow-[#f26522]/20",
                  isPricingPage 
                    ? "text-[#f26522] bg-white/10" 
                    : "text-white hover:text-[#f26522] hover:bg-white/10"
                )}
              >
                Pricing
              </a>

              {/* Contact */}
              <a 
                href="/contact" 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsMobileProductOpen(false);
                }}
                className={cn(
                  "block px-4 py-3 text-lg font-medium transition-all duration-300 rounded-lg animate-in slide-in-from-left duration-500 delay-700 hover:scale-105 hover:shadow-lg hover:shadow-[#f26522]/20",
                  isContactPage 
                    ? "text-[#f26522] bg-white/10" 
                    : "text-white hover:text-[#f26522] hover:bg-white/10"
                )}
              >
                Contact
              </a>
              </div>
            </div>

            {/* Footer CTA */}
            <div className="p-6 border-t border-white/20 flex-shrink-0 animate-in slide-in-from-bottom duration-500 delay-800">
              <a href="/under-construction" className="block w-full bg-white text-[#551D00] border border-[#551D00] px-6 py-4 rounded-lg text-lg font-semibold hover:bg-[#551D00]/10 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 hover:shadow-[#551D00]/30 text-center">
                Start Free Trial
              </a>
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
