"use client";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import Link from "next/link";

const FEATURES = [
  {
    title: "What OpenClaw is",
    body: "A personal AI agent — open source, runs on your hardware. Your data stays yours while you get a persistent assistant that works across every channel your team uses.",
  },
  {
    title: "What it can do",
    body: "Inbox management, calendar, code execution, multi-channel messaging (WhatsApp, Slack, Discord, Gmail, iMessage), and custom skills built on demand. It can autonomously execute real tasks — not just chat.",
  },
  {
    title: "What LMS does for you",
    body: "Full setup, configuration, skill development, team training, and ongoing support. You get a business that operates with an AI co-pilot at every level — without the complexity of figuring it out yourself.",
  },
  {
    title: "Who it\u2019s for",
    body: "Founders, operators, and small teams who want to move at AI speed. If you\u2019re already juggling Slack, email, and calendars, OpenClaw is the layer that ties it all together.",
  },
  {
    title: "What you get",
    body: "A persistent AI co-pilot that works across every channel your team uses — one agent, one setup, unlimited leverage.",
  },
];

export function OpenClawDeepDive() {
  return (
    <Section id="openclaw-deep-dive" className="light-section !py-20">
      <Container as="div">
        <ScrollReveal>
          <div className="gradient-border-card p-8 md:p-10 relative overflow-hidden shadow-[var(--shadow-glow)]">
            <h2 className="font-display font-bold text-[clamp(24px,4vw,40px)] mb-6 bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent">
              OpenClaw: Your business&apos;s AI co-pilot
            </h2>

            <div className="flex flex-col gap-12 max-w-[65ch]">
              {FEATURES.map((feat) => (
                <div key={feat.title}>
                  <h3 className="font-display font-semibold text-base text-text-primary mb-2">
                    {feat.title}
                  </h3>
                  <p className="font-body text-base text-text-secondary leading-[1.7]">
                    {feat.body}
                  </p>
                </div>
              ))}
            </div>

            <Link
              href="/contact"
              className="cta-primary inline-flex items-center justify-center px-10 py-5 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#6366F1] text-white font-body text-lg font-semibold mt-8 transition-all hover:brightness-110 hover:shadow-[0_0_40px_rgba(124,58,237,0.3)]"
            >
              Deploy OpenClaw
            </Link>
          </div>
        </ScrollReveal>
      </Container>
    </Section>
  );
}
