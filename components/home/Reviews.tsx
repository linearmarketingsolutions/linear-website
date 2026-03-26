"use client";

import { useRef } from "react";
import { SplitText } from "@/components/ui/SplitText";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const PROOF_POINTS = [
  {
    headline: "Full-stack client systems",
    description: "Websites, CRMs, dashboards, automation pipelines, and AI integrations — deployed end-to-end for clients across HVAC, fitness, tattoo, distribution, and professional services.",
    metric: "10+",
    metricLabel: "Clients served",
  },
  {
    headline: "AI-native operations",
    description: "Every client engagement runs on AI infrastructure. Custom agents handle content production, lead routing, analytics, and reporting — eliminating manual overhead.",
    metric: "1",
    metricLabel: "Operator",
  },
  {
    headline: "OpenClaw deployment",
    description: "We set up and configure OpenClaw — the open-source AI agent platform — for businesses. One agent, every channel. WhatsApp, Slack, Gmail, iMessage. Your data stays yours.",
    metric: "∞",
    metricLabel: "Channels connected",
  },
  {
    headline: "Production-grade websites",
    description: "Custom-coded sites with 3D visuals, GSAP scroll animations, and performance scores above 90. No templates. No page builders. Hard-coded infrastructure.",
    metric: "90+",
    metricLabel: "Lighthouse scores",
  },
  {
    headline: "CRM & automation systems",
    description: "GoHighLevel, HubSpot, and custom-built CRM pipelines with automated follow-ups, lead scoring, and real-time dashboards. Sales teams use what we build every day.",
    metric: "6+",
    metricLabel: "Systems deployed",
  },
];

export function Reviews() {
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll("[data-proof-card]");

    gsap.from(cards, {
      y: 50,
      opacity: 0,
      scale: 0.95,
      duration: 0.7,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: gridRef.current,
        start: "top 80%",
        once: true,
      },
    });
  });

  return (
    <section id="proof" className="light-section relative py-20 md:py-32 px-6 md:px-12 lg:px-20 xl:px-32">
      {/* Header */}
      <div className="mb-14">
        <span className="font-mono text-accent text-xs tracking-[0.3em] uppercase block mb-4">
          What We Deploy
        </span>
        <SplitText
          as="h2"
          mode="words"
          stagger={0.04}
          className="font-display font-normal text-text-primary leading-[0.95] tracking-[-0.02em]"
          {...{ style: { fontSize: "clamp(2.5rem, 5vw, 72px)" } } as React.HTMLAttributes<HTMLElement>}
        >
          Real systems. Real outcomes.
        </SplitText>
      </div>

      {/* Grid cards */}
      <div
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {PROOF_POINTS.map((item) => (
          <div
            key={item.headline}
            data-proof-card
            className="group relative rounded-2xl p-8 bg-surface-1 border border-border shadow-[var(--shadow-card)] overflow-hidden transition-all duration-500 hover:border-accent/20 hover:shadow-[0_0_40px_rgba(124,58,237,0.08)]"
          >
            {/* Large metric */}
            <div className="mb-5">
              <span className="font-display font-normal text-accent text-5xl tracking-tight">
                {item.metric}
              </span>
              <span className="block font-mono text-text-muted text-xs tracking-wider uppercase mt-1">
                {item.metricLabel}
              </span>
            </div>

            {/* Headline + description */}
            <h3 className="font-body font-semibold text-text-primary text-lg mb-3">
              {item.headline}
            </h3>
            <p className="text-text-secondary leading-relaxed text-base">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
