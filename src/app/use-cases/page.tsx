'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import IndustrySolutionsContent from '@/components/sections/IndustrySolutionsContent';

export default function UseCasesPage() {
  return (
    <div className="min-h-screen bg-[#fffefd]">
      <Navbar />
      <IndustrySolutionsContent />
      <Footer />
    </div>
  );
}
