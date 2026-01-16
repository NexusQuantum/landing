'use client';

import { useState, useEffect } from 'react';

export default function MusicControlButton() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show button after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    // Check if audio is playing on mount and track state
    const audio = document.querySelector('audio') as HTMLAudioElement;
    const updatePlayingState = () => {
      if (audio) {
        setIsPlaying(!audio.paused);
      }
    };

    if (audio) {
      audio.addEventListener('play', updatePlayingState);
      audio.addEventListener('pause', updatePlayingState);
      updatePlayingState();
    }

    return () => {
      clearTimeout(timer);
      if (audio) {
        audio.removeEventListener('play', updatePlayingState);
        audio.removeEventListener('pause', updatePlayingState);
      }
    };
  }, []);

  const togglePlay = () => {
    const audio = document.querySelector('audio') as HTMLAudioElement;
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.volume = 0.5; // Set volume to 50%
        audio.play().catch((error) => {
          console.log('Audio play was prevented:', error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={togglePlay}
        className="group relative overflow-hidden rounded-full p-4 transition-all duration-300 hover:scale-110 active:scale-95"
        style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        }}
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
      >
        {/* Liquid glass effect overlay */}
        <div 
          className="absolute inset-0 rounded-full opacity-30 transition-opacity duration-300 group-hover:opacity-50"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.05) 100%)',
          }}
        />
        
        {/* Play/Pause icon */}
        <div className="relative z-10">
          {isPlaying ? (
            // Pause icon
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-white transition-colors duration-200"
            >
              <path
                d="M6 4H10V20H6V4ZM14 4H18V20H14V4Z"
                fill="currentColor"
              />
            </svg>
          ) : (
            // Play icon
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-white transition-colors duration-200"
            >
              <path
                d="M8 5V19L19 12L8 5Z"
                fill="currentColor"
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
