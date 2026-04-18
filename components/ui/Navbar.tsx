"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

const SERVICE_LINKS = [
  { href: "/services/growth-engine", label: "Growth Engine", description: "Full-funnel strategy & campaigns" },
  { href: "/services/content-pipeline", label: "Content Pipeline", description: "AI-assisted content at scale" },
  { href: "/services/web-development", label: "Web & App Dev", description: "Custom-coded sites & platforms" },
  { href: "/services/ai-infrastructure", label: "AI Infrastructure", description: "Agents, automation & CRM" },
  { href: "/services/business-operations", label: "Business Operations", description: "Analytics, sales & process" },
  { href: "/services/ai-education", label: "AI Education", description: "Training & tool onboarding" },
];

const NAV_LINKS = [
  { href: "/work", label: "Work" },
  { href: "/ai-tools", label: "Platform" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const servicesTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  useEffect(() => {
    if (!mobileMenuRef.current) return;
    const links = mobileMenuRef.current.querySelectorAll("[data-mobile-link]");
    if (mobileOpen) {
      gsap.fromTo(links,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: "power3.out", delay: 0.2 }
      );
    }
  }, [mobileOpen]);

  // Close dropdown on route change
  useEffect(() => {
    setServicesOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  const handleServicesEnter = () => {
    if (servicesTimeoutRef.current) clearTimeout(servicesTimeoutRef.current);
    setServicesOpen(true);
  };

  const handleServicesLeave = () => {
    servicesTimeoutRef.current = setTimeout(() => setServicesOpen(false), 200);
  };

  const isHome = pathname === "/";
  const isServicesActive = pathname.startsWith("/services");

  return (
    <>
      <header
        role="banner"
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ${
          scrolled
            ? isHome
              ? "bg-[#0F0B14]/78 backdrop-blur-xl border-b border-white/[0.06]"
              : "bg-white/80 backdrop-blur-xl border-b border-black/[0.06] shadow-[0_1px_3px_rgba(0,0,0,0.05)]"
            : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-8 md:px-12 lg:px-20 xl:px-32 h-20 md:h-24">
          {/* Logo — LMS wordmark (mark lives in favicon, OG, app icon, social) */}
          <Link href="/" className="flex items-center group" aria-label="Linear Marketing Solutions — Home">
            <span className={`font-display font-black text-4xl lg:text-5xl tracking-[-0.04em] leading-none transition-colors duration-300 ${
              scrolled ? "text-[#0F0A1F]" : isHome ? "text-white" : "text-[#0F0A1F]"
            }`}>
              <span className="text-[#7C3AED]">L</span>MS
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-10" aria-label="Primary">
            {/* Services dropdown */}
            <div
              className="relative"
              onMouseEnter={handleServicesEnter}
              onMouseLeave={handleServicesLeave}
            >
              <Link
                href="/services"
                className={`relative font-body text-base font-medium tracking-wide transition-colors duration-300 py-2 inline-flex items-center gap-1.5 ${
                  isServicesActive
                    ? isHome
                      ? "text-[#C4B5FD]"
                      : "text-[#7C3AED]"
                    : isHome
                      ? "text-white/72 hover:text-white"
                      : scrolled
                        ? "text-[#52525B] hover:text-[#18181B]"
                        : "text-[#52525B] hover:text-[#18181B]"
                }`}
              >
                Services
                <svg
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
                {isServicesActive && (
                  <span className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-[#7C3AED] shadow-[0_0_8px_rgba(124,58,237,0.5)]" />
                )}
              </Link>

              {/* Dropdown panel */}
              <div
                ref={dropdownRef}
                className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all duration-200 ${
                  servicesOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
                }`}
              >
                <div className="bg-white rounded-2xl border border-black/[0.06] shadow-[0_8px_40px_rgba(0,0,0,0.08)] p-3 w-[420px]">
                  <div className="grid grid-cols-2 gap-1">
                    {SERVICE_LINKS.map(({ href, label, description }) => (
                      <Link
                        key={href}
                        href={href}
                        className={`group rounded-xl px-4 py-3 transition-all duration-200 hover:bg-[#7C3AED]/[0.04] ${
                          pathname === href ? "bg-[#7C3AED]/[0.06]" : ""
                        }`}
                      >
                        <span className={`block font-body font-semibold text-sm transition-colors ${
                          pathname === href ? "text-[#7C3AED]" : "text-[#18181B] group-hover:text-[#7C3AED]"
                        }`}>
                          {label}
                        </span>
                        <span className="block text-[#71717A] text-xs mt-0.5 leading-relaxed">
                          {description}
                        </span>
                      </Link>
                    ))}
                  </div>
                  <div className="border-t border-black/[0.04] mt-2 pt-2 px-4 pb-1">
                    <Link
                      href="/services"
                      className="font-mono text-[#7C3AED] text-xs tracking-wider uppercase hover:text-[#6D28D9] transition-colors"
                    >
                      View all services &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Other nav links */}
            {NAV_LINKS.map(({ href, label }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`relative font-body text-base font-medium tracking-wide transition-colors duration-300 py-2 ${
                    isActive
                      ? isHome
                        ? "text-[#C4B5FD]"
                        : "text-[#7C3AED]"
                      : isHome
                        ? "text-white/72 hover:text-white"
                        : scrolled
                          ? "text-[#52525B] hover:text-[#18181B]"
                          : "text-[#52525B] hover:text-[#18181B]"
                  }`}
                >
                  {label}
                  {isActive && (
                    <span className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-[#7C3AED] shadow-[0_0_8px_rgba(124,58,237,0.5)]" />
                  )}
                </Link>
              );
            })}
            <Link
              href="/contact"
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full border transition-all duration-200 ${
                isHome
                  ? "border-[rgba(124,58,237,0.32)] text-white hover:bg-[rgba(124,58,237,0.12)]"
                  : "border-black/10 text-[#18181B] hover:border-[#7C3AED]/50 hover:bg-[#7C3AED]/[0.04]"
              }`}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                fontWeight: 500,
              }}
            >
              <span aria-hidden style={{ color: isHome ? "#C4B5FD" : "#7C3AED" }}>
                ›
              </span>
              Request Deploy
            </Link>
          </nav>

          {/* Mobile burger */}
          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            className="md:hidden flex flex-col justify-center gap-2 w-10 h-10 items-center"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            <span className={`block w-6 h-0.5 rounded-full transition-all duration-300 ${
              scrolled ? "bg-[#18181B]" : isHome ? "bg-white" : "bg-[#18181B]"
            } ${mobileOpen ? "rotate-45 translate-y-[5px]" : ""}`} />
            <span className={`block w-6 h-0.5 rounded-full transition-all duration-300 ${
              scrolled ? "bg-[#18181B]" : isHome ? "bg-white" : "bg-[#18181B]"
            } ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-0.5 rounded-full transition-all duration-300 ${
              scrolled ? "bg-[#18181B]" : isHome ? "bg-white" : "bg-[#18181B]"
            } ${mobileOpen ? "-rotate-45 -translate-y-[5px]" : ""}`} />
          </button>
        </div>
      </header>

      {/* Mobile fullscreen menu */}
      <div
        ref={mobileMenuRef}
        className={`fixed inset-0 z-[999] bg-white flex items-center justify-center transition-all duration-500 ${
          mobileOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <nav className="flex flex-col items-center gap-8 w-full px-8 max-w-md">
          {/* Services header */}
          <Link
            href="/services"
            data-mobile-link
            onClick={() => setMobileOpen(false)}
            className={`font-display font-bold text-4xl sm:text-5xl tracking-tight transition-colors duration-300 ${
              pathname === "/services" ? "text-[#7C3AED]" : "text-[#18181B] hover:text-[#7C3AED]"
            }`}
          >
            Services
          </Link>
          {/* Service sub-links */}
          <div className="flex flex-wrap justify-center gap-3 -mt-4">
            {SERVICE_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                data-mobile-link
                onClick={() => setMobileOpen(false)}
                className={`font-body text-sm px-3 py-1.5 rounded-full border transition-colors duration-200 ${
                  pathname === href
                    ? "text-[#7C3AED] border-[#7C3AED]/30 bg-[#7C3AED]/[0.06]"
                    : "text-[#52525B] border-black/[0.06] hover:text-[#7C3AED] hover:border-[#7C3AED]/20"
                }`}
              >
                {label}
              </Link>
            ))}
          </div>
          {/* Other nav links */}
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              data-mobile-link
              onClick={() => setMobileOpen(false)}
              className={`font-display font-bold text-4xl sm:text-5xl tracking-tight transition-colors duration-300 ${
                pathname === href ? "text-[#7C3AED]" : "text-[#18181B] hover:text-[#7C3AED]"
              }`}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/contact"
            data-mobile-link
            onClick={() => setMobileOpen(false)}
            className={`font-display font-bold text-4xl sm:text-5xl tracking-tight transition-colors duration-300 ${
              pathname === "/contact" ? "text-[#7C3AED]" : "text-[#18181B] hover:text-[#7C3AED]"
            }`}
          >
            Contact
          </Link>
        </nav>
      </div>
    </>
  );
}
