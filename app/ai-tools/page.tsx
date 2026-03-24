"use client";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { AIToolsHero } from "@/components/ai-tools/AIToolsHero";
import { AIStackGrid } from "@/components/ai-tools/AIStackGrid";
import { OpenClawDeepDive } from "@/components/ai-tools/OpenClawDeepDive";
import { AIEducation } from "@/components/ai-tools/AIEducation";

export default function AITools() {
  return (
    <>
      <AIToolsHero />
      <Section id="ai-stack">
        <Container>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(var(--text-h3), 3vw, var(--text-h2))",
              color: "var(--color-text-primary)",
              marginBottom: "var(--space-xl)",
            }}
          >
            The AI stack
          </h2>
          <AIStackGrid />
        </Container>
      </Section>
      <OpenClawDeepDive />
      <AIEducation />
    </>
  );
}
