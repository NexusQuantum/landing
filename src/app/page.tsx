'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import LayersSection from '@/components/sections/LayersSection';
import ValueSection from '@/components/sections/ValueSection';
import FeaturedProductsSection from '@/components/sections/FeaturedProductsSection';
import WhoWeServeSection from '@/components/sections/WhoWeServeSection';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Navbar Component */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section - Implemented from Figma Design */}
        <div className="animated-bg">
          <Hero videoSrc="/hero-video.mp4.mp4" />
        </div>

        {/* Layers Section - ONE CLOUD, THREE LAYERS */}
        <LayersSection />

        {/* Value Section - VALUE PILLARS */}
        <ValueSection />

        {/* Featured Products Section */}
        <FeaturedProductsSection />

        {/* Who We Serve Section */}
        <WhoWeServeSection />
      </main>

      {/* Footer Component */}
      <div className="relative z-20 bg-[var(--background)]">
        <Footer />
      </div>
    </div>
  );
}