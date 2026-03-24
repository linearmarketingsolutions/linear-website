"use client";

import { Container } from "@/components/ui/Container";
import { fadeUp, scaleIn, transitionBase } from "@/lib/animations";
import { motion } from "framer-motion";
import Link from "next/link";
import { CountUp } from "./CountUp";

const HEADLINES = [
  "One operator.",
  "Every capability.",
  "No ceiling.",
];

export function Hero() {
  return (
    <section
      id="hero"
      className="hero-grid-bg relative min-h-[100dvh] overflow-hidden flex items-center"
      style={{ background: "var(--color-bg)" }}
    >
      {/* Ambient glow blob — center-right, pulses */}
      <div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: "min(80vw, 600px)",
          height: "min(80vw, 600px)",
          right: "-15%",
          top: "50%",
          transform: "translateY(-50%)",
          background: "var(--gradient-glow)",
          animation: "glow-blob-breathe 6s ease-in-out infinite",
        }}
      />

      <Container as="div" className="relative z-10">
        <div
          className="flex flex-col md:flex-row md:items-center md:justify-between w-full"
          style={{ gap: "var(--space-2xl)" }}
        >
        <div
          className="flex flex-col w-full md:max-w-[55%]"
          style={{ gap: "var(--space-lg)" }}
        >
          <motion.div
            variants={{
              animate: {
                transition: { staggerChildren: 0.15 },
              },
            }}
            initial="initial"
            animate="animate"
            className="flex flex-col"
            style={{ gap: 8 }}
          >
            {HEADLINES.map((line, i) => (
              <motion.h1
                key={i}
                variants={fadeUp}
                transition={transitionBase}
                className="text-white"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "clamp(2.5rem, 5vw, 72px)",
                  lineHeight: 1.1,
                }}
              >
                {line}
              </motion.h1>
            ))}
          </motion.div>

          <motion.p
            variants={fadeUp}
            initial="initial"
            animate="animate"
            transition={{ ...transitionBase, delay: 0.45 }}
            style={{
              color: "var(--color-text-secondary)",
              fontFamily: "var(--font-body)",
              fontWeight: 400,
              fontSize: 20,
              lineHeight: 1.5,
              maxWidth: "42ch",
            }}
          >
            LMS is an AI-native growth engine. Marketing, development,
            automation, and intelligence — deployed as a single integrated
            system. No team to hire. No agency overhead. Just infrastructure
            that compounds.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="initial"
            animate="animate"
            transition={{ ...transitionBase, delay: 0.6 }}
            className="flex flex-wrap gap-4"
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
              Start Your Build
            </Link>
            <Link
              href="/work"
              className="inline-flex items-center justify-center px-8 py-4 rounded-[var(--radius-md)] font-medium transition-all hover:brightness-110"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 18,
                color: "var(--color-text-primary)",
                border: "1px solid var(--color-accent-primary)",
                background: "transparent",
              }}
            >
              View Operations
            </Link>
          </motion.div>

          {/* Animated stat bar */}
          <motion.div
            variants={fadeUp}
            initial="initial"
            animate="animate"
            transition={{ ...transitionBase, delay: 0.9 }}
            className="flex flex-wrap gap-8 pt-6"
            style={{ borderTop: "1px solid var(--color-border)" }}
          >
            <div className="flex flex-col">
              <span
                className="gradient-text"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 28,
                  fontWeight: 600,
                }}
              >
                <CountUp end={3} prefix="$" suffix="M+" duration={1800} />
              </span>
              <span
                style={{
                  color: "var(--color-text-secondary)",
                  fontFamily: "var(--font-body)",
                  fontSize: 14,
                }}
              >
                Revenue Deployed
              </span>
            </div>
            <div className="flex flex-col">
              <span
                className="gradient-text"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 28,
                  fontWeight: 600,
                }}
              >
                <CountUp end={160} suffix="K+" duration={1800} />
              </span>
              <span
                style={{
                  color: "var(--color-text-secondary)",
                  fontFamily: "var(--font-body)",
                  fontSize: 14,
                }}
              >
                Systems Online
              </span>
            </div>
            <div className="flex flex-col">
              <span
                className="gradient-text"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 28,
                  fontWeight: 600,
                }}
              >
                <CountUp end={50} suffix="+" duration={1800} />
              </span>
              <span
                style={{
                  color: "var(--color-text-secondary)",
                  fontFamily: "var(--font-body)",
                  fontSize: 14,
                }}
              >
                Operations Active
              </span>
            </div>
          </motion.div>
        </div>

        {/* Mock dashboard card — right side */}
        <motion.div
          variants={scaleIn}
          initial="initial"
          animate="animate"
          transition={{ ...transitionBase, delay: 0.5 }}
          className="hidden md:block w-full max-w-[380px] rounded-[var(--radius-lg)] p-5"
          style={{
            background: "var(--color-surface-2)",
            border: "1px solid transparent",
            backgroundImage:
              "linear-gradient(var(--color-surface-2), var(--color-surface-2)), var(--gradient-brand)",
            backgroundOrigin: "border-box",
            backgroundClip: "padding-box, border-box",
            boxShadow: "var(--shadow-glow)",
          }}
        >
          <div className="flex items-center gap-2 mb-4">
            <span
              className="w-2 h-2 rounded-full"
              style={{ background: "var(--color-accent-secondary)" }}
            />
            <span
              style={{
                color: "var(--color-text-muted)",
                fontFamily: "var(--font-mono)",
                fontSize: 12,
              }}
            >
              Live metrics
            </span>
          </div>
          {/* Mini line chart placeholder */}
          <div
            className="h-20 mb-4 rounded flex items-end gap-1"
            style={{ background: "rgba(0,0,0,0.2)" }}
          >
            {[40, 65, 45, 80, 55, 90, 70, 85, 75].map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ delay: 0.7 + i * 0.05, duration: 0.4 }}
                className="flex-1 rounded-sm min-w-[6px]"
                style={{
                  background: "var(--color-accent-primary)",
                  opacity: 0.9,
                }}
              />
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Conversions", value: "12.4%" },
              { label: "ROAS", value: "3.2x" },
              { label: "Leads", value: "847" },
              { label: "Status", value: "Active" },
            ].map((m, i) => (
              <div key={i}>
                <div
                  style={{
                    color: "var(--color-text-muted)",
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                  }}
                >
                  {m.label}
                </div>
                <div
                  style={{
                    color: "var(--color-text-primary)",
                    fontFamily: "var(--font-mono)",
                    fontSize: 14,
                    fontWeight: 600,
                  }}
                >
                  {m.value}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
        </div>
      </Container>
    </section>
  );
}
