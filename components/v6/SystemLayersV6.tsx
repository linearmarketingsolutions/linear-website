"use client";

/**
 * SystemLayersV6 — wraps the v4 4D SystemLayers scene in a Palantir-class
 * section chrome. The 3D geometry is unchanged (it's gorgeous); we swap
 * the headline, add earmarks, retune the palette feel with the v6 dark
 * section + grid + scanline.
 */

import dynamic from "next/dynamic";
import { Suspense, useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Earmark } from "./Earmark";

gsap.registerPlugin(ScrollTrigger);

const SystemLayers = dynamic(
  () => import("@/components/three/SystemLayers").then((m) => m.SystemLayers),
  { ssr: false },
);

const LAYER_LABELS = [
  "Data & Analytics",
  "CRM & Operations",
  "Automation",
  "Content Engine",
  "Web & Development",
  "AI Intelligence",
];

export function SystemLayersV6() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const completionRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef({ value: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useGSAP(
    () => {
      if (!containerRef.current || !pinRef.current || isMobile) return;

      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.trigger === containerRef.current) st.kill();
      });

      const tween = gsap.to(progressRef.current, {
        value: 1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.3,
          pin: pinRef.current,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            progressRef.current.value = self.progress;
            if (completionRef.current) {
              const p = self.progress;
              completionRef.current.style.opacity = String(
                p > 0.8 ? Math.min((p - 0.8) / 0.15, 1) : 0,
              );
            }
          },
        },
      });

      requestAnimationFrame(() => ScrollTrigger.refresh());

      return () => {
        tween.kill();
      };
    },
    { dependencies: [isMobile] },
  );

  if (isMobile) {
    return (
      <section className="v6-dark relative py-20 overflow-hidden">
        <div className="absolute inset-0 v6-grid-bg opacity-30" aria-hidden />
        <div className="relative px-6 mb-8">
          <Earmark>§ SYSTEM · ARCHITECTURE</Earmark>
          <h2
            className="v6-display-tight mt-4"
            style={{ fontSize: "clamp(2rem, 6vw, 3rem)", color: "var(--v6-fg)" }}
          >
            Six layers.{" "}
            <span style={{ color: "var(--v6-accent-hot)" }}>One operating system.</span>
          </h2>
        </div>
        <div className="flex flex-col items-center gap-3 px-6">
          {LAYER_LABELS.map((label, i) => (
            <div
              key={label}
              className="w-full max-w-[340px] rounded-lg border px-5 py-4 flex items-center gap-3 v6-snap"
              style={{ borderColor: "var(--v6-border)", background: "var(--v6-bg)" }}
            >
              <span
                className="v6-mono text-[10px] tracking-[0.14em]"
                style={{ color: "var(--v6-accent-hot)" }}
              >
                0{i + 1}
              </span>
              <span
                className="v6-mono text-[11px] uppercase tracking-[0.12em]"
                style={{ color: "var(--v6-fg)" }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <div
      ref={containerRef}
      className="v6-dark relative"
      style={{ height: "250vh" }}
    >
      <div ref={pinRef} className="h-screen relative overflow-hidden">
        <div className="absolute inset-0 v6-grid-bg opacity-25" aria-hidden />
        <span className="v6-scanline" style={{ top: 0 }} aria-hidden />

        {/* Headline */}
        <div className="absolute top-28 md:top-32 left-6 md:left-12 lg:left-20 z-10 max-w-[560px]">
          <Earmark>§ SYSTEM · ARCHITECTURE</Earmark>
          <h2
            className="v6-display-tight mt-5"
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4.25rem)",
              color: "var(--v6-fg)",
            }}
          >
            Six layers.{" "}
            <span style={{ color: "var(--v6-accent-hot)" }}>
              One operating system.
            </span>
          </h2>
          <p
            className="v6-body mt-6 max-w-[440px]"
            style={{ color: "var(--v6-fg-2)", fontSize: "16px" }}
          >
            Data, CRM, automation, content, web, and intelligence —
            stacked into a single kernel that compounds. Scroll to assemble.
          </p>
        </div>

        {/* Right-side layer index */}
        <div className="absolute right-6 md:right-12 lg:right-20 top-1/2 -translate-y-1/2 z-10 hidden lg:flex flex-col gap-4">
          {LAYER_LABELS.map((label, i) => (
            <div key={label} className="flex items-center gap-3">
              <span
                className="v6-mono text-[10px] tracking-[0.18em]"
                style={{ color: "var(--v6-accent-hot)" }}
              >
                0{i + 1}
              </span>
              <span
                className="v6-mono text-[11px] uppercase tracking-[0.12em]"
                style={{ color: "var(--v6-fg-2)" }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>

        <Suspense fallback={null}>
          <SystemLayers progressRef={progressRef} />
        </Suspense>

        {/* Completion */}
        <div
          ref={completionRef}
          className="absolute bottom-14 left-6 md:left-12 lg:left-20 z-10 max-w-[540px]"
          style={{ opacity: 0 }}
        >
          <Earmark hot>§ OUTPUT</Earmark>
          <h3
            className="v6-display-tight mt-3"
            style={{
              fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
              color: "var(--v6-accent-hot)",
            }}
          >
            Your integrated growth engine.
          </h3>
          <p
            className="v6-body mt-3"
            style={{ color: "var(--v6-fg-2)" }}
          >
            Every layer connected. Every system compounding.
          </p>
        </div>

        {/* Bottom gradient fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-[5]"
          style={{
            background:
              "linear-gradient(to top, var(--v6-bg), transparent)",
          }}
        />
      </div>
    </div>
  );
}
