"use client";

import { Container } from "@/components/ui/Container";
import { fadeUp, transitionBase } from "@/lib/animations";
import { motion } from "framer-motion";

export function AIToolsHero() {
  return (
    <section
      id="ai-tools-hero"
      className="hero-grid-bg relative overflow-hidden flex items-center min-h-[50vh]"
      style={{ background: "var(--color-bg)" }}
    >
      <div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: "min(55vw, 380px)",
          height: "min(55vw, 380px)",
          right: "-8%",
          top: "50%",
          transform: "translateY(-50%)",
          background: "var(--gradient-glow)",
          animation: "glow-blob-breathe 6s ease-in-out infinite",
        }}
      />
      <Container as="div" className="relative z-10">
        <motion.h1
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={transitionBase}
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "clamp(2.25rem, 4.5vw, 52px)",
            lineHeight: 1.1,
            color: "var(--color-text-primary)",
            marginBottom: "var(--space-md)",
          }}
        >
          AI isn&apos;t the future. It&apos;s the operating layer.
        </motion.h1>
        <motion.p
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ ...transitionBase, delay: 0.08 }}
          style={{
            color: "var(--color-text-secondary)",
            fontFamily: "var(--font-body)",
            fontWeight: 400,
            fontSize: 18,
            lineHeight: 1.6,
            maxWidth: "55ch",
          }}
        >
          LMS doesn&apos;t just use AI — we deploy it as infrastructure.
          Here&apos;s what that means for your business.
        </motion.p>
      </Container>
    </section>
  );
}
