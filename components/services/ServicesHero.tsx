"use client";

import { Container } from "@/components/ui/Container";
import { fadeUp, transitionBase } from "@/lib/animations";
import { motion } from "framer-motion";

export function ServicesHero() {
  return (
    <section
      id="services-hero"
      className="hero-grid-bg relative overflow-hidden flex items-center min-h-[60vh] bg-bg"
    >
      {/* Subtle gradient glow */}
      <div
        className="absolute pointer-events-none rounded-full w-[min(60vw,400px)] h-[min(60vw,400px)] -right-[10%] top-1/2 -translate-y-1/2"
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
          className="font-display font-bold text-text-primary leading-[1.1] mb-6"
          style={{ fontSize: "clamp(2.5rem, 5vw, 56px)" }}
        >
          Every capability. One operator.
        </motion.h1>
        <motion.p
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ ...transitionBase, delay: 0.1 }}
          className="text-text-secondary text-lg leading-relaxed max-w-[52ch]"
        >
          LMS is not a vendor. LMS is the operating layer your business has been
          missing. From brand strategy to AI agent development — systems that
          move companies forward.
        </motion.p>
      </Container>
    </section>
  );
}
