'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AboutMission from '@/components/sections/about/AboutMission';
import AboutBelief from '@/components/sections/about/AboutBelief';
import AboutPrinciples from '@/components/sections/about/AboutPrinciples';

interface AboutPageProps {
  className?: string;
}

const AboutPage: React.FC<AboutPageProps> = ({ className }) => {
  return (
    <div className={cn('min-h-screen bg-white', className)}>
      {/* Navbar */}
      <Navbar />
      
      {/* Mission Section */}
      <AboutMission />
      
      {/* Belief Section */}
      <AboutBelief />
      
      {/* Engineering Principles Section */}
      <AboutPrinciples />
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AboutPage;
