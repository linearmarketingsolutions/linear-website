"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

const TABS = [
  {
    number: "10+",
    label: "Active engagements",
    body: "Client systems running across distribution, energy, fitness, tattoo, e-commerce, and education.",
  },
  {
    number: "7",
    label: "Verticals deployed",
    body: "Industries with shipped infrastructure — fiber-optic distribution, clean-energy research, fitness, tattoo, e-commerce, exam-prep education, professional services.",
  },
  {
    number: "4",
    label: "CRM platforms wired",
    body: "GoHighLevel, HubSpot, Airtable, and custom-built sales pipelines integrated end-to-end.",
  },
  {
    number: "90+",
    label: "Lighthouse baseline",
    body: "Performance score floor on every shipped Next.js production site.",
  },
  {
    number: "200+",
    label: "Sources mapped",
    body: "Funding-source intelligence, distributor audits, and product-spec systems delivered on research engagements.",
  },
  {
    number: "SoCal",
    label: "Service area",
    body: "Los Angeles, the Inland Empire, Orange County, and San Diego.",
  },
];

const ROTATE_MS = 4500;

export function HeroStatTabs() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setActive((a) => (a + 1) % TABS.length);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, [paused]);

  const select = useCallback((i: number) => setActive(i), []);
  const tab = TABS[active];

  // Pause auto-rotation on hover OR keyboard focus inside the region
  const handleFocus = useCallback(() => setPaused(true), []);
  const handleBlur = useCallback((e: React.FocusEvent<HTMLDivElement>) => {
    // Only resume when focus has fully left the region (not jumping between buttons)
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
      setPaused(false);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="max-w-[460px]"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={handleFocus}
      onBlur={handleBlur}
      role="region"
      aria-roledescription="carousel"
      aria-label="Firm stats — auto-rotating, pauses on hover or focus"
      aria-live="polite"
    >
      {/* Indicator buttons — plain controls, not tabs */}
      <div className="flex gap-1.5 mb-7">
        {TABS.map((t, i) => (
          <button
            key={t.label}
            type="button"
            aria-current={i === active ? "true" : undefined}
            aria-label={`Show stat ${i + 1} of ${TABS.length}: ${t.label}`}
            onClick={() => select(i)}
            className={`h-[3px] transition-all duration-500 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C3AED]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAFAF9] ${
              i === active
                ? "w-10 bg-[#7C3AED]"
                : "w-5 bg-[#0F0A1F]/15 hover:bg-[#0F0A1F]/30"
            }`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="font-display font-black text-[#0F0A1F] leading-[0.9] tracking-[-0.04em]"
            style={{ fontSize: "clamp(3rem, 6vw, 84px)" }}
          >
            {tab.number}
          </div>
          <div className="font-mono text-[#7C3AED] text-[10px] tracking-[0.3em] uppercase mt-3">
            {tab.label}
          </div>
          <p className="text-[#1F1147]/75 text-sm md:text-base leading-relaxed mt-4 max-w-[38ch]">
            {tab.body}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
