'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PricingContent from '@/components/sections/pricing/PricingContent';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <Navbar />

      {/* Pricing Content */}
      <PricingContent />

      {/* Footer */}
      <Footer />
    </div>
  );
}











