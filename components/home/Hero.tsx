"use client";

import { SplitText } from "@/components/ui/SplitText";
import { GlowBlob } from "@/components/ui/GlowBlob";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { PixelGrid } from "@/components/ui/PixelGrid";
import { VeilGlow } from "@/components/ui/VeilGlow";
import { CountUp } from "./CountUp";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const ParticleField = dynamic(
  () => import("@/components/three/ParticleField").then((m) => m.ParticleField),
  { ssr: false }
);
const FloatingOrb = dynamic(
  () => import("@/components/three/FloatingOrb").then((m) => m.FloatingOrb),
  { ssr: false }
);

const STATS = [
  { end: 3, prefix: "$", suffix: "M+", label: "Revenue Deployed" },
  { end: 160, suffix: "K+", label: "Systems Online" },
  { end: 50, suffix: "+", label: "Operations Active" },
];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    // Overline entrance
    gsap.from("[data-hero-overline]", {
      width: 0,
      opacity: 0,
      duration: 0.8,
      delay: 0.1,
      ease: "power3.out",
    });

    // Sub text
    gsap.from("[data-hero-sub]", {
      y: 40,
      opacity: 0,
      duration: 0.8,
      delay: 1,
      ease: "power3.out",
    });

    // CTAs
    gsap.from("[data-hero-cta]", {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.15,
      delay: 1.2,
      ease: "power3.out",
    });

    // Stats
    gsap.from("[data-stat]", {
      y: 20,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      delay: 1.5,
      ease: "power3.out",
    });

    // Orb
    gsap.from("[data-hero-orb]", {
      scale: 0,
      opacity: 0,
      duration: 1.5,
      delay: 0.5,
      ease: "elastic.out(1, 0.5)",
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-dvh overflow-hidden"
    >
      {/* 3D Particle field */}
      <ParticleField className="z-[1] opacity-60" />

      {/* Pixel grid */}
      <div className="absolute inset-0 z-[2] flex items-center justify-center opacity-20 overflow-hidden pointer-events-none">
        <PixelGrid
          cols={50}
          rows={25}
          pixelSize={4}
          gap={8}
          hoverRadius={6}
          color="rgba(255,255,255,0.015)"
          hoverColor="rgba(204, 255, 0, 0.35)"
          className="pointer-events-auto"
        />
      </div>

      {/* Veil glow */}
      <VeilGlow color="rgba(204, 255, 0, 0.05)" direction="right" />

      {/* Scan lines */}
      <div
        className="absolute inset-0 z-[3] pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(204, 255, 0, 0.15) 2px, rgba(204, 255, 0, 0.15) 4px)",
          backgroundSize: "100% 4px",
        }}
      />

      <GlowBlob color="rgba(204, 255, 0, 0.5)" size={800} opacity={0.07} blur="160px" className="z-[1]" />

      {/* Content — full bleed, no container */}
      <div className="relative z-10 min-h-dvh flex flex-col justify-center px-6 md:px-12 lg:px-20 xl:px-32">
        {/* Overline */}
        <div className="flex items-center gap-4 mb-8" data-hero-overline>
          <span className="h-px w-12 bg-accent" />
          <span className="font-mono text-accent text-[11px] tracking-[0.3em] uppercase">
            AI Growth Engine v4.0
          </span>
        </div>

        {/* Main layout — text left, orb right */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-0">
          {/* Left — MASSIVE typography */}
          <div className="flex-1 lg:max-w-[65%]">
            <div className="flex flex-col">
              <SplitText
                as="h1"
                mode="chars"
                stagger={0.02}
                duration={0.4}
                delay={0.2}
                scrollTrigger={false}
                className="font-display font-bold text-text-primary leading-[0.95] tracking-[-0.03em]"
                {...{ style: { fontSize: "clamp(3.5rem, 9vw, 130px)" } } as React.HTMLAttributes<HTMLElement>}
              >
                One
              </SplitText>
              <SplitText
                as="h1"
                mode="chars"
                stagger={0.02}
                duration={0.4}
                delay={0.4}
                scrollTrigger={false}
                className="font-display font-bold text-accent leading-[0.95] tracking-[-0.03em]"
                {...{ style: { fontSize: "clamp(3.5rem, 9vw, 130px)" } } as React.HTMLAttributes<HTMLElement>}
              >
                operator.
              </SplitText>
              <SplitText
                as="h1"
                mode="chars"
                stagger={0.02}
                duration={0.4}
                delay={0.6}
                scrollTrigger={false}
                className="font-display font-bold text-text-primary/30 leading-[0.95] tracking-[-0.03em]"
                {...{ style: { fontSize: "clamp(3.5rem, 9vw, 130px)" } } as React.HTMLAttributes<HTMLElement>}
              >
                No ceiling.
              </SplitText>
            </div>

            {/* Sub */}
            <p
              data-hero-sub
              className="text-text-secondary font-body text-lg lg:text-xl leading-relaxed max-w-[48ch] mt-8"
            >
              Marketing, development, automation, and intelligence — deployed
              as a single integrated system. Infrastructure that compounds.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mt-8">
              <MagneticButton strength={0.3}>
                <Link
                  href="/contact"
                  data-hero-cta
                  className="group relative inline-flex items-center justify-center px-10 py-5 bg-accent text-bg font-body font-bold text-lg rounded-full overflow-hidden transition-all duration-200 hover:shadow-[0_0_80px_rgba(204,255,0,0.4)]"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                  <span className="relative">Start your build</span>
                </Link>
              </MagneticButton>
              <MagneticButton strength={0.3}>
                <Link
                  href="/work"
                  data-hero-cta
                  className="inline-flex items-center justify-center px-10 py-5 font-body font-bold text-lg text-text-primary border border-white/10 bg-white/[0.03] backdrop-blur-sm rounded-full transition-all duration-300 hover:border-accent/40 hover:bg-accent/5 hover:shadow-[0_0_40px_rgba(204,255,0,0.1)]"
                >
                  View operations
                  <svg className="ml-2 w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </Link>
              </MagneticButton>
            </div>
          </div>

          {/* Right — 3D Floating Orb */}
          <div data-hero-orb className="hidden lg:block flex-1 max-w-[500px] h-[500px] -mr-12">
            <FloatingOrb className="w-full h-full" />
          </div>
        </div>

        {/* Stats — bottom strip */}
        <div className="flex flex-wrap gap-12 mt-16 pt-8 border-t border-white/[0.06]">
          {STATS.map((stat) => (
            <div key={stat.label} data-stat className="flex flex-col">
              <span className="font-mono text-accent text-3xl font-bold tracking-tight">
                <CountUp end={stat.end} prefix={stat.prefix} suffix={stat.suffix} duration={1800} />
              </span>
              <span className="font-mono text-text-muted text-xs tracking-wider uppercase mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
