import React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary-light' | 'tertiary-orange' | 'tertiary-dark' | 'tertiary' | 'white' | 'primary-outline' | 'secondary-outline' | 'disabled';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right' | 'full';
  fullWidth?: boolean;
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      loading = false,
      icon,
      iconPosition = 'left',
      fullWidth = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseClasses = cn(
      // Base styles - Following Figma design system
      'inline-flex items-center justify-center gap-[10px] font-medium transition-all duration-300',
      'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent',
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
      'relative overflow-hidden font-montserrat',
      
      // Size variants - Using Typography System
      {
        'px-3.5 py-2.5 text-body-small rounded-lg': size === 'sm',
        'px-4 py-3 text-body-medium rounded-lg': size === 'md' || size === 'lg', // Default size
        'px-5 py-4 text-body-large rounded-xl': size === 'xl',
      },
      
      // Width
      {
        'w-full': fullWidth,
        'w-auto': !fullWidth, // Ensure button hugs content when not fullWidth
      },
      
      // Variant styles - Using Design System Colors
      {
        // Primary - Primary Dark 1 (Orange)
        'bg-[var(--primary-dark-1)] text-white shadow-[0px_2px_6px_2px_rgba(0,0,0,0.15),0px_1px_2px_0px_rgba(0,0,0,0.3)] hover:bg-[var(--primary-dark-2)] hover:shadow-[0px_4px_8px_2px_rgba(0,0,0,0.2),0px_2px_4px_0px_rgba(0,0,0,0.4)] focus:ring-[var(--primary-dark-1)]': variant === 'primary',
        
        // Secondary - Primary Dark 3 (Dark Brown)
        'bg-[var(--primary-dark-3)] text-white shadow-[0px_2px_6px_2px_rgba(0,0,0,0.15),0px_1px_2px_0px_rgba(0,0,0,0.3)] hover:bg-[#4a1a00] hover:shadow-[0px_4px_8px_2px_rgba(0,0,0,0.2),0px_2px_4px_0px_rgba(0,0,0,0.4)] focus:ring-[var(--primary-dark-3)]': variant === 'secondary',
        
        // Tertiary Light / Tertiary - Transparent with white text
        'bg-transparent text-white hover:bg-white/10 focus:ring-white/50': variant === 'tertiary-light' || variant === 'tertiary',

        // Tertiary Orange - Transparent with primary dark 1 text
        'bg-transparent text-[var(--primary-dark-1)] hover:bg-[var(--primary-dark-1)]/10 focus:ring-[var(--primary-dark-1)]/50': variant === 'tertiary-orange',

        // Tertiary Dark - Transparent with primary dark 3 text
        'bg-transparent text-[var(--primary-dark-3)] hover:bg-[var(--primary-dark-3)]/10 focus:ring-[var(--primary-dark-3)]/50': variant === 'tertiary-dark',
        
        // White - White background with dark text (for Talk to Engineer button)
        'bg-[var(--light)] text-[var(--primary-dark-3)] border border-[var(--primary-dark-3)] shadow-[0px_2px_6px_2px_rgba(0,0,0,0.15),0px_1px_2px_0px_rgba(0,0,0,0.3)] hover:bg-white/90 hover:shadow-[0px_4px_8px_2px_rgba(0,0,0,0.2),0px_2px_4px_0px_rgba(0,0,0,0.4)] focus:ring-[var(--primary-dark-3)]': variant === 'white',
        
        // Primary Outline - Transparent background with orange border and text
        'bg-transparent text-[var(--primary-dark-1)] border border-[var(--primary-dark-1)] shadow-[0px_2px_6px_2px_rgba(0,0,0,0.15),0px_1px_2px_0px_rgba(0,0,0,0.3)] hover:bg-[var(--primary-dark-1)]/10 hover:shadow-[0px_4px_8px_2px_rgba(0,0,0,0.2),0px_2px_4px_0px_rgba(0,0,0,0.4)] focus:ring-[var(--primary-dark-1)]': variant === 'primary-outline',
        
        // Secondary Outline - Transparent background with dark brown border and text
        'bg-transparent text-[var(--primary-dark-3)] border border-[var(--primary-dark-3)] shadow-[0px_2px_6px_2px_rgba(0,0,0,0.15),0px_1px_2px_0px_rgba(0,0,0,0.3)] hover:bg-[var(--primary-dark-3)]/10 hover:shadow-[0px_4px_8px_2px_rgba(0,0,0,0.2),0px_2px_4px_0px_rgba(0,0,0,0.4)] focus:ring-[var(--primary-dark-3)]': variant === 'secondary-outline',
        
        // Disabled - Dark 7 (Gray)
        'bg-transparent text-[var(--dark-7)] cursor-not-allowed': variant === 'disabled',
      },
      
      className
    );

    const iconClasses = cn(
      'flex-shrink-0',
      {
        'w-[14px] h-[14px]': size === 'sm', // Same as text-body-small (14px)
        'w-[16px] h-[16px]': size === 'md' || size === 'lg', // Same as text-body-medium (16px)
        'w-[18px] h-[18px]': size === 'xl', // Same as text-body-large (18px)
      }
    );

    return (
      <button
        className={baseClasses}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {/* Loading spinner */}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          </div>
        )}
        
        {/* Content */}
        <div className={cn('flex items-center gap-[10px]', { 'opacity-0': loading })}>
          {icon && (iconPosition === 'left' || iconPosition === 'full') && (
            <span className={cn(iconClasses, 'flex items-center justify-center')}>{icon}</span>
          )}
          <span className="flex items-center">{children}</span>
          {icon && iconPosition === 'right' && (
            <span className={cn(iconClasses, 'flex items-center justify-center')}>{icon}</span>
          )}
        </div>
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
