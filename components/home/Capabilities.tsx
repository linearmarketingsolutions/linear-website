"use client";

import { useRef } from "react";
import { SplitText } from "@/components/ui/SplitText";
import { VeilGlow } from "@/components/ui/VeilGlow";
import { GlowBlob } from "@/components/ui/GlowBlob";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const CAPABILITIES = [
  {
    title: "Growth\nEngine",
    description: "Full-funnel strategy, brand systems, campaign architecture, market intelligence.",
    span: "col-span-2 row-span-2",
    accent: true,
  },
  {
    title: "Content Pipeline",
    description: "Video, copy, design, social — AI-assisted production at scale.",
    span: "col-span-1 row-span-1",
    accent: false,
  },
  {
    title: "Web & App Dev",
    description: "Production-grade websites, dashboards, UX/UI. Hard-coded, not templated.",
    span: "col-span-1 row-span-1",
    accent: false,
  },
  {
    title: "AI Infrastructure",
    description: "Custom agents, workflow automation, CRM integration, tool development.",
    span: "col-span-1 row-span-2",
    accent: false,
  },
  {
    title: "Business Ops",
    description: "CRM systems, analytics dashboards, SaaS development, process architecture.",
    span: "col-span-1 row-span-1",
    accent: false,
  },
  {
    title: "AI Education",
    description: "Team training, tool onboarding, operational integration.",
    span: "col-span-2 row-span-1",
    accent: false,
  },
];

export function Capabilities() {
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll("[data-bento-card]");

    gsap.from(cards, {
      y: 80,
      opacity: 0,
      scale: 0.92,
      duration: 0.8,
      stagger: {
        each: 0.08,
        from: "random",
      },
      ease: "power3.out",
      scrollTrigger: {
        trigger: gridRef.current,
        start: "top 75%",
        once: true,
      },
    });
  });

  return (
    <section id="capabilities" className="relative overflow-hidden py-24 md:py-40 px-6 md:px-12 lg:px-20 xl:px-32">
      <VeilGlow color="rgba(204, 255, 0, 0.04)" direction="right" />
      <GlowBlob color="rgba(204, 255, 0, 0.4)" size={500} opacity={0.06} blur="120px" />

      {/* Section header — massive */}
      <div className="mb-16 max-w-[900px]">
        <span className="font-mono text-accent text-[11px] tracking-[0.3em] uppercase block mb-4">
          Capabilities
        </span>
        <SplitText
          as="h2"
          mode="words"
          stagger={0.04}
          className="font-display font-bold text-text-primary leading-[0.95] tracking-[-0.02em]"
          {...{ style: { fontSize: "clamp(2.5rem, 5vw, 72px)" } } as React.HTMLAttributes<HTMLElement>}
        >
          Full-stack operations. Single point of contact.
        </SplitText>
      </div>

      {/* Bento grid */}
      <div
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-[180px] gap-4"
      >
        {CAPABILITIES.map((cap) => (
          <Link
            key={cap.title}
            href="/services"
            data-bento-card
            className={`group relative rounded-2xl p-7 overflow-hidden transition-all duration-500 ${cap.span}
              ${cap.accent
                ? "bg-accent text-bg hover:shadow-[0_0_80px_rgba(204,255,0,0.3)]"
                : "bg-surface-2 border border-white/[0.06] hover:border-accent/30 hover:shadow-[0_0_40px_rgba(204,255,0,0.1)]"
              }
            `}
          >
            {/* Hover gradient overlay */}
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
              cap.accent
                ? "bg-gradient-to-br from-white/10 to-transparent"
                : "bg-gradient-to-br from-accent/[0.05] to-transparent"
            }`} />

            <div className="relative z-10 h-full flex flex-col justify-between">
              <h3 className={`font-display font-bold leading-[1.05] tracking-tight whitespace-pre-line ${
                cap.accent ? "text-bg" : "text-text-primary"
              }`}
                style={{ fontSize: cap.accent ? "clamp(2rem, 4vw, 48px)" : "clamp(1.25rem, 2vw, 24px)" }}
              >
                {cap.title}
              </h3>

              <div className="flex items-end justify-between gap-4">
                <p className={`leading-relaxed max-w-[30ch] ${
                  cap.accent ? "text-bg/70" : "text-text-secondary"
                }`}>
                  {cap.description}
                </p>
                <svg
                  className={`w-5 h-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 ${
                    cap.accent ? "text-bg/50" : "text-text-muted"
                  }`}
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                >
                  <path d="M7 17L17 7"/><path d="M7 7h10v10"/>
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
