"use client";

import { useRef } from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SplitText } from "@/components/ui/SplitText";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SERVICE_ICONS, type ServiceIconKey } from "./icons";
import type { Pillar } from "./data";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

type ServicePillarProps = {
  pillar: Pillar;
  index: number;
};

function CapabilityCard({
  title,
  description,
  iconKey,
}: {
  title: string;
  description: string;
  iconKey: ServiceIconKey;
}) {
  const Icon = SERVICE_ICONS[iconKey] ?? SERVICE_ICONS.content;
  return (
    <div
      data-cap-card
      className="group relative rounded-[var(--radius-lg)] p-6 bg-surface-2 border border-border overflow-hidden transition-all duration-300 hover:border-accent/30 hover:shadow-[var(--shadow-glow)] hover:-translate-y-0.5"
    >
      <span className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent to-accent-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-accent/10 text-accent mb-4">
        <Icon />
      </span>

      <h3 className="font-body font-semibold text-accent text-lg mb-2">
        {title}
      </h3>

      <p className="text-text-secondary leading-relaxed text-[15px]">
        {description}
      </p>
    </div>
  );
}

export function ServicePillar({ pillar, index }: ServicePillarProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll("[data-cap-card]");

    gsap.from(cards, {
      y: 50,
      opacity: 0,
      scale: 0.95,
      duration: 0.6,
      stagger: 0.07,
      ease: "power3.out",
      scrollTrigger: {
        trigger: gridRef.current,
        start: "top 82%",
        once: true,
      },
    });
  });

  return (
    <Section id={pillar.id}>
      <div className="w-full border-t border-border" />
      <Container as="div">
        <SplitText
          as="h2"
          mode="words"
          stagger={0.05}
          className="font-display font-bold text-text-primary text-[clamp(1.75rem,3vw,40px)] leading-tight mt-12 mb-3"
        >
          {pillar.title}
        </SplitText>
        <ScrollReveal direction="up" distance={20} delay={0.1}>
          <p className="text-text-secondary leading-relaxed max-w-[60ch] mb-10">
            {pillar.tagline}
          </p>
        </ScrollReveal>
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {pillar.capabilities.map((cap) => (
            <CapabilityCard
              key={cap.title}
              title={cap.title}
              description={cap.description}
              iconKey={cap.icon}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
