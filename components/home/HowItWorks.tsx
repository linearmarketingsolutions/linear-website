"use client";

import { useRef } from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SplitText } from "@/components/ui/SplitText";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { TerminalBlock } from "@/components/ui/TerminalBlock";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    number: "01",
    title: "Discovery",
    body: "A 30-minute call. We map your business, identify gaps, and determine if LMS is the right fit. No pitch. Just signal.",
  },
  {
    number: "02",
    title: "Architecture",
    body: "We design your operating system — marketing, technology, automation, and growth. You approve the blueprint before anything is built.",
  },
  {
    number: "03",
    title: "Deployment",
    body: "We build, launch, and optimize. Weekly reporting. Full transparency. Systems that compound from day one.",
  },
];

const TERMINAL_LINES = [
  { type: "command" as const, text: "lms deploy --client acme-corp", delay: 400 },
  { type: "output" as const, text: "Scanning business model...", delay: 300 },
  { type: "output" as const, text: "Mapping growth vectors...", delay: 200 },
  { type: "success" as const, text: "\u2713 6 automation workflows configured", delay: 300 },
  { type: "success" as const, text: "\u2713 CRM pipeline deployed", delay: 200 },
  { type: "success" as const, text: "\u2713 Content engine online", delay: 200 },
  { type: "success" as const, text: "\u2713 Analytics dashboard live", delay: 200 },
  { type: "command" as const, text: "lms status", delay: 600 },
  { type: "accent" as const, text: "All systems operational. Revenue compounding.", delay: 300 },
];

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!lineRef.current) return;
    gsap.fromTo(
      lineRef.current,
      { scaleX: 0, transformOrigin: "left center" },
      {
        scaleX: 1,
        duration: 1.2,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
        },
      }
    );
  }, { scope: sectionRef });

  useGSAP(() => {
    if (!sectionRef.current) return;
    const badges = sectionRef.current.querySelectorAll("[data-step-badge]");
    const texts = sectionRef.current.querySelectorAll("[data-step-text]");

    gsap.from(badges, {
      scale: 0,
      opacity: 0,
      duration: 0.5,
      stagger: 0.2,
      ease: "back.out(2)",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        once: true,
      },
    });

    gsap.from(texts, {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.2,
      delay: 0.3,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        once: true,
      },
    });
  }, { scope: sectionRef });

  return (
    <Section id="how-it-works" className="light-section relative overflow-hidden !py-16 md:!py-24">
      <Container as="div">
        <section ref={sectionRef}>
          <div className="mb-12">
            <SplitText
              as="h2"
              mode="words"
              stagger={0.05}
              className="font-display font-normal text-text-primary text-[clamp(3rem,6vw,80px)] leading-tight mb-4"
            >
              Three steps. Full deployment.
            </SplitText>
          </div>

          {/* Desktop: horizontal flow */}
          <div className="hidden md:grid md:grid-cols-3 gap-0 relative">
            <div
              ref={lineRef}
              className="absolute top-12 left-[16%] right-[16%] h-px bg-gradient-to-r from-[#7C3AED]/60 via-[#7C3AED] to-[#7C3AED]/60"
            />
            {STEPS.map((step) => (
              <div
                key={step.number}
                className="flex flex-col items-center text-center px-8 relative z-10"
              >
                <div
                  data-step-badge
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#6366F1] text-white font-mono text-sm font-bold mb-6 shadow-[0_0_30px_rgba(124,58,237,0.3)]"
                >
                  {step.number}
                </div>
                <div data-step-text>
                  <h3 className="font-body font-semibold text-text-primary text-2xl mb-3">
                    {step.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed max-w-[28ch]">
                    {step.body}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile: vertical timeline */}
          <div className="flex flex-col md:hidden gap-0 relative">
            <div className="absolute top-6 bottom-6 left-5 w-px bg-gradient-to-b from-[#7C3AED]/60 via-[#7C3AED] to-[#7C3AED]/60" />
            {STEPS.map((step) => (
              <div key={step.number} className="flex gap-6 py-6 relative">
                <div
                  data-step-badge
                  className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#6366F1] text-white font-mono text-xs font-bold z-10 shadow-[0_0_30px_rgba(124,58,237,0.3)]"
                >
                  {step.number}
                </div>
                <div data-step-text>
                  <h3 className="font-body font-semibold text-text-primary text-2xl mb-2">
                    {step.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed">
                    {step.body}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Terminal demo */}
          <div className="mt-14 max-w-4xl mx-auto">
            <TerminalBlock
              lines={TERMINAL_LINES}
              title="lms-deploy"
              typeSpeed={18}
            />
          </div>

          <div className="text-center mt-10">
            <MagneticButton strength={0.25}>
              <Link
                href="/contact"
                className="cta-primary group relative inline-flex items-center justify-center px-8 py-4 md:px-10 md:py-5 bg-gradient-to-r from-[#7C3AED] to-[#6366F1] text-white font-body font-semibold text-lg md:text-xl rounded-full overflow-hidden transition-all duration-150 hover:shadow-[0_0_60px_rgba(124,58,237,0.3)]"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                <span className="relative">Begin Your Build</span>
              </Link>
            </MagneticButton>
          </div>
        </section>
      </Container>
    </Section>
  );
}
