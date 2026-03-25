"use client";

import { SplitText } from "@/components/ui/SplitText";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { PixelGrid } from "@/components/ui/PixelGrid";

export function AIToolsHero() {
  return (
    <section
      id="ai-tools-hero"
      className="relative overflow-hidden flex items-center min-h-[60vh]"
    >
      {/* Pixel grid background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20 overflow-hidden pointer-events-none">
        <PixelGrid
          cols={35}
          rows={15}
          pixelSize={5}
          gap={10}
          hoverRadius={4}
          color="rgba(255,255,255,0.02)"
          hoverColor="rgba(204, 255, 0, 0.35)"
          className="pointer-events-auto"
        />
      </div>

      <div className="relative z-10 px-8 md:px-12 lg:px-20 xl:px-32 py-32">
        <SplitText
          as="h1"
          mode="words"
          stagger={0.05}
          duration={0.6}
          scrollTrigger={false}
          className="font-display font-normal text-text-primary leading-[0.95] tracking-[-0.02em] mb-6"
          {...{ style: { fontSize: "clamp(3rem, 6vw, 80px)" } } as React.HTMLAttributes<HTMLElement>}
        >
          AI isn&apos;t the future. It&apos;s the operating layer.
        </SplitText>
        <ScrollReveal direction="up" distance={30} delay={0.4} start="top 95%">
          <p className="text-text-secondary text-2xl leading-relaxed max-w-[52ch]">
            LMS doesn&apos;t just use AI — we deploy it as infrastructure.
            Here&apos;s what that means for your business.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
