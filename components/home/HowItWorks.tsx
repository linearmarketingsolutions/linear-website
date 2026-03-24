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
          Three steps. Full deployment.
        </motion.h2>

        {/* Desktop: horizontal flow with gradient connector */}
        <div className="hidden md:flex relative items-stretch gap-0">
          <div
            className="absolute top-8 left-[16.66%] right-[16.66%] h-[2px] -z-[0]"
            style={{
              background: "var(--gradient-brand)",
              opacity: 0.6,
            }}
          />
          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              variants={fadeUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              transition={{ ...transitionBase, delay: i * 0.1 }}
              className="flex-1 flex flex-col items-center text-center px-4 relative z-10"
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 14,
                  color: "var(--color-accent-primary)",
                  marginBottom: "var(--space-sm)",
                }}
              >
                Step {step.number}
              </span>
              <h3
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 600,
                  fontSize: "var(--text-h3)",
                  color: "var(--color-text-primary)",
                  marginBottom: "var(--space-md)",
                }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-body)",
                  color: "var(--color-text-secondary)",
                  lineHeight: 1.6,
                  maxWidth: "28ch",
                }}
              >
                {step.body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Mobile: vertical stack */}
        <div className="flex flex-col md:hidden gap-8">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              variants={fadeUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              transition={{ ...transitionBase, delay: i * 0.1 }}
              className="flex gap-4"
            >
              <div
                className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                style={{
                  background: "var(--color-accent-primary)",
                  fontFamily: "var(--font-mono)",
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#09090B",
                }}
              >
                {step.number}
              </div>
              <div>
                <h3
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 600,
                    fontSize: "var(--text-h3)",
                    color: "var(--color-text-primary)",
                    marginBottom: "var(--space-sm)",
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--text-body)",
                    color: "var(--color-text-secondary)",
                    lineHeight: 1.6,
                  }}
                >
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
          className="text-center mt-12"
        >
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
            Begin Your Build
          </Link>
        </motion.div>
      </Container>
    </Section>
  );
}
