"use client";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SplitText } from "@/components/ui/SplitText";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { TextRevealOnScroll } from "@/components/ui/TextRevealOnScroll";
import { ClipPathReveal } from "@/components/ui/ClipPathReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import Image from "next/image";
import Link from "next/link";

export function AboutContent() {
  return (
    <Section id="about" className="light-section !pt-0 relative overflow-hidden">
      {/* Full-bleed hero image — the operator */}
      <div className="relative w-full h-[60vh] md:h-[75vh] mb-16">
        <Image
          src="/images/operator-command-center.png"
          alt="One operator commanding a wall of dashboards"
          fill
          priority
          className="object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[var(--color-bg)]" />
      </div>

      <Container>
        <SplitText
          as="h1"
          mode="words"
          stagger={0.06}
          duration={0.7}
          scrollTrigger={false}
          className="font-display font-bold text-text-primary leading-[1.1] mb-12 max-w-[18ch]"
          {...{ style: { fontSize: "clamp(3rem, 6vw, 72px)" } } as React.HTMLAttributes<HTMLElement>}
        >
          One operator. The full stack.
        </SplitText>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1px_1fr] gap-10 lg:gap-16 mb-20">
          {/* Left — narrative */}
          <div className="flex flex-col gap-6">
            <TextRevealOnScroll as="p" className="text-xl leading-relaxed">
              LMS started with a question: what happens when one person has access to every AI tool that exists — and knows how to deploy them?
            </TextRevealOnScroll>
            <TextRevealOnScroll as="p" className="text-xl leading-relaxed">
              The answer is this company. Marketing, development, automation, intelligence, operations — built and run by a single operator with an AI-native infrastructure that scales without headcount.
            </TextRevealOnScroll>
            <TextRevealOnScroll as="p" className="text-xl leading-relaxed">
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
            <ScrollReveal direction="right" distance={40} delay={0.15}>
              <div>
                <p className="font-body text-xs font-medium text-text-muted uppercase tracking-wider mb-2">
                  Based in
                </p>
                <p className="text-text-secondary leading-relaxed">
                  Rancho Cucamonga, CA — serving Los Angeles, the Inland Empire,
                  Orange County, San Diego, and remote nationwide.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right" distance={40} delay={0.25}>
              <div>
                <p className="font-body text-xs font-medium text-text-muted uppercase tracking-wider mb-2">
                  Focus
                </p>
                <p className="text-text-secondary leading-relaxed">
                  AI-powered marketing infrastructure, custom development,
                  workflow automation, and business operations for growth-stage
                  companies across Southern California.
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
          <div className="rounded-[var(--radius-lg)] p-10 md:p-14 bg-[#09090B] text-center" style={{ color: '#FAFAFA' }}>
            <SplitText
              as="p"
              mode="words"
              stagger={0.07}
              duration={0.6}
              className="font-display font-bold bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] bg-clip-text text-transparent mb-5"
              {...{ style: { fontSize: "clamp(2rem, 4vw, 48px)" } } as React.HTMLAttributes<HTMLElement>}
            >
              Slowly, then all at once.
            </SplitText>
            <ScrollReveal direction="up" distance={20} delay={0.3}>
              <p className="text-[#A1A1AA] text-xl leading-relaxed max-w-[50ch] mx-auto mb-8">
                The companies that deploy AI infrastructure now will be
                unreachable in 18 months. LMS exists to make sure you&apos;re
                one of them.
              </p>
            </ScrollReveal>
            <ScrollReveal direction="up" distance={20} delay={0.4}>
              <MagneticButton strength={0.25}>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-10 py-5 bg-gradient-to-r from-[#7C3AED] to-[#6366F1] text-white font-body font-semibold text-xl rounded-full transition-all duration-150 hover:brightness-110 hover:shadow-[0_0_40px_rgba(124,58,237,0.3)]"
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
