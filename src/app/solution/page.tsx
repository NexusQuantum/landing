'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SolutionProducts from '@/components/sections/solution/SolutionProducts';

interface SolutionPageProps {
  className?: string;
}

const SolutionPage: React.FC<SolutionPageProps> = ({ className }) => {
  return (
    <div className={cn('min-h-screen bg-white', className)}>
      {/* Navbar */}
      <Navbar />
      
      {/* Products Section */}
      <SolutionProducts />
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default SolutionPage;
