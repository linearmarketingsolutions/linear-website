"use client";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { fadeUp, transitionBase } from "@/lib/animations";
import { motion } from "framer-motion";

const OLD_WAY = [
  "Teams of 12 doing the work of one system.",
  "Agencies billing hours instead of shipping outcomes.",
  "Freelancers who see one piece, never the whole machine.",
  "The result: six figures spent. No operating system built.",
];

const LMS_WAY = [
  "One integrated operator. Strategy through deployment.",
  "AI at every layer — content, automation, research, code.",
  "Systems built once, compounding indefinitely.",
  "Full transparency. Measurable outcomes. No overhead.",
];

export function Repositioning() {
  return (
    <Section id="repositioning">
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
            The old model is dead.
          </h2>
          <p className="text-text-secondary text-lg max-w-[52ch] leading-relaxed">
            The marketing industry runs on bloat. We built the replacement.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Old Way */}
          <motion.div
            variants={fadeUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            transition={{ ...transitionBase, delay: 0.1 }}
            className="rounded-[var(--radius-lg)] p-8 bg-surface-1 border border-border"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-red-500/10 text-red-400 text-sm font-mono">
                ✕
              </span>
              <h3 className="font-body font-semibold text-text-muted text-xl">
                The Old Way
              </h3>
            </div>
            <ul className="flex flex-col gap-4">
              {OLD_WAY.map((item, i) => (
                <li key={i} className="flex gap-3 text-text-secondary leading-relaxed">
                  <span className="text-text-muted mt-0.5 shrink-0">—</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* LMS Way */}
          <motion.div
            variants={fadeUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            transition={{ ...transitionBase, delay: 0.2 }}
            className="gradient-border-card p-8 shadow-[var(--shadow-glow)]"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-accent/10 text-accent text-sm font-mono font-bold">
                ✓
              </span>
              <h3 className="font-body font-semibold text-accent text-xl">
                The LMS Way
              </h3>
            </div>
            <ul className="flex flex-col gap-4">
              {LMS_WAY.map((item, i) => (
                <li key={i} className="flex gap-3 text-text-primary leading-relaxed">
                  <span className="text-accent mt-0.5 shrink-0 font-bold">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
