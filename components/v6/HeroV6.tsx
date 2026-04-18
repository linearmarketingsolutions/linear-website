"use client";

/**
 * HeroV6 — the interactive top.
 *
 * 2-column hero: left is the narrative (operating-system earmark, Geist
 * display headline, body, dual CTA, live ops ticker). Right is the
 * DeployTerminal typing a fake LMS workflow in real time. The whole
 * view reads as a Palantir command console with LMS brand carried through.
 *
 * Mobile: terminal stacks under the narrative; ops ticker moves inline.
 */

import Link from "next/link";
import dynamic from "next/dynamic";
import { Earmark } from "./Earmark";
import { LiveOpsFeed } from "./LiveOpsFeed";
import { DeployTerminal } from "./DeployTerminal";

const ParticleField = dynamic(
  () =>
    import("@/components/three/ParticleField").then((m) => m.ParticleField),
  { ssr: false },
);

export function HeroV6() {
  return (
    <section
      className="v6-dark relative overflow-hidden"
      style={{ minHeight: "100dvh" }}
    >
      {/* Ambient layers: operator grid + particle field + scanline */}
      <div className="absolute inset-0 v6-grid-bg pointer-events-none opacity-50" aria-hidden />
      <div className="absolute inset-0 pointer-events-none z-[1] opacity-40" aria-hidden>
        <ParticleField className="w-full h-full" />
      </div>
      <span className="v6-scanline" aria-hidden style={{ top: 0 }} />

      {/* Soft plum radial anchor */}
      <div
        className="absolute inset-0 pointer-events-none z-[2]"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 30% 40%, rgba(124,58,237,0.14), transparent 65%), radial-gradient(ellipse 50% 40% at 80% 60%, rgba(167,139,250,0.08), transparent 60%)",
        }}
        aria-hidden
      />

      {/* Top corner chrome */}
      <div className="absolute top-6 left-0 right-0 z-20 px-6 md:px-12 lg:px-20 flex justify-between items-center">
        <Earmark>
          LMS · OPERATING SYSTEM · v6.0
        </Earmark>
        <Earmark hot className="hidden md:inline-flex">
          <span className="inline-block w-1.5 h-1.5 rounded-full v6-pulse" style={{ background: "var(--v6-accent-soft)" }} />
          ONLINE · RANCHO CUCAMONGA · CA
        </Earmark>
      </div>

      <div className="relative z-10 min-h-[100dvh] flex items-center pt-28 md:pt-32 pb-16 md:pb-24 px-6 md:px-12 lg:px-20">
        <div className="w-full max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Narrative column */}
          <div className="lg:col-span-7">
            <Earmark className="v6-reveal" style={{ ["--v6-index" as string]: 0 }}>
              OPERATING SYSTEM FOR MODERN GROWTH
            </Earmark>

            <h1
              className="v6-display-tight mt-6 v6-reveal"
              style={{
                fontSize: "clamp(3rem, 9vw, 9.5rem)",
                color: "var(--v6-fg)",
                ["--v6-index" as string]: 1,
              }}
            >
              One operator.
              <br />
              <span style={{ color: "var(--v6-accent-hot)" }}>
                Every capability.
              </span>
            </h1>

            <p
              className="v6-body mt-8 max-w-[540px] v6-reveal"
              style={{ ["--v6-index" as string]: 2 }}
            >
              Linear Marketing Solutions is not an agency. It&apos;s an operating
              system — marketing, engineering, and automation deployed as a
              single operator that compounds against your business every day
              it runs.
            </p>

            <div
              className="mt-10 flex flex-wrap items-center gap-4 v6-reveal"
              style={{ ["--v6-index" as string]: 3 }}
            >
              <Link
                href="/contact"
                className="v6-snap group inline-flex items-center gap-3 px-6 py-3 rounded-full border"
                style={{
                  borderColor: "var(--v6-border-hot)",
                  background: "rgba(124, 58, 237, 0.08)",
                  color: "var(--v6-fg)",
                }}
              >
                <span
                  className="v6-mono text-[11px] tracking-[0.2em] uppercase"
                  style={{ color: "var(--v6-accent-hot)" }}
                >
                  ›
                </span>
                <span
                  className="v6-mono text-[12px] tracking-[0.18em] uppercase font-medium"
                >
                  Request Deploy
                </span>
              </Link>

              <Link
                href="/work"
                className="v6-snap inline-flex items-center gap-2 v6-mono text-[12px] tracking-[0.18em] uppercase"
                style={{ color: "var(--v6-fg-2)" }}
              >
                Browse the work
                <span aria-hidden style={{ color: "var(--v6-accent-soft)" }}>→</span>
              </Link>

              <KeyHintChip />
            </div>

            <div
              className="mt-12 v6-reveal"
              style={{ ["--v6-index" as string]: 4 }}
            >
              <LiveOpsFeed />
            </div>
          </div>

          {/* Operator console column */}
          <div
            className="lg:col-span-5 v6-reveal"
            style={{ ["--v6-index" as string]: 3 }}
          >
            <DeployTerminal />

            {/* Bottom index strip — four OS modules as quick nav */}
            <div className="mt-6 grid grid-cols-4 gap-px" style={{ background: "var(--v6-border)" }}>
              {[
                { n: "01", label: "Growth OS" },
                { n: "02", label: "Content OS" },
                { n: "03", label: "Acquisition OS" },
                { n: "04", label: "Intelligence OS" },
              ].map((m) => (
                <div
                  key={m.n}
                  className="px-3 py-3 v6-snap"
                  style={{ background: "var(--v6-bg)" }}
                >
                  <div
                    className="v6-earmark v6-earmark-hot"
                    style={{ color: "var(--v6-accent-soft)" }}
                  >
                    {m.n}
                  </div>
                  <div
                    className="v6-mono text-[11px] tracking-[0.08em] uppercase mt-1.5"
                    style={{ color: "var(--v6-fg)" }}
                  >
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function KeyHintChip() {
  return (
    <div
      className="hidden md:inline-flex items-center gap-2 px-3 py-1.5 rounded border"
      style={{ borderColor: "var(--v6-border)", background: "rgba(23, 18, 31, 0.5)" }}
      aria-hidden
    >
      <kbd
        className="v6-mono text-[10px] px-1.5 py-0.5 rounded"
        style={{
          color: "var(--v6-fg)",
          background: "rgba(124, 58, 237, 0.18)",
          border: "1px solid var(--v6-border-hot)",
        }}
      >
        ⌘
      </kbd>
      <kbd
        className="v6-mono text-[10px] px-1.5 py-0.5 rounded"
        style={{
          color: "var(--v6-fg)",
          background: "rgba(124, 58, 237, 0.18)",
          border: "1px solid var(--v6-border-hot)",
        }}
      >
        K
      </kbd>
      <span
        className="v6-mono text-[10px] tracking-[0.14em] uppercase"
        style={{ color: "var(--v6-fg-3)" }}
      >
        command palette
      </span>
    </div>
  );
}
