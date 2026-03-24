"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

type VeilGlowProps = {
  /** Glow color (default chartreuse) */
  color?: string;
  /** Direction: "left" | "right" (default "right") */
  direction?: "left" | "right";
  className?: string;
};

/**
 * Veil glow effect (inspired by makemepulse.com).
 * A translucent color veil slides across the section on scroll,
 * leaving a glowing trail. Pure drama.
 */
export function VeilGlow({
  color = "rgba(204, 255, 0, 0.08)",
  direction = "right",
  className = "",
}: VeilGlowProps) {
  const veilRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!veilRef.current) return;

    const from = direction === "right" ? "-100%" : "100%";
    const to = direction === "right" ? "100%" : "-100%";

    gsap.fromTo(
      veilRef.current,
      { x: from },
      {
        x: to,
        ease: "none",
        scrollTrigger: {
          trigger: veilRef.current.parentElement,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      }
    );
  });

  return (
    <div
      ref={veilRef}
      className={`absolute inset-y-0 w-[60%] pointer-events-none z-[1] ${className}`}
      style={{
        background: `linear-gradient(${direction === "right" ? "90deg" : "270deg"}, transparent, ${color}, transparent)`,
        boxShadow: `0 0 120px 60px ${color}`,
      }}
    />
  );
}
