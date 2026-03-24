"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

type TextRevealOnScrollProps = {
  children: string;
  as?: "h1" | "h2" | "h3" | "p" | "div" | "span";
  className?: string;
  /** Scrub-linked: text opacity progresses as you scroll (default true) */
  scrub?: boolean;
};

/**
 * Scroll-scrubbed text reveal (inspired by makemepulse.com, cmcc.vc).
 * Each word starts dim and lights up as the user scrolls through the section.
 * Creates a reading-pace-matched reveal effect.
 */
export function TextRevealOnScroll({
  children,
  as: Tag = "p",
  className = "",
  scrub = true,
}: TextRevealOnScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const words = containerRef.current.querySelectorAll<HTMLSpanElement>("[data-word]");
      if (words.length === 0) return;

      if (scrub) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "bottom 40%",
            scrub: 1,
          },
        });

        tl.to(words, {
          color: "var(--color-text-primary)",
          stagger: 0.05,
          duration: 0.5,
        });
      } else {
        gsap.to(words, {
          color: "var(--color-text-primary)",
          stagger: 0.03,
          duration: 0.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            once: true,
          },
        });
      }
    },
    { scope: containerRef, dependencies: [children] }
  );

  const wordArray = children.split(/(\s+)/);

  return (
    <Tag ref={containerRef as React.RefObject<HTMLElement & HTMLDivElement>} className={className}>
      {wordArray.map((word, i) =>
        /^\s+$/.test(word) ? (
          <span key={i}>{" "}</span>
        ) : (
          <span
            key={i}
            data-word
            className="inline-block transition-colors"
            style={{ color: "var(--color-text-muted)" }}
          >
            {word}
          </span>
        )
      )}
    </Tag>
  );
}
