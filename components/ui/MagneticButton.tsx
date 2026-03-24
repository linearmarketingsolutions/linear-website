"use client";

import { useRef, type ReactNode } from "react";
import { gsap } from "gsap";

type MagneticButtonProps = {
  children: ReactNode;
  className?: string;
  /** Magnetic pull strength — higher = more pull (default 0.3) */
  strength?: number;
};

/**
 * Magnetic hover effect (inspired by kprverse.com, makemepulse.com).
 * Element subtly follows the cursor when hovered, snaps back on leave.
 * Use on CTAs and interactive elements for tactile feel.
 */
export function MagneticButton({
  children,
  className = "",
  strength = 0.3,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(ref.current, {
      x: x * strength,
      y: y * strength,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const onMouseLeave = () => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)",
    });
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`inline-block ${className}`}
    >
      {children}
    </div>
  );
}
