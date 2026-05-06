"use client";

import { useRef } from "react";
import { SplitText } from "@/components/ui/SplitText";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const CAPABILITIES = [
  {
    title: "Growth\nEngine",
    href: "/services/growth-engine",
    description: "Full-funnel strategy, brand systems, campaign architecture, market intelligence.",
    span: "col-span-1 md:col-span-2 md:row-span-2",
    accent: true,
  },
  {
    title: "Content Pipeline",
    href: "/services/content-pipeline",
    description: "Video, copy, design, social — AI-assisted production at scale.",
    span: "col-span-1 row-span-1",
    accent: false,
  },
  {
    title: "Web & App Dev",
    href: "/services/web-development",
    description: "Production-grade websites, dashboards, UX/UI. Hard-coded, not templated.",
    span: "col-span-1 row-span-1",
    accent: false,
  },
  {
    title: "AI Infrastructure",
    href: "/services/ai-infrastructure",
    description: "Custom agents, workflow automation, CRM integration, tool development.",
    span: "col-span-1 md:row-span-2",
    accent: false,
  },
  {
    title: "Business Ops",
    href: "/services/business-operations",
    description: "CRM systems, analytics dashboards, SaaS development, process architecture.",
    span: "col-span-1 row-span-1",
    accent: false,
  },
  {
    title: "AI Education",
    href: "/services/ai-education",
    description: "Team training, tool onboarding, operational integration.",
    span: "col-span-1 md:col-span-2 row-span-1",
    accent: false,
  },
];

export function Capabilities() {
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll("[data-bento-card]");

    // fromTo ensures cards always reach visible end state,
    // even if ScrollTrigger misses the trigger on restore/reload
    gsap.fromTo(
      cards,
      { y: 40, opacity: 0, scale: 0.96 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: { each: 0.06, from: "start" },
        ease: "power2.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      }
    );

    // Refresh after images/fonts settle so trigger positions are accurate
    requestAnimationFrame(() => ScrollTrigger.refresh());
  });

  return (
    <section id="capabilities" className="light-section relative overflow-hidden py-20 md:py-28 px-6 md:px-12 lg:px-20 xl:px-32">
      <div className="mb-16 max-w-[900px]">
        <span className="font-mono text-[#7C3AED] text-xs tracking-[0.3em] uppercase block mb-4">
          Capabilities
        </span>
        <SplitText
          as="h2"
          mode="words"
          stagger={0.04}
          className="font-display font-normal text-text-primary leading-[0.95] tracking-[-0.02em]"
          {...{ style: { fontSize: "clamp(3rem, 6vw, 80px)" } } as React.HTMLAttributes<HTMLElement>}
        >
          Full-stack operations. Single point of contact.
        </SplitText>
      </div>

      <div
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-[minmax(120px,auto)] md:auto-rows-[minmax(180px,auto)] gap-4"
      >
        {CAPABILITIES.map((cap) => (
          <Link
            key={cap.title}
            href={cap.href}
            data-bento-card
            className={`group relative rounded-2xl p-7 overflow-hidden transition-all duration-500 ${cap.span}
              ${cap.accent
                ? "bg-gradient-to-br from-[#7C3AED] to-[#6366F1] text-white hover:shadow-[var(--shadow-glow-lg)]"
                : "bg-white border border-black/[0.06] hover:border-[#7C3AED]/30 hover:shadow-[var(--shadow-glow)]"
              }`}
          >
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
              cap.accent
                ? "bg-gradient-to-br from-white/10 to-transparent"
                : "bg-gradient-to-br from-[#7C3AED]/[0.04] to-transparent"
            }`} />

            <div className="relative z-10 h-full flex flex-col justify-between">
              <h3
                className={`font-display font-normal leading-[1.05] tracking-tight whitespace-pre-line ${
                  cap.accent ? "text-white" : "text-[#18181B]"
                }`}
                style={{ fontSize: cap.accent ? "clamp(2rem, 4vw, 48px)" : "clamp(1.25rem, 2vw, 24px)" }}
              >
                {cap.title}
              </h3>

              <div className="flex items-end justify-between gap-4">
                <p className={`leading-relaxed max-w-[30ch] ${
                  cap.accent ? "text-white/80" : "text-[#3F3F46]"
                }`}>
                  {cap.description}
                </p>
                <svg
                  className={`w-5 h-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 ${
                    cap.accent ? "text-white/50" : "text-[#A1A1AA]"
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
