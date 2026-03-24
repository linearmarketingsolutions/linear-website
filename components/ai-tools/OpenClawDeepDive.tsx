"use client";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { fadeUp, transitionBase } from "@/lib/animations";
import { motion } from "framer-motion";
import Link from "next/link";

export function OpenClawDeepDive() {
  return (
    <Section id="openclaw-deep-dive" className="!py-[var(--space-2xl)]">
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
            className="gradient-text mb-6"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(var(--text-h3), 4vw, var(--text-h2))",
            }}
          >
            OpenClaw: Your business&apos;s AI co-pilot
          </h2>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-xl)",
              maxWidth: "65ch",
            }}
          >
            <div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: "var(--text-body)",
                  color: "var(--color-text-primary)",
                  marginBottom: "var(--space-sm)",
                }}
              >
                What OpenClaw is
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-body)",
                  color: "var(--color-text-secondary)",
                  lineHeight: 1.7,
                }}
              >
                A personal AI agent — open source, runs on your hardware. Your
                data stays yours while you get a persistent assistant that
                works across every channel your team uses.
              </p>
            </div>

            <div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: "var(--text-body)",
                  color: "var(--color-text-primary)",
                  marginBottom: "var(--space-sm)",
                }}
              >
                What it can do
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-body)",
                  color: "var(--color-text-secondary)",
                  lineHeight: 1.7,
                }}
              >
                Inbox management, calendar, code execution, multi-channel
                messaging (WhatsApp, Slack, Discord, Gmail, iMessage), and
                custom skills built on demand. It can autonomously execute real
                tasks — not just chat.
              </p>
            </div>

            <div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: "var(--text-body)",
                  color: "var(--color-text-primary)",
                  marginBottom: "var(--space-sm)",
                }}
              >
                What LMS does for you
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-body)",
                  color: "var(--color-text-secondary)",
                  lineHeight: 1.7,
                }}
              >
                Full setup, configuration, skill development, team training, and
                ongoing support. You get a business that operates with an AI
                co-pilot at every level — without the complexity of figuring it
                out yourself.
              </p>
            </div>

            <div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: "var(--text-body)",
                  color: "var(--color-text-primary)",
                  marginBottom: "var(--space-sm)",
                }}
              >
                Who it&apos;s for
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-body)",
                  color: "var(--color-text-secondary)",
                  lineHeight: 1.7,
                }}
              >
                Founders, operators, and small teams who want to move at AI
                speed. If you&apos;re already juggling Slack, email, and
                calendars, OpenClaw is the layer that ties it all together.
              </p>
            </div>

            <div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: "var(--text-body)",
                  color: "var(--color-text-primary)",
                  marginBottom: "var(--space-sm)",
                }}
              >
                What you get
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-body)",
                  color: "var(--color-text-secondary)",
                  lineHeight: 1.7,
                }}
              >
                A persistent AI co-pilot that works across every channel your
                team uses — one agent, one setup, unlimited leverage.
              </p>
            </div>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 rounded-[var(--radius-md)] font-medium transition-all hover:brightness-110 hover:shadow-[var(--shadow-glow)] mt-8"
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
