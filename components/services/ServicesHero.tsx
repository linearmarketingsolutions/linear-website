"use client";

import { Container } from "@/components/ui/Container";
import { SplitText } from "@/components/ui/SplitText";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { PixelGrid } from "@/components/ui/PixelGrid";

export function ServicesHero() {
  return (
    <section
      id="services-hero"
      className="relative overflow-hidden flex items-center min-h-[60vh] bg-bg"
    >
      {/* Pixel grid background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-40 overflow-hidden">
        <PixelGrid
          cols={35}
          rows={15}
          pixelSize={5}
          gap={10}
          hoverRadius={4}
          color="rgba(255,255,255,0.02)"
          hoverColor="rgba(124, 58, 237, 0.4)"
        />
      </div>


      <Container as="div" className="relative z-10 pt-40 pb-20">
        <SplitText
          as="h1"
          mode="words"
          stagger={0.06}
          duration={0.7}
          scrollTrigger={false}
          className="font-display font-bold text-text-primary leading-[1.1] mb-6"
          {...{ style: { fontSize: "clamp(3rem, 6vw, 72px)" } } as React.HTMLAttributes<HTMLElement>}
        >
          Every capability. One operator.
        </SplitText>
        <ScrollReveal direction="up" distance={30} delay={0.3} start="top 95%">
          <p className="text-text-secondary text-xl leading-relaxed max-w-[52ch]">
            LMS is not a vendor. LMS is the operating layer your business has been
            missing. From brand strategy to AI agent development — systems that
            move companies forward.
          </p>
        </ScrollReveal>
      </Container>
    </section>
  );
}
