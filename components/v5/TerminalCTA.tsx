"use client";

/**
 * TerminalCTA — the "CTA is a curl command" treatment.
 *
 * Replaces "Start your build" buttons with a copy-able command block.
 * Click to copy; animated check state on success. No sales pressure,
 * reader sets the pace. Pairs with a secondary inline link for the
 * traditional clickable path.
 */

import Link from "next/link";
import { useState } from "react";

type TerminalCTAProps = {
  command: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  className?: string;
};

export function TerminalCTA({
  command,
  secondaryLabel,
  secondaryHref,
  className = "",
}: TerminalCTAProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      // clipboard blocked — silent, the link is the fallback
    }
  }

  return (
    <div className={`flex flex-col sm:flex-row items-start sm:items-center gap-4 ${className}`}>
      <button
        type="button"
        onClick={handleCopy}
        className="group flex items-center gap-3 px-5 py-3 rounded-full border transition-colors duration-200"
        style={{
          borderColor: "var(--color-border)",
          background: "rgba(245, 242, 238, 0.02)",
          fontFamily: "var(--font-mono-v5)",
          fontSize: "14px",
        }}
        aria-label={`Copy install command: ${command}`}
      >
        <span
          className="opacity-60 text-xs tracking-widest uppercase"
          style={{ color: "var(--color-text-muted)" }}
        >
          ›
        </span>
        <span
          className="font-medium"
          style={{ color: "var(--color-text-primary)" }}
        >
          {command}
        </span>
        <span
          className="ml-2 text-xs tracking-widest uppercase transition-opacity duration-200"
          style={{
            color: copied
              ? "var(--color-v5-accent-glow)"
              : "var(--color-text-muted)",
            opacity: copied ? 1 : 0.55,
          }}
        >
          {copied ? "COPIED" : "COPY"}
        </span>
      </button>

      {secondaryLabel && secondaryHref && (
        <Link
          href={secondaryHref}
          className="v5-mono text-sm tracking-wider inline-flex items-center gap-2 transition-opacity duration-200 hover:opacity-100"
          style={{
            color: "var(--color-text-secondary)",
            opacity: 0.72,
          }}
        >
          {secondaryLabel}
          <span aria-hidden>→</span>
        </Link>
      )}
    </div>
  );
}
