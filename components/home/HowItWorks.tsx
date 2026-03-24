"use client";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { fadeUp, transitionBase } from "@/lib/animations";
import { motion } from "framer-motion";
import Link from "next/link";

const STEPS = [
  {
    number: "01",
    title: "Discovery",
    body: "A 30-minute call. We map your business, identify gaps, and determine if LMS is the right fit. No pitch. Just signal.",
  },
  {
    number: "02",
    title: "Architecture",
    body: "We design your operating system — marketing, technology, automation, and growth. You approve the blueprint before anything is built.",
  },
  {
    number: "03",
    title: "Deployment",
    body: "We build, launch, and optimize. Weekly reporting. Full transparency. Systems that compound from day one.",
  },
];

export function HowItWorks() {
  return (
    <Section id="how-it-works">
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
            Three steps. Full deployment.
          </h2>
        </motion.div>

        {/* Desktop: horizontal flow */}
        <div className="hidden md:grid md:grid-cols-3 gap-0 relative">
          {/* Connector line */}
          <div className="absolute top-12 left-[16%] right-[16%] h-px bg-gradient-to-r from-accent/60 via-accent to-accent/60" />

          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              variants={fadeUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              transition={{ ...transitionBase, delay: i * 0.12 }}
              className="flex flex-col items-center text-center px-8 relative z-10"
            >
              {/* Step number badge */}
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent text-bg font-mono text-sm font-bold mb-6 shadow-[var(--shadow-glow)]">
                {step.number}
              </div>

              <h3 className="font-body font-semibold text-text-primary text-xl mb-3">
                {step.title}
              </h3>

              <p className="text-text-secondary leading-relaxed max-w-[28ch]">
                {step.body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Mobile: vertical timeline */}
        <div className="flex flex-col md:hidden gap-0 relative">
          {/* Vertical connector */}
          <div className="absolute top-6 bottom-6 left-5 w-px bg-gradient-to-b from-accent/60 via-accent to-accent/60" />

          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              variants={fadeUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              transition={{ ...transitionBase, delay: i * 0.1 }}
              className="flex gap-6 py-6 relative"
            >
              <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-accent text-bg font-mono text-xs font-bold z-10 shadow-[var(--shadow-glow)]">
                {step.number}
              </div>
              <div>
                <h3 className="font-body font-semibold text-text-primary text-xl mb-2">
                  {step.title}
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  {step.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={fadeUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          transition={{ ...transitionBase, delay: 0.4 }}
          className="text-center mt-14"
        >
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 bg-accent text-bg font-body font-semibold text-lg rounded-[var(--radius-md)] transition-all duration-150 hover:brightness-110 hover:shadow-[var(--shadow-glow)]"
          >
            Begin Your Build
          </Link>
        </motion.div>
      </Container>
    </Section>
  );
}
