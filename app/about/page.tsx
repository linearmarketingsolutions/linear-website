import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "One operator. An AI-native growth engine built to prove that one person with the right systems can outperform a full agency.",
};

export default function About() {
  return (
    <>
      <Section id="about" className="!pt-32 lg:!pt-40">
        <Container>
          <h1
            className="font-display font-bold text-text-primary leading-[1.1] mb-12 max-w-[18ch]"
            style={{ fontSize: "clamp(2.5rem, 5vw, 56px)" }}
          >
            One operator. The full stack.
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1px_1fr] gap-10 lg:gap-16 mb-20">
            {/* Left — narrative */}
            <div className="flex flex-col gap-6">
              <p className="text-text-secondary text-lg leading-relaxed">
                LMS started with a question: what happens when one person has
                access to every AI tool that exists — and knows how to deploy
                them?
              </p>
              <p className="text-text-secondary text-lg leading-relaxed">
                The answer is this company. Marketing, development, automation,
                intelligence, operations — built and run by a single operator
                with an AI-native infrastructure that scales without headcount.
              </p>
              <p className="text-text-secondary text-lg leading-relaxed">
                Every system you see here — this website, the brand, the
                client deliverables, the tools — was built by AI, directed by
                one person. The company itself is the proof of concept.
              </p>
            </div>

            {/* Divider */}
            <div className="hidden lg:block bg-border" />

            {/* Right — details */}
            <div className="flex flex-col gap-8">
              <div>
                <p className="font-body text-xs font-medium text-text-muted uppercase tracking-wider mb-2">
                  Operator
                </p>
                <p className="font-display font-bold text-text-primary text-2xl">
                  Blake Pederson
                </p>
              </div>
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
              <div>
                <p className="font-body text-xs font-medium text-text-muted uppercase tracking-wider mb-2">
                  Thesis
                </p>
                <p className="text-text-secondary leading-relaxed">
                  One person with AI infrastructure can outperform a 20-person
                  agency. Not in theory. In production. Every day.
                </p>
              </div>
            </div>
          </div>

          {/* Mission card */}
          <div className="rounded-[var(--radius-lg)] p-10 md:p-14 bg-surface-1 border border-border-accent text-center">
            <p className="font-display font-bold text-accent mb-5" style={{ fontSize: "clamp(1.5rem, 3vw, 40px)" }}>
              Slowly, then all at once.
            </p>
            <p className="text-text-secondary text-lg leading-relaxed max-w-[50ch] mx-auto mb-8">
              The companies that deploy AI infrastructure now will be
              unreachable in 18 months. LMS exists to make sure you&apos;re
              one of them.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-accent text-bg font-body font-semibold text-lg rounded-[var(--radius-md)] transition-all duration-150 hover:brightness-110 hover:shadow-[var(--shadow-glow)]"
            >
              Start your build
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
