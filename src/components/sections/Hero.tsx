'use client';

import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import Button from '@/components/ui/Button';
import { Download, MessageCircle } from 'lucide-react';

// Image assets from Figma
const imgFrame9 = "http://localhost:3845/assets/a7f3898f351bf380f5e59b1256975a4deb7b711f.svg";

interface HeroProps {
  className?: string;
  videoSrc?: string;
}

const Hero: React.FC<HeroProps> = ({ className, videoSrc }) => {
  const [animatedStats, setAnimatedStats] = useState([
    { value: 0, label: "ROI", suffix: "%", prefix: "" },
    { value: 0, label: "Uptime", suffix: "%", prefix: "" },
    { value: 0, label: "Faster", suffix: "×", prefix: "" }
  ]);

  const [isVisible, setIsVisible] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  
  // Liquid glass effect states
  const [mainCardMousePos, setMainCardMousePos] = useState({ x: 0, y: 0 });
  const [mainCardHovered, setMainCardHovered] = useState(false);
  const [statsCardMousePos, setStatsCardMousePos] = useState<{ x: number; y: number }[]>([]);
  const [statsCardHovered, setStatsCardHovered] = useState<boolean[]>([]);

  // Initialize stats card states
  useEffect(() => {
    setStatsCardMousePos(Array(3).fill({ x: 0, y: 0 }));
    setStatsCardHovered(Array(3).fill(false));
  }, []);

  // Page load animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPageLoaded(true);
    }, 100); // Small delay to ensure smooth animation

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const statsElement = document.getElementById('stats-section');
    if (statsElement) {
      observer.observe(statsElement);
    }

    return () => {
      if (statsElement) {
        observer.unobserve(statsElement);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const targetValues = [333, 99.9, 3.6];
    const duration = 3500; // 3.5 seconds for smoother animation
    const steps = 100; // 100 steps for smoother animation
    const stepDuration = duration / steps;

    const animateValue = (index: number, target: number) => {
      let current = 0;
      const increment = target / steps;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }

        setAnimatedStats(prev => prev.map((stat, i) => 
          i === index ? { ...stat, value: Math.round(current * 10) / 10 } : stat
        ));
      }, stepDuration);
    };

    targetValues.forEach((target, index) => {
      setTimeout(() => animateValue(index, target), index * 400); // Slower stagger animation
    });
  }, [isVisible]);

  // Mouse event handlers for liquid glass effects
  const handleMainCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMainCardMousePos({ x, y });
  };

  const handleStatsCardMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setStatsCardMousePos(prev => prev.map((pos, i) => i === index ? { x, y } : pos));
  };

  // Handle whitepaper download
  const handleWhitepaperDownload = async () => {
    if (!isDownloading) {
      setIsDownloading(true);
      try {
        const whitepaperFileName = '[Nexus] NQRust Secure-AI-DC v1.0.pdf';
        const whitepaperUrl = `/whitepaper-product/${whitepaperFileName}`;
        
        // Fetch the file first to ensure it exists
        const response = await fetch(whitepaperUrl);
        if (response.ok) {
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = whitepaperFileName;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
        } else {
          // Fallback: Open in new tab if fetch fails
          window.open(whitepaperUrl, '_blank');
        }
      } catch (error) {
        console.error('Download failed:', error);
        // Fallback: Open in new tab
        const whitepaperUrl = '/whitepaper-product/[Nexus] NQRust Secure-AI-DC v1.0.pdf';
        window.open(whitepaperUrl, '_blank');
      } finally {
        setIsDownloading(false);
      }
    }
  };

  return (
    <section className={cn('w-full relative overflow-hidden', className)}>
      {/* Video Background - Fixed Position */}
      {videoSrc && (
        <div className="fixed inset-0 w-full h-full z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="w-full h-full object-cover video-background"
            style={{ 
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              objectFit: 'cover',
              zIndex: -1
            }}
          >
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* Video Overlay untuk memastikan konten tetap readable */}
          <div className="absolute inset-0 bg-black/20 z-0"></div>
        </div>
      )}
      
      {/* Hero Content */}
      <div className={`flex flex-col gap-6 md:gap-10 items-center justify-center px-4 md:px-[70px] pt-[100px] pb-[60px] md:pb-[80px] relative z-10 rounded-[20px] md:rounded-none transition-all duration-1000 ease-out w-full max-w-full overflow-hidden ${
        isPageLoaded 
          ? 'opacity-100 transform scale-100 translate-y-0' 
          : 'opacity-0 transform scale-95 translate-y-8'
      }`}>
        {/* Main Section */}
        <div 
          className="flex flex-col gap-[14px] items-center p-[14px] md:p-[28px] relative rounded-[20px] md:rounded-[100px] w-full max-w-[886px] bg-black/20 backdrop-blur-xl border border-white/20 transition-all duration-300 cursor-pointer overflow-hidden"
          onMouseMove={handleMainCardMouseMove}
          onMouseEnter={() => setMainCardHovered(true)}
          onMouseLeave={() => setMainCardHovered(false)}
          style={{
            transform: mainCardHovered 
              ? `perspective(1000px) rotateX(${((mainCardMousePos.y - 200) / 200) * 3}deg) rotateY(${((200 - mainCardMousePos.x) / 200) * 3}deg) scale3d(1.02, 1.02, 1.02)` 
              : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
            filter: mainCardHovered
              ? `blur(0.5px) saturate(140%) contrast(120%)`
              : 'blur(0px) saturate(100%) contrast(100%)'
          }}
        >
          {/* Liquid glass effect overlay */}
          <div 
            className="absolute inset-0 opacity-0 transition-opacity duration-300 rounded-[20px] md:rounded-[100px]"
            style={{
              background: `radial-gradient(circle at ${mainCardMousePos.x}px ${mainCardMousePos.y}px, rgba(255, 255, 255, 0.15) 0%, transparent 50%)`,
              opacity: mainCardHovered ? 1 : 0,
              transform: mainCardHovered 
                ? `translate(${(mainCardMousePos.x - 200) * 0.05}px, ${(mainCardMousePos.y - 200) * 0.05}px) scale(1.02)` 
                : 'translate(0px, 0px) scale(1)',
              filter: mainCardHovered 
                ? `blur(0.5px) saturate(140%)` 
                : 'blur(0px) saturate(100%)'
            }}
          />
          
          {/* Chromatic aberration effect */}
          {mainCardHovered && (
            <div 
              className="absolute inset-0 opacity-0 transition-opacity duration-300 rounded-[20px] md:rounded-[100px] pointer-events-none"
              style={{
                background: `conic-gradient(from ${mainCardMousePos.x}deg at ${mainCardMousePos.x}px ${mainCardMousePos.y}px, 
                  rgba(255, 0, 150, 0.08), 
                  rgba(0, 255, 255, 0.08), 
                  rgba(255, 255, 0, 0.08), 
                  rgba(255, 0, 150, 0.08))`,
                opacity: 0.6,
                mixBlendMode: 'screen'
              }}
            />
          )}
          {/* Header Section */}
          <div className="flex flex-col gap-2 items-center w-full relative z-10">
            {/* Badge */}
            <div className={`bg-[rgba(242,101,34,0.2)] flex items-center justify-center px-5 py-[14px] rounded-lg transition-all duration-800 ease-out delay-200 ${
              isPageLoaded 
                ? 'opacity-100 transform translate-y-0' 
                : 'opacity-0 transform translate-y-4'
            }`}>
              <p className="text-[var(--light-2)] text-body-small md:text-body-large font-medium text-center">
                The Future of AI Infrastructure is Here
              </p>
            </div>
            
            {/* Main Title */}
            <h1 className={`bg-gradient-to-b from-[#FF5001] to-[#FF9C6D] bg-clip-text text-transparent text-h1 md:text-h3 font-semibold text-center leading-[1.3] transition-all duration-800 ease-out delay-400 ${
              isPageLoaded 
                ? 'opacity-100 transform translate-y-0' 
                : 'opacity-0 transform translate-y-4'
            }`}>
              Agentic AI Data Centers
            </h1>
          </div>

          {/* Subtitle */}
          <h2 className={`text-[var(--primary-1)] text-body-large md:text-h2 font-semibold text-center leading-[1.3] transition-all duration-800 ease-out delay-600 ${
            isPageLoaded 
              ? 'opacity-100 transform translate-y-0' 
              : 'opacity-0 transform translate-y-4'
          }`}>
            Rust-Powered. Zero-Trust. Blazing Fast.
          </h2>

          {/* Content Section */}
          <div className="flex flex-col gap-7 items-center justify-center w-full relative z-10">
            {/* Description */}
            <p className={`text-[var(--light)] text-body-small md:text-body-large font-normal md:font-medium text-center leading-[1.3] max-w-[655px] transition-all duration-800 ease-out delay-800 ${
              isPageLoaded 
                ? 'opacity-100 transform translate-y-0' 
                : 'opacity-0 transform translate-y-4'
            }`}>
              Nexus Quantum Technologies delivers the world&apos;s first vertically integrated, Rust-powered cloud platform designed for the Agentic AI era. We combine memory-safe systems software with GPU-efficient AI platforms and business-facing SaaS solutions. Built on five years of intensive R&D investment in Rust technologies since 2020, we have pioneered enterprise-scale implementations that leverage Rust&apos;s unique advantages in systems programming, concurrent processing, and memory safety for AI workloads. Our mission is democratizing enterprise-grade AI infrastructure with uncompromising security, performance, and operational simplicity for organizations worldwide.
            </p>

            {/* Buttons Section */}
            <div className={`flex flex-col gap-[14px] items-center w-full transition-all duration-800 ease-out delay-1000 ${
              isPageLoaded 
                ? 'opacity-100 transform translate-y-0' 
                : 'opacity-0 transform translate-y-4'
            }`}>
              {/* Decorative Line */}
              <div className="relative w-12 h-0">
                <div className="absolute bottom-0 left-0 right-0 top-[-3px]">
                  <img alt="" className="w-full h-full" src={imgFrame9} />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col md:flex-row gap-[14px] items-center w-full md:w-auto">
                {/* Primary Button */}
                <Button
                  variant="primary"
                  size="sm"
                  icon={isDownloading ? (
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : <Download />}
                  iconPosition="right"
                  fullWidth
                  className="md:w-auto"
                  onClick={handleWhitepaperDownload}
                  disabled={isDownloading}
                >
                  {isDownloading ? 'Downloading...' : 'Download Whitepaper'}
                </Button>

                {/* Secondary Outline Button */}
                <Button
                  variant="secondary-outline"
                  size="sm"
                  icon={<MessageCircle />}
                  iconPosition="left"
                  fullWidth
                  className="bg-white md:w-auto"
                  onClick={() => window.location.href = '/contact'}
                >
                  Talk to Engineer
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div id="stats-section" className="flex flex-col md:flex-row gap-4 md:gap-7 items-center justify-center w-full max-w-4xl overflow-hidden">
          {animatedStats.map((stat, index) => (
              <div
                key={index}
                className="relative rounded-lg border border-white/20 w-full md:w-auto md:min-w-[191px] bg-black/20 backdrop-blur-xl transition-all duration-300 cursor-pointer"
                onMouseMove={(e) => handleStatsCardMouseMove(e, index)}
                onMouseEnter={() => setStatsCardHovered(prev => prev.map((hovered, i) => i === index ? true : hovered))}
                onMouseLeave={() => setStatsCardHovered(prev => prev.map((hovered, i) => i === index ? false : hovered))}
                style={{
                  transform: statsCardHovered[index] 
                    ? `perspective(1000px) rotateX(${((statsCardMousePos[index]?.y - 50) / 50) * 3}deg) rotateY(${((50 - statsCardMousePos[index]?.x) / 50) * 3}deg) scale3d(1.02, 1.02, 1.02)` 
                    : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
                  filter: statsCardHovered[index]
                    ? `blur(0.5px) saturate(140%) contrast(120%)`
                    : 'blur(0px) saturate(100%) contrast(100%)'
                }}
              >
                {/* Liquid glass effect overlay for stats card */}
                <div 
                  className="absolute inset-0 opacity-0 transition-opacity duration-300 rounded-lg"
                  style={{
                    background: `radial-gradient(circle at ${statsCardMousePos[index]?.x || 0}px ${statsCardMousePos[index]?.y || 0}px, rgba(255, 255, 255, 0.15) 0%, transparent 50%)`,
                    opacity: statsCardHovered[index] ? 1 : 0,
                    transform: statsCardHovered[index] 
                      ? `translate(${((statsCardMousePos[index]?.x || 0) - 50) * 0.05}px, ${((statsCardMousePos[index]?.y || 0) - 50) * 0.05}px) scale(1.02)` 
                      : 'translate(0px, 0px) scale(1)',
                    filter: statsCardHovered[index] 
                      ? `blur(0.5px) saturate(140%)` 
                      : 'blur(0px) saturate(100%)'
                  }}
                />
                
                {/* Chromatic aberration effect for stats card */}
                {statsCardHovered[index] && (
                  <div 
                    className="absolute inset-0 opacity-0 transition-opacity duration-300 rounded-lg pointer-events-none"
                    style={{
                      background: `conic-gradient(from ${statsCardMousePos[index]?.x || 0}deg at ${statsCardMousePos[index]?.x || 0}px ${statsCardMousePos[index]?.y || 0}px, 
                        rgba(255, 0, 150, 0.08), 
                        rgba(0, 255, 255, 0.08), 
                        rgba(255, 255, 0, 0.08), 
                        rgba(255, 0, 150, 0.08))`,
                      opacity: 0.6,
                      mixBlendMode: 'screen'
                    }}
                  />
                )}
                <div className="flex flex-col gap-1 items-center p-[14px] text-center relative z-10">
                  <div className="text-[var(--light)] md:text-[var(--light)] text-h2 font-semibold w-full">
                    {stat.prefix}{stat.value}{stat.suffix}
                  </div>
                  <div className="text-white text-body-medium font-medium w-full">
                    {stat.label}
                  </div>
                </div>
              </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
