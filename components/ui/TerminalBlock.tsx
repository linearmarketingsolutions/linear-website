"use client";

import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

type TerminalLine = {
  type: "command" | "output" | "success" | "accent";
  text: string;
  delay?: number;
};

type TerminalBlockProps = {
  lines: TerminalLine[];
  /** Title shown in terminal bar (default "terminal") */
  title?: string;
  className?: string;
  /** Typing speed in ms per character (default 20) */
  typeSpeed?: number;
};

/**
 * Terminal/console block (inspired by kprverse.com).
 * Lines type themselves out when scrolled into view.
 * Blinking caret, colored output, monospace everything.
 */
export function TerminalBlock({
  lines,
  title = "terminal",
  className = "",
  typeSpeed = 20,
}: TerminalBlockProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleLines, setVisibleLines] = useState<{ text: string; type: string }[]>([]);
  const [currentChar, setCurrentChar] = useState(0);
  const [currentLine, setCurrentLine] = useState(0);
  const [started, setStarted] = useState(false);

  // Trigger on scroll
  useGSAP(() => {
    if (!containerRef.current) return;

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 80%",
      once: true,
      onEnter: () => setStarted(true),
    });
  });

  // Type effect
  useEffect(() => {
    if (!started || currentLine >= lines.length) return;

    const line = lines[currentLine];
    const delay = currentChar === 0 ? (line.delay ?? 200) : typeSpeed;

    const timer = setTimeout(() => {
      if (currentChar <= line.text.length) {
        setVisibleLines((prev) => {
          const updated = [...prev];
          updated[currentLine] = {
            text: line.text.slice(0, currentChar),
            type: line.type,
          };
          return updated;
        });
        setCurrentChar((c) => c + 1);
      } else {
        setCurrentLine((l) => l + 1);
        setCurrentChar(0);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [started, currentChar, currentLine, lines, typeSpeed]);

  const colorMap: Record<string, string> = {
    command: "text-text-primary",
    output: "text-text-secondary",
    success: "text-accent",
    accent: "text-accent-secondary",
  };

  return (
    <div
      ref={containerRef}
      className={`rounded-[var(--radius-lg)] overflow-hidden border border-border bg-[#0c0c0e] ${className}`}
    >
      {/* Terminal bar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-surface-1 border-b border-border">
        <span className="w-3 h-3 rounded-full bg-red-500/60" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
        <span className="w-3 h-3 rounded-full bg-green-500/60" />
        <span className="font-mono text-text-muted text-xs ml-2">{title}</span>
      </div>

      {/* Terminal body */}
      <div className="p-5 font-mono text-sm leading-relaxed min-h-[200px]">
        {visibleLines.map((line, i) => (
          <div key={i} className={`${colorMap[line.type] ?? "text-text-secondary"} mb-1`}>
            {line.type === "command" && (
              <span className="text-accent mr-2">$</span>
            )}
            {line.text}
            {i === currentLine && currentLine < lines.length && (
              <span className="inline-block w-2 h-4 bg-accent ml-0.5 animate-[cursor-blink_1s_steps(2)_infinite] align-middle" />
            )}
          </div>
        ))}
        {currentLine >= lines.length && (
          <div className="mt-1">
            <span className="text-accent mr-2">$</span>
            <span className="inline-block w-2 h-4 bg-accent ml-0.5 animate-[cursor-blink_1s_steps(2)_infinite] align-middle" />
          </div>
        )}
      </div>
    </div>
  );
}
