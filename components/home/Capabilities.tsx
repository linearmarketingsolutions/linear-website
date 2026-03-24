"use client";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { fadeUp, transitionBase } from "@/lib/animations";
import { motion } from "framer-motion";
import Link from "next/link";

const CAPABILITIES = [
  {
    title: "Growth Engine",
    description:
      "Full-funnel strategy, brand systems, campaign architecture, market intelligence.",
    icon: ChartIcon,
  },
  {
    title: "Content Pipeline",
    description:
      "Video, copy, design, social — AI-assisted production at scale.",
    icon: PaletteIcon,
  },
  {
    title: "Web & App Development",
    description:
      "Production-grade websites, web apps, dashboards, UX/UI. Hard-coded, not templated.",
    icon: CodeIcon,
  },
  {
    title: "AI Infrastructure",
    description:
      "Custom agents, workflow automation, CRM integration, tool development.",
    icon: BotIcon,
  },
  {
    title: "Business Operations",
    description:
      "CRM systems, analytics dashboards, SaaS development, process architecture.",
    icon: GridIcon,
  },
  {
    title: "AI Education",
    description:
      "Team training, tool onboarding, operational integration. Your org learns to run on AI.",
    icon: BookIcon,
  },
];

function ChartIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3v18h18" />
      <path d="M18 17V9" />
      <path d="M13 17V5" />
      <path d="M8 17v-3" />
    </svg>
  );
}
function PaletteIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="13.5" cy="6.5" r="0.5" />
      <circle cx="17.5" cy="10.5" r="0.5" />
      <circle cx="8.5" cy="7.5" r="0.5" />
      <circle cx="6.5" cy="12.5" r="0.5" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.9 0 1.7-.1 2.5-.3" />
    </svg>
  );
}
function CodeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}
function BotIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="10" rx="2" />
      <circle cx="12" cy="5" r="2" />
      <path d="M12 7v4" />
      <line x1="8" y1="16" x2="8" y2="16" />
      <line x1="16" y1="16" x2="16" y2="16" />
    </svg>
  );
}
function GridIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  );
}
function BookIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      <path d="M8 7h8" />
      <path d="M8 11h8" />
    </svg>
  );
}

export function Capabilities() {
  return (
    <Section id="capabilities">
      <Container as="div">
        <motion.h2
          variants={fadeUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          transition={transitionBase}
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "var(--text-h2)",
            color: "var(--color-text-primary)",
            marginBottom: "var(--space-xl)",
          }}
        >
          Full-stack operations. Single point of contact.
        </motion.h2>
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          style={{ gap: "var(--space-lg)" }}
        >
          {CAPABILITIES.map((cap, i) => (
            <motion.div
              key={cap.title}
              variants={fadeUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              transition={{ ...transitionBase, delay: i * 0.05 }}
            >
              <Link
                href="/services"
                className="group block rounded-[var(--radius-lg)] p-6 transition-all duration-300 hover:shadow-[var(--shadow-glow)] hover:-translate-y-0.5 border border-transparent relative overflow-hidden"
                style={{
                  background: "var(--color-surface-2)",
                  borderColor: "var(--color-border)",
                }}
              >
                <span
                  className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: "var(--gradient-brand)",
                  }}
                />
                <span
                  className="inline-block mb-3 opacity-80"
                  style={{ color: "var(--color-accent-primary)" }}
                >
                  <cap.icon />
                </span>
                <h3
                  className="gradient-text mb-2"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 600,
                    fontSize: "var(--text-h3)",
                  }}
                >
                  {cap.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--text-body)",
                    color: "var(--color-text-secondary)",
                    lineHeight: 1.5,
                  }}
                >
                  {cap.description}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
        <motion.div
          variants={fadeUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          transition={{ ...transitionBase, delay: 0.3 }}
          className="text-center mt-10"
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 gradient-text font-medium transition-opacity hover:opacity-90"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-body)",
            }}
          >
            View all capabilities →
          </Link>
        </motion.div>
      </Container>
    </Section>
  );
}
