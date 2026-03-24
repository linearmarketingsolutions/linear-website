"use client";

import { Container } from "@/components/ui/Container";
import { fadeUp, transitionBase } from "@/lib/animations";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export function FinalCTA() {
  return (
    <section
      id="final-cta"
      className="relative overflow-hidden py-24 md:py-32"
    >
      {/* Background image */}
      <Image
        src="/images/network-bg.webp"
        alt=""
        fill
        className="object-cover opacity-30 pointer-events-none"
      />

      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 50%, rgba(204, 255, 0, 0.06), transparent 60%)",
        }}
      />

      <Container as="div" className="relative z-10 text-center">
        <motion.h2
          variants={fadeUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          transition={transitionBase}
          className="font-display font-bold text-accent leading-tight mb-5"
          style={{ fontSize: "clamp(2.5rem, 4.5vw, 56px)" }}
        >
          Ready to deploy?
        </motion.h2>

        <motion.p
          variants={fadeUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          transition={{ ...transitionBase, delay: 0.05 }}
          className="text-text-secondary text-lg leading-relaxed max-w-[45ch] mx-auto mb-10"
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
            className="inline-flex items-center justify-center px-8 py-4 bg-accent text-bg font-body font-semibold text-lg rounded-[var(--radius-md)] transition-all duration-150 hover:brightness-110 hover:shadow-[var(--shadow-glow)]"
          >
            Begin Your Build
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center justify-center px-8 py-4 font-body font-semibold text-lg text-text-primary border border-accent bg-transparent rounded-[var(--radius-md)] transition-all duration-150 hover:bg-accent/10"
          >
            View Capabilities
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
