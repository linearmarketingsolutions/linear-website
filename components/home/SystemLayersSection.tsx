"use client";

import { useRef, useState, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SplitText } from "@/components/ui/SplitText";

gsap.registerPlugin(ScrollTrigger);

const SystemLayers = dynamic(
  () => import("@/components/three/SystemLayers").then((m) => m.SystemLayers),
  { ssr: false }
);

/* ── Layer labels (CSS overlay, not 3D Html) ─────────── */

const LAYER_LABELS = [
  "Data & Analytics",
  "CRM & Operations",
  "Automation",
  "Content Engine",
  "Web & Development",
  "AI Intelligence",
];

function LayerLabels({ progressRef }: { progressRef: React.RefObject<{ value: number }> }) {
  const listRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!listRef.current) return;
    const items = listRef.current.querySelectorAll("[data-layer-label]");

    // Stagger fade in tied to scroll
    items.forEach((item, i) => {
      gsap.fromTo(
        item,
        { opacity: 0, x: 20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: listRef.current!.parentElement!.parentElement!,
            start: `${15 + i * 8}% top`,
            end: `${25 + i * 8}% top`,
            scrub: 0.3,
          },
        }
      );
    });
  });

  return (
    <div
      ref={listRef}
      className="absolute right-8 md:right-12 lg:right-20 xl:right-32 top-1/2 -translate-y-1/2 z-10 hidden lg:flex flex-col gap-4"
    >
      {LAYER_LABELS.map((label, i) => (
        <div
          key={label}
          data-layer-label
          className="flex items-center gap-3 opacity-0"
        >
          <span className="font-mono text-[10px] font-bold tracking-wider text-[#A78BFA]">
            0{i + 1}
          </span>
          <span className="font-body text-sm font-medium text-white/70 tracking-wide uppercase">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ── Mobile fallback ───────────────────────────────────── */

function MobileFallback() {
  const stackRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!stackRef.current) return;
    const layers = stackRef.current.querySelectorAll("[data-mobile-layer]");

    gsap.from(layers, {
      y: (i) => 60 + i * 30,
      opacity: 0,
      scale: 0.92,
      duration: 0.7,
      stagger: 0.12,
      ease: "power3.out",
      scrollTrigger: {
        trigger: stackRef.current,
        start: "top 70%",
        once: true,
      },
    });
  });

  const MOBILE_LAYERS = [
    { label: "Data & Analytics", color: "#8B5CF6" },
    { label: "CRM & Operations", color: "#7C3AED" },
    { label: "Automation", color: "#6D28D9" },
    { label: "Content Engine", color: "#6366F1" },
    { label: "Web & Development", color: "#818CF8" },
    { label: "AI Intelligence", color: "#A78BFA" },
  ];

  return (
    <div ref={stackRef} className="flex flex-col items-center gap-3 py-20 px-6">
      {MOBILE_LAYERS.map((layer, i) => (
        <div
          key={layer.label}
          data-mobile-layer
          className="w-full max-w-[340px] rounded-xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-sm px-5 py-4 flex items-center gap-3"
        >
          <span
            className="font-mono text-xs font-bold"
            style={{ color: layer.color }}
          >
            0{i + 1}
          </span>
          <span className="font-body text-sm text-white/70">{layer.label}</span>
        </div>
      ))}
    </div>
  );
}

/* ── Main section ─────────────────────────────────────── */

export function SystemLayersSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const completionRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef({ value: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // GSAP ScrollTrigger → progress bridge
  useGSAP(() => {
    if (!containerRef.current || !pinRef.current || isMobile) return;

    ScrollTrigger.getAll().forEach((st) => {
      if (st.vars.trigger === containerRef.current) st.kill();
    });

    const tween = gsap.to(progressRef.current, {
      value: 1,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3,
        pin: pinRef.current,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          progressRef.current.value = self.progress;
          if (completionRef.current) {
            const p = self.progress;
            completionRef.current.style.opacity = String(
              p > 0.8 ? Math.min((p - 0.8) / 0.15, 1) : 0
            );
          }
        },
      },
    });

    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      tween.kill();
    };
  }, { dependencies: [isMobile] });

  if (isMobile) {
    return (
      <section className="dark-section relative py-20">
        <div className="px-6 mb-8 text-center">
          <span className="font-mono text-[#8B5CF6] text-xs tracking-[0.3em] uppercase block mb-4">
            System Architecture
          </span>
          <h2
            className="font-display font-normal text-white leading-[0.95] tracking-[-0.02em]"
            style={{ fontSize: "clamp(2rem, 6vw, 48px)" }}
          >
            Six layers. One operating system.
          </h2>
        </div>
        <MobileFallback />
      </section>
    );
  }

  return (
    <div ref={containerRef} style={{ height: "250vh" }}>
      <div
        ref={pinRef}
        className="h-screen relative overflow-hidden dark-section"
      >
        {/* Headline — top left */}
        <div className="absolute top-28 md:top-32 left-8 md:left-12 lg:left-20 xl:left-32 z-10 max-w-[500px]">
          <span className="font-mono text-[#8B5CF6] text-xs tracking-[0.3em] uppercase block mb-4">
            System Architecture
          </span>
          <SplitText
            as="h2"
            mode="words"
            stagger={0.05}
            className="font-display font-normal text-white leading-[0.95] tracking-[-0.02em]"
            {...{ style: { fontSize: "clamp(2.5rem, 5vw, 64px)" } } as React.HTMLAttributes<HTMLElement>}
          >
            Six layers. One operating system.
          </SplitText>
        </div>

        {/* CSS layer labels — right side */}
        <LayerLabels progressRef={progressRef} />

        {/* R3F Canvas — centered */}
        <Suspense fallback={null}>
          <SystemLayers progressRef={progressRef} />
        </Suspense>

        {/* Completion text — fades in at end of scroll */}
        <div
          ref={completionRef}
          className="absolute bottom-16 left-8 md:left-12 lg:left-20 xl:left-32 z-10 max-w-[500px]"
          style={{ opacity: 0 }}
        >
          <h3
            className="font-display font-normal bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] bg-clip-text text-transparent leading-tight tracking-[-0.02em] mb-3"
            style={{ fontSize: "clamp(1.5rem, 3vw, 40px)" }}
          >
            Your integrated growth engine.
          </h3>
          <p className="font-body text-white/60 text-lg leading-relaxed">
            Every layer connected. Every system compounding.
          </p>
        </div>

        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#09090B] to-transparent pointer-events-none z-[5]" />
      </div>
    </div>
  );
}
