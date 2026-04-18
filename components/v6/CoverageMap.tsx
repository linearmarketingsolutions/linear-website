"use client";

/**
 * CoverageMap — SoCal-scoped dotted topography with animated arcs.
 *
 * Instead of a generic globe (which doesn't match the business), we
 * render a stylized Southern California dot map and draw arcs between
 * real LMS operation points (LA, IE, OC, SD). Each arc pulses on a
 * stagger so the whole map reads as a live intelligence network.
 *
 * Pure SVG — no WebGL, no runtime cost beyond SMIL/CSS animation.
 * Coordinates are normalized to the 1000×640 viewBox, roughly matching
 * SoCal's relative geography without pretending to be cartographically
 * precise.
 */

import { useId } from "react";
import { Earmark } from "./Earmark";

type Hub = {
  id: string;
  x: number;
  y: number;
  label: string;
  region: string;
};

const HUBS: Hub[] = [
  { id: "la", x: 240, y: 260, label: "Los Angeles", region: "LA" },
  { id: "ie", x: 430, y: 300, label: "Inland Empire", region: "IE" },
  { id: "oc", x: 360, y: 400, label: "Orange County", region: "OC" },
  { id: "sd", x: 550, y: 520, label: "San Diego", region: "SD" },
  { id: "sb", x: 100, y: 210, label: "Santa Barbara", region: "SB" },
  { id: "rc", x: 410, y: 295, label: "Rancho Cucamonga (HQ)", region: "HQ" },
];

// Arcs drawn between hubs — ordered for visual balance
const ARCS: Array<[string, string, number]> = [
  ["rc", "la", 0],
  ["rc", "oc", 450],
  ["la", "sb", 900],
  ["rc", "sd", 1350],
  ["oc", "sd", 1800],
  ["rc", "ie", 600],
];

// Topography dots — seeded grid clipped to a SoCal silhouette
function generateDots(): Array<{ x: number; y: number; r: number; o: number }> {
  const dots: Array<{ x: number; y: number; r: number; o: number }> = [];
  // Use a deterministic PRNG so SSR + client match
  let seed = 42;
  const rng = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };

  for (let y = 40; y < 600; y += 14) {
    for (let x = 20; x < 980; x += 14) {
      // Rough SoCal mask — irregular coastal + desert silhouette
      const coastal = y > 200 + Math.sin((x - 100) / 80) * 70 || y < 260;
      const inBounds =
        x > 40 + y * 0.15 &&
        x < 680 + y * 0.5 &&
        y > 140 + Math.sin(x / 90) * 20 &&
        y < 580 - Math.sin(x / 120) * 40;
      if (!inBounds || !coastal) continue;

      // Skip ~35% of dots for organic look
      if (rng() < 0.35) continue;
      dots.push({
        x,
        y,
        r: 0.7 + rng() * 0.8,
        o: 0.15 + rng() * 0.35,
      });
    }
  }
  return dots;
}

function buildArcPath(a: Hub, b: Hub): string {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dist = Math.hypot(b.x - a.x, b.y - a.y);
  // Control point above the midpoint scaled to distance
  const cx = mx;
  const cy = my - dist * 0.35;
  return `M${a.x},${a.y} Q${cx},${cy} ${b.x},${b.y}`;
}

const DOTS = generateDots();

export function CoverageMap() {
  const gradId = useId().replace(/:/g, "");

  return (
    <section
      className="v6-dark relative py-24 md:py-32 overflow-hidden"
      aria-labelledby="v6-coverage-heading"
    >
      <div className="relative max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
          <div className="max-w-[640px]">
            <Earmark>§ COVERAGE · SO-CAL</Earmark>
            <h2
              id="v6-coverage-heading"
              className="v6-display-tight mt-5"
              style={{
                fontSize: "clamp(2.25rem, 5vw, 4rem)",
                color: "var(--v6-fg)",
              }}
            >
              Operating across{" "}
              <span style={{ color: "var(--v6-accent-hot)" }}>
                Southern California.
              </span>
            </h2>
            <p
              className="v6-body mt-5 max-w-[520px]"
              style={{ color: "var(--v6-fg-2)" }}
            >
              HQ in Rancho Cucamonga. Clients from LA to San Diego, every
              major growth corridor in the state. Every node on this map is
              an active deploy.
            </p>
          </div>
          <Earmark hot>LIVE · {HUBS.length} NODES</Earmark>
        </div>

        <div
          className="relative rounded-lg overflow-hidden border"
          style={{
            borderColor: "var(--v6-border)",
            background: "rgba(15, 11, 20, 0.7)",
          }}
        >
          <svg
            viewBox="0 0 1000 640"
            className="w-full h-auto block"
            role="img"
            aria-label="Map of Southern California showing Linear Marketing Solutions operating nodes"
          >
            <defs>
              <radialGradient id={`${gradId}-halo`} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#C4B5FD" stopOpacity="0.9" />
                <stop offset="60%" stopColor="#7C3AED" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
              </radialGradient>
              <linearGradient id={`${gradId}-arc`} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#7C3AED" stopOpacity="0" />
                <stop offset="50%" stopColor="#C4B5FD" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Topography dots */}
            {DOTS.map((d, i) => (
              <circle
                key={i}
                cx={d.x}
                cy={d.y}
                r={d.r}
                fill="#C4B5FD"
                opacity={d.o}
              />
            ))}

            {/* Arcs */}
            {ARCS.map(([fromId, toId, delay], i) => {
              const a = HUBS.find((h) => h.id === fromId)!;
              const b = HUBS.find((h) => h.id === toId)!;
              const path = buildArcPath(a, b);
              return (
                <g key={`${fromId}-${toId}-${i}`}>
                  <path
                    d={path}
                    fill="none"
                    stroke="rgba(196, 181, 253, 0.14)"
                    strokeWidth="1"
                  />
                  <path
                    d={path}
                    fill="none"
                    stroke={`url(#${gradId}-arc)`}
                    strokeWidth="1.5"
                    strokeDasharray="240 1200"
                    style={{
                      animation: `v6-arc-trace 3.6s cubic-bezier(0.65,0,0.35,1) ${delay}ms infinite`,
                    }}
                  />
                </g>
              );
            })}

            {/* Hubs */}
            {HUBS.map((h) => {
              const isHQ = h.region === "HQ";
              return (
                <g key={h.id}>
                  <circle
                    cx={h.x}
                    cy={h.y}
                    r={isHQ ? 22 : 14}
                    fill={`url(#${gradId}-halo)`}
                    style={{
                      animation: `v6-hub-pulse 2.4s ease-in-out ${h.x * 2}ms infinite`,
                      transformOrigin: `${h.x}px ${h.y}px`,
                    }}
                  />
                  <circle
                    cx={h.x}
                    cy={h.y}
                    r={isHQ ? 5 : 3.5}
                    fill="#C4B5FD"
                  />
                  <text
                    x={h.x + (isHQ ? 10 : 8)}
                    y={h.y - 8}
                    fontSize={isHQ ? "13" : "11"}
                    fill={isHQ ? "#F5F2EE" : "rgba(245, 242, 238, 0.72)"}
                    fontFamily="var(--font-mono)"
                    letterSpacing="0.08em"
                    style={{ textTransform: "uppercase" }}
                  >
                    {h.region}
                  </text>
                  <text
                    x={h.x + (isHQ ? 10 : 8)}
                    y={h.y + 8}
                    fontSize="9"
                    fill="rgba(245, 242, 238, 0.38)"
                    fontFamily="var(--font-mono)"
                    letterSpacing="0.14em"
                    style={{ textTransform: "uppercase" }}
                  >
                    {h.label}
                  </text>
                </g>
              );
            })}

            <style>
              {`@keyframes v6-arc-trace {
                0%   { stroke-dashoffset: 1200; opacity: 0; }
                15%  { opacity: 0.95; }
                100% { stroke-dashoffset: -240; opacity: 0; }
              }
              @keyframes v6-hub-pulse {
                0%, 100% { transform: scale(1); opacity: 0.9; }
                50%      { transform: scale(1.25); opacity: 1; }
              }`}
            </style>
          </svg>

          {/* Overlay — corner metadata chrome */}
          <div className="absolute top-4 left-4">
            <Earmark>MAP · v6 · DYNAMIC</Earmark>
          </div>
          <div className="absolute top-4 right-4">
            <Earmark hot dot>
              TRACING
            </Earmark>
          </div>
          <div className="absolute bottom-4 left-4">
            <Earmark>
              {HUBS.length} nodes · {ARCS.length} routes
            </Earmark>
          </div>
          <div className="absolute bottom-4 right-4">
            <Earmark>33.768 N · 117.856 W</Earmark>
          </div>
        </div>
      </div>
    </section>
  );
}
