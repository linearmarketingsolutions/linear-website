"use client";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SplitText } from "@/components/ui/SplitText";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ClipPathReveal } from "@/components/ui/ClipPathReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { TextRevealOnScroll } from "@/components/ui/TextRevealOnScroll";
import Link from "next/link";

export function OpenClawCallout() {
  return (
    <Section id="openclaw">
      <Container as="div">
        <ClipPathReveal shape="inset" duration={1}>
          <div className="gradient-border-card p-8 md:p-12 shadow-[var(--shadow-glow)] relative overflow-hidden">
            {/* Subtle background glow */}
            <div
              className="absolute -top-20 -right-20 w-60 h-60 rounded-full pointer-events-none opacity-20"
              style={{ background: "radial-gradient(circle, rgba(204, 255, 0, 0.3), transparent 70%)" }}
            />

            <SplitText
              as="h2"
              mode="words"
              stagger={0.05}
              className="font-display font-bold text-accent leading-tight mb-5 relative z-10"
              {...{ style: { fontSize: "clamp(2rem, 4vw, 56px)" } } as React.HTMLAttributes<HTMLElement>}
            >
              We set up OpenClaw for your business.
            </SplitText>

            <TextRevealOnScroll
              as="p"
              className="leading-relaxed max-w-[65ch] mb-5 relative z-10"
            >
              OpenClaw is the fastest-growing AI agent platform in the world right now. It&apos;s an open-source personal AI assistant that connects to every platform your team already uses — WhatsApp, Slack, Discord, Gmail, iMessage, and more — and can autonomously execute real tasks. Clearing inboxes, managing calendars, running code, monitoring systems, building new skills on demand. It runs on your own hardware, so your data stays yours.
            </TextRevealOnScroll>

            <ScrollReveal direction="up" distance={20} delay={0.2}>
              <p className="text-text-secondary leading-relaxed max-w-[65ch] mb-8 relative z-10">
                LMS handles the full setup, configuration, custom skill development,
                and team training. You get a business that operates with an AI
                co-pilot at every level — without the complexity of figuring it out
                yourself.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" distance={20} delay={0.3}>
              <MagneticButton strength={0.25}>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 bg-accent text-bg font-body font-semibold text-lg rounded-[var(--radius-md)] transition-all duration-150 hover:brightness-110 hover:shadow-[var(--shadow-glow)] relative z-10"
                >
                  Deploy OpenClaw
                </Link>
              </MagneticButton>
            </ScrollReveal>
          </div>
        </ClipPathReveal>
      </Container>
    </Section>
  );
}
