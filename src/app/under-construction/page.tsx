'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ArrowLeft, MessageSquare } from 'lucide-react';

// Image assets from public folder
const backgroundImage = "/under construction.png";
const logoImage = "/nqr logo.png";

export default function UnderConstruction() {
  const router = useRouter();

  const handleHomepageClick = () => {
    router.push('/');
  };

  const handleTalkToEngineerClick = () => {
    router.push('/contact');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navbar */}
      <Navbar />
      
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="relative w-full max-w-6xl min-h-[500px]">
          {/* Background Image */}
          <div className="absolute inset-0 rounded-2xl sm:rounded-3xl overflow-hidden z-0">
            <img
              src="/under construction.png"
              alt="Under Construction Background"
              className="w-full h-full object-cover"
              style={{ minHeight: '500px' }}
            />
          </div>
          
          {/* Glass Card */}
          <div className="relative bg-white/10 backdrop-blur-sm border border-[#d1d1d1] rounded-2xl sm:rounded-[30px] p-6 sm:p-8 md:p-12 lg:p-16 xl:p-20 flex flex-col items-center justify-center text-center min-h-[350px] sm:min-h-[400px] md:min-h-[500px] z-10">
            {/* Logo */}
            <div className="mb-3 sm:mb-4">
              <div className="h-[40px] sm:h-[54px] w-[80px] sm:w-[114px] rounded-[5px] overflow-hidden flex items-center justify-center">
                <Image
                  src={logoImage}
                  alt="NQR Logo"
                  width={114}
                  height={54}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            
            {/* Title */}
            <h1 className="font-montserrat font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.3] mb-6 sm:mb-8 px-4">
              <span className="text-[#dc5d21]">UNDER </span>
              <span className="text-[#fffefd]">CONSTRUCTION</span>
            </h1>
            
            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center w-full">
              {/* Homepage Button */}
              <button 
                onClick={handleHomepageClick}
                className="w-full sm:w-auto bg-[#f26522] text-white px-4 py-3 rounded-lg shadow-[0px_2px_6px_2px_rgba(0,0,0,0.15),0px_1px_2px_0px_rgba(0,0,0,0.3)] hover:bg-[#e55a1e] hover:shadow-[0px_4px_12px_2px_rgba(0,0,0,0.25),0px_2px_4px_0px_rgba(0,0,0,0.4)] hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 text-sm font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                Homepage
              </button>
              
              {/* Talk to Engineer Button */}
              <button 
                onClick={handleTalkToEngineerClick}
                className="w-full sm:w-auto bg-[#fffefd] text-[#551d00] border border-[#551d00] px-4 py-3 rounded-lg hover:bg-[#551d00]/10 hover:shadow-[0px_4px_12px_2px_rgba(0,0,0,0.25),0px_2px_4px_0px_rgba(0,0,0,0.4)] hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 text-sm font-medium"
              >
                <MessageSquare className="w-4 h-4" />
                Talk to Engineer
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
