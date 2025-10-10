'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ContactContent from '@/components/sections/contact/ContactContent';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <Navbar />

      {/* Contact Content */}
      <ContactContent />

      {/* Footer */}
      <Footer />
    </div>
  );
}
