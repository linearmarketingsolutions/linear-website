"use client";

/**
 * CapabilityBento — 4 OS modules in 2×2 with live-ticking metrics.
 *
 * Each tile reads as a kernel module in an enterprise OS:
 *   GROWTH OS · CONTENT OS · ACQUISITION OS · INTELLIGENCE OS
 * Earmark label → big Geist headline → one-line tagline → 3 live counters
 * → bottom link. Asymmetric-feeling but perfectly aligned on a grid.
 *
 * "OS" naming grammar is the Palantir lift — variable term, identical
 * template. Reads as kernel, not services menu.
 */

import Link from "next/link";
import { Earmark } from "./Earmark";
import { NumberTicker } from "./NumberTicker";

type Metric = {
  label: string;
  value: number;
  format: (n: number) => string;
  pulseInterval?: number;
  pulseAmount?: number;
};

type Module = {
  n: string;
  slug: string;
  os: string;
  headline: string;
  tagline: string;
  href: string;
  metrics: Metric[];
};

const fmtInt = (n: number) => Math.round(n).toLocaleString("en-US");
const fmtPct = (n: number) => `${Math.round(n)}%`;
const fmtUsd = (n: number) => {
  const v = Math.round(n);
  if (v >= 1_000_000) return `$${(v / 1_000_000).toFixed(1)}M`;
  if (v >= 1_000) return `$${(v / 1_000).toFixed(0)}K`;
  return `$${v}`;
};

const MODULES: Module[] = [
  {
    n: "01",
    slug: "growth-engine",
    os: "GROWTH",
    headline: "Strategy, demand, measurement.",
    tagline:
      "A full-funnel operator — positioning, acquisition, reporting — run as one integrated surface.",
    href: "/services/growth-engine",
    metrics: [
      { label: "Revenue deployed", value: 3_240_000, format: fmtUsd, pulseInterval: 9000, pulseAmount: 1850 },
      { label: "Active campaigns", value: 47, format: fmtInt, pulseInterval: 18000, pulseAmount: 1 },
      { label: "Avg CAC cut", value: 38, format: fmtPct },
    ],
  },
  {
    n: "02",
    slug: "content-pipeline",
    os: "CONTENT",
    headline: "Writing, video, motion.",
    tagline:
      "AI-assisted production wired to your brand voice — output scales without losing the editorial bar.",
    href: "/services/content-pipeline",
    metrics: [
      { label: "Posts published", value: 412, format: fmtInt, pulseInterval: 11000, pulseAmount: 1 },
      { label: "Avg engagement lift", value: 142, format: fmtPct },
      { label: "Hours reclaimed / mo", value: 180, format: fmtInt },
    ],
  },
  {
    n: "03",
    slug: "web-development",
    os: "ACQUISITION",
    headline: "Custom-coded sites & platforms.",
    tagline:
      "Next.js + Webflow builds engineered for speed, conversion, and the agents we ship on top of them.",
    href: "/services/web-development",
    metrics: [
      { label: "Lighthouse avg", value: 97, format: fmtInt },
      { label: "Sites shipped", value: 24, format: fmtInt, pulseInterval: 30000, pulseAmount: 1 },
      { label: "Avg LCP (ms)", value: 1210, format: fmtInt },
    ],
  },
  {
    n: "04",
    slug: "ai-infrastructure",
    os: "INTELLIGENCE",
    headline: "Agents, retrieval, automation.",
    tagline:
      "Autonomous agents and internal tooling running on your data — continuous deployment across all environments.",
    href: "/services/ai-infrastructure",
    metrics: [
      { label: "Agents online", value: 11, format: fmtInt, pulseInterval: 22000, pulseAmount: 1 },
      { label: "Tasks / day", value: 2_480, format: fmtInt, pulseInterval: 5000, pulseAmount: 3 },
      { label: "Uptime", value: 99, format: fmtPct },
    ],
  },
];

export function CapabilityBento() {
  return (
    <section
      className="v6-dark relative py-24 md:py-32 overflow-hidden"
      aria-labelledby="v6-bento-heading"
    >
      <div className="absolute inset-0 v6-grid-bg pointer-events-none opacity-30" aria-hidden />

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-12 md:mb-16">
          <div className="max-w-[720px]">
            <Earmark>§ CAPABILITY MATRIX · 4 MODULES</Earmark>
            <h2
              id="v6-bento-heading"
              className="v6-display-tight mt-5"
              style={{
                fontSize: "clamp(2.25rem, 5.5vw, 4.5rem)",
                color: "var(--v6-fg)",
              }}
            >
              Operating system for{" "}
              <span style={{ color: "var(--v6-accent-hot)" }}>modern growth.</span>
            </h2>
          </div>
          <Earmark hot>LIVE · COMPOUNDING</Earmark>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: "var(--v6-border)" }}>
          {MODULES.map((m) => (
            <ModuleTile key={m.n} module={m} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ModuleTile({ module: m }: { module: Module }) {
  return (
    <Link
      href={m.href}
      className="group relative block p-8 md:p-10 v6-snap"
      style={{ background: "var(--v6-bg)", color: "var(--v6-fg)" }}
    >
      {/* Hover accent */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        style={{
          boxShadow:
            "inset 0 0 0 1px rgba(124, 58, 237, 0.32), 0 0 60px rgba(124, 58, 237, 0.08)",
        }}
      />

      <div className="flex items-start justify-between">
        <Earmark hot>
          {m.n} · {m.os} OS
        </Earmark>
        <span
          className="v6-mono text-[11px] tracking-[0.2em] uppercase opacity-60 group-hover:opacity-100 transition-opacity duration-200"
          style={{ color: "var(--v6-accent-hot)" }}
        >
          EXPLORE →
        </span>
      </div>

      <h3
        className="v6-display mt-10"
        style={{
          fontSize: "clamp(1.75rem, 3.2vw, 2.5rem)",
          color: "var(--v6-fg)",
        }}
      >
        {m.headline}
      </h3>
      <p
        className="v6-body mt-4 max-w-[44ch]"
        style={{ color: "var(--v6-fg-2)", fontSize: "15px" }}
      >
        {m.tagline}
      </p>

      {/* Metric row */}
      <div
        className="mt-10 pt-6 border-t grid grid-cols-3 gap-4"
        style={{ borderColor: "var(--v6-border)" }}
      >
        {m.metrics.map((metric) => (
          <div key={metric.label}>
            <NumberTicker
              to={metric.value}
              format={metric.format}
              duration={1600}
              pulseInterval={metric.pulseInterval}
              pulseAmount={metric.pulseAmount}
              className="v6-mono block"
              style={{
                fontSize: "clamp(1.25rem, 2vw, 1.6rem)",
                color: "var(--v6-accent-hot)",
                letterSpacing: "0.01em",
              }}
            />
            <div
              className="v6-mono text-[10px] mt-1.5 tracking-[0.12em] uppercase"
              style={{ color: "var(--v6-fg-3)" }}
            >
              {metric.label}
            </div>
          </div>
        ))}
      </div>
    </Link>
  );
}
