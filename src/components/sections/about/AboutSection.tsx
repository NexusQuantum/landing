'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';

// Icons - Responsive
const DownloadIcon = ({ className = "w-4 h-4 sm:w-[18px] sm:h-[18px]" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 12.75L4.5 8.25H7.5V3H10.5V8.25H13.5L9 12.75Z" fill="currentColor"/>
  </svg>
);

const ScrollTextIcon = ({ className = "w-4 h-4 sm:w-[18px] sm:h-[18px]" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 6H15M3 9H15M3 12H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

interface AboutSectionProps {
  className?: string;
  title?: string;
  description?: string;
  imageUrl?: string;
  videoUrl?: string; // Optional video URL (if provided, will display video instead of image)
  brochureUrl?: string;
  whitepaperUrl?: string;
  productTitle?: string;
}

const AboutSection: React.FC<AboutSectionProps> = ({ 
  className,
  title = "About Product",
  description = "Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis. Ut commodo efficitur neque. per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis. Ut commodo efficitur neque. per inceptos himenaeos.",
  imageUrl = "/illustration about us.jpg",
  videoUrl,
  brochureUrl,
  whitepaperUrl,
  productTitle
}) => {
  const [isDownloadingBrochure, setIsDownloadingBrochure] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  // Handle brochure download
  const handleBrochureDownload = async () => {
    if (brochureUrl && brochureUrl !== "#" && !isDownloadingBrochure) {
      setIsDownloadingBrochure(true);
      try {
        const response = await fetch(brochureUrl);
        if (response.ok) {
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = brochureUrl.split('/').pop() || 'brochure.pdf';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
        } else {
          window.open(brochureUrl, '_blank');
        }
      } catch (error) {
        console.error('Download failed:', error);
        window.open(brochureUrl, '_blank');
      } finally {
        setIsDownloadingBrochure(false);
      }
    }
  };

  // Handle whitepaper download
  const handleWhitepaperDownload = async () => {
    if (whitepaperUrl && whitepaperUrl !== "#" && !isDownloading) {
      setIsDownloading(true);
      try {
        const response = await fetch(whitepaperUrl);
        if (response.ok) {
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = whitepaperUrl.split('/').pop() || 'whitepaper.pdf';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
        } else {
          window.open(whitepaperUrl, '_blank');
        }
      } catch (error) {
        console.error('Download failed:', error);
        window.open(whitepaperUrl, '_blank');
      } finally {
        setIsDownloading(false);
      }
    }
  };

  const hasBrochure = !!brochureUrl && brochureUrl !== "#";
  const hasWhitepaper = !!whitepaperUrl && whitepaperUrl !== "#";

  return (
    <section className={cn('bg-[#ffdece] flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-[70px] py-6 sm:py-8 md:py-10 lg:py-[36px] relative w-full', className)}>
      <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 md:gap-10 lg:gap-[16px] items-center justify-between w-full max-w-[1128px]">
        {/* Left Column - Text and Buttons */}
        <div className="flex flex-col gap-4 sm:gap-[16px] items-start relative w-full lg:w-[654px]">
          {/* Title */}
          <p className="font-montserrat font-semibold leading-[1.3] text-[#ff5001] text-[20px] sm:text-[22px] md:text-[24px] w-full">
            {title}
          </p>
          
          {/* Description */}
          <p className="font-montserrat font-normal leading-[1.4] sm:leading-[1.3] text-[#3d3d3d] text-[14px] sm:text-[15px] md:text-[16px] w-full">
            {description}
          </p>
          
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-[16px] items-start w-full sm:w-auto">
            {/* Get Brochure Button */}
            <button
              onClick={handleBrochureDownload}
              disabled={!hasBrochure || isDownloadingBrochure}
              className={`inline-flex items-center justify-center gap-2 sm:gap-[10px] px-3 sm:px-[14px] py-2.5 sm:py-[10px] text-[13px] sm:text-[14px] font-montserrat font-medium leading-[1.3] rounded-[8px] transition-all duration-300 w-full sm:w-auto ${
                hasBrochure && !isDownloadingBrochure
                  ? 'bg-[#f26522] text-white shadow-[0px_2px_6px_2px_rgba(0,0,0,0.15),0px_1px_2px_0px_rgba(0,0,0,0.3)] hover:bg-[#e55a1f] hover:scale-105 cursor-pointer active:scale-95'
                  : hasBrochure && isDownloadingBrochure
                  ? 'bg-[#f26522] text-white cursor-wait'
                  : 'bg-gray-400 text-gray-600 cursor-not-allowed'
              }`}
            >
              {isDownloadingBrochure ? (
                <svg className="animate-spin w-4 h-4 sm:w-[18px] sm:h-[18px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <DownloadIcon />
              )}
              <span className="whitespace-nowrap">
                {isDownloadingBrochure ? 'Downloading...' : hasBrochure ? 'Get Brochure' : 'Coming Soon'}
              </span>
            </button>
            
            {/* Whitepaper Button */}
            <button
              onClick={handleWhitepaperDownload}
              disabled={!hasWhitepaper || isDownloading}
              className={`inline-flex items-center justify-center gap-2 sm:gap-[10px] px-3 sm:px-[14px] py-2.5 sm:py-[10px] text-[13px] sm:text-[14px] font-montserrat font-medium leading-[1.3] rounded-[8px] border transition-all duration-300 w-full sm:w-auto ${
                hasWhitepaper && !isDownloading
                  ? 'bg-[#fffefd] border-[#f26522] text-[#f26522] shadow-[0px_2px_6px_2px_rgba(0,0,0,0.15),0px_1px_2px_0px_rgba(0,0,0,0.3)] hover:bg-gray-50 hover:scale-105 cursor-pointer active:scale-95'
                  : hasWhitepaper && isDownloading
                  ? 'bg-[#f26522] border-[#f26522] text-white cursor-wait'
                  : 'bg-gray-400 border-gray-400 text-gray-600 cursor-not-allowed'
              }`}
            >
              {isDownloading ? (
                <svg className="animate-spin w-4 h-4 sm:w-[18px] sm:h-[18px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <ScrollTextIcon />
              )}
              <span className="whitespace-nowrap">
                {isDownloading ? 'Downloading...' : hasWhitepaper ? 'Whitepaper' : 'Coming Soon'}
              </span>
            </button>
          </div>
        </div>
        
        {/* Right Column - Image or Video */}
        <div className={`relative rounded-[10px] w-full lg:w-[399px] flex-shrink-0 overflow-hidden shadow-lg ${
          videoUrl 
            ? 'aspect-video' // 16:9 aspect ratio for video
            : 'h-[200px] sm:h-[240px] md:h-[260px] lg:h-[287px]' // Fixed height for image
        }`}>
          {videoUrl ? (
            // Video player with autoplay, loop, and muted (muted is required for autoplay in modern browsers)
            <video 
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-contain rounded-[10px] pointer-events-none"
              onError={(e) => {
                // Fallback to image if video fails to load
                const videoElement = e.target as HTMLVideoElement;
                const fallbackImg = document.createElement('img');
                fallbackImg.src = imageUrl;
                fallbackImg.alt = "Product illustration";
                fallbackImg.className = "absolute inset-0 max-w-none object-cover pointer-events-none rounded-[10px] w-full h-full";
                videoElement.parentElement?.replaceChild(fallbackImg, videoElement);
              }}
            >
              <source src={videoUrl} type="video/mp4" />
              {/* Fallback to image if video format not supported */}
              <img 
                alt="Product illustration" 
                className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[10px] w-full h-full" 
                src={imageUrl}
              />
            </video>
          ) : (
            // Image (default)
            <img 
              alt="Product illustration" 
              className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[10px] w-full h-full" 
              src={imageUrl}
              onError={(e) => {
                // Fallback to a placeholder if image fails to load
                (e.target as HTMLImageElement).src = '/bg-product.jpg';
              }}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

