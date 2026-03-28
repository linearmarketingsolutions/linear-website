"use client";

import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

/**
 * cmcc.vc-style depth scroll effect.
 * Geometric shapes scale from tiny (far away) to full-screen (passing camera)
 * as the user scrolls. Text stays fixed while shapes fly through.
 */

const SHAPES = [
  { type: "ring", color: "#7C3AED", delay: 0, size: 400 },
  { type: "diamond", color: "#6366F1", delay: 0.08, size: 300 },
  { type: "ring", color: "#8B5CF6", delay: 0.16, size: 500 },
  { type: "diamond", color: "#A78BFA", delay: 0.24, size: 250 },
  { type: "ring", color: "#6366F1", delay: 0.32, size: 450 },
];

export function DepthReveal() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const shapesRef = useRef<(HTMLDivElement | null)[]>([]);
  const textRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useGSAP(() => {
    if (!sectionRef.current || !pinRef.current || isMobile) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
        pin: pinRef.current,
        anticipatePin: 1,
      },
    });

    // Each shape scales from 0.05 → 8 (tiny dot → past camera) and fades
    shapesRef.current.forEach((shape, i) => {
      if (!shape) return;
      const shapeData = SHAPES[i];

      tl.fromTo(
        shape,
        {
          scale: 0.05,
          opacity: 0.8,
          rotate: shapeData.type === "diamond" ? 45 : 0,
        },
        {
          scale: 8,
          opacity: 0,
          duration: 0.6,
          ease: "power1.in",
        },
        shapeData.delay
      );
    });

    // Text fades in at 20% and out at 80%
    if (textRef.current) {
      tl.fromTo(
        textRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.2, ease: "power2.out" },
        0.1
      );
      tl.to(
        textRef.current,
        { opacity: 0, y: -40, duration: 0.2, ease: "power2.in" },
        0.7
      );
    }
  }, { dependencies: [isMobile] });

  if (isMobile) {
    return (
      <section
        className="relative py-24 flex items-center justify-center"
        style={{ background: "linear-gradient(180deg, #FAFAFA 0%, #F0EEFA 50%, #FAFAFA 100%)" }}
      >
        <div className="text-center px-6 max-w-[700px]">
          <p className="font-mono text-[#7C3AED] text-xs tracking-[0.3em] uppercase mb-4">
            The Infrastructure
          </p>
          <h2
            className="font-display font-normal text-[#18181B] leading-[0.95] tracking-[-0.03em] mb-6"
            style={{ fontSize: "clamp(2rem, 6vw, 48px)" }}
          >
            Every tool. Every layer. One system.
          </h2>
          <p className="text-[#52525B] text-lg leading-relaxed">
            AI, automation, code, content, analytics — integrated into a single operating system that compounds.
          </p>
        </div>
      </section>
    );
  }

  return (
    <div ref={sectionRef} style={{ height: "300vh" }}>
      <div
        ref={pinRef}
        className="h-screen relative overflow-hidden flex items-center justify-center"
        style={{ background: "linear-gradient(180deg, #FAFAFA 0%, #F0EEFA 50%, #FAFAFA 100%)" }}
      >
        {/* Shapes layer */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {SHAPES.map((shape, i) => (
            <div
              key={i}
              ref={(el) => { shapesRef.current[i] = el; }}
              className="absolute"
              style={{
                width: shape.size,
                height: shape.size,
                borderRadius: shape.type === "ring" ? "50%" : 0,
                border: `2px solid ${shape.color}`,
                background: "transparent",
                opacity: 0,
                transform: "scale(0.05)",
                willChange: "transform, opacity",
              }}
            />
          ))}
        </div>

        {/* Center text */}
        <div ref={textRef} className="relative z-10 text-center px-6 max-w-[700px]" style={{ opacity: 0 }}>
          <p className="font-mono text-[#7C3AED] text-xs tracking-[0.3em] uppercase mb-4">
            The Infrastructure
          </p>
          <h2
            className="font-display font-normal text-[#18181B] leading-[0.95] tracking-[-0.03em] mb-6"
            style={{ fontSize: "clamp(2.5rem, 5vw, 64px)" }}
          >
            Every tool. Every layer. One system.
          </h2>
          <p className="text-[#52525B] text-xl leading-relaxed">
            AI, automation, code, content, analytics — integrated into a single operating system that compounds.
          </p>
        </div>

        {/* Subtle gradient vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 70% 70% at 50% 50%, transparent 30%, rgba(250,250,250,0.8) 100%)",
          }}
        />
      </div>
    </div>
  );
}
