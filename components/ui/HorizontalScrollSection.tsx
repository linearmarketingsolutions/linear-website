"use client";

import { useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

type HorizontalScrollSectionProps = {
  children: ReactNode;
  className?: string;
  /** Height of the scroll container in vh (default 300) — controls how long the horizontal scroll "feels" */
  scrollHeight?: number;
};

/**
 * Horizontal scroll section (inspired by cmcc.vc number blocks).
 * Vertical scroll drives a horizontal panel translation.
 * Content scrolls left as the user scrolls down.
 */
export function HorizontalScrollSection({
  children,
  className = "",
  scrollHeight = 300,
}: HorizontalScrollSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !panelRef.current) return;

    const panel = panelRef.current;
    const scrollWidth = panel.scrollWidth - panel.clientWidth;

    gsap.to(panel, {
      x: -scrollWidth,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: () => `+=${scrollWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });
  });

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden ${className}`}
      style={{ height: `${scrollHeight}vh` }}
    >
      <div
        ref={panelRef}
        className="flex items-center h-screen will-change-transform"
        style={{ width: "max-content" }}
      >
        {children}
      </div>
    </div>
  );
}
