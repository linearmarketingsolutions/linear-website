"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

type ScrollRevealProps = {
  children: React.ReactNode;
  as?: "div" | "section" | "article" | "aside" | "span";
  className?: string;
  /** Animation direction: "up" | "down" | "left" | "right" | "scale" (default: "up") */
  direction?: "up" | "down" | "left" | "right" | "scale";
  /** Distance to travel in px (default 60) */
  distance?: number;
  /** Duration in seconds (default 0.8) */
  duration?: number;
  /** Delay in seconds (default 0) */
  delay?: number;
  /** ScrollTrigger start position (default "top 85%") */
  start?: string;
  /** If true, children are staggered (default false) */
  stagger?: boolean;
  /** Stagger amount in seconds (default 0.1) */
  staggerAmount?: number;
};

/**
 * Scroll-triggered reveal wrapper.
 * Wraps any content and reveals it with GSAP when scrolled into view.
 * Replaces basic Framer Motion fadeUp for scroll-driven animations.
 */
export function ScrollReveal({
  children,
  as: Tag = "div",
  className = "",
  direction = "up",
  distance = 60,
  duration = 0.8,
  delay = 0,
  start = "top 85%",
  stagger = false,
  staggerAmount = 0.1,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;

      const targets = stagger
        ? ref.current.querySelectorAll("[data-reveal-item]")
        : [ref.current];

      if (targets.length === 0) return;

      const from = getFromVars(direction, distance);

      gsap.fromTo(
        targets,
        { ...from, opacity: 0 },
        {
          x: 0,
          y: 0,
          scale: 1,
          opacity: 1,
          duration,
          delay,
          stagger: stagger ? staggerAmount : 0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start,
            once: true,
          },
        }
      );
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref as React.RefObject<HTMLElement & HTMLDivElement>} className={className}>
      {children}
    </Tag>
  );
}

function getFromVars(direction: string, distance: number) {
  switch (direction) {
    case "down":
      return { y: -distance };
    case "left":
      return { x: distance };
    case "right":
      return { x: -distance };
    case "scale":
      return { scale: 0.9 };
    case "up":
    default:
      return { y: distance };
  }
}
