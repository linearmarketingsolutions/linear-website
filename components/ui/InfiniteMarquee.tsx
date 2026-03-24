"use client";

import { useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

type InfiniteMarqueeProps = {
  children: ReactNode;
  /** Speed in px/sec (default 80) */
  speed?: number;
  /** Direction (default "left") */
  direction?: "left" | "right";
  /** Gap between repeats (default "2rem") */
  gap?: string;
  className?: string;
  /** Pause on hover (default true) */
  pauseOnHover?: boolean;
};

/**
 * Infinite horizontal marquee scroll.
 * Content repeats seamlessly and scrolls infinitely.
 * Mouse hover pauses the scroll.
 */
export function InfiniteMarquee({
  children,
  speed = 80,
  direction = "left",
  gap = "2rem",
  className = "",
  pauseOnHover = true,
}: InfiniteMarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useGSAP(() => {
    if (!trackRef.current) return;

    const track = trackRef.current;
    const totalWidth = track.scrollWidth / 2; // we duplicate content

    tweenRef.current = gsap.to(track, {
      x: direction === "left" ? -totalWidth : totalWidth,
      duration: totalWidth / speed,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: (x) => {
          const val = parseFloat(x);
          if (direction === "left") {
            return `${val % totalWidth}px`;
          }
          return `${((val % totalWidth) + totalWidth) % totalWidth - totalWidth}px`;
        },
      },
    });
  });

  const onEnter = () => {
    if (pauseOnHover && tweenRef.current) {
      gsap.to(tweenRef.current, { timeScale: 0, duration: 0.5 });
    }
  };

  const onLeave = () => {
    if (pauseOnHover && tweenRef.current) {
      gsap.to(tweenRef.current, { timeScale: 1, duration: 0.5 });
    }
  };

  return (
    <div
      className={`overflow-hidden ${className}`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div
        ref={trackRef}
        className="flex will-change-transform"
        style={{ gap }}
      >
        {/* Duplicate for seamless loop */}
        <div className="flex shrink-0" style={{ gap }}>
          {children}
        </div>
        <div className="flex shrink-0" style={{ gap }}>
          {children}
        </div>
      </div>
    </div>
  );
}
