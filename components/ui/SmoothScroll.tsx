"use client";

import { ReactLenis } from "@studio-freight/react-lenis";

/**
 * Lenis smooth scroll wrapper.
 * Wraps the entire app for momentum-based scrolling (like makemepulse.com).
 * Duration controls inertia — higher = more ice-slide feel.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 2,
      }}
    >
      {children}
    </ReactLenis>
  );
}
