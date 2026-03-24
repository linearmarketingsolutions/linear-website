"use client";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { fadeUp, transitionBase } from "@/lib/animations";
import { motion } from "framer-motion";

const FIT_ITEMS = [
  "You need marketing, technology, and AI deployed as one system.",
  "You're done paying for strategy that never ships.",
  "You want infrastructure that runs without daily management.",
  "You're ready to operate like a funded company — without the overhead.",
  "You want a partner accountable to outcomes, not hours.",
];

export function WhoWeWorkWith() {
  return (
    <Section id="who-we-work-with">
      <Container as="div">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left — text content */}
          <motion.div
            variants={fadeUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            transition={transitionBase}
          >
            <h2 className="font-display font-bold text-text-primary text-[clamp(2rem,3.5vw,40px)] leading-tight mb-4">
              Built for operators.
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed max-w-[50ch]">
              LMS deploys for founders, operators, and growth-stage companies done
              waiting for results. From first marketing system to multi-location
              scale — execution without bureaucracy.
            </p>
          </motion.div>

          {/* Right — fit criteria card */}
          <motion.div
            variants={fadeUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            transition={{ ...transitionBase, delay: 0.15 }}
            className="gradient-border-card p-8 shadow-[var(--shadow-glow)]"
          >
            <h3 className="font-body font-semibold text-text-primary text-xl mb-6">
              You&apos;re a fit if:
            </h3>
            <ul className="flex flex-col gap-4">
              {FIT_ITEMS.map((item, i) => (
                <motion.li
                  key={i}
                  variants={fadeUp}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  transition={{ ...transitionBase, delay: 0.2 + i * 0.06 }}
                  className="flex gap-3 items-start text-text-primary leading-relaxed"
                >
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-accent/15 text-accent text-xs font-bold shrink-0 mt-0.5">
                    ✓
                  </span>
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
