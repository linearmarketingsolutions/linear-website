"use client";

/**
 * NumberedSteps — the scroll narrative spine.
 *
 * Four numbered chapters (01 AUDIT → 02 BUILD → 03 AUTOMATE → 04 COMPOUND),
 * each pinned at viewport center as you scroll. Only the active chapter lights;
 * the others fade to 22%. No horizontal parallax on text — only the active
 * number nudges 6px up on reveal. Calm, deliberate, readable.
 *
 * Pattern lifted from Hermes' numbered install section, adapted for a
 * capabilities narrative. ScrollTrigger pin + per-chapter fade class.
 */

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

type Step = {
  n: string;
  title: string;
  body: string;
  meta: string;
};

const STEPS: Step[] = [
  {
    n: "01",
    title: "Audit",
    body:
      "Start with an unflinching read of where you stand — traffic, conversion, pipeline, systems, team. The audit becomes the map; nothing compounds without it.",
    meta: "DISCOVERY · 1 WEEK",
  },
  {
    n: "02",
    title: "Build",
    body:
      "Engineered websites, pipelines, and agents designed against your audit — no templates, no drag-and-drop layers, no dependency on a hosted vendor's roadmap.",
    meta: "INFRASTRUCTURE · 2–6 WEEKS",
  },
  {
    n: "03",
    title: "Automate",
    body:
      "Lead capture, follow-up, content, reporting — run on autonomous agents that remember, improve, and keep going after you log off. Compounds every time they run.",
    meta: "OPERATIONS · ONGOING",
  },
  {
    n: "04",
    title: "Compound",
    body:
      "Every system feeds the next. Content informs ads. Ads inform CRM. CRM informs retention. Retention feeds content. The operator gets more capable the longer it runs.",
    meta: "OUTCOME · PERMANENT",
  },
];

export function NumberedSteps() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;
      const steps = gsap.utils.toArray<HTMLElement>(
        "[data-v5-step]",
        containerRef.current,
      );

      steps.forEach((step, i) => {
        gsap.fromTo(
          step,
          { opacity: 0.22, y: 6 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: step,
              start: "top 65%",
              end: "bottom 35%",
              toggleActions: "play reverse play reverse",
            },
          },
        );

        // subtle fade-out for the *previous* step as the next one enters
        if (i < steps.length - 1) {
          gsap.to(step, {
            opacity: 0.18,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: steps[i + 1],
              start: "top 55%",
              toggleActions: "play none none reverse",
            },
          });
        }
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="v5-dark relative py-24 md:py-40"
      aria-labelledby="v5-steps-heading"
    >
      <div className="relative max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="v5-eyebrow mb-6">
          § The operating model
        </div>
        <h2
          id="v5-steps-heading"
          className="v5-display-strong max-w-[18ch]"
          style={{
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            color: "var(--color-v5-fg-warm)",
          }}
        >
          Four movements. <span style={{ color: "var(--color-v5-accent-glow)", fontStyle: "italic" }}>One system</span> that compounds.
        </h2>

        <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-[120px_1fr] gap-y-20 md:gap-y-32 gap-x-12">
          {STEPS.map((step) => (
            <StepRow key={step.n} step={step} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StepRow({ step }: { step: Step }) {
  return (
    <>
      <div
        data-v5-step
        className="v5-mono text-sm flex items-start md:items-baseline gap-3"
        style={{ color: "var(--color-v5-accent-glow)" }}
      >
        <span className="opacity-60">›</span>
        <span className="tracking-[0.2em]">{step.n}</span>
      </div>
      <div data-v5-step className="max-w-[58ch]">
        <h3
          className="v5-display"
          style={{
            fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
            color: "var(--color-v5-fg-warm)",
          }}
        >
          {step.title}
        </h3>
        <p
          className="v5-body mt-5"
          style={{ color: "rgba(245, 242, 238, 0.72)" }}
        >
          {step.body}
        </p>
        <div
          className="v5-label mt-6"
          style={{ color: "var(--color-text-muted)" }}
        >
          {step.meta}
        </div>
      </div>
    </>
  );
}
