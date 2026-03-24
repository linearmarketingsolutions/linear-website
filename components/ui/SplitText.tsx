"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

type SplitMode = "words" | "lines" | "chars";

type SplitTextProps = {
  children: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  className?: string;
  mode?: SplitMode;
  stagger?: number;
  duration?: number;
  delay?: number;
  /** If true, animates on scroll into view (default). If false, animates immediately. */
  scrollTrigger?: boolean;
  /** Start position for scroll trigger (default: "top 85%") */
  triggerStart?: string;
};

/**
 * Split text animation component (inspired by cmcc.vc, makemepulse.com).
 * Splits text into words/chars/lines and animates them in with stagger.
 * Uses GSAP ScrollTrigger by default — text reveals as you scroll to it.
 */
export function SplitText({
  children,
  as: Tag = "div",
  className = "",
  mode = "words",
  stagger = 0.04,
  duration = 0.8,
  delay = 0,
  scrollTrigger = true,
  triggerStart = "top 85%",
}: SplitTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const spans = containerRef.current.querySelectorAll<HTMLSpanElement>("[data-split-unit]");
      if (spans.length === 0) return;

      gsap.set(spans, { y: "110%", opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: scrollTrigger
          ? {
              trigger: containerRef.current,
              start: triggerStart,
              once: true,
            }
          : undefined,
        delay,
      });

      tl.to(spans, {
        y: "0%",
        opacity: 1,
        duration,
        stagger,
        ease: "power3.out",
      });
    },
    { scope: containerRef, dependencies: [children] }
  );

  const units = splitText(children, mode);

  return (
    <Tag ref={containerRef as React.RefObject<HTMLElement & HTMLDivElement>} className={className}>
      {units.map((unit, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <span data-split-unit className="inline-block will-change-transform">
            {unit === " " ? "\u00A0" : unit}
          </span>
        </span>
      ))}
    </Tag>
  );
}

function splitText(text: string, mode: SplitMode): string[] {
  switch (mode) {
    case "chars":
      return text.split("");
    case "words":
      // Keep spaces as separate entries for proper word spacing
      return text.split(/(\s+)/).filter(Boolean);
    case "lines":
      return text.split("\n");
  }
}
