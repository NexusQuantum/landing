'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import Button from '@/components/ui/Button';
import { ArrowUpRight, Download } from 'lucide-react';


interface ValueCardProps {
  title: string;
  description: string;
  image?: string;
  isActive?: boolean;
  isAnimating?: boolean;
  onClick?: () => void;
  className?: string;
}

const ValueCard: React.FC<ValueCardProps> = ({
  title,
  description,
  image,
  isActive = false,
  isAnimating = false,
  onClick,
  className
}) => {
  const router = useRouter();

  const handleContactClick = () => {
    router.push('/contact');
  };
  return (
    <div
      className={cn(
        'relative rounded-xl cursor-pointer transition-all duration-500 ease-in-out',
        'hover:shadow-lg hover:scale-[1.02]',
        isActive && !isAnimating
          ? 'bg-white border-2 border-[var(--primary-dark-1)] shadow-lg h-auto' 
          : 'bg-white border border-[var(--primary-dark-1)] hover:border-2 h-[250px]',
        className
      )}
      onClick={onClick}
    >
      <div className={cn(
        'flex flex-col items-center justify-center overflow-hidden relative transition-all duration-500 ease-in-out',
        isActive ? 'p-7' : 'p-[14px]'
      )}>
        {/* Image - Only show when active and not animating */}
        {isActive && !isAnimating && image && (
          <div 
            className="h-[212px] w-full rounded-lg bg-center bg-cover bg-no-repeat mb-7 transition-all duration-500 ease-in-out animate-in fade-in slide-in-from-top-2"
            style={{ backgroundImage: `url('${image}')` }}
          />
        )}
        
        {/* Content */}
        <div className="flex flex-col gap-[14px] items-start w-full">
          <h3 className="text-body-medium font-semibold text-[var(--primary-dark-1)] w-full">
            {title}
          </h3>
          <p className="text-body-small font-medium text-[var(--primary-dark-3)] w-full leading-[1.3]">
            {description}
          </p>
        </div>
        
        {/* Buttons - Only show when active and not animating */}
        {isActive && !isAnimating && (
          <div className="flex flex-col md:flex-row gap-[14px] items-start w-full mt-7 transition-all duration-500 ease-in-out animate-in fade-in slide-in-from-bottom-2">
            <Button
              variant="primary-outline"
              size="sm"
              icon={<ArrowUpRight />}
              iconPosition="right"
              className="w-full md:w-auto"
              onClick={handleContactClick}
            >
              Contact Us
            </Button>
            <Button
              variant="tertiary-orange"
              size="sm"
              icon={<Download />}
              iconPosition="left"
              className="w-full md:w-auto"
            >
              Get Brochure
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ValueCard;
