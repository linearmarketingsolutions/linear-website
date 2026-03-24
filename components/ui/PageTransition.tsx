"use client";

import { usePathname } from "next/navigation";
import { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "gsap";

/**
 * Full-screen page wipe transition (inspired by cmcc.vc, kprverse.com).
 * Chartreuse curtain wipes across the screen between route changes.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const wipeRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [displayChildren, setDisplayChildren] = useState(children);
  const prevPathname = useRef(pathname);
  const isFirstRender = useRef(true);

  const animateTransition = useCallback(() => {
    if (!wipeRef.current || !contentRef.current) return;

    const tl = gsap.timeline();

    // Wipe in
    tl.set(wipeRef.current, { xPercent: -100, display: "block" });
    tl.to(wipeRef.current, {
      xPercent: 0,
      duration: 0.5,
      ease: "power3.inOut",
    });

    // Swap content at midpoint
    tl.add(() => {
      setDisplayChildren(children);
      window.scrollTo({ top: 0, behavior: "instant" });
    });

    // Wipe out
    tl.to(wipeRef.current, {
      xPercent: 100,
      duration: 0.5,
      ease: "power3.inOut",
    });
    tl.set(wipeRef.current, { display: "none" });

    // Fade in content
    tl.fromTo(
      contentRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: "power2.out" },
      "-=0.3"
    );
  }, [children]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (pathname !== prevPathname.current) {
      prevPathname.current = pathname;
      animateTransition();
    }
  }, [pathname, animateTransition]);

  return (
    <>
      {/* Wipe curtain */}
      <div
        ref={wipeRef}
        className="fixed inset-0 z-[9990] pointer-events-none hidden"
        style={{
          background: "linear-gradient(135deg, #CCFF00, #A3E635)",
        }}
      />
      {/* Content */}
      <div ref={contentRef} style={{ minHeight: "100%" }}>
        {displayChildren}
      </div>
    </>
  );
}
