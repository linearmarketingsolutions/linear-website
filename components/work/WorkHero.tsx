"use client";

import { Container } from "@/components/ui/Container";
import { SplitText } from "@/components/ui/SplitText";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function WorkHero() {
  return (
    <section
      id="work-hero"
      className="hero-grid-bg relative overflow-hidden flex items-center min-h-[40vh] bg-bg"
    >

      <Container as="div" className="relative z-10 py-32">
        <SplitText
          as="h1"
          mode="words"
          stagger={0.06}
          duration={0.7}
          scrollTrigger={false}
          className="font-display font-bold text-text-primary leading-[1.1] mb-4"
          {...{ style: { fontSize: "clamp(3rem, 6vw, 72px)" } } as React.HTMLAttributes<HTMLElement>}
        >
          Operations deployed.
        </SplitText>
        <ScrollReveal direction="up" distance={30} delay={0.3} start="top 95%">
          <p className="text-text-secondary text-xl leading-relaxed max-w-[52ch]">
            Websites, apps, dashboards, and systems built for clients across
            industries. Real infrastructure. Real outcomes.
          </p>
        </ScrollReveal>
      </Container>
    </section>
  );
}
