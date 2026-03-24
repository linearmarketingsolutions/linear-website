"use client";

import { Container } from "@/components/ui/Container";
import { fadeUp, scaleIn, transitionBase } from "@/lib/animations";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { CountUp } from "./CountUp";

const HEADLINES = [
  "One operator.",
  "Every capability.",
  "No ceiling.",
];

const STATS = [
  { end: 3, prefix: "$", suffix: "M+", label: "Revenue Deployed" },
  { end: 160, suffix: "K+", label: "Systems Online" },
  { end: 50, suffix: "+", label: "Operations Active" },
];

const METRICS = [
  { label: "Conversions", value: "12.4%" },
  { label: "ROAS", value: "3.2x" },
  { label: "Leads", value: "847" },
  { label: "Status", value: "Active" },
];

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-dvh overflow-hidden flex items-center"
    >
      {/* Background image */}
      <Image
        src="/images/hero-bg.webp"
        alt=""
        fill
        priority
        className="object-cover object-center opacity-40 pointer-events-none"
      />

      {/* Dot grid overlay */}
      <div className="absolute inset-0 dot-grid-bg pointer-events-none" />

      {/* Ambient glow blob */}
      <div
        className="absolute pointer-events-none rounded-full w-[min(80vw,700px)] h-[min(80vw,700px)] -right-[10%] top-1/2 -translate-y-1/2 blur-3xl"
        style={{
          background: "radial-gradient(ellipse at center, rgba(204, 255, 0, 0.1), transparent 70%)",
          animation: "glow-blob-breathe 6s ease-in-out infinite",
        }}
      />

      <Container as="div" className="relative z-10 py-32 lg:py-40">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-16 lg:gap-20">
          {/* Left content */}
          <div className="flex flex-col gap-8 w-full lg:max-w-[55%]">
            {/* Headlines */}
            <motion.div
              variants={{ animate: { transition: { staggerChildren: 0.15 } } }}
              initial="initial"
              animate="animate"
              className="flex flex-col gap-1"
            >
              {HEADLINES.map((line, i) => (
                <motion.h1
                  key={i}
                  variants={fadeUp}
                  transition={transitionBase}
                  className="font-display font-bold text-text-primary leading-[1.05]"
                  style={{ fontSize: "clamp(2.75rem, 5.5vw, 76px)" }}
                >
                  {line}
                </motion.h1>
              ))}
            </motion.div>

            {/* Subheadline */}
            <motion.p
              variants={fadeUp}
              initial="initial"
              animate="animate"
              transition={{ ...transitionBase, delay: 0.45 }}
              className="text-text-secondary font-body text-lg lg:text-xl leading-relaxed max-w-[42ch]"
            >
              LMS is an AI-native growth engine. Marketing, development,
              automation, and intelligence — deployed as a single integrated
              system. No team to hire. No agency overhead. Just infrastructure
              that compounds.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              variants={fadeUp}
              initial="initial"
              animate="animate"
              transition={{ ...transitionBase, delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-accent text-bg font-body font-semibold text-lg rounded-[var(--radius-md)] transition-all duration-150 hover:brightness-110 hover:shadow-[var(--shadow-glow)]"
              >
                Start Your Build
              </Link>
              <Link
                href="/work"
                className="inline-flex items-center justify-center px-8 py-4 font-body font-semibold text-lg text-text-primary border border-accent bg-transparent rounded-[var(--radius-md)] transition-all duration-150 hover:bg-accent/10"
              >
                View Operations
              </Link>
            </motion.div>

            {/* Stats bar */}
            <motion.div
              variants={fadeUp}
              initial="initial"
              animate="animate"
              transition={{ ...transitionBase, delay: 0.9 }}
              className="flex flex-wrap gap-10 pt-8 border-t border-border"
            >
              {STATS.map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <span className="font-mono text-accent text-[28px] font-semibold">
                    <CountUp
                      end={stat.end}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                      duration={1800}
                    />
                  </span>
                  <span className="font-body text-text-secondary text-sm">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — floating dashboard card */}
          <motion.div
            variants={scaleIn}
            initial="initial"
            animate="animate"
            transition={{ ...transitionBase, delay: 0.5 }}
            className="hidden lg:block w-full max-w-[400px]"
            style={{ animation: "float 6s ease-in-out infinite" }}
          >
            <div className="gradient-border-card p-6 shadow-[var(--shadow-glow)] backdrop-blur-sm">
              {/* Card header */}
              <div className="flex items-center gap-2 mb-5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-accent-secondary opacity-75" style={{ animation: "pulse-ring 1.5s ease-in-out infinite" }} />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent-secondary" />
                </span>
                <span className="font-mono text-text-muted text-xs tracking-wide">
                  Live metrics
                </span>
              </div>

              {/* Bar chart */}
              <div className="h-24 mb-5 rounded-lg flex items-end gap-1.5 bg-black/30 p-2">
                {[40, 65, 45, 80, 55, 90, 70, 85, 75, 92, 68].map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ delay: 0.8 + i * 0.05, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                    className="flex-1 rounded-sm min-w-[6px] bg-accent opacity-90"
                  />
                ))}
              </div>

              {/* Metrics grid */}
              <div className="grid grid-cols-2 gap-4">
                {METRICS.map((m) => (
                  <div key={m.label} className="p-3 rounded-lg bg-black/20">
                    <div className="font-mono text-text-muted text-[11px] mb-1">
                      {m.label}
                    </div>
                    <div className="font-mono text-text-primary text-sm font-semibold">
                      {m.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
