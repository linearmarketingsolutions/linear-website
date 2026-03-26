"use client";

import { useRef } from "react";
import { AI_STACK } from "./aiStackData";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const TOOL_COLORS: Record<string, string> = {
  claude: "#D97706",
  openclaw: "#8B5CF6",
  chatgpt: "#10A37F",
  cursor: "#8B5CF6",
  make: "#6366F1",
  framer: "#0099FF",
  elevenlabs: "#F472B6",
  midjourney: "#E879F9",
  perplexity: "#22D3EE",
};

const TOOL_LETTERS: Record<string, string> = {
  claude: "C",
  openclaw: "OC",
  chatgpt: "G",
  cursor: "Cu",
  make: "M",
  framer: "F",
  elevenlabs: "11",
  midjourney: "MJ",
  perplexity: "P",
};

export function AIStackGrid() {
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll("[data-tool-card]");

    gsap.from(cards, {
      y: 50,
      opacity: 0,
      scale: 0.95,
      duration: 0.6,
      stagger: 0.06,
      ease: "power3.out",
      scrollTrigger: {
        trigger: gridRef.current,
        start: "top 80%",
        once: true,
      },
    });
  });

  return (
    <div
      ref={gridRef}
      className="grid gap-5"
      style={{
        gridTemplateColumns: "repeat(auto-fill, minmax(min(280px, 100%), 1fr))",
      }}
    >
      {AI_STACK.map((tool) => {
        const color = TOOL_COLORS[tool.id] ?? "#8B5CF6";
        const letter = TOOL_LETTERS[tool.id] ?? tool.name.charAt(0);

        return (
          <div
            key={tool.id}
            data-tool-card
            className="group relative rounded-2xl p-6 bg-surface-1 border border-border shadow-[var(--shadow-card)] overflow-hidden transition-all duration-300 hover:border-accent/30 hover:shadow-lg"
          >
            {/* Color accent line on top */}
            <div
              className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: color }}
            />

            {/* Logo badge */}
            <div
              className="flex items-center justify-center w-12 h-12 rounded-xl mb-4 font-mono font-bold text-sm"
              style={{
                background: `${color}15`,
                color: color,
                border: `1px solid ${color}30`,
              }}
            >
              {letter}
            </div>

            <h3 className="font-display font-bold text-text-primary text-lg mb-2">
              {tool.name}
            </h3>

            <p className="font-body text-text-secondary text-sm leading-relaxed">
              {tool.description}
            </p>
          </div>
        );
      })}
    </div>
  );
}
