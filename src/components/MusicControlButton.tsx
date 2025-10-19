'use client';

import { useState, useEffect } from 'react';

export default function MusicControlButton() {
  const [isMuted, setIsMuted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show button after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const toggleMute = () => {
    const audio = document.querySelector('audio') as HTMLAudioElement;
    if (audio) {
      if (isMuted) {
        audio.volume = 0.5; // Set back to 50%
        audio.play().catch(() => {
          // If autoplay is blocked, just unmute
          console.log('Audio play was prevented, but volume restored');
        });
      } else {
        audio.volume = 0; // Mute
      }
      setIsMuted(!isMuted);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={toggleMute}
        className="group relative overflow-hidden rounded-full p-4 transition-all duration-300 hover:scale-110 active:scale-95"
        style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        }}
        aria-label={isMuted ? 'Unmute music' : 'Mute music'}
      >
        {/* Liquid glass effect overlay */}
        <div 
          className="absolute inset-0 rounded-full opacity-30 transition-opacity duration-300 group-hover:opacity-50"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.05) 100%)',
          }}
        />
        
        {/* Speaker icon */}
        <div className="relative z-10">
          {isMuted ? (
            // Muted speaker icon
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-white transition-colors duration-200"
            >
              <path
                d="M11 5L6 9H2V15H6L11 19V5Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M19.07 4.93C20.88 6.74 22 9.24 22 12C22 14.76 20.88 17.26 19.07 19.07M15.54 8.46C16.48 9.4 17 10.66 17 12C17 13.34 16.48 14.6 15.54 15.54"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 2L22 22"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            // Unmuted speaker icon
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-white transition-colors duration-200"
            >
              <path
                d="M11 5L6 9H2V15H6L11 19V5Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M19.07 4.93C20.88 6.74 22 9.24 22 12C22 14.76 20.88 17.26 19.07 19.07M15.54 8.46C16.48 9.4 17 10.66 17 12C17 13.34 16.48 14.6 15.54 15.54"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>

        {/* Ripple effect on click */}
        <div className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-active:opacity-20 group-active:bg-white" />
      </button>
    </div>
  );
}
