'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { NAV_PRODUCT_COLUMNS } from '@/config/products';

interface NavbarProps {
  className?: string;
  children?: React.ReactNode;
}

const NAV_PRODUCTS = NAV_PRODUCT_COLUMNS.map((column) =>
  column.map((product) => ({ label: product.name, href: product.href }))
);

const PRODUCT_LINK_CLASS =
  'group/link flex items-center gap-2 px-2.5 lg:px-3 py-1.5 lg:py-2 text-white/75 text-xs lg:text-sm rounded-md lg:rounded-lg transition-all duration-200 hover:text-[#f26522] hover:bg-[#f26522]/12 border-l-2 border-transparent hover:border-[#f26522] hover:pl-3';

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
  const isUseCasesPage = pathname === '/use-cases';
  const isPricingPage = pathname === '/pricing';
  const isContactPage = pathname === '/contact';
  const isProductPage = pathname.startsWith('/products');

  const productCloseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const closeProductDropdown = useCallback(() => {
    setIsProductDropdownOpen(false);
    setIsProductClicked(false);
  }, []);

  const handleProductMouseEnter = useCallback(() => {
    if (productCloseTimeoutRef.current) {
      clearTimeout(productCloseTimeoutRef.current);
      productCloseTimeoutRef.current = null;
    }
    if (!isProductClicked) {
      setIsProductDropdownOpen(true);
    }
  }, [isProductClicked]);

  const handleProductMouseLeave = useCallback(() => {
    if (!isProductClicked) {
      productCloseTimeoutRef.current = setTimeout(() => {
        setIsProductDropdownOpen(false);
      }, 200);
    }
  }, [isProductClicked]);

  useEffect(() => {
    return () => {
      if (productCloseTimeoutRef.current) {
        clearTimeout(productCloseTimeoutRef.current);
      }
    };
  }, []);

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
      'mx-2 sm:mx-4 md:mx-6 lg:mx-12 xl:mx-20 2xl:mx-24 mt-2 sm:mt-3 md:mt-4 rounded-lg sm:rounded-xl glass-strong backdrop-blur-xl border border-white/20': !isScrolled,
      
      // Full width state (scrolled) - glassmorphism effect
      'mx-0 mt-0 rounded-none glass backdrop-blur-lg border-b border-white/10': isScrolled,
    }
  );

  const contentClasses = cn(
    'flex items-center justify-between transition-all duration-300',
    // Responsive padding dengan breakpoint yang lebih halus
    'px-3 py-3 sm:px-4 sm:py-3.5 md:px-8 md:py-4 lg:px-12 xl:px-[70px]'
  );

  return (
    <nav className={baseClasses}>
      <div className={containerClasses}>
        <div className={contentClasses}>
              {/* Logo Section - dengan glassmorphism effects */}
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  {/* Logo dengan glassmorphism glow effect - responsive sizing */}
                  <div className="w-10 h-8 sm:w-[42px] sm:h-[35px] md:w-[46px] md:h-[38px] rounded-lg shadow-lg hover:shadow-xl hover:shadow-[#f26522]/25 transition-all duration-300 hover:scale-105 overflow-hidden">
                    <img 
                      src="/nqr logo.png" 
                      alt="NQR Logo" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </div>

          {/* Navigation Links - Desktop only, dengan glassmorphism effects */}
          <div className="hidden lg:flex items-center gap-0.5 xl:gap-1">
            {/* Navigation items dengan glassmorphism hover effects */}
             <Link
               href="/"
               className={cn(
                 "px-2 py-2 lg:px-[10px] lg:py-[8px] text-xs lg:text-[14px] font-medium leading-[1.3] relative group overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#f26522]/20",
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
             </Link>
             <a 
               href="/about" 
               className={cn(
                 "px-2 py-2 lg:px-[10px] lg:py-[8px] text-xs lg:text-[14px] leading-[1.3] relative group overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#f26522]/20",
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
                 "px-2 py-2 lg:px-[10px] lg:py-[8px] text-xs lg:text-[14px] leading-[1.3] relative group overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#f26522]/20",
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
            <div
              className="relative product-dropdown-container"
              onMouseEnter={handleProductMouseEnter}
              onMouseLeave={handleProductMouseLeave}
            >
              <button
                type="button"
                onClick={() => {
                  const nextOpen = !isProductDropdownOpen;
                  setIsProductClicked(nextOpen);
                  setIsProductDropdownOpen(nextOpen);
                }}
                className={cn(
                  'px-2 py-2 lg:px-[10px] lg:py-[8px] text-xs lg:text-[14px] leading-[1.3] flex items-center gap-0.5 lg:gap-1 relative group overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#f26522]/20',
                  isProductPage || isProductDropdownOpen
                    ? 'text-[#f26522] font-medium'
                    : 'text-[#888888] font-normal hover:text-[#f26522]'
                )}
              >
                <span className="relative z-10">Product</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#f26522]/10 to-[#f26522]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div
                  className={cn(
                    'absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#f26522] to-[#e55a1e] transition-all duration-300',
                    isProductPage || isProductDropdownOpen ? 'w-full' : 'w-0 group-hover:w-full'
                  )}
                />
                <svg
                  className={cn(
                    'w-3 h-3 transition-transform duration-300 relative z-10',
                    isProductDropdownOpen && 'rotate-180'
                  )}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isProductDropdownOpen && (
                <>
                  {isProductClicked && (
                    <div
                      className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                      onClick={closeProductDropdown}
                      aria-hidden
                    />
                  )}

                  <div className="absolute top-full left-1/2 -translate-x-1/2 lg:left-0 lg:translate-x-0 pt-2 z-50 w-[min(90vw,520px)] lg:w-[520px]">
                    <div className="bg-[#141414]/95 backdrop-blur-xl border border-white/15 rounded-xl lg:rounded-2xl shadow-[0_16px_48px_rgba(0,0,0,0.45)] ring-1 ring-[#f26522]/10 animate-in fade-in slide-in-from-top-1 duration-200">
                      <div className="p-4 lg:p-5">
                        <div className="mb-3 lg:mb-4 pb-2 lg:pb-3 border-b border-white/10">
                          <h3 className="text-white font-semibold text-base lg:text-lg">Our Products</h3>
                          <p className="text-white/60 text-xs lg:text-sm mt-0.5">
                            Explore our comprehensive suite of solutions
                          </p>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-1 lg:gap-2">
                          {NAV_PRODUCTS.map((column, columnIndex) => (
                            <div key={columnIndex} className="space-y-0.5">
                              {column.map((product) => (
                                <a
                                  key={product.href}
                                  href={product.href}
                                  onClick={closeProductDropdown}
                                  className={cn(
                                    PRODUCT_LINK_CLASS,
                                    pathname === product.href &&
                                      'text-[#f26522] bg-[#f26522]/10 border-[#f26522] font-medium'
                                  )}
                                >
                                  <span className="w-1 h-1 rounded-full bg-[#f26522]/0 group-hover/link:bg-[#f26522] transition-colors duration-200 shrink-0" />
                                  {product.label}
                                </a>
                              ))}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

             <a 
               href="/use-cases" 
               className={cn(
                 "px-2 py-2 lg:px-[10px] lg:py-[8px] text-xs lg:text-[14px] leading-[1.3] relative group overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#f26522]/20",
                 isUseCasesPage 
                   ? "text-[#f26522] font-medium border-b border-[#f26522]" 
                   : "text-[#888888] font-normal hover:text-[#f26522]"
               )}
             >
               <span className="relative z-10">Industry solutions</span>
               <div className="absolute inset-0 bg-gradient-to-r from-[#f26522]/10 to-[#f26522]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
               <div className={cn(
                 "absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#f26522] to-[#e55a1e] group-hover:h-1 transition-all duration-300",
                 isUseCasesPage ? "w-full" : "w-0 group-hover:w-full"
               )}></div>
             </a>
             <a 
               href="/pricing" 
               className={cn(
                 "px-2 py-2 lg:px-[10px] lg:py-[8px] text-xs lg:text-[14px] leading-[1.3] relative group overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#f26522]/20",
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
                 "px-2 py-2 lg:px-[10px] lg:py-[8px] text-xs lg:text-[14px] leading-[1.3] relative group overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#f26522]/20",
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
          <div className="flex items-center gap-2 sm:gap-3 lg:gap-[14px]">
            {/* Desktop: CTA button dengan glassmorphism hover effect */}
            <a href="/under-construction" className="hidden lg:block bg-white text-[#551D00] border border-[#551D00] px-3 lg:px-[14px] py-2 lg:py-[10px] rounded-lg shadow-[0px_2px_6px_2px_rgba(0,0,0,0.15),0px_1px_2px_0px_rgba(0,0,0,0.3)] text-xs lg:text-[14px] font-medium leading-[1.3] hover:bg-[#551D00]/10 hover:shadow-[0px_4px_12px_2px_rgba(0,0,0,0.25),0px_2px_4px_0px_rgba(0,0,0,0.4)] hover:scale-105 transition-all duration-300 w-auto lg:w-[139px] text-center whitespace-nowrap">
              Start Free Trial
            </a>
            
            {/* Mobile/Tablet: CTA button + Menu button sesuai Figma */}
            <div className="lg:hidden flex items-center gap-2 sm:gap-3">
              <a href="/under-construction" className="bg-white text-[#551D00] border border-[#551D00] px-2.5 sm:px-3 py-2 sm:py-2.5 rounded-lg shadow-[0px_2px_6px_2px_rgba(0,0,0,0.15),0px_1px_2px_0px_rgba(0,0,0,0.3)] text-[10px] sm:text-xs font-medium leading-[1.3] hover:bg-[#551D00]/10 hover:shadow-[0px_4px_12px_2px_rgba(0,0,0,0.25),0px_2px_4px_0px_rgba(0,0,0,0.4)] hover:scale-105 transition-all duration-300 text-center whitespace-nowrap">
                Start Free Trial
              </a>
                  <button 
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="bg-[#fffefd] border border-[#f26522] px-2.5 sm:px-3 py-2 sm:py-2.5 rounded-lg shadow-[0px_2px_6px_2px_rgba(0,0,0,0.15),0px_1px_2px_0px_rgba(0,0,0,0.3)] hover:bg-white/90 hover:shadow-[0px_4px_12px_2px_rgba(0,0,0,0.25),0px_2px_4px_0px_rgba(0,0,0,0.4)] hover:scale-105 transition-all duration-300 flex-shrink-0"
                  >
                    <svg className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-[#f26522]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              <Link
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
              </Link>

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

              {/* Industry solutions */}
              <a 
                href="/use-cases" 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsMobileProductOpen(false);
                }}
                className={cn(
                  "block px-4 py-3 text-lg font-medium transition-all duration-300 rounded-lg animate-in slide-in-from-left duration-500 delay-500 hover:scale-105 hover:shadow-lg hover:shadow-[#f26522]/20",
                  isUseCasesPage 
                    ? "text-[#f26522] bg-white/10" 
                    : "text-white hover:text-[#f26522] hover:bg-white/10"
                )}
              >
                Industry solutions
              </a>

              {/* Product Accordion */}
              <div className="space-y-2 animate-in slide-in-from-left duration-500 delay-600">
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
                    {NAV_PRODUCTS.flat().map((product) => (
                      <a
                        key={product.href}
                        href={product.href}
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          setIsMobileProductOpen(false);
                        }}
                        className="block px-4 py-2 text-white/80 text-base hover:text-[#f26522] hover:bg-white/5 transition-all duration-300 rounded-lg"
                      >
                        {product.label}
                      </a>
                    ))}
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
