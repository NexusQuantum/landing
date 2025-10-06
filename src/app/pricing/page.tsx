'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PricingContent from '@/components/sections/pricing/PricingContent';

interface PricingPageProps {
  className?: string;
}

const PricingPage: React.FC<PricingPageProps> = ({ className }) => {
  return (
    <div className={cn('min-h-screen bg-white', className)}>
      {/* Navbar */}
      <Navbar />
      
      {/* Pricing Content */}
      <PricingContent />
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PricingPage;











