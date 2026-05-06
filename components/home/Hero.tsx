"use client";

import { SplitText } from "@/components/ui/SplitText";
import { HeroStatTabs } from "./HeroStatTabs";
import { HeroVisual } from "./HeroVisual";
import Link from "next/link";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    // Subtle parallax fade as the section leaves
    gsap.to("[data-hero-shell]", {
      y: -60,
      opacity: 0.25,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 0.6,
      },
    });

    gsap.from("[data-hero-rule]", {
      scaleX: 0,
      transformOrigin: "left",
      duration: 1.1,
      delay: 0.3,
      ease: "power3.out",
    });
    gsap.from("[data-hero-body]", {
      y: 24,
      opacity: 0,
      duration: 0.9,
      delay: 0.55,
      ease: "power3.out",
    });
    gsap.from("[data-hero-anchor]", {
      y: 20,
      opacity: 0,
      duration: 0.7,
      delay: 1.1,
      ease: "power3.out",
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="light-section relative min-h-[100dvh] overflow-hidden"
      style={{ background: "#FAFAF9" }}
    >
      <div
        data-hero-shell
        className="relative z-10 flex min-h-[100dvh] flex-col gap-y-12 px-6 md:px-12 lg:px-20 xl:px-28 pt-28 pb-14 lg:grid lg:grid-cols-12 lg:grid-rows-[1fr_auto] lg:gap-y-10 lg:pt-32"
      >
        {/* RIGHT (desktop) / TOP (mobile) — headline + visual */}
        <div className="order-1 lg:order-none lg:col-span-9 lg:row-start-1 lg:col-start-4 relative">
          {/* Visual fills the right hemisphere on desktop only */}
          <div className="absolute inset-0 -z-0 hidden lg:block">
            <HeroVisual />
          </div>

          {/* Headline overlapping the visual — cmcc-pattern, single H1 with two visual lines */}
          <h1
            className="relative z-10 lg:pt-24 max-w-[1200px] lg:ml-auto lg:text-right font-display font-black text-[#0F0A1F] leading-[0.92] tracking-[-0.045em]"
            style={{ fontSize: "clamp(3.25rem, 8.5vw, 130px)" }}
          >
            <SplitText
              as="span"
              mode="words"
              stagger={0.06}
              duration={0.8}
              delay={0.15}
              scrollTrigger={false}
              className="block"
            >
              AI-native marketing
            </SplitText>
            <SplitText
              as="span"
              mode="words"
              stagger={0.06}
              duration={0.8}
              delay={0.45}
              scrollTrigger={false}
              className="block"
            >
              infrastructure.
            </SplitText>
          </h1>
        </div>

        {/* Mobile-only visual block — stacks below headline on small screens */}
        <div className="order-2 block lg:hidden h-[50vh] relative -mx-6">
          <HeroVisual />
        </div>

        {/* LEFT (desktop) / AFTER VISUAL (mobile) — narrow body block */}
        <div className="order-3 lg:order-none lg:col-span-3 lg:col-start-1 lg:row-start-1 lg:self-start lg:pt-10">
          <div
            data-hero-rule
            className="h-px w-32 bg-[#0F0A1F]/20 mb-7"
          />
          <p
            data-hero-body
            className="text-[#1F1147] text-base md:text-lg leading-relaxed indent-6 max-w-[44ch]"
          >
            Linear Marketing Solutions builds AI-native marketing infrastructure for businesses across Los Angeles, the Inland Empire, Orange County, and San Diego.
          </p>
        </div>

        {/* BOTTOM-LEFT — stat tabs */}
        <div className="order-4 lg:order-none lg:col-span-7 lg:col-start-1 lg:row-start-2 lg:self-end">
          <HeroStatTabs />
        </div>

        {/* BOTTOM-RIGHT — thesis anchor */}
        <div className="order-5 lg:order-none lg:col-span-5 lg:col-start-8 lg:row-start-2 lg:self-end flex justify-start lg:justify-end items-end">
          <Link
            href="#thesis"
            data-hero-anchor
            className="group inline-flex items-center gap-3 text-[#0F0A1F] font-mono text-[11px] tracking-[0.32em] uppercase transition-opacity hover:opacity-70"
          >
            <span className="block w-3 h-3 border border-[#7C3AED] rounded-full relative">
              <span className="absolute inset-1 rounded-full bg-[#7C3AED]" />
            </span>
            Our thesis
            <svg
              className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
