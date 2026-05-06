"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type AuroraBackgroundProps = {
  className?: string;
};

/**
 * LMS Aurora — three drifting violet/indigo streaks behind hero content.
 * Custom-tuned to LMS purple palette. Concentrated upper-right via radial mask.
 * Pure CSS gradients + motion drift — no WebGL, no second GL context.
 */
export function AuroraBackground({ className }: AuroraBackgroundProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
      aria-hidden="true"
    >
      {/* Streak 1 — deep violet, upper right */}
      <motion.div
        className="absolute -top-1/3 -right-1/3 h-[80vh] w-[80vh] rounded-full opacity-50 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(124,58,237,0.55) 0%, rgba(124,58,237,0) 65%)",
        }}
        animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0] }}
        transition={{ duration: 22, ease: "easeInOut", repeat: Infinity }}
      />
      {/* Streak 2 — indigo, mid-left drift */}
      <motion.div
        className="absolute top-1/4 -left-1/4 h-[70vh] w-[70vh] rounded-full opacity-40 blur-[140px]"
        style={{
          background:
            "radial-gradient(circle, rgba(99,102,241,0.5) 0%, rgba(99,102,241,0) 65%)",
        }}
        animate={{ x: [0, 60, 30, 0], y: [0, 40, -20, 0] }}
        transition={{ duration: 28, ease: "easeInOut", repeat: Infinity }}
      />
      {/* Streak 3 — light lavender accent, lower right */}
      <motion.div
        className="absolute -bottom-1/4 right-1/4 h-[55vh] w-[55vh] rounded-full opacity-35 blur-[110px]"
        style={{
          background:
            "radial-gradient(circle, rgba(167,139,250,0.45) 0%, rgba(167,139,250,0) 60%)",
        }}
        animate={{ x: [0, -50, 20, 0], y: [0, -40, 30, 0] }}
        transition={{ duration: 25, ease: "easeInOut", repeat: Infinity }}
      />
      {/* Subtle grain to break the gradient bands */}
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}
