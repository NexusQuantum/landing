'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SolutionProducts from '@/components/sections/solution/SolutionProducts';

export default function SolutionPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <Navbar />

      {/* Products Section */}
      <SolutionProducts />

      {/* Footer */}
      <Footer />
    </div>
  );
}
