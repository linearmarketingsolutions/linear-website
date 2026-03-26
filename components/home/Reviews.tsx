"use client";

import { useRef } from "react";
import { SplitText } from "@/components/ui/SplitText";
import { HorizontalScrollSection } from "@/components/ui/HorizontalScrollSection";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const REVIEWS = [
  {
    quote: "Blake didn't just run our marketing — he rebuilt our entire go-to-market system. Within 90 days we had a content engine, a CRM, and campaigns producing real leads.",
    author: "Marcus T.",
    role: "CEO, Pacific Rim Distributors",
    metric: "3x",
    metricLabel: "Lead growth",
  },
  {
    quote: "We came for social media help and left with an automated lead pipeline, a new website, and a dashboard our sales team uses every day.",
    author: "Danielle K.",
    role: "Founder, Clearpath Wellness",
    metric: "47%",
    metricLabel: "Cost reduction",
  },
  {
    quote: "The AI integration alone was worth it. Our team now runs on tools Blake built and trained us to use. We operate faster than companies three times our size.",
    author: "Jordan M.",
    role: "Director of Ops, NexLayer Tech",
    metric: "5x",
    metricLabel: "Speed increase",
  },
  {
    quote: "Six months later our monthly revenue has tripled and I have more clarity on our business than I've ever had. LMS is the real deal.",
    author: "Sofia R.",
    role: "Co-Founder, Forma Studio",
    metric: "3x",
    metricLabel: "Revenue growth",
  },
  {
    quote: "The website they built us is the best thing that's happened to our brand. It doesn't look like a template. It looks like us — better than we imagined.",
    author: "Derek W.",
    role: "President, SummitCore Group",
    metric: "92",
    metricLabel: "Lighthouse score",
  },
];

export function Reviews() {
  const headerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!headerRef.current) return;
    gsap.from("[data-review-number]", {
      textContent: 0,
      duration: 2,
      ease: "power2.out",
      snap: { textContent: 1 },
      scrollTrigger: {
        trigger: headerRef.current,
        start: "top 80%",
        once: true,
      },
    });
  });

  return (
    <section id="reviews" className="light-section relative py-32 md:py-48">
      {/* Header */}
      <div ref={headerRef} className="px-6 md:px-12 lg:px-20 xl:px-32 mb-12">
        <span className="font-mono text-accent text-xs tracking-[0.3em] uppercase block mb-4">
          Client Operations
        </span>
        <SplitText
          as="h2"
          mode="words"
          stagger={0.04}
          className="font-display font-normal text-text-primary leading-[0.95] tracking-[-0.02em]"
          {...{ style: { fontSize: "clamp(2.5rem, 5vw, 72px)" } } as React.HTMLAttributes<HTMLElement>}
        >
          Real results. No case study fluff.
        </SplitText>
      </div>

      {/* Horizontal scroll cards */}
      <HorizontalScrollSection scrollHeight={200} className="!h-auto">
        <div className="flex items-stretch gap-6 px-6 md:px-12 lg:px-20 xl:px-32 py-8">
          {REVIEWS.map((r, i) => (
            <div
              key={r.author}
              className="group relative flex-shrink-0 w-[85vw] md:w-[450px] rounded-2xl p-8 bg-surface-1 border border-border shadow-[var(--shadow-card)] overflow-hidden transition-all duration-500 hover:border-accent/20 hover:shadow-[0_0_40px_rgba(204,255,0,0.08)]"
            >
              {/* Large metric */}
              <div className="mb-6">
                <span className="font-display font-normal text-accent text-5xl tracking-tight">
                  {r.metric}
                </span>
                <span className="block font-mono text-text-muted text-xs tracking-wider uppercase mt-1">
                  {r.metricLabel}
                </span>
              </div>

              {/* Quote */}
              <p className="text-text-primary/80 leading-relaxed mb-8 text-base">
                &ldquo;{r.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="mt-auto flex items-center gap-3 pt-6 border-t border-border">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-accent/10 text-accent font-mono text-sm font-bold">
                  {r.author.charAt(0)}
                </div>
                <div>
                  <p className="text-text-primary text-sm font-medium">{r.author}</p>
                  <p className="text-text-muted text-xs">{r.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </HorizontalScrollSection>
    </section>
  );
}
