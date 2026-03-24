"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

const NAV_LINKS = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/ai-tools", label: "Platform" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Animate mobile menu
  useEffect(() => {
    if (!mobileMenuRef.current) return;
    const links = mobileMenuRef.current.querySelectorAll("[data-mobile-link]");

    if (mobileOpen) {
      gsap.fromTo(links,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: "power3.out", delay: 0.2 }
      );
    }
  }, [mobileOpen]);

  return (
    <>
      <header
        role="banner"
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ${
          scrolled
            ? "bg-bg/80 backdrop-blur-xl border-b border-white/[0.04]"
            : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-6 md:px-12 lg:px-20 xl:px-32 h-16 md:h-20">
          {/* Logo — text only, no image dependency */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="font-display font-bold text-text-primary text-xl tracking-tight">
              LMS
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(204,255,0,0.5)] group-hover:shadow-[0_0_16px_rgba(204,255,0,0.8)] transition-shadow" />
          </Link>

          {/* Desktop nav — minimal, right-aligned */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Primary">
            {NAV_LINKS.map(({ href, label }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`relative font-mono text-xs tracking-[0.15em] uppercase transition-colors duration-300 py-2 ${
                    isActive ? "text-accent" : "text-text-muted hover:text-text-primary"
                  }`}
                >
                  {label}
                  {isActive && (
                    <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-accent shadow-[0_0_4px_rgba(204,255,0,0.5)]" />
                  )}
                </Link>
              );
            })}
            <Link
              href="/contact"
              className="font-mono text-xs tracking-[0.15em] uppercase text-bg bg-accent px-5 py-2.5 rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(204,255,0,0.3)] font-bold"
            >
              Start
            </Link>
          </nav>

          {/* Mobile burger */}
          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            className="md:hidden flex flex-col justify-center gap-1.5 w-10 h-10 items-center"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            <span className={`block w-5 h-0.5 bg-text-primary transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-1" : ""}`} />
            <span className={`block w-5 h-0.5 bg-text-primary transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-0.5 bg-text-primary transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-1" : ""}`} />
          </button>
        </div>
      </header>

      {/* Mobile fullscreen menu */}
      <div
        ref={mobileMenuRef}
        className={`fixed inset-0 z-[999] bg-bg flex items-center justify-center transition-all duration-500 ${
          mobileOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <nav className="flex flex-col items-center gap-10">
          {[...NAV_LINKS, { href: "/contact", label: "Contact" }].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              data-mobile-link
              onClick={() => setMobileOpen(false)}
              className={`font-display font-bold text-4xl tracking-tight transition-colors duration-300 ${
                pathname === href ? "text-accent" : "text-text-primary hover:text-accent"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
