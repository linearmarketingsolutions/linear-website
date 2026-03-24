"use client";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { fadeUp, transitionBase } from "@/lib/animations";
import { motion } from "framer-motion";
import Link from "next/link";

export function OpenClawCallout() {
  return (
    <Section id="openclaw" className="!py-[var(--space-2xl)]">
      <Container as="div">
        <motion.div
          variants={fadeUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          transition={transitionBase}
          className="rounded-[var(--radius-lg)] p-8 md:p-10 relative overflow-hidden"
          style={{
            background: "var(--color-surface-1)",
            border: "1px solid transparent",
            backgroundImage:
              "linear-gradient(var(--color-surface-1), var(--color-surface-1)) padding-box, var(--gradient-brand) border-box",
            backgroundOrigin: "border-box",
            backgroundClip: "padding-box, border-box",
            boxShadow: "var(--shadow-glow)",
          }}
        >
          <h2
            className="gradient-text mb-4"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(var(--text-h3), 4vw, var(--text-h2))",
            }}
          >
            We set up OpenClaw for your business.
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-body)",
              color: "var(--color-text-secondary)",
              lineHeight: 1.7,
              maxWidth: "65ch",
              marginBottom: "var(--space-xl)",
            }}
          >
            OpenClaw is the fastest-growing AI agent platform in the world right
            now. It&apos;s an open-source personal AI assistant that connects to
            every platform your team already uses — WhatsApp, Slack, Discord,
            Gmail, iMessage, and more — and can autonomously execute real tasks.
            Clearing inboxes, managing calendars, running code, monitoring
            systems, building new skills on demand. It runs on your own
            hardware, so your data stays yours.
          </p>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-body)",
              color: "var(--color-text-secondary)",
              lineHeight: 1.7,
              maxWidth: "65ch",
              marginBottom: "var(--space-xl)",
            }}
          >
            LMS handles the full setup, configuration, custom skill development,
            and team training. You get a business that operates with an AI
            co-pilot at every level — without the complexity of figuring it out
            yourself.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 rounded-[var(--radius-md)] font-medium transition-all hover:brightness-110 hover:shadow-[var(--shadow-glow)]"
            style={{
              background: "var(--color-accent-primary)",
              color: "#09090B",
              fontFamily: "var(--font-body)",
              fontSize: 18,
            }}
          >
            Deploy OpenClaw
          </Link>
        </motion.div>
      </Container>
    </Section>
  );
}
