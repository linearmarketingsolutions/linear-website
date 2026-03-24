"use client";

import { useRef } from "react";
import { SplitText } from "@/components/ui/SplitText";
import { TextRevealOnScroll } from "@/components/ui/TextRevealOnScroll";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const OLD_WAY = [
  "Teams of 12 doing the work of one system.",
  "Agencies billing hours instead of shipping outcomes.",
  "Freelancers who see one piece, never the whole machine.",
];

const LMS_WAY = [
  "One integrated operator. Strategy through deployment.",
  "AI at every layer — content, automation, research, code.",
  "Systems built once, compounding indefinitely.",
];

export function Repositioning() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    // Animate the divider line growing
    gsap.from("[data-divider]", {
      scaleY: 0,
      transformOrigin: "top",
      duration: 1.2,
      ease: "power3.inOut",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 60%",
        once: true,
      },
    });

    // Stagger list items
    gsap.from("[data-old-item]", {
      x: -40,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 65%",
        once: true,
      },
    });

    gsap.from("[data-new-item]", {
      x: 40,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      delay: 0.2,
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
      id="repositioning"
      className="relative py-32 md:py-48 px-6 md:px-12 lg:px-20 xl:px-32"
    >
      {/* Massive headline */}
      <div className="mb-20">
        <SplitText
          as="h2"
          mode="words"
          stagger={0.05}
          className="font-display font-bold text-text-primary leading-[0.95] tracking-[-0.03em]"
          {...{ style: { fontSize: "clamp(2.5rem, 6vw, 88px)" } } as React.HTMLAttributes<HTMLElement>}
        >
          The old model is dead.
        </SplitText>
        <div className="mt-6 max-w-[600px]">
          <TextRevealOnScroll as="p" className="text-xl leading-relaxed">
            The marketing industry runs on bloat. Layers of people doing what one system could do better. We built the replacement.
          </TextRevealOnScroll>
        </div>
      </div>

      {/* Full-bleed split comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1px_1fr] gap-0 lg:gap-16">
        {/* Old Way */}
        <div className="py-8">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-3 h-3 rounded-full bg-red-500/40" />
            <span className="font-mono text-text-muted text-xs tracking-[0.2em] uppercase">
              How it was
            </span>
          </div>
          <div className="flex flex-col gap-6">
            {OLD_WAY.map((item, i) => (
              <p
                key={i}
                data-old-item
                className="text-text-secondary/60 text-xl lg:text-2xl leading-relaxed font-body"
                style={{ textDecoration: "line-through", textDecorationColor: "rgba(239,68,68,0.3)" }}
              >
                {item}
              </p>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div data-divider className="hidden lg:block bg-gradient-to-b from-transparent via-accent/40 to-transparent" />

        {/* LMS Way */}
        <div className="py-8">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-3 h-3 rounded-full bg-accent shadow-[0_0_12px_rgba(204,255,0,0.5)]" />
            <span className="font-mono text-accent text-xs tracking-[0.2em] uppercase">
              How it is
            </span>
          </div>
          <div className="flex flex-col gap-6">
            {LMS_WAY.map((item, i) => (
              <p
                key={i}
                data-new-item
                className="text-text-primary text-xl lg:text-2xl leading-relaxed font-body"
              >
                {item}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
