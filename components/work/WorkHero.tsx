"use client";

import { Container } from "@/components/ui/Container";
import { fadeUp, transitionBase } from "@/lib/animations";
import { motion } from "framer-motion";

export function WorkHero() {
  return (
    <section
      id="work-hero"
      className="hero-grid-bg relative overflow-hidden flex items-center min-h-[40vh]"
      style={{ background: "var(--color-bg)" }}
    >
      <div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: "min(50vw, 320px)",
          height: "min(50vw, 320px)",
          right: "-5%",
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
            fontSize: "clamp(2rem, 4vw, 48px)",
            lineHeight: 1.1,
            color: "var(--color-text-primary)",
            marginBottom: "var(--space-md)",
          }}
        >
          Operations deployed.
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
            maxWidth: "52ch",
          }}
        >
          Websites, apps, dashboards, and systems built for clients across
          industries. Real infrastructure. Real outcomes.
        </motion.p>
      </Container>
    </section>
  );
}
