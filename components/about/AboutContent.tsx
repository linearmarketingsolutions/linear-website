"use client";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SplitText } from "@/components/ui/SplitText";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { TextRevealOnScroll } from "@/components/ui/TextRevealOnScroll";
import { ClipPathReveal } from "@/components/ui/ClipPathReveal";
import { GlowBlob } from "@/components/ui/GlowBlob";
import { MagneticButton } from "@/components/ui/MagneticButton";
import Link from "next/link";

export function AboutContent() {
  return (
    <Section id="about" className="!pt-32 lg:!pt-40 relative overflow-hidden">
      <GlowBlob
        color="rgba(204, 255, 0, 0.4)"
        size={500}
        opacity={0.08}
        blur="120px"
        duration={25}
      />

      <Container>
        <SplitText
          as="h1"
          mode="words"
          stagger={0.06}
          duration={0.7}
          scrollTrigger={false}
          className="font-display font-bold text-text-primary leading-[1.1] mb-12 max-w-[18ch]"
          {...{ style: { fontSize: "clamp(2.5rem, 5vw, 56px)" } } as React.HTMLAttributes<HTMLElement>}
        >
          One operator. The full stack.
        </SplitText>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1px_1fr] gap-10 lg:gap-16 mb-20">
          {/* Left — narrative */}
          <div className="flex flex-col gap-6">
            <TextRevealOnScroll as="p" className="text-lg leading-relaxed">
              LMS started with a question: what happens when one person has access to every AI tool that exists — and knows how to deploy them?
            </TextRevealOnScroll>
            <TextRevealOnScroll as="p" className="text-lg leading-relaxed">
              The answer is this company. Marketing, development, automation, intelligence, operations — built and run by a single operator with an AI-native infrastructure that scales without headcount.
            </TextRevealOnScroll>
            <TextRevealOnScroll as="p" className="text-lg leading-relaxed">
              Every system you see here — this website, the brand, the client deliverables, the tools — was built by AI, directed by one person. The company itself is the proof of concept.
            </TextRevealOnScroll>
          </div>

          {/* Divider */}
          <div className="hidden lg:block bg-border" />

          {/* Right — details */}
          <div className="flex flex-col gap-8">
            <ScrollReveal direction="right" distance={40} delay={0.1}>
              <div>
                <p className="font-body text-xs font-medium text-text-muted uppercase tracking-wider mb-2">
                  Operator
                </p>
                <p className="font-display font-bold text-text-primary text-2xl">
                  Blake Pederson
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right" distance={40} delay={0.2}>
              <div>
                <p className="font-body text-xs font-medium text-text-muted uppercase tracking-wider mb-2">
                  Focus
                </p>
                <p className="text-text-secondary leading-relaxed">
                  AI-powered marketing infrastructure, custom development,
                  workflow automation, and business operations for growth-stage
                  companies.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right" distance={40} delay={0.3}>
              <div>
                <p className="font-body text-xs font-medium text-text-muted uppercase tracking-wider mb-2">
                  Thesis
                </p>
                <p className="text-text-secondary leading-relaxed">
                  One person with AI infrastructure can outperform a 20-person
                  agency. Not in theory. In production. Every day.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Mission card — dramatic circle reveal */}
        <ClipPathReveal shape="circle" duration={1.2}>
          <div className="rounded-[var(--radius-lg)] p-10 md:p-14 bg-surface-1 border border-border-accent text-center">
            <SplitText
              as="p"
              mode="words"
              stagger={0.07}
              duration={0.6}
              className="font-display font-bold text-accent mb-5"
              {...{ style: { fontSize: "clamp(1.5rem, 3vw, 40px)" } } as React.HTMLAttributes<HTMLElement>}
            >
              Slowly, then all at once.
            </SplitText>
            <ScrollReveal direction="up" distance={20} delay={0.3}>
              <p className="text-text-secondary text-lg leading-relaxed max-w-[50ch] mx-auto mb-8">
                The companies that deploy AI infrastructure now will be
                unreachable in 18 months. LMS exists to make sure you&apos;re
                one of them.
              </p>
            </ScrollReveal>
            <ScrollReveal direction="up" distance={20} delay={0.4}>
              <MagneticButton strength={0.25}>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 bg-accent text-bg font-body font-semibold text-lg rounded-[var(--radius-md)] transition-all duration-150 hover:brightness-110 hover:shadow-[var(--shadow-glow)]"
                >
                  Start your build
                </Link>
              </MagneticButton>
            </ScrollReveal>
          </div>
        </ClipPathReveal>
      </Container>
    </Section>
  );
}
