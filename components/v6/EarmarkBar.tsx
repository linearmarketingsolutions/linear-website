"use client";

/**
 * EarmarkBar — thin transitional seam between sections.
 *
 * Top row: earmark metadata chrome.
 * Middle row: oversized Geist italic tagline + accent.
 * Bottom row: infinite marquee of stack primitives in mono.
 */

import { Earmark } from "./Earmark";

const DEFAULT_STACK = [
  "NEXT.JS",
  "TYPESCRIPT",
  "R3F",
  "GSAP",
  "LENIS",
  "SHADERS",
  "SUPABASE",
  "VERCEL",
  "STRIPE",
  "CLAUDE",
  "GEMINI",
  "CODEX",
  "GA4",
  "GSC",
  "HUBSPOT",
  "SEGMENT",
  "POSTHOG",
];

type EarmarkBarProps = {
  tagline?: string;
  accent?: string;
  stack?: string[];
  className?: string;
};

export function EarmarkBar({
  tagline = "Operating System for",
  accent = "Modern Growth.",
  stack = DEFAULT_STACK,
  className = "",
}: EarmarkBarProps) {
  const loop = [...stack, ...stack];

  return (
    <section
      className={`v6-dark relative overflow-hidden border-y ${className}`}
      style={{ borderColor: "var(--v6-border)" }}
      aria-hidden
    >
      <div className="relative max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 py-10 md:py-14">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <Earmark>SECTION SEAM · OS</Earmark>
          <Earmark hot dot>BUILD CLEAN</Earmark>
        </div>

        <p
          className="v6-display-tight mt-6"
          style={{
            fontSize: "clamp(2rem, 6vw, 4.5rem)",
            color: "var(--v6-fg)",
            letterSpacing: "-0.03em",
          }}
        >
          {tagline}{" "}
          <span
            style={{
              color: "var(--v6-accent-hot)",
              fontStyle: "italic",
            }}
          >
            {accent}
          </span>
        </p>

        <div className="v6-hairline mt-8" aria-hidden />

        {/* Marquee */}
        <div className="mt-5 overflow-hidden">
          <div
            className="flex gap-10 whitespace-nowrap"
            style={{
              animation: "v6-marquee 42s linear infinite",
              width: "max-content",
            }}
          >
            {loop.map((item, i) => (
              <span
                key={`${item}-${i}`}
                className="v6-mono text-[11px] tracking-[0.18em] uppercase inline-flex items-center gap-3"
                style={{ color: "var(--v6-fg-3)" }}
              >
                {item}
                <span
                  aria-hidden
                  style={{ color: "var(--v6-accent-soft)", opacity: 0.5 }}
                >
                  ·
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes v6-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
