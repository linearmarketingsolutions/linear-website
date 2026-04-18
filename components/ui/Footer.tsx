"use client";

/**
 * Footer — v6 restyle.
 *
 * Ghost Geist italic tagline, CMCC 7-block stack signature, directory-style
 * footer nav, earmark metadata chrome. Every link gets the → prefix so the
 * whole footer reads as a terminal manifest.
 */

import Link from "next/link";
import { Earmark } from "@/components/v6/Earmark";

const FOOTER_LINKS = [
  { href: "/services", label: "Services" },
  { href: "/services/growth-engine", label: "Growth OS" },
  { href: "/services/content-pipeline", label: "Content OS" },
  { href: "/services/web-development", label: "Web Dev" },
  { href: "/services/ai-infrastructure", label: "AI Infra" },
  { href: "/services/business-operations", label: "Ops" },
  { href: "/services/ai-education", label: "Education" },
  { href: "/work", label: "Work" },
  { href: "/ai-tools", label: "Platform" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

function StackSignature() {
  // CMCC-style 7-block stack descending in width
  return (
    <div className="flex flex-col items-start gap-1" aria-hidden role="img" aria-label="LMS signature mark">
      {[100, 88, 76, 64, 52, 40, 28].map((width, i) => (
        <div
          key={i}
          className="h-2"
          style={{
            width: `${width}px`,
            background:
              i === 0
                ? "var(--v6-accent-hot)"
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
    <footer
      className="v6-dark relative mt-auto overflow-hidden border-t"
      style={{ borderColor: "var(--v6-border)" }}
    >
      <div className="absolute inset-0 v6-grid-bg opacity-20 pointer-events-none" aria-hidden />

      <div className="relative px-6 md:px-12 lg:px-20 xl:px-32">
        {/* Big ghost tagline */}
        <div className="py-16 md:py-28">
          <p
            className="v6-display-tight"
            style={{
              fontSize: "clamp(3rem, 10vw, 12rem)",
              color: "rgba(245, 242, 238, 0.055)",
              lineHeight: 0.9,
              letterSpacing: "-0.035em",
              fontStyle: "italic",
            }}
          >
            One operator.
          </p>
          <p
            className="v6-display-tight mt-[-0.08em]"
            style={{
              fontSize: "clamp(3rem, 10vw, 12rem)",
              color: "rgba(124, 58, 237, 0.14)",
              lineHeight: 0.9,
              letterSpacing: "-0.035em",
              fontStyle: "italic",
            }}
          >
            Every capability.
          </p>
        </div>

        {/* Middle band — signature + address + directory */}
        <div
          className="grid grid-cols-1 md:grid-cols-12 gap-10 py-10 border-t"
          style={{ borderColor: "var(--v6-border)" }}
        >
          <div className="md:col-span-4 flex flex-col gap-6">
            <StackSignature />
            <div>
              <Earmark>§ HQ · RANCHO CUCAMONGA · CA</Earmark>
              <p
                className="v6-mono text-[13px] mt-3"
                style={{ color: "var(--v6-fg)" }}
              >
                info@linearmarketingsolutions.com
              </p>
              <p
                className="v6-mono text-[13px] mt-1"
                style={{ color: "var(--v6-fg-2)" }}
              >
                +1 (928) 302-4852
              </p>
            </div>
            <Earmark hot dot>
              OPERATOR ONLINE · COMPOUNDING
            </Earmark>
          </div>

          <nav
            className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-y-3 gap-x-6"
            aria-label="Footer"
          >
            {FOOTER_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="v6-snap v6-mono text-[12px] tracking-[0.18em] uppercase"
                style={{ color: "var(--v6-fg-2)" }}
              >
                <span
                  style={{ color: "var(--v6-accent-hot)", opacity: 0.7 }}
                  aria-hidden
                >
                  →
                </span>{" "}
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 py-8 border-t"
          style={{ borderColor: "var(--v6-border)" }}
        >
          <div className="flex flex-wrap items-center gap-4">
            <Earmark>LMS · v6.0.0</Earmark>
            <Earmark>© {new Date().getFullYear()} LINEAR MARKETING SOLUTIONS</Earmark>
          </div>
          <p
            className="v6-mono text-[11px] italic tracking-[0.08em]"
            style={{ color: "var(--v6-fg-3)" }}
          >
            Built by AI. Directed by one.
          </p>
        </div>
      </div>
    </footer>
  );
}
