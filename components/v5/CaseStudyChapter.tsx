"use client";

/**
 * CaseStudyChapter — chaptered anchor scroll (Cyclemon pattern, restrained).
 *
 * Three flagship chapters. Each chapter pins for a held moment, displays
 * the client title plate + one-line outcome + the proof metric, then
 * releases. No image sequence — procedural background gradient per chapter
 * so ship-weight stays low. Full build-out with real client artwork is a
 * follow-up job for the art pipeline.
 */

import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

type Chapter = {
  n: string;
  client: string;
  headline: string;
  outcome: string;
  metric: { value: string; label: string };
  palette: { from: string; to: string };
  art: string;
};

const CHAPTERS: Chapter[] = [
  {
    n: "CHAPTER 01",
    client: "Pass MFT",
    headline: "An exam-prep platform rebuilt from first principles.",
    outcome:
      "Redesigned the entire surface, migrated the question bank, shipped adaptive scoring — in six weeks.",
    metric: { value: "+210%", label: "session length" },
    palette: { from: "#1a0f1d", to: "#2a1840" },
    art: "/v5/art/chapter-01.png",
  },
  {
    n: "CHAPTER 02",
    client: "P2P Distribution",
    headline: "A sales organization running on one integrated stack.",
    outcome:
      "60+ SKU catalog, dealer intel engine, automated distributor outreach — deployed as a single operator.",
    metric: { value: "$3M+", label: "revenue deployed" },
    palette: { from: "#100a1a", to: "#1f1238" },
    art: "/v5/art/chapter-02.png",
  },
  {
    n: "CHAPTER 03",
    client: "Playing Surface Sports",
    headline: "From empty Shopify to seasonal launch in four sessions.",
    outcome:
      "Store build, AI SEO stack, distributor research, and operational runbook — before the paddle market peaked.",
    metric: { value: "4 sessions", label: "zero to launch" },
    palette: { from: "#12091a", to: "#24143d" },
    art: "/v5/art/chapter-03.png",
  },
];

export function CaseStudyChapter() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;
      const chapters = gsap.utils.toArray<HTMLElement>(
        "[data-v5-chapter]",
        containerRef.current,
      );

      chapters.forEach((chapter) => {
        const content = chapter.querySelector<HTMLElement>("[data-chapter-content]");
        const metric = chapter.querySelector<HTMLElement>("[data-chapter-metric]");
        if (!content || !metric) return;

        gsap.fromTo(
          content,
          { opacity: 0, y: 6 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: chapter,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          },
        );

        gsap.fromTo(
          metric,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.6,
            delay: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: chapter,
              start: "top 60%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="v5-dark relative"
      aria-labelledby="v5-case-heading"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 py-24 md:py-32">
        <div className="v5-eyebrow mb-6">§ Selected work</div>
        <h2
          id="v5-case-heading"
          className="v5-display-strong max-w-[22ch]"
          style={{
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            color: "var(--color-v5-fg-warm)",
          }}
        >
          Three chapters.{" "}
          <span
            style={{
              color: "var(--color-v5-accent-glow)",
              fontStyle: "italic",
            }}
          >
            Same operator.
          </span>
        </h2>
      </div>

      {CHAPTERS.map((chapter) => (
        <article
          key={chapter.n}
          data-v5-chapter
          className="relative min-h-[80vh] flex items-center overflow-hidden"
          style={{
            background: `linear-gradient(180deg, ${chapter.palette.from}, ${chapter.palette.to})`,
          }}
        >
          {/* Generated atmospheric art */}
          <div className="absolute inset-0 pointer-events-none">
            <Image
              src={chapter.art}
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
              style={{ opacity: 0.55, mixBlendMode: "screen" }}
              priority={false}
            />
          </div>
          <div
            className="absolute inset-0 pointer-events-none opacity-40"
            style={{
              background: `radial-gradient(ellipse 60% 60% at 80% 20%, rgba(200, 158, 254, 0.18), transparent 60%)`,
            }}
          />

          <div className="relative max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 w-full grid grid-cols-1 md:grid-cols-12 gap-8 py-24">
            <div
              data-chapter-content
              className="md:col-span-8"
            >
              <div
                className="v5-label mb-6"
                style={{ color: "var(--color-v5-accent-glow)" }}
              >
                {chapter.n}
              </div>
              <div
                className="v5-display mb-8"
                style={{
                  fontSize: "clamp(2rem, 4.5vw, 3.75rem)",
                  color: "var(--color-v5-fg-warm)",
                  fontStyle: "italic",
                  fontVariationSettings: '"SOFT" 100, "WONK" 0, "opsz" 144',
                }}
              >
                {chapter.client}
              </div>
              <h3
                className="v5-display"
                style={{
                  fontSize: "clamp(1.5rem, 3vw, 2.4rem)",
                  color: "var(--color-v5-fg-warm)",
                  maxWidth: "24ch",
                  lineHeight: 1.1,
                }}
              >
                {chapter.headline}
              </h3>
              <p
                className="v5-body mt-6 max-w-[54ch]"
                style={{ color: "rgba(245, 242, 238, 0.72)" }}
              >
                {chapter.outcome}
              </p>
            </div>

            <div
              data-chapter-metric
              className="md:col-span-4 flex md:flex-col md:justify-end items-start gap-4 md:gap-2"
            >
              <div
                className="v5-display"
                style={{
                  fontSize: "clamp(2.5rem, 5vw, 4.25rem)",
                  color: "var(--color-v5-accent-glow)",
                  lineHeight: 1,
                }}
              >
                {chapter.metric.value}
              </div>
              <div
                className="v5-label"
                style={{ color: "var(--color-text-muted)" }}
              >
                {chapter.metric.label}
              </div>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}
