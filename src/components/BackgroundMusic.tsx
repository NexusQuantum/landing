'use client';

import { useEffect, useRef } from 'react';

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      // Set volume to 50%
      audio.volume = 0.5;
      
      // Disable autoplay - music will not play automatically
      audio.autoplay = false;
      
      // Loop the music
      audio.loop = true;
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
