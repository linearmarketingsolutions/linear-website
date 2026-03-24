"use client";

import { Container } from "@/components/ui/Container";
import { fadeUp, transitionBase } from "@/lib/animations";
import { motion } from "framer-motion";

export function WorkHero() {
  return (
    <section
      id="work-hero"
      className="hero-grid-bg relative overflow-hidden flex items-center min-h-[40vh] bg-bg"
    >
      <div
        className="absolute pointer-events-none rounded-full w-[min(50vw,320px)] h-[min(50vw,320px)] -right-[5%] top-1/2 -translate-y-1/2"
        style={{
          background: "radial-gradient(ellipse at center, rgba(204, 255, 0, 0.08), transparent 70%)",
          animation: "glow-blob-breathe 6s ease-in-out infinite",
        }}
      />
      <Container as="div" className="relative z-10 py-32">
        <motion.h1
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={transitionBase}
          className="font-display font-bold text-text-primary leading-[1.1] mb-4"
          style={{ fontSize: "clamp(2rem, 4vw, 48px)" }}
        >
          Operations deployed.
        </motion.h1>
        <motion.p
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ ...transitionBase, delay: 0.08 }}
          className="text-text-secondary text-lg leading-relaxed max-w-[52ch]"
        >
          Websites, apps, dashboards, and systems built for clients across
          industries. Real infrastructure. Real outcomes.
        </motion.p>
      </Container>
    </section>
  );
}
