"use client";

import { useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

type ClipShape = "circle" | "inset" | "polygon";

type ClipPathRevealProps = {
  children: ReactNode;
  className?: string;
  /** Shape to reveal from (default "circle") */
  shape?: ClipShape;
  /** Duration in seconds (default 1.2) */
  duration?: number;
  /** ScrollTrigger start (default "top 75%") */
  start?: string;
};

const CLIP_FROM: Record<ClipShape, string> = {
  circle: "circle(0% at 50% 50%)",
  inset: "inset(50% 50% 50% 50%)",
  polygon: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)",
};

const CLIP_TO: Record<ClipShape, string> = {
  circle: "circle(75% at 50% 50%)",
  inset: "inset(0% 0% 0% 0%)",
  polygon: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
};

/**
 * Clip-path reveal animation (inspired by makemepulse.com).
 * Content is masked and reveals via clip-path morphing on scroll.
 * Creates dramatic section transitions.
 */
export function ClipPathReveal({
  children,
  className = "",
  shape = "circle",
  duration = 1.2,
  start = "top 75%",
}: ClipPathRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;

    gsap.fromTo(
      ref.current,
      { clipPath: CLIP_FROM[shape] },
      {
        clipPath: CLIP_TO[shape],
        duration,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: ref.current,
          start,
          once: true,
        },
      }
    );
  });

  return (
    <div ref={ref} className={`will-change-[clip-path] ${className}`}>
      {children}
    </div>
  );
}
