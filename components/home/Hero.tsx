"use client";

import { SplitText } from "@/components/ui/SplitText";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { PixelGrid } from "@/components/ui/PixelGrid";
import { CountUp } from "./CountUp";
import dynamic from "next/dynamic";
import Image from "next/image";
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

    // Fade out hero content on scroll (parallax exit)
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

    // Subtle elements
    gsap.from("[data-hero-sub]", {
      y: 40, opacity: 0, duration: 1, delay: 1, ease: "power3.out",
    });
    gsap.from("[data-hero-cta]", {
      y: 30, opacity: 0, duration: 0.7, stagger: 0.15, delay: 1.3, ease: "power3.out",
    });
    gsap.from("[data-stat]", {
      y: 20, opacity: 0, duration: 0.5, stagger: 0.1, delay: 1.6, ease: "power3.out",
    });
    gsap.from("[data-hero-orb]", {
      scale: 0, opacity: 0, duration: 1.5, delay: 0.5, ease: "elastic.out(1, 0.5)",
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative h-[100dvh] overflow-hidden"
    >
      {/* 3D Particle field */}
      <ParticleField className="z-[1] opacity-50" />

      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-dark-network.webp"
          alt=""
          fill
          priority
          className="object-cover object-center opacity-25 pointer-events-none"
        />
      </div>

      {/* Pixel grid */}
      <div className="absolute inset-0 z-[2] flex items-center justify-center opacity-25 overflow-hidden pointer-events-none">
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

      {/* Content */}
      <div data-hero-content className="relative z-10 h-full flex flex-col justify-end pb-16 lg:pb-24 px-8 md:px-12 lg:px-20 xl:px-32">
        {/* Main layout */}
        <div className="flex flex-col lg:flex-row lg:items-end gap-8 lg:gap-0">
          {/* Left — cmcc.vc style: ultra-light, ultra-large */}
          <div className="flex-1">
            <SplitText
              as="h1"
              mode="chars"
              stagger={0.015}
              duration={0.4}
              delay={0.1}
              scrollTrigger={false}
              className="font-display font-normal text-text-primary leading-[0.9] tracking-[-0.04em]"
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
              className="font-display font-normal text-accent leading-[0.9] tracking-[-0.04em]"
              {...{ style: { fontSize: "clamp(4rem, 10vw, 150px)" } } as React.HTMLAttributes<HTMLElement>}
            >
              Every capability.
            </SplitText>

            {/* Sub — indented like cmcc.vc */}
            <div className="mt-10 ml-0 lg:ml-[8vw] max-w-[500px]">
              <p data-hero-sub className="text-text-secondary font-body text-xl leading-relaxed">
                Marketing, development, automation, and intelligence —
                deployed as a single integrated system. Infrastructure that compounds.
              </p>

              <div className="flex flex-wrap gap-4 mt-8">
                <MagneticButton strength={0.3}>
                  <Link
                    href="/contact"
                    data-hero-cta
                    className="group relative inline-flex items-center justify-center px-8 py-4 bg-accent text-bg font-body font-semibold rounded-full overflow-hidden transition-all duration-200 hover:shadow-[0_0_60px_rgba(204,255,0,0.35)]"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                    <span className="relative">Start your build</span>
                  </Link>
                </MagneticButton>
                <MagneticButton strength={0.3}>
                  <Link
                    href="/work"
                    data-hero-cta
                    className="inline-flex items-center gap-2 px-8 py-4 font-body font-medium text-text-secondary border border-white/10 rounded-full transition-all duration-300 hover:text-text-primary hover:border-accent/30"
                  >
                    View work
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  </Link>
                </MagneticButton>
              </div>
            </div>
          </div>

          {/* Right — 3D Floating Orb */}
          <div data-hero-orb className="hidden lg:block w-[400px] h-[400px] -mb-8">
            <FloatingOrb className="w-full h-full" />
          </div>
        </div>

        {/* Stats — bottom row */}
        <div className="flex flex-wrap gap-12 mt-12 pt-8 border-t border-border">
          {STATS.map((stat) => (
            <div key={stat.label} data-stat className="flex flex-col">
              <span className="font-display font-normal text-accent text-4xl tracking-tight">
                <CountUp end={stat.end} prefix={stat.prefix} suffix={stat.suffix} duration={1800} />
              </span>
              <span className="font-body text-text-muted text-xs tracking-wider uppercase mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
