'use client';

import React, { useRef, useEffect, useState } from 'react';

interface LiquidGlassCardProps {
  type?: 'userInfo' | 'button';
  onClick?: () => void;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

interface CustomizableLiquidGlassCardProps {
  displacementScale?: number;
  blurAmount?: number;
  saturation?: number;
  aberrationIntensity?: number;
  elasticity?: number;
  cornerRadius?: number;
  overLight?: boolean;
  mode?: 'standard' | 'premium';
  onClick?: () => void;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export const LiquidGlassCard: React.FC<LiquidGlassCardProps> = ({ 
  type = 'userInfo', 
  onClick, 
  style,
  children 
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setMousePosition({ x, y });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  useEffect(() => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const { x, y } = mousePosition;
    const { width, height } = card.getBoundingClientRect();
    
    const centerX = width / 2;
    const centerY = height / 2;
    
    const rotateX = ((y - centerY) / centerY) * 10;
    const rotateY = ((centerX - x) / centerX) * 10;
    
    if (isHovered) {
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    } else {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    }
  }, [mousePosition, isHovered]);

  const renderContent = () => {
    if (children) return children;
    
    if (type === 'userInfo') {
      return (
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-white text-xl font-bold">U</span>
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">User Profile</h3>
          <p className="text-sm text-white/70">Hover to see liquid effect</p>
        </div>
      );
    }
    
    if (type === 'button') {
      return (
        <button 
          onClick={onClick}
          className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300"
        >
          Logout
        </button>
      );
    }
    
    return null;
  };

  return (
    <div
      ref={cardRef}
      className="liquid-glass-card relative overflow-hidden rounded-2xl p-6 cursor-pointer transition-all duration-300"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        ...style
      }}
    >
      {/* Liquid effect overlay */}
      <div 
        className="absolute inset-0 opacity-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 255, 255, 0.1) 0%, transparent 50%)`,
          opacity: isHovered ? 1 : 0
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {renderContent()}
      </div>
    </div>
  );
};

export const CustomizableLiquidGlassCard: React.FC<CustomizableLiquidGlassCardProps> = ({
  displacementScale = 93,
  blurAmount = 0.5,
  saturation = 140,
  aberrationIntensity = 2,
  elasticity = 0.2,
  cornerRadius = 24,
  overLight = false,
  mode = 'standard',
  onClick,
  style,
  children
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setMousePosition({ x, y });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  useEffect(() => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const { x, y } = mousePosition;
    const { width, height } = card.getBoundingClientRect();
    
    const centerX = width / 2;
    const centerY = height / 2;
    
    const rotateX = ((y - centerY) / centerY) * 15;
    const rotateY = ((centerX - x) / centerX) * 15;
    
    if (isHovered) {
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.08, 1.08, 1.08)`;
    } else {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    }
  }, [mousePosition, isHovered]);

  return (
    <div
      ref={cardRef}
      className="customizable-liquid-glass-card relative overflow-hidden cursor-pointer transition-all duration-500"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        background: mode === 'premium' 
          ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.05))'
          : 'rgba(255, 255, 255, 0.1)',
        backdropFilter: `blur(${blurAmount * 20}px)`,
        border: `1px solid rgba(255, 255, 255, ${overLight ? 0.3 : 0.2})`,
        boxShadow: mode === 'premium' 
          ? '0 20px 40px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
          : '0 8px 32px rgba(0, 0, 0, 0.1)',
        borderRadius: `${cornerRadius}px`,
        ...style
      }}
    >
      {/* Advanced liquid effect overlay */}
      <div 
        className="absolute inset-0 opacity-0 transition-all duration-500"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, 
            rgba(255, 255, 255, ${overLight ? 0.2 : 0.1}) 0%, 
            rgba(255, 255, 255, 0.05) 30%, 
            transparent 70%)`,
          opacity: isHovered ? 1 : 0,
          filter: `saturate(${saturation}%)`
        }}
      />
      
      {/* Aberration effect */}
      <div 
        className="absolute inset-0 opacity-0 transition-opacity duration-300"
        style={{
          background: `conic-gradient(from ${mousePosition.x}deg at ${mousePosition.x}px ${mousePosition.y}px, 
            rgba(255, 0, 150, 0.1), 
            rgba(0, 255, 255, 0.1), 
            rgba(255, 255, 0, 0.1), 
            rgba(255, 0, 150, 0.1))`,
          opacity: isHovered ? aberrationIntensity / 10 : 0,
          mixBlendMode: 'screen'
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 p-6">
        {children}
      </div>
    </div>
  );
};
