"use client";

import { useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

type ParallaxSectionProps = {
  children: ReactNode;
  className?: string;
  /** Parallax speed — negative = moves up faster, positive = lags (default -0.2) */
  speed?: number;
  /** Additional y offset in px (default 0) */
  offset?: number;
};

/**
 * Parallax wrapper (inspired by cyclemon.com, latecheckout.studio).
 * Wraps content and applies scroll-driven parallax via GSAP ScrollTrigger.
 * Use for background images, floating elements, or entire sections.
 */
export function ParallaxSection({
  children,
  className = "",
  speed = -0.2,
  offset = 0,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;

    gsap.to(ref.current, {
      y: () => speed * ScrollTrigger.maxScroll(window) * 0.1 + offset,
      ease: "none",
      scrollTrigger: {
        trigger: ref.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        invalidateOnRefresh: true,
      },
    });
  });

  return (
    <div ref={ref} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}
