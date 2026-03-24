"use client";

import { Container } from "@/components/ui/Container";
import { fadeUp, transitionBase } from "@/lib/animations";
import { motion } from "framer-motion";
import Link from "next/link";

export function FinalCTA() {
  return (
    <section
      id="final-cta"
      className="layout-section relative overflow-hidden"
      style={{ background: "var(--color-bg)" }}
    >
      {/* Ambient glow */}
      <div
        className="absolute pointer-events-none inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, var(--gradient-glow), transparent 70%)",
        }}
      />
      <Container as="div" className="relative z-10">
        <motion.h2
          variants={fadeUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          transition={transitionBase}
          className="gradient-text text-center mb-4"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "clamp(var(--text-h2), 4vw, var(--text-h1))",
            lineHeight: 1.2,
          }}
        >
          Ready to deploy?
        </motion.h2>
        <motion.p
          variants={fadeUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          transition={{ ...transitionBase, delay: 0.05 }}
          className="text-center mb-10"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-body)",
            color: "var(--color-text-secondary)",
            lineHeight: 1.6,
            maxWidth: "45ch",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          One call. No pitch. A clear picture of what&apos;s possible — and a
          timeline to build it.
        </motion.p>
        <motion.div
          variants={fadeUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          transition={{ ...transitionBase, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-4"
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
          <Link
            href="/services"
            className="inline-flex items-center justify-center px-8 py-4 rounded-[var(--radius-md)] font-medium transition-all hover:brightness-110"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 18,
              color: "var(--color-text-primary)",
              border: "1px solid var(--color-accent-primary)",
              background: "transparent",
            }}
          >
            View Capabilities
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
