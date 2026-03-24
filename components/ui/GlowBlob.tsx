"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

type GlowBlobProps = {
  /** Chartreuse by default. Pass any CSS color. */
  color?: string;
  /** Blob size in px (default 600) */
  size?: number;
  /** Animation duration in seconds (default 20) */
  duration?: number;
  /** CSS blur amount (default "120px") */
  blur?: string;
  /** Opacity (default 0.12) */
  opacity?: number;
  className?: string;
};

/**
 * Ambient glow blob (inspired by etherfuse.com, cmcc.vc).
 * Slowly drifts between viewport corners on a 20s loop.
 * Pure atmosphere — no interaction needed.
 */
export function GlowBlob({
  color = "rgba(204, 255, 0, 0.5)",
  size = 600,
  duration = 20,
  blur = "120px",
  opacity = 0.12,
  className = "",
}: GlowBlobProps) {
  const blobRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!blobRef.current) return;

    gsap.set(blobRef.current, { xPercent: -50, yPercent: -50 });

    gsap.to(blobRef.current, {
      keyframes: [
        { left: "20%", top: "20%", duration: duration * 0.25 },
        { left: "80%", top: "30%", duration: duration * 0.25 },
        { left: "70%", top: "80%", duration: duration * 0.25 },
        { left: "20%", top: "70%", duration: duration * 0.25 },
      ],
      repeat: -1,
      ease: "none",
    });
  });

  return (
    <div
      ref={blobRef}
      className={`absolute pointer-events-none rounded-full ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color}, transparent 70%)`,
        filter: `blur(${blur})`,
        opacity,
      }}
    />
  );
}
