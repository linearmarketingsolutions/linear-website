"use client";

/**
 * HeroV5 — Hermes-class hero.
 *
 * Layout: full-viewport warm-dark scene. Shader field fills the frame.
 * Foreground: eyebrow metadata → Fraunces display headline → body → terminal CTA.
 * Bottom strip: numbered capability markers as a scannable index.
 *
 * Motion rules (site-wide):
 *   - Reveal: 600ms ease-out, 6px Y-translate, `both` fill-mode
 *   - No parallax on text. Only the shader breathes.
 *   - Single easing: cubic-bezier(.4, 0, .2, 1)
 */

import dynamic from "next/dynamic";
import { LiveIndicator, MetadataLabel } from "@/components/v5/MetadataLabel";
import { TerminalCTA } from "@/components/v5/TerminalCTA";

const BandScanShader = dynamic(
  () => import("@/components/v5/BandScanShader").then((m) => m.BandScanShader),
  { ssr: false },
);

const CAPABILITY_INDEX = [
  { n: "01", label: "Audit" },
  { n: "02", label: "Build" },
  { n: "03", label: "Automate" },
  { n: "04", label: "Compound" },
];

export function HeroV5() {
  return (
    <section
      className="v5-dark relative overflow-hidden"
      style={{ minHeight: "100dvh" }}
    >
      {/* Shader field — the signature */}
      <div className="absolute inset-0 z-0">
        <BandScanShader className="w-full h-full" />
      </div>

      {/* Soft radial wash to anchor content center */}
      <div className="absolute inset-0 z-[1] v5-hero-glow pointer-events-none" />

      {/* Top corner chrome — metadata + live indicator */}
      <div className="absolute top-6 left-0 right-0 z-10 px-6 md:px-12 lg:px-20 flex justify-between items-center">
        <MetadataLabel output={5} version="v5.0.0" className="v5-reveal" />
        <LiveIndicator
          label="LMS · SYSTEM ONLINE"
          className="v5-reveal"
          style={{ animationDelay: "120ms" }}
        />
      </div>

      {/* Hero content */}
      <div className="relative z-10 flex flex-col justify-end min-h-[100dvh] pb-16 md:pb-24 px-6 md:px-12 lg:px-20">
        <div className="max-w-[1400px] mx-auto w-full">
          <div
            className="v5-eyebrow v5-reveal"
            style={{ animationDelay: "80ms" }}
          >
            Linear Marketing Solutions · Southern California
          </div>

          <h1
            className="v5-display-strong mt-5 v5-reveal"
            style={{
              fontSize: "clamp(3.5rem, 10vw, 11.5rem)",
              animationDelay: "180ms",
              color: "var(--color-v5-fg-warm)",
            }}
          >
            One operator.
          </h1>
          <h1
            className="v5-display mt-[-0.08em] v5-reveal"
            style={{
              fontSize: "clamp(3.5rem, 10vw, 11.5rem)",
              animationDelay: "260ms",
              color: "var(--color-v5-accent-glow)",
              fontStyle: "italic",
              fontVariationSettings: '"SOFT" 100, "WONK" 1, "opsz" 144',
            }}
          >
            Every capability.
          </h1>

          <p
            className="v5-body mt-10 max-w-[620px] v5-reveal"
            style={{
              animationDelay: "380ms",
              color: "rgba(245, 242, 238, 0.75)",
            }}
          >
            An integrated marketing, engineering, and automation system —
            deployed as a single operator, compounding against your business
            every day it runs. Not a toolkit. Not an agency. Infrastructure.
          </p>

          <div
            className="mt-10 v5-reveal"
            style={{ animationDelay: "480ms" }}
          >
            <TerminalCTA
              command="curl -sSL linear.sh/start | sh"
              secondaryLabel="Browse the work"
              secondaryHref="/work"
            />
          </div>

          {/* Bottom index — numbered capability markers */}
          <div
            className="mt-16 md:mt-24 pt-6 border-t"
            style={{ borderColor: "var(--color-border)" }}
          >
            <div className="flex flex-wrap gap-x-10 gap-y-4">
              {CAPABILITY_INDEX.map((cap, i) => (
                <div
                  key={cap.n}
                  className="flex items-baseline gap-3 v5-reveal"
                  style={{ animationDelay: `${600 + i * 80}ms` }}
                >
                  <span
                    className="v5-label"
                    style={{ color: "var(--color-v5-accent-glow)" }}
                  >
                    {cap.n}
                  </span>
                  <span
                    className="v5-mono text-sm"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    {cap.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
