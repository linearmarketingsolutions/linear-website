"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type SpotlightProps = {
  className?: string;
  color?: string;
  size?: number;
};

/**
 * Cursor-tracking spotlight — soft elliptical glow that follows the pointer.
 * Bound to the parent section via absolute positioning. Damped spring for
 * Apple-style trail (not 1:1 — feels alive, not sticky).
 */
export function Spotlight({
  className,
  color = "rgba(167, 139, 250, 0.18)",
  size = 600,
}: SpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(-size);
  const y = useMotionValue(-size);
  const sx = useSpring(x, { stiffness: 90, damping: 30, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 90, damping: 30, mass: 0.6 });
  const left = useTransform(sx, (v) => v - size / 2);
  const top = useTransform(sy, (v) => v - size / 2);

  useEffect(() => {
    const el = containerRef.current?.parentElement;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      x.set(e.clientX - r.left);
      y.set(e.clientY - r.top);
    };
    const onLeave = () => {
      x.set(-size);
      y.set(-size);
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [x, y, size]);

  return (
    <div
      ref={containerRef}
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden="true"
    >
      <motion.div
        style={{
          left,
          top,
          width: size,
          height: size,
          background: `radial-gradient(circle, ${color} 0%, transparent 60%)`,
        }}
        className="absolute rounded-full blur-2xl"
      />
    </div>
  );
}
