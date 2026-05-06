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
    description: "Websites, CRMs, dashboards, automation pipelines, and AI integrations — deployed end-to-end across distribution, fiber-optic manufacturing, fitness, tattoo, exam-prep education, and e-commerce.",
    metric: "10+",
    metricLabel: "Clients served",
  },
  {
    headline: "AI-native operations",
    description: "Every engagement runs on AI infrastructure. Custom agents handle content production, lead routing, analytics, and reporting — replacing the headcount that used to do it manually.",
    metric: "1",
    metricLabel: "Operator",
  },
  {
    headline: "Production-grade websites",
    description: "Custom-coded Next.js sites with hand-built 3D, GSAP scroll animations, and Lighthouse scores above 90. No drag-drop builders. No template reskins. Real infrastructure.",
    metric: "90+",
    metricLabel: "Lighthouse score",
  },
  {
    headline: "CRM & sales pipelines",
    description: "GoHighLevel, HubSpot, Airtable, and custom-built sales pipelines — lead routing, follow-up cadences, real-time dashboards. Sales teams use what we ship every day.",
    metric: "4",
    metricLabel: "CRM platforms wired",
  },
  {
    headline: "Research-grade reports",
    description: "Industry intelligence, funding-source mapping, distributor audits, and product spec systems. Multi-page deliverables that stand up under client review.",
    metric: "200+",
    metricLabel: "Sources mapped",
  },
];

export function Reviews() {
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll("[data-proof-card]");

    gsap.fromTo(cards,
      { y: 50, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 85%",
          once: true,
        },
      }
    );
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
