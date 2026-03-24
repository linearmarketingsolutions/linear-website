"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

type CounterScrollProps = {
  end: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  /** Duration of count animation in seconds (default 2) */
  duration?: number;
};

/**
 * Scroll-triggered counter (inspired by cmcc.vc number blocks).
 * Number counts up as the user scrolls into view.
 * Scrub-linked so the number progresses with scroll position.
 */
export function CounterScroll({
  end,
  prefix = "",
  suffix = "",
  className = "",
  duration = 2,
}: CounterScrollProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const numRef = useRef({ value: 0 });

  useGSAP(() => {
    if (!ref.current) return;

    gsap.to(numRef.current, {
      value: end,
      duration,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ref.current,
        start: "top 85%",
        once: true,
      },
      onUpdate: () => {
        if (ref.current) {
          const val = Math.round(numRef.current.value);
          ref.current.textContent = `${prefix}${val}${suffix}`;
        }
      },
    });
  });

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  );
}
