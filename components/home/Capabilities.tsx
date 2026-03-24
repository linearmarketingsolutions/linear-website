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

export function Capabilities() {
  return (
    <Section id="capabilities">
      <Container as="div">
        <motion.div
          variants={fadeUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          transition={transitionBase}
          className="mb-12"
        >
          <h2 className="font-display font-bold text-text-primary text-[clamp(2rem,3.5vw,40px)] leading-tight mb-4">
            Full-stack operations. Single point of contact.
          </h2>
          <p className="text-text-secondary text-lg max-w-[52ch] leading-relaxed">
            Everything your marketing needs. Nothing it doesn&apos;t.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {CAPABILITIES.map((cap, i) => (
            <motion.div
              key={cap.title}
              variants={fadeUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              transition={{ ...transitionBase, delay: i * 0.06 }}
            >
              <Link
                href="/services"
                className="group relative block rounded-[var(--radius-lg)] p-7 bg-surface-2 border border-border overflow-hidden transition-all duration-300 hover:border-accent/30 hover:shadow-[var(--shadow-glow)] hover:-translate-y-1"
              >
                {/* Top accent line on hover */}
                <span className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent to-accent-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-accent/10 text-accent mb-4">
                  <cap.icon />
                </span>

                <h3 className="font-body font-semibold text-accent text-xl mb-2">
                  {cap.title}
                </h3>

                <p className="text-text-secondary leading-relaxed">
                  {cap.description}
                </p>

                <span className="inline-flex items-center gap-1 mt-4 text-sm text-text-muted group-hover:text-accent transition-colors duration-200">
                  Learn more
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200 group-hover:translate-x-1">
                    <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                  </svg>
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={fadeUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          transition={{ ...transitionBase, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-accent font-medium transition-opacity hover:opacity-80"
          >
            View all capabilities
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </Container>
    </Section>
  );
}

/* ── Icons ────────────────────────────────────────────── */

function ChartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3v18h18" /><path d="M18 17V9" /><path d="M13 17V5" /><path d="M8 17v-3" />
    </svg>
  );
}
function PaletteIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" /><circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
      <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" /><circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.9 0 1.7-.1 2.5-.3" />
    </svg>
  );
}
function CodeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
    </svg>
  );
}
function BotIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="10" rx="2" /><circle cx="12" cy="5" r="2" /><path d="M12 7v4" />
      <circle cx="8" cy="16" r="1" fill="currentColor" /><circle cx="16" cy="16" r="1" fill="currentColor" />
    </svg>
  );
}
function GridIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
    </svg>
  );
}
function BookIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      <path d="M8 7h8" /><path d="M8 11h8" />
    </svg>
  );
}
