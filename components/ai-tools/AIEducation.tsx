"use client";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import Link from "next/link";

export function AIEducation() {
  return (
    <Section id="ai-education" className="light-section">
      <Container as="div">
        <ScrollReveal>
          <div className="text-center max-w-[60ch] mx-auto">
            <h2 className="font-display font-bold text-[clamp(24px,4vw,40px)] mb-6 bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent">
              Your team learns to operate on AI.
            </h2>
            <p className="font-body text-base text-text-secondary leading-[1.7] mb-12">
              LMS delivers custom training programs, tool-specific onboarding,
              and ongoing AI literacy development. Systems are only as powerful as
              the people running them.
            </p>
            <Link
              href="/contact"
              className="cta-primary inline-flex items-center justify-center px-10 py-5 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#6366F1] text-white font-body text-lg font-semibold transition-all hover:brightness-110 hover:shadow-[0_0_40px_rgba(124,58,237,0.3)]"
            >
              Start training
            </Link>
          </div>
        </ScrollReveal>
      </Container>
    </Section>
  );
}
