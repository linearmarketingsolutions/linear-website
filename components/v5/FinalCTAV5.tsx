"use client";

/**
 * FinalCTAV5 — terminal-style closing CTA.
 *
 * Replaces the v4 sell-button with a Hermes-flavored moment: an oversized
 * editorial prompt, a copyable command block, and a secondary clickable
 * route. Blake + one team; one operator deploying the system.
 */

import { MetadataLabel } from "@/components/v5/MetadataLabel";
import { TerminalCTA } from "@/components/v5/TerminalCTA";

export function FinalCTAV5() {
  return (
    <section
      className="v5-dark relative overflow-hidden"
      style={{ minHeight: "90vh" }}
      aria-labelledby="v5-cta-heading"
    >
      <div
        className="absolute inset-0 v5-hero-glow pointer-events-none"
        style={{ opacity: 0.8 }}
      />

      {/* Slow ambient rotating glow disc — 12s loop, imperceptibly alive */}
      <div
        className="absolute -right-[20vw] -top-[20vw] w-[60vw] h-[60vw] pointer-events-none"
        aria-hidden
      >
        <div
          className="w-full h-full v5-spin-slow"
          style={{
            background: `conic-gradient(from 0deg, transparent, rgba(200, 158, 254, 0.08), transparent 40%, rgba(124, 58, 237, 0.06), transparent 60%)`,
            borderRadius: "50%",
            filter: "blur(60px)",
          }}
        />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 flex flex-col justify-between min-h-[90vh] py-24">
        <div className="flex items-center justify-between">
          <MetadataLabel output={99} version="v5.0.0" />
          <div
            className="v5-label"
            style={{ color: "var(--color-text-muted)" }}
          >
            SIGNAL · INITIATE
          </div>
        </div>

        <div className="mt-auto">
          <div className="v5-eyebrow mb-6">§ Deploy</div>
          <h2
            id="v5-cta-heading"
            className="v5-display-strong"
            style={{
              fontSize: "clamp(3rem, 9vw, 9rem)",
              color: "var(--color-v5-fg-warm)",
              maxWidth: "15ch",
              lineHeight: 0.95,
            }}
          >
            Ship the{" "}
            <span
              style={{
                color: "var(--color-v5-accent-glow)",
                fontStyle: "italic",
                fontVariationSettings: '"SOFT" 100, "WONK" 1, "opsz" 144',
              }}
            >
              operator.
            </span>
          </h2>
          <p
            className="v5-body mt-8 max-w-[50ch]"
            style={{ color: "rgba(245, 242, 238, 0.72)" }}
          >
            One conversation scopes it. One build ships it. After that, the
            system runs — compounding against your business every day, whether
            or not you&apos;re awake.
          </p>

          <div className="mt-12">
            <TerminalCTA
              command="curl -sSL linear.sh/start | sh"
              secondaryLabel="Or email info@linearmarketingsolutions.com"
              secondaryHref="/contact"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
