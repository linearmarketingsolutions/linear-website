"use client";

import { useRef } from "react";
import { SplitText } from "@/components/ui/SplitText";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const FIT_ITEMS = [
  "You need marketing, technology, and AI deployed as one system.",
  "You're done paying for strategy that never ships.",
  "You want infrastructure that runs without daily management.",
  "You're ready to operate like a funded company — without the overhead.",
  "You want a partner accountable to outcomes, not hours.",
];

export function WhoWeWorkWith() {
  const listRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!listRef.current) return;
    const items = listRef.current.querySelectorAll("[data-fit-item]");

    gsap.from(items, {
      x: 60,
      opacity: 0,
      duration: 0.7,
      stagger: 0.12,
      ease: "power3.out",
      scrollTrigger: {
        trigger: listRef.current,
        start: "top 75%",
        once: true,
      },
    });
  });

  return (
    <section id="who-we-work-with" className="light-section relative py-32 md:py-48 px-6 md:px-12 lg:px-20 xl:px-32">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        {/* Left — huge text */}
        <div>
          <span className="font-mono text-accent text-[11px] tracking-[0.3em] uppercase block mb-4">
            Who we work with
          </span>
          <SplitText
            as="h2"
            mode="words"
            stagger={0.05}
            className="font-display font-normal text-text-primary leading-[0.95] tracking-[-0.02em] mb-8"
            {...{ style: { fontSize: "clamp(3rem, 6vw, 80px)" } } as React.HTMLAttributes<HTMLElement>}
          >
            Built for operators.
          </SplitText>
          <ScrollReveal direction="up" distance={30} delay={0.3}>
            <p className="text-text-secondary text-2xl leading-relaxed max-w-[45ch]">
              Founders, operators, and growth-stage companies done waiting for results.
              Execution without bureaucracy.
            </p>
          </ScrollReveal>
        </div>

        {/* Right — checklist with dramatic styling */}
        <div ref={listRef} className="flex flex-col gap-0 lg:pt-16">
          {FIT_ITEMS.map((item, i) => (
            <div
              key={i}
              data-fit-item
              className="group flex items-start gap-5 py-6 border-b border-border transition-all duration-300 hover:border-accent/20 hover:pl-2"
            >
              <span className="font-mono text-accent/40 text-sm mt-1 shrink-0 group-hover:text-accent transition-colors">
                0{i + 1}
              </span>
              <p className="text-text-primary/70 text-xl leading-relaxed group-hover:text-text-primary transition-colors">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
