"use client";

/**
 * DirectoryList — the Palantir layoutListBlock pattern.
 *
 * Dense, icon-less column of offerings. Every row is a thin hairline
 * with an earmark category on the left, offering label in the middle,
 * and a hover arrow + system reveal on the right. Density is the design.
 *
 * Reveals row-by-row as you scroll via CSS var stagger.
 */

import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { Earmark } from "./Earmark";

gsap.registerPlugin(ScrollTrigger);

type Entry = {
  category: string;
  offering: string;
  system: string;
  href: string;
};

const ENTRIES: Entry[] = [
  { category: "GROWTH", offering: "Positioning & messaging", system: "Strategy", href: "/services/growth-engine" },
  { category: "GROWTH", offering: "Funnel architecture", system: "Strategy", href: "/services/growth-engine" },
  { category: "GROWTH", offering: "Paid media (Meta · Google · LinkedIn)", system: "Acquisition", href: "/services/growth-engine" },
  { category: "GROWTH", offering: "Organic search · programmatic SEO", system: "Acquisition", href: "/services/growth-engine" },
  { category: "GROWTH", offering: "Lifecycle · email · SMS", system: "Retention", href: "/services/growth-engine" },
  { category: "GROWTH", offering: "Conversion rate optimization", system: "Optimization", href: "/services/growth-engine" },

  { category: "CONTENT", offering: "Editorial — long-form + blog", system: "Writing", href: "/services/content-pipeline" },
  { category: "CONTENT", offering: "Social — short-form video + reels", system: "Video", href: "/services/content-pipeline" },
  { category: "CONTENT", offering: "Podcast + audio production", system: "Audio", href: "/services/content-pipeline" },
  { category: "CONTENT", offering: "Brand design + motion", system: "Design", href: "/services/content-pipeline" },
  { category: "CONTENT", offering: "AI image + hero art pipeline", system: "Design", href: "/services/content-pipeline" },

  { category: "ENGINEERING", offering: "Marketing sites · Next.js", system: "Web", href: "/services/web-development" },
  { category: "ENGINEERING", offering: "Webflow builds + custom code", system: "Web", href: "/services/web-development" },
  { category: "ENGINEERING", offering: "Shopify stores + theme dev", system: "Commerce", href: "/services/web-development" },
  { category: "ENGINEERING", offering: "iOS + cross-platform apps", system: "Mobile", href: "/services/web-development" },
  { category: "ENGINEERING", offering: "API + integration plumbing", system: "Infrastructure", href: "/services/web-development" },

  { category: "AGENTS", offering: "Custom LLM agents + tooling", system: "Autonomy", href: "/services/ai-infrastructure" },
  { category: "AGENTS", offering: "Retrieval / RAG systems", system: "Data", href: "/services/ai-infrastructure" },
  { category: "AGENTS", offering: "Workflow automation (n8n · Make)", system: "Orchestration", href: "/services/ai-infrastructure" },
  { category: "AGENTS", offering: "Voice · phone · SMS agents", system: "Channels", href: "/services/ai-infrastructure" },
  { category: "AGENTS", offering: "Image generation pipelines", system: "Creative", href: "/services/ai-infrastructure" },

  { category: "OPERATIONS", offering: "CRM architecture (HubSpot · GHL)", system: "Sales", href: "/services/business-operations" },
  { category: "OPERATIONS", offering: "Analytics (GA4 · GSC · mixpanel)", system: "Data", href: "/services/business-operations" },
  { category: "OPERATIONS", offering: "Billing + Stripe integration", system: "Revenue", href: "/services/business-operations" },
  { category: "OPERATIONS", offering: "Dashboards + reporting", system: "Reporting", href: "/services/business-operations" },
  { category: "OPERATIONS", offering: "SOPs + playbook design", system: "Process", href: "/services/business-operations" },

  { category: "EDUCATION", offering: "Team AI onboarding", system: "Training", href: "/services/ai-education" },
  { category: "EDUCATION", offering: "Prompt engineering workshops", system: "Training", href: "/services/ai-education" },
  { category: "EDUCATION", offering: "Tool-stack selection consulting", system: "Advisory", href: "/services/ai-education" },
  { category: "EDUCATION", offering: "Custom internal documentation", system: "Ops", href: "/services/ai-education" },
];

export function DirectoryList() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!rootRef.current) return;
      gsap.fromTo(
        "[data-dir-row]",
        { opacity: 0, y: 8 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out",
          stagger: 0.022,
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        },
      );
    },
    { scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      className="v6-dark relative py-24 md:py-32 overflow-hidden"
      aria-labelledby="v6-dir-heading"
    >
      <div className="relative max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-10">
          <div className="max-w-[640px]">
            <Earmark>§ OFFERINGS · DIRECTORY</Earmark>
            <h2
              id="v6-dir-heading"
              className="v6-display-tight mt-5"
              style={{
                fontSize: "clamp(2.25rem, 5vw, 4rem)",
                color: "var(--v6-fg)",
              }}
            >
              Thirty deliverables.{" "}
              <span style={{ color: "var(--v6-accent-hot)" }}>
                One operator.
              </span>
            </h2>
          </div>
          <Earmark hot>INDEX · {ENTRIES.length}</Earmark>
        </div>

        <div className="v6-hairline mb-2" aria-hidden />

        <ul className="divide-y" style={{ borderColor: "var(--v6-border)" }}>
          {ENTRIES.map((e, i) => (
            <li
              key={`${e.category}-${e.offering}-${i}`}
              data-dir-row
              style={{ borderColor: "var(--v6-border)" }}
              className="border-t first:border-t-0"
            >
              <Link
                href={e.href}
                className="group grid grid-cols-[110px_1fr_auto_24px] md:grid-cols-[140px_1fr_auto_32px] items-center gap-4 md:gap-8 py-3.5 v6-snap"
              >
                <span
                  className="v6-mono text-[10px] tracking-[0.14em] uppercase"
                  style={{ color: "var(--v6-accent-hot)" }}
                >
                  {e.category}
                </span>
                <span
                  className="v6-mono text-[14px] md:text-[15px] tracking-[0.01em]"
                  style={{ color: "var(--v6-fg)" }}
                >
                  {e.offering}
                </span>
                <span
                  className="v6-mono text-[10px] tracking-[0.12em] uppercase hidden md:inline"
                  style={{ color: "var(--v6-fg-3)" }}
                >
                  {e.system}
                </span>
                <span
                  className="v6-mono text-[14px] opacity-40 group-hover:opacity-100 transition-opacity duration-150 text-right"
                  style={{ color: "var(--v6-accent-hot)" }}
                  aria-hidden
                >
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
