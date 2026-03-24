"use client";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { fadeUp, transitionBase } from "@/lib/animations";
import { motion } from "framer-motion";
import Link from "next/link";

export function AIEducation() {
  return (
    <Section id="ai-education">
      <Container as="div">
        <motion.div
          variants={fadeUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          transition={transitionBase}
          style={{
            textAlign: "center",
            maxWidth: "60ch",
            margin: "0 auto",
          }}
        >
          <h2
            className="gradient-text"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(var(--text-h3), 4vw, var(--text-h2))",
              marginBottom: "var(--space-lg)",
            }}
          >
            Your team learns to operate on AI.
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-body)",
              color: "var(--color-text-secondary)",
              lineHeight: 1.7,
              marginBottom: "var(--space-xl)",
            }}
          >
            LMS delivers custom training programs, tool-specific onboarding,
            and ongoing AI literacy development. Systems are only as powerful as
            the people running them.
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
            Start training
          </Link>
        </motion.div>
      </Container>
    </Section>
  );
}
