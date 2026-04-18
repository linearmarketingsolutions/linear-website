"use client";

/**
 * MetadataStrip — thin transitional strip between sections.
 *
 * Borrows the "OUTPUT/SEED/v5.0.0 + marquee" visual from Nous Research's
 * typographic metadata motif. Acts as a section seam — enough visual
 * noise to signal "still the same system", not a content break.
 */

import { MetadataLabel } from "@/components/v5/MetadataLabel";

type MetadataStripProps = {
  items?: string[];
  output?: number;
};

const DEFAULT_ITEMS = [
  "NEXT.JS · TYPESCRIPT · R3F",
  "GSAP · LENIS · SHADER",
  "SUPABASE · VERCEL · STRIPE",
  "CLAUDE · GEMINI · CODEX",
  "GA4 · GSC · MIXPANEL",
];

export function MetadataStrip({
  items = DEFAULT_ITEMS,
  output = 17,
}: MetadataStripProps) {
  // duplicate the list so the marquee loops seamlessly
  const loop = [...items, ...items];

  return (
    <section
      className="v5-dark relative py-6 border-y overflow-hidden"
      style={{ borderColor: "var(--color-border)" }}
      aria-hidden
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 flex items-center justify-between">
        <MetadataLabel output={output} version="v5.0.0" />
        <div
          className="v5-label hidden md:block"
          style={{ color: "var(--color-text-muted)" }}
        >
          REV · 2026-04-18 · BUILD CLEAN
        </div>
      </div>

      {/* Marquee — ambient 30s linear, no hover pause (keeps calm) */}
      <div className="relative mt-4 overflow-hidden">
        <div
          className="flex gap-12 whitespace-nowrap"
          style={{
            animation: "v5-marquee 38s linear infinite",
            width: "max-content",
          }}
        >
          {loop.map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="v5-label inline-flex items-center gap-4"
              style={{ color: "var(--color-text-muted)" }}
            >
              {item}
              <span
                aria-hidden
                style={{ color: "var(--color-v5-accent-glow)", opacity: 0.4 }}
              >
                ·
              </span>
            </span>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes v5-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
