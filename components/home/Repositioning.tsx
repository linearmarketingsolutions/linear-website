"use client";

import { useRef } from "react";
import { SplitText } from "@/components/ui/SplitText";
import { TextRevealOnScroll } from "@/components/ui/TextRevealOnScroll";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const PRINCIPLES = [
  {
    title: "End-to-end delivery",
    body: "Strategy, content, design, code, automation, and analytics handled inside one engagement. No handoff seams between an agency, three freelancers, and an internal hire.",
  },
  {
    title: "AI at every step",
    body: "Custom agents and pipelines do the work that used to need headcount — research, content production, lead routing, reporting. Built into the engagement, not bolted on after.",
  },
  {
    title: "Systems, not projects",
    body: "Every deliverable is infrastructure that keeps running after handoff. Compounding, not one-shot work that gets re-bought every quarter.",
  },
];

export function Repositioning() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    gsap.from("[data-principle]", {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 65%",
        once: true,
      },
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="thesis"
      className="light-section relative py-32 md:py-48 px-6 md:px-12 lg:px-20 xl:px-32"
    >
      <div className="mb-20 max-w-[900px]">
        <span className="font-mono text-[#7C3AED] text-xs tracking-[0.3em] uppercase block mb-4">
          Our thesis
        </span>
        <SplitText
          as="h2"
          mode="words"
          stagger={0.05}
          className="font-display font-normal text-text-primary leading-[0.95] tracking-[-0.03em]"
          {...{ style: { fontSize: "clamp(3rem, 7vw, 96px)" } } as React.HTMLAttributes<HTMLElement>}
        >
          Marketing built like infrastructure.
        </SplitText>
        <div className="mt-6 max-w-[640px]">
          <TextRevealOnScroll as="p" className="text-lg md:text-2xl leading-relaxed">
            Every system we ship runs on AI, integrates with the next one, and keeps working without us. That&apos;s the whole offer.
          </TextRevealOnScroll>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12">
        {PRINCIPLES.map((principle, i) => (
          <div
            key={principle.title}
            data-principle
            className="relative pl-7 border-l border-[#7C3AED]/15"
          >
            <span className="absolute left-0 top-1 w-3 h-3 -translate-x-[6.5px] rounded-full bg-[#7C3AED] shadow-[0_0_18px_rgba(124,58,237,0.45)]" />
            <span className="font-mono text-[#7C3AED]/70 text-xs tracking-[0.2em] uppercase block mb-3">
              0{i + 1}
            </span>
            <h3 className="font-display font-normal text-text-primary text-2xl md:text-3xl leading-tight tracking-tight mb-3">
              {principle.title}
            </h3>
            <p className="text-text-secondary/80 text-base md:text-lg leading-relaxed">
              {principle.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
