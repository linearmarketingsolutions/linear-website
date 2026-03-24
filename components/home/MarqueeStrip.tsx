"use client";

import { InfiniteMarquee } from "@/components/ui/InfiniteMarquee";

const WORDS = [
  "STRATEGY",
  "AUTOMATION",
  "INTELLIGENCE",
  "DEPLOYMENT",
  "GROWTH",
  "INFRASTRUCTURE",
  "AI-NATIVE",
  "SYSTEMS",
];

/**
 * Full-width scrolling text strip.
 * Breaks up sections with kinetic energy.
 */
export function MarqueeStrip() {
  return (
    <div className="py-6 border-y border-border/30 overflow-hidden bg-surface-1/50 backdrop-blur-sm">
      <InfiniteMarquee speed={60} gap="0px" pauseOnHover>
        {WORDS.map((word) => (
          <span
            key={word}
            className="font-display font-bold text-[clamp(1.5rem,3vw,2.5rem)] text-text-muted/20 uppercase tracking-wider whitespace-nowrap px-8"
          >
            {word}
            <span className="text-accent/40 mx-6">·</span>
          </span>
        ))}
      </InfiniteMarquee>
    </div>
  );
}
