'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ContactContent from '@/components/sections/contact/ContactContent';

interface ContactPageProps {
  className?: string;
}

const ContactPage: React.FC<ContactPageProps> = ({ className }) => {
  return (
    <div className={cn('min-h-screen bg-white', className)}>
      {/* Navbar */}
      <Navbar />
      
      {/* Contact Content */}
      <ContactContent />
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ContactPage;
