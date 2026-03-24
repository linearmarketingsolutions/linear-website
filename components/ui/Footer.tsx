"use client";

import Link from "next/link";
import { SplitText } from "@/components/ui/SplitText";

const FOOTER_LINKS = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/ai-tools", label: "Platform" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] mt-auto">
      <div className="px-6 md:px-12 lg:px-20 xl:px-32">
        {/* Big tagline */}
        <div className="py-20 md:py-32">
          <SplitText
            as="p"
            mode="words"
            stagger={0.04}
            className="font-display font-bold text-text-primary/10 leading-[0.95] tracking-[-0.03em]"
            {...{ style: { fontSize: "clamp(3rem, 8vw, 120px)" } } as React.HTMLAttributes<HTMLElement>}
          >
            The AI growth engine.
          </SplitText>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 py-8 border-t border-white/[0.06]">
          <div className="flex items-center gap-6">
            <span className="font-display font-bold text-text-primary text-sm">
              LMS
            </span>
            <span className="text-text-muted text-xs">
              &copy; {new Date().getFullYear()} Linear Marketing Solutions
            </span>
          </div>

          <nav className="flex flex-wrap items-center gap-6">
            {FOOTER_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="font-mono text-text-muted text-xs tracking-wider uppercase transition-colors duration-300 hover:text-text-primary"
              >
                {label}
              </Link>
            ))}
          </nav>

          <p className="font-mono text-text-muted/50 text-xs italic">
            Built by AI. Directed by one.
          </p>
        </div>
      </div>
    </footer>
  );
}
