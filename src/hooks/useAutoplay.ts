'use client';

import { useEffect, useState } from 'react';

export const AUTOPLAY_MS = 6000;

/**
 * Cycles an index from 0..count-1 on a fixed interval. Pauses automatically
 * when there is one item or fewer. Returns the current index and its setter so
 * callers can also drive it manually (e.g. dot navigation).
 */
export function useAutoplay(count: number, interval = AUTOPLAY_MS) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (count <= 1) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, interval);
    return () => clearInterval(timer);
  }, [count, interval]);

  return [index, setIndex] as const;
}
