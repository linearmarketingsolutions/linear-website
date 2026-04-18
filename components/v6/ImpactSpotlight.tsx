"use client";

/**
 * ImpactSpotlight — KPI-first case chapters (Palantir caseStudyDataPoint).
 *
 * Each chapter leads with a huge numeric KPI in the display family. The
 * quote/outcome sits beneath as secondary content, earmark labels above
 * name the client. Cards scroll-snap through on desktop; stack on mobile.
 */

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { Earmark } from "./Earmark";

gsap.registerPlugin(ScrollTrigger);

type Chapter = {
  client: string;
  sector: string;
  kpi: string;
  kpiLabel: string;
  quote: string;
  deliverable: string;
};

const CHAPTERS: Chapter[] = [
  {
    client: "PASS MFT",
    sector: "ED-TECH",
    kpi: "+210%",
    kpiLabel: "SESSION LENGTH",
    quote:
      "An exam-prep platform rebuilt from first principles — adaptive scoring, migrated bank, new brand — in six weeks.",
    deliverable: "PLATFORM · BRAND · GROWTH",
  },
  {
    client: "P2P DISTRIBUTION",
    sector: "B2B · MFG",
    kpi: "$3.2M",
    kpiLabel: "REVENUE DEPLOYED",
    quote:
      "60+ SKU catalog, dealer intel engine, automated distributor outreach — shipped as a single operator stack.",
    deliverable: "CATALOG · CRM · AGENTS",
  },
  {
    client: "PLAYING SURFACE SPORTS",
    sector: "D2C · RETAIL",
    kpi: "4 SESSIONS",
    kpiLabel: "ZERO TO LAUNCH",
    quote:
      "Empty Shopify to seasonal launch in four sessions — store build, AI SEO stack, distributor research, operational runbook.",
    deliverable: "COMMERCE · SEO · OPS",
  },
];

export function ImpactSpotlight() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!rootRef.current) return;
      const items = gsap.utils.toArray<HTMLElement>(
        "[data-impact-card]",
        rootRef.current,
      );
      items.forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: i * 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });
    },
    { scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      className="v6-dark relative py-24 md:py-32 overflow-hidden"
      aria-labelledby="v6-impact-heading"
    >
      <div className="relative max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
          <div className="max-w-[640px]">
            <Earmark>§ IMPACT · SELECTED</Earmark>
            <h2
              id="v6-impact-heading"
              className="v6-display-tight mt-5"
              style={{
                fontSize: "clamp(2.25rem, 5vw, 4rem)",
                color: "var(--v6-fg)",
              }}
            >
              Three deploys.{" "}
              <span style={{ color: "var(--v6-accent-hot)" }}>
                Same operator.
              </span>
            </h2>
          </div>
          <Earmark hot>{CHAPTERS.length} ENGAGEMENTS</Earmark>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-px" style={{ background: "var(--v6-border)" }}>
          {CHAPTERS.map((chapter) => (
            <article
              key={chapter.client}
              data-impact-card
              className="relative p-8 md:p-10 flex flex-col min-h-[420px]"
              style={{ background: "var(--v6-bg)" }}
            >
              <div className="flex items-start justify-between">
                <Earmark hot>{chapter.client}</Earmark>
                <Earmark>{chapter.sector}</Earmark>
              </div>

              <div className="mt-10 mb-auto">
                <div
                  className="v6-display-tight"
                  style={{
                    fontSize: "clamp(3rem, 6vw, 5.5rem)",
                    color: "var(--v6-accent-hot)",
                    lineHeight: 0.95,
                    letterSpacing: "-0.035em",
                  }}
                >
                  {chapter.kpi}
                </div>
                <div
                  className="v6-mono mt-3 text-[10px] tracking-[0.18em] uppercase"
                  style={{ color: "var(--v6-fg-3)" }}
                >
                  {chapter.kpiLabel}
                </div>
              </div>

              <div
                className="border-t pt-5"
                style={{ borderColor: "var(--v6-border)" }}
              >
                <p
                  className="v6-body"
                  style={{
                    color: "var(--v6-fg-2)",
                    fontSize: "15px",
                    lineHeight: 1.55,
                  }}
                >
                  {chapter.quote}
                </p>
                <div
                  className="v6-mono mt-4 text-[10px] tracking-[0.16em] uppercase"
                  style={{ color: "var(--v6-accent-soft)" }}
                >
                  DEPLOYED · {chapter.deliverable}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
