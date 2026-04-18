"use client";

/**
 * Footer — v5 restyle.
 *
 * Big oversized Fraunces italic tagline behind a CMCC-style stacked block
 * signature. Bottom bar is terminal chrome — mono, metadata, no sell copy.
 */

import Link from "next/link";
import { MetadataLabel } from "@/components/v5/MetadataLabel";

const FOOTER_LINKS = [
  { href: "/services", label: "Services" },
  { href: "/services/growth-engine", label: "Growth" },
  { href: "/services/ai-infrastructure", label: "AI Infra" },
  { href: "/services/web-development", label: "Web Dev" },
  { href: "/work", label: "Work" },
  { href: "/ai-tools", label: "Platform" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

function StackSignature() {
  // CMCC-style 7-block stack, each block slightly smaller — reads as a
  // geometric brand artifact, not decoration.
  return (
    <div
      className="flex flex-col items-start gap-1"
      aria-hidden
      role="img"
      aria-label="LMS signature mark"
    >
      {[100, 88, 76, 64, 52, 40, 28].map((width, i) => (
        <div
          key={i}
          className="h-2"
          style={{
            width: `${width}px`,
            background:
              i === 0
                ? "var(--color-v5-accent-glow)"
                : "rgba(245, 242, 238, 0.12)",
            opacity: 1 - i * 0.08,
          }}
        />
      ))}
    </div>
  );
}

export function Footer() {
  return (
    <footer className="v5-dark relative mt-auto overflow-hidden border-t" style={{ borderColor: "var(--color-border)" }}>
      <div className="px-6 md:px-12 lg:px-20 xl:px-32">
        {/* Big ghost tagline */}
        <div className="py-16 md:py-28 relative">
          <p
            className="v5-display"
            style={{
              fontSize: "clamp(3rem, 9vw, 11rem)",
              color: "rgba(245, 242, 238, 0.06)",
              lineHeight: 0.9,
              letterSpacing: "-0.03em",
              fontStyle: "italic",
              fontVariationSettings: '"SOFT" 100, "WONK" 1, "opsz" 144',
            }}
          >
            The operator.
          </p>
        </div>

        {/* Middle band — signature + address + links */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 py-10 border-t" style={{ borderColor: "var(--color-border)" }}>
          <div className="md:col-span-4 flex flex-col gap-6">
            <StackSignature />
            <div>
              <p className="v5-label mb-2" style={{ color: "var(--color-text-muted)" }}>
                HQ · RANCHO CUCAMONGA · CA
              </p>
              <p
                className="v5-mono text-sm"
                style={{ color: "var(--color-text-primary)" }}
              >
                info@linearmarketingsolutions.com
              </p>
              <p
                className="v5-mono text-sm mt-1"
                style={{ color: "var(--color-text-secondary)" }}
              >
                +1 (928) 302-4852
              </p>
            </div>
          </div>

          <nav
            className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-y-3 gap-x-6"
            aria-label="Footer"
          >
            {FOOTER_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="v5-mono text-xs tracking-[0.2em] uppercase transition-colors duration-300"
                style={{ color: "var(--color-text-secondary)" }}
              >
                <span style={{ color: "var(--color-v5-accent-glow)", opacity: 0.6 }}>
                  →
                </span>{" "}
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom bar — metadata chrome */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 py-8 border-t" style={{ borderColor: "var(--color-border)" }}>
          <div className="flex flex-wrap items-center gap-4">
            <MetadataLabel output={100} version="v5.0.0" />
            <span className="v5-label" style={{ color: "var(--color-text-muted)" }}>
              · &copy; {new Date().getFullYear()} LMS
            </span>
          </div>
          <p
            className="v5-mono text-xs italic"
            style={{ color: "var(--color-text-muted)" }}
          >
            Built by AI. Directed by one.
          </p>
        </div>
      </div>
    </footer>
  );
}
