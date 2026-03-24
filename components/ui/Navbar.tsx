"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const NAV_LINKS = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/ai-tools", label: "Platform" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const SCROLL_THRESHOLD = 80;

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        role="banner"
        className="navbar-root"
        data-scrolled={scrolled}
        aria-label="Main navigation"
      >
        <div className="navbar-inner">
          <Link
            href="/"
            className="navbar-logo"
            aria-label="LMS — Home"
          >
            <Image
              src="/logo-full.svg"
              alt=""
              width={280}
              height={48}
              priority
              className="navbar-logo-img"
            />
          </Link>

          <nav className="navbar-links" aria-label="Primary">
            {NAV_LINKS.map(({ href, label }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`navbar-link ${isActive ? "navbar-link-active" : ""}`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          <div className="navbar-cta">
            <Link href="/contact" className="navbar-cta-btn">
              Start
            </Link>
          </div>

          <button
            type="button"
            className="navbar-hamburger"
            onClick={() => setMobileOpen((o) => !o)}
            aria-expanded={mobileOpen}
            aria-controls="navbar-mobile-menu"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            <span className="navbar-hamburger-line" />
            <span className="navbar-hamburger-line" />
            <span className="navbar-hamburger-line" />
          </button>
        </div>
      </header>

      <div
        id="navbar-mobile-menu"
        className="navbar-mobile"
        data-open={mobileOpen}
        aria-hidden={!mobileOpen}
      >
        <nav className="navbar-mobile-nav" aria-label="Mobile navigation">
          {NAV_LINKS.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`navbar-mobile-link ${isActive ? "gradient-text" : ""}`}
                onClick={() => setMobileOpen(false)}
                aria-current={isActive ? "page" : undefined}
              >
                {label}
              </Link>
            );
          })}
          <Link
            href="/contact"
            className="navbar-mobile-cta"
            onClick={() => setMobileOpen(false)}
          >
            Start
          </Link>
        </nav>
      </div>
    </>
  );
}
