'use client';

import React from 'react';
import Button from '@/components/ui/Button';
import { ArrowRight, MessageCircle, Plus } from 'lucide-react';

export default function ButtonsPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-h3 font-bold text-white mb-8 text-center">
          Button Components Demo
        </h1>
        
        {/* Solid Buttons */}
        <section className="mb-12">
          <h2 className="text-h2 font-semibold text-white mb-6">Solid Buttons</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h3 className="text-h1 font-medium text-white">Primary</h3>
              <Button variant="primary" size="sm">
                Primary Button
              </Button>
              <Button variant="primary" size="md">
                Primary Button
              </Button>
              <Button variant="primary" size="lg">
                Primary Button
              </Button>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-h1 font-medium text-white">Secondary</h3>
              <Button variant="secondary" size="sm">
                Secondary Button
              </Button>
              <Button variant="secondary" size="md">
                Secondary Button
              </Button>
              <Button variant="secondary" size="lg">
                Secondary Button
              </Button>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-h1 font-medium text-white">White</h3>
              <Button variant="white" size="sm">
                White Button
              </Button>
              <Button variant="white" size="md">
                White Button
              </Button>
              <Button variant="white" size="lg">
                White Button
              </Button>
            </div>
          </div>
        </section>

        {/* Outline Buttons */}
        <section className="mb-12">
          <h2 className="text-h2 font-semibold text-white mb-6">Outline Buttons</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h3 className="text-h1 font-medium text-white">Primary Outline</h3>
              <Button variant="primary-outline" size="sm">
                Primary Outline
              </Button>
              <Button variant="primary-outline" size="md">
                Primary Outline
              </Button>
              <Button variant="primary-outline" size="lg">
                Primary Outline
              </Button>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-h1 font-medium text-white">Secondary Outline</h3>
              <Button variant="secondary-outline" size="sm">
                Secondary Outline
              </Button>
              <Button variant="secondary-outline" size="md">
                Secondary Outline
              </Button>
              <Button variant="secondary-outline" size="lg">
                Secondary Outline
              </Button>
            </div>
          </div>
        </section>

        {/* Tertiary Buttons */}
        <section className="mb-12">
          <h2 className="text-h2 font-semibold text-white mb-6">Tertiary Buttons</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h3 className="text-h1 font-medium text-white">Tertiary Light</h3>
              <Button variant="tertiary-light" size="sm">
                Tertiary Light
              </Button>
              <Button variant="tertiary-light" size="md">
                Tertiary Light
              </Button>
              <Button variant="tertiary-light" size="lg">
                Tertiary Light
              </Button>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-h1 font-medium text-white">Tertiary Orange</h3>
              <Button variant="tertiary-orange" size="sm">
                Tertiary Orange
              </Button>
              <Button variant="tertiary-orange" size="md">
                Tertiary Orange
              </Button>
              <Button variant="tertiary-orange" size="lg">
                Tertiary Orange
              </Button>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-h1 font-medium text-white">Tertiary Dark</h3>
              <Button variant="tertiary-dark" size="sm">
                Tertiary Dark
              </Button>
              <Button variant="tertiary-dark" size="md">
                Tertiary Dark
              </Button>
              <Button variant="tertiary-dark" size="lg">
                Tertiary Dark
              </Button>
            </div>
          </div>
        </section>

        {/* Buttons with Icons */}
        <section className="mb-12">
          <h2 className="text-h2 font-semibold text-white mb-6">Buttons with Icons</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h3 className="text-h1 font-medium text-white">With Arrow Icon</h3>
              <Button 
                variant="primary" 
                size="sm"
                icon={<ArrowRight />}
                iconPosition="right"
              >
                Book Demo
              </Button>
              <Button 
                variant="primary-outline" 
                size="sm"
                icon={<ArrowRight />}
                iconPosition="right"
              >
                Book Demo
              </Button>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-h1 font-medium text-white">With Message Icon</h3>
              <Button 
                variant="white" 
                size="sm"
                icon={<MessageCircle />}
                iconPosition="left"
              >
                Talk to Engineer
              </Button>
              <Button 
                variant="secondary-outline" 
                size="sm"
                icon={<MessageCircle />}
                iconPosition="left"
              >
                Talk to Engineer
              </Button>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-h1 font-medium text-white">With Plus Icon</h3>
              <Button 
                variant="primary-outline" 
                size="sm"
                icon={<Plus />}
                iconPosition="left"
              >
                Add Item
              </Button>
              <Button 
                variant="secondary-outline" 
                size="sm"
                icon={<Plus />}
                iconPosition="right"
              >
                Add Item
              </Button>
            </div>
          </div>
        </section>

        {/* Full Width Buttons */}
        <section className="mb-12">
          <h2 className="text-h2 font-semibold text-white mb-6">Full Width Buttons</h2>
          <div className="space-y-4 max-w-md">
            <Button variant="primary" size="md" fullWidth>
              Full Width Primary
            </Button>
            <Button variant="primary-outline" size="md" fullWidth>
              Full Width Primary Outline
            </Button>
            <Button variant="secondary-outline" size="md" fullWidth>
              Full Width Secondary Outline
            </Button>
          </div>
        </section>

        {/* Disabled Buttons */}
        <section className="mb-12">
          <h2 className="text-h2 font-semibold text-white mb-6">Disabled Buttons</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Button variant="primary" size="md" disabled>
              Disabled Primary
            </Button>
            <Button variant="primary-outline" size="md" disabled>
              Disabled Primary Outline
            </Button>
            <Button variant="secondary-outline" size="md" disabled>
              Disabled Secondary Outline
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}