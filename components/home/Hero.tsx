"use client";

import { SplitText } from "@/components/ui/SplitText";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { AuroraBackground } from "@/components/ui/AuroraBackground";
import { Spotlight } from "@/components/ui/Spotlight";
import { CountUp } from "./CountUp";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const ParticleField = dynamic(
  () => import("@/components/three/ParticleField").then((m) => m.ParticleField),
  { ssr: false }
);
const CobeGlobe = dynamic(
  () => import("@/components/ui/CobeGlobe").then((m) => m.CobeGlobe),
  { ssr: false }
);

/**
 * Hero stats — verified-only metrics. The earlier "$3M Revenue / 160K Systems /
 * 50 Operations" numbers were fabrications stripped 2026-05-05. These three
 * are grounded in the actual client roster.
 */
const STATS = [
  { end: 10, suffix: "+", label: "Clients Served" },
  { end: 7, label: "Verticals Deployed" },
  { end: 1, label: "Operator" },
];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    gsap.to("[data-hero-content]", {
      y: -100,
      opacity: 0,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });

    gsap.from("[data-hero-sub]", {
      y: 40, opacity: 0, duration: 1, delay: 1, ease: "power3.out",
    });
    gsap.from("[data-hero-cta]", {
      y: 30, opacity: 0, duration: 0.7, stagger: 0.15, delay: 1.3, ease: "power3.out",
    });
    gsap.from("[data-stat]", {
      y: 20, opacity: 0, duration: 0.5, stagger: 0.1, delay: 1.6, ease: "power3.out",
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="dark-section relative h-[100dvh] overflow-hidden bg-zinc-950"
    >
      {/* Layer 1 — atmospheric aurora drift */}
      <AuroraBackground className="z-0" />

      {/* Layer 2 — cursor-tracking spotlight */}
      <Spotlight className="z-[1]" color="rgba(167, 139, 250, 0.22)" size={700} />

      {/* Layer 3 — subtle particle field for depth */}
      <ParticleField className="z-[2] opacity-40" />

      {/* Content */}
      <div data-hero-content className="relative z-10 h-full flex flex-col justify-end pb-16 lg:pb-24 px-5 md:px-12 lg:px-20 xl:px-32">
        <div className="flex flex-col lg:flex-row lg:items-end gap-8 lg:gap-0">
          <div className="flex-1">
            <SplitText
              as="h1"
              mode="chars"
              stagger={0.015}
              duration={0.4}
              delay={0.1}
              scrollTrigger={false}
              className="font-display font-normal text-white leading-[0.9] tracking-[-0.04em]"
              {...{ style: { fontSize: "clamp(4rem, 10vw, 150px)" } } as React.HTMLAttributes<HTMLElement>}
            >
              One operator.
            </SplitText>
            <SplitText
              as="h1"
              mode="chars"
              stagger={0.015}
              duration={0.4}
              delay={0.4}
              scrollTrigger={false}
              className="font-display font-normal leading-[0.9] tracking-[-0.04em] bg-gradient-to-r from-[#8B5CF6] via-[#A78BFA] to-[#6366F1] bg-clip-text text-transparent"
              {...{ style: { fontSize: "clamp(4rem, 10vw, 150px)" } } as React.HTMLAttributes<HTMLElement>}
            >
              Every capability.
            </SplitText>

            <div className="mt-10 ml-0 lg:ml-[8vw] max-w-[500px]">
              <p data-hero-sub className="text-white/60 font-body text-xl leading-relaxed">
                AI-native marketing, development, automation, and intelligence
                for businesses across Southern California — built and run by one
                operator using infrastructure that compounds.
              </p>

              <div className="flex flex-wrap gap-4 mt-8">
                <MagneticButton strength={0.3}>
                  <Link
                    href="/contact"
                    data-hero-cta
                    className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#7C3AED] to-[#6366F1] text-white font-body font-semibold rounded-full overflow-hidden transition-all duration-200 hover:shadow-[0_0_60px_rgba(124,58,237,0.4)]"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                    <span className="relative">Start your build</span>
                  </Link>
                </MagneticButton>
                <MagneticButton strength={0.3}>
                  <Link
                    href="/work"
                    data-hero-cta
                    className="inline-flex items-center gap-2 px-8 py-4 font-body font-medium text-white/60 border border-white/10 rounded-full transition-all duration-300 hover:text-white hover:border-[#8B5CF6]/40"
                  >
                    View work
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  </Link>
                </MagneticButton>
              </div>
            </div>
          </div>

          {/* Right — Cobe globe pinned to SoCal client regions */}
          <div className="hidden lg:flex items-center justify-center w-[500px] h-[500px] -mb-8 relative">
            <CobeGlobe size={500} />
            {/* Soft purple wash bleeding from globe */}
            <div
              className="absolute inset-0 -z-10 blur-3xl opacity-40 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, rgba(124,58,237,0.55) 0%, transparent 70%)",
              }}
            />
          </div>
        </div>

        {/* Stats — bottom row */}
        <div className="flex flex-wrap gap-6 md:gap-12 mt-12 pt-8 border-t border-white/10">
          {STATS.map((stat) => (
            <div key={stat.label} data-stat className="flex flex-col">
              <span className="font-display font-normal bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] bg-clip-text text-transparent text-2xl md:text-4xl tracking-tight">
                <CountUp end={stat.end} suffix={stat.suffix} duration={1800} />
              </span>
              <span className="font-body text-white/40 text-xs tracking-wider uppercase mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
