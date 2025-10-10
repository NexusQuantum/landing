'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AboutMission from '@/components/sections/about/AboutMission';
import AboutBelief from '@/components/sections/about/AboutBelief';
import AboutPrinciples from '@/components/sections/about/AboutPrinciples';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
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
}
