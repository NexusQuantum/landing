'use client';

import { useEffect, useRef } from 'react';

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      // Set volume to 50%
      audio.volume = 0.5;
      
      // Enable autoplay
      audio.autoplay = true;
      
      // Loop the music
      audio.loop = true;
      
      // Handle autoplay policy - try to play and catch any errors
      const playAudio = async () => {
        try {
          await audio.play();
        } catch (error) {
          console.log('Autoplay was prevented:', error);
          // If autoplay fails, we can add a user interaction handler
          // or show a play button
        }
      };

      playAudio();
    }
  }, []);

  return (
    <audio
      ref={audioRef}
      preload="auto"
      style={{ display: 'none' }}
    >
      <source src="/bg-music-nqr.mp3" type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
  );
}
