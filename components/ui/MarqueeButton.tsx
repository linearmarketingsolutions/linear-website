"use client";

import { useRef, type ReactNode } from "react";
import { gsap } from "gsap";

type MarqueeButtonProps = {
  children: ReactNode;
  /** Text to show on hover marquee (defaults to children text) */
  hoverText?: string;
  className?: string;
  href?: string;
  onClick?: () => void;
};

/**
 * Marquee text reveal on hover (inspired by etherfuse.com).
 * Default text is visible. On hover, a scrolling marquee replaces it.
 * Creates a dynamic, tactile button feel.
 */
export function MarqueeButton({
  children,
  hoverText,
  className = "",
  href,
  onClick,
}: MarqueeButtonProps) {
  const defaultRef = useRef<HTMLSpanElement>(null);
  const marqueeRef = useRef<HTMLSpanElement>(null);

  const onEnter = () => {
    gsap.to(defaultRef.current, { opacity: 0, y: -8, duration: 0.25, ease: "power2.in" });
    gsap.to(marqueeRef.current, { opacity: 1, y: 0, duration: 0.25, ease: "power2.out", delay: 0.1 });
  };

  const onLeave = () => {
    gsap.to(marqueeRef.current, { opacity: 0, y: 8, duration: 0.25, ease: "power2.in" });
    gsap.to(defaultRef.current, { opacity: 1, y: 0, duration: 0.25, ease: "power2.out", delay: 0.1 });
  };

  const marqueeContent = hoverText || (typeof children === "string" ? children : "");
  const Tag = href ? "a" : "button";

  return (
    <Tag
      href={href}
      onClick={onClick}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className={`relative overflow-hidden inline-flex items-center justify-center ${className}`}
    >
      {/* Default text */}
      <span ref={defaultRef} className="relative z-10">
        {children}
      </span>

      {/* Marquee overlay */}
      <span
        ref={marqueeRef}
        className="absolute inset-0 flex items-center justify-center opacity-0 translate-y-2 overflow-hidden"
      >
        <span className="inline-flex whitespace-nowrap animate-[marquee_3s_linear_infinite]">
          {`${marqueeContent} · `.repeat(4)}
        </span>
      </span>
    </Tag>
  );
}
