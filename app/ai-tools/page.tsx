"use client";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { AIToolsHero } from "@/components/ai-tools/AIToolsHero";
import { AIStackGrid } from "@/components/ai-tools/AIStackGrid";
import { OpenClawDeepDive } from "@/components/ai-tools/OpenClawDeepDive";
import { AIEducation } from "@/components/ai-tools/AIEducation";

export default function AITools() {
  return (
    <>
      <AIToolsHero />
      <Section id="ai-stack" className="light-section">
        <Container>
          <ScrollReveal>
            <h2 className="font-display font-bold text-text-primary mb-12 text-[clamp(2rem,4vw,56px)]">
              The AI stack
            </h2>
          </ScrollReveal>
          <AIStackGrid />
        </Container>
      </Section>
      <OpenClawDeepDive />
      <AIEducation />
    </>
  );
}
