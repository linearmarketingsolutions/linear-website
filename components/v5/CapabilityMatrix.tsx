"use client";

/**
 * CapabilityMatrix — 6-tile services grid with image-trail cursor.
 *
 * Tiles lift + border-glow on hover; the cursor drags a decaying trail of
 * the hovered tile's accent glyph behind it across the surface. Trail
 * pattern adapted from makemepulse.com — Canvas 2D, requestAnimationFrame,
 * 0.1 damping. No WebGL cost. No audio.
 *
 * Tiles link to existing /services/* subpages — preserves v4 routing.
 */

import Link from "next/link";
import { useEffect, useRef } from "react";

type Capability = {
  n: string;
  title: string;
  tagline: string;
  href: string;
  glyph: string;
};

const CAPABILITIES: Capability[] = [
  {
    n: "01",
    title: "Growth engine",
    tagline:
      "Strategy, demand, funnel, measurement — the full-stack marketing operator.",
    href: "/services/growth-engine",
    glyph: "∞",
  },
  {
    n: "02",
    title: "Content pipeline",
    tagline:
      "AI-assisted production wired to your brand voice — writing, video, motion, deliverable.",
    href: "/services/content-pipeline",
    glyph: "≡",
  },
  {
    n: "03",
    title: "Web development",
    tagline:
      "Hand-coded Next.js + Webflow builds. No page-builder bloat, no template lock-in.",
    href: "/services/web-development",
    glyph: "⌘",
  },
  {
    n: "04",
    title: "AI infrastructure",
    tagline:
      "Autonomous agents, retrieval systems, and internal tooling running on your data.",
    href: "/services/ai-infrastructure",
    glyph: "◇",
  },
  {
    n: "05",
    title: "Business operations",
    tagline:
      "CRM architecture, sales enablement, reporting systems that actually stay current.",
    href: "/services/business-operations",
    glyph: "⊡",
  },
  {
    n: "06",
    title: "AI education",
    tagline:
      "Onboarding your team onto the same AI stack we build with — not theory, workflow.",
    href: "/services/ai-education",
    glyph: "✦",
  },
];

export function CapabilityMatrix() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glyphRef = useRef<string>("∞");
  const cursor = useRef({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    type TrailPoint = {
      x: number;
      y: number;
      glyph: string;
      life: number;
    };
    const trail: TrailPoint[] = [];

    function resize() {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    function onMove(e: PointerEvent) {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      cursor.current.x = e.clientX - rect.left;
      cursor.current.y = e.clientY - rect.top;
      cursor.current.active = true;
    }
    function onLeave() {
      cursor.current.active = false;
    }

    canvas.parentElement?.addEventListener("pointermove", onMove, {
      passive: true,
    });
    canvas.parentElement?.addEventListener("pointerleave", onLeave);

    let last = { x: -1000, y: -1000 };
    let raf = 0;

    function frame() {
      if (!canvas || !ctx) return;
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      // emit a new trail point when the cursor has moved enough
      if (cursor.current.active) {
        const dx = cursor.current.x - last.x;
        const dy = cursor.current.y - last.y;
        const dist = Math.hypot(dx, dy);
        if (dist > 18) {
          trail.push({
            x: cursor.current.x,
            y: cursor.current.y,
            glyph: glyphRef.current,
            life: 1,
          });
          last = { x: cursor.current.x, y: cursor.current.y };
        }
      }

      for (let i = trail.length - 1; i >= 0; i--) {
        const p = trail[i];
        p.life -= 0.018;
        if (p.life <= 0) {
          trail.splice(i, 1);
          continue;
        }
        const size = 44 + (1 - p.life) * 28;
        ctx.save();
        ctx.globalAlpha = Math.max(0, p.life * 0.7);
        ctx.translate(p.x, p.y);
        ctx.rotate((1 - p.life) * 0.4);
        ctx.font = `${size}px var(--font-fraunces), serif`;
        ctx.fillStyle = "rgba(200, 158, 254, 0.9)";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(p.glyph, 0, 0);
        ctx.restore();
      }

      raf = window.requestAnimationFrame(frame);
    }
    raf = window.requestAnimationFrame(frame);

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      canvas.parentElement?.removeEventListener("pointermove", onMove);
      canvas.parentElement?.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <section
      className="v5-dark relative py-24 md:py-40 overflow-hidden"
      aria-labelledby="v5-capability-heading"
    >
      <div className="relative max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="v5-eyebrow mb-6">§ Capability matrix</div>
        <h2
          id="v5-capability-heading"
          className="v5-display-strong max-w-[20ch]"
          style={{
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            color: "var(--color-v5-fg-warm)",
          }}
        >
          Six systems.{" "}
          <span
            style={{
              color: "var(--color-v5-accent-glow)",
              fontStyle: "italic",
            }}
          >
            One operator
          </span>{" "}
          deploying them.
        </h2>

        {/* Trail canvas — pointer events routed to the parent */}
        <div className="relative mt-16 md:mt-24">
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
          />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px">
            {CAPABILITIES.map((cap) => (
              <Link
                key={cap.n}
                href={cap.href}
                className="group relative block p-8 md:p-10 transition-colors duration-300"
                style={{
                  background: "var(--color-v5-bg-warm-soft)",
                  color: "var(--color-v5-fg-warm)",
                }}
                onPointerEnter={() => {
                  glyphRef.current = cap.glyph;
                }}
              >
                {/* border glow on hover */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    boxShadow:
                      "inset 0 0 0 1px rgba(200, 158, 254, 0.35), 0 0 40px rgba(124, 58, 237, 0.12)",
                  }}
                />
                <div className="relative flex items-start justify-between">
                  <div
                    className="v5-label"
                    style={{ color: "var(--color-v5-accent-glow)" }}
                  >
                    {cap.n}
                  </div>
                  <span
                    className="v5-display text-4xl leading-none transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
                    style={{ color: "var(--color-v5-accent-glow)", opacity: 0.55 }}
                    aria-hidden
                  >
                    {cap.glyph}
                  </span>
                </div>
                <h3
                  className="v5-display mt-12"
                  style={{
                    fontSize: "clamp(1.75rem, 3vw, 2.4rem)",
                    color: "var(--color-v5-fg-warm)",
                  }}
                >
                  {cap.title}
                </h3>
                <p
                  className="v5-body mt-3 max-w-[40ch]"
                  style={{
                    color: "rgba(245, 242, 238, 0.62)",
                    fontSize: "15px",
                  }}
                >
                  {cap.tagline}
                </p>
                <div
                  className="mt-8 inline-flex items-center gap-2 v5-mono text-xs tracking-[0.2em] uppercase transition-opacity duration-300 opacity-55 group-hover:opacity-100"
                  style={{ color: "var(--color-v5-accent-glow)" }}
                >
                  Explore
                  <span aria-hidden>→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
