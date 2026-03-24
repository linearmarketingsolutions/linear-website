"use client";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SplitText } from "@/components/ui/SplitText";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { GlowBlob } from "@/components/ui/GlowBlob";
import { ContactForm } from "./ContactForm";

export function ContactContent() {
  return (
    <Section id="contact" className="!pt-32 lg:!pt-40 relative overflow-hidden">
      <GlowBlob
        color="rgba(204, 255, 0, 0.4)"
        size={400}
        opacity={0.06}
        blur="100px"
        duration={22}
      />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left — info */}
          <div className="flex flex-col gap-8">
            <div>
              <SplitText
                as="h1"
                mode="chars"
                stagger={0.03}
                duration={0.6}
                scrollTrigger={false}
                className="font-display font-bold text-text-primary leading-[1.1] mb-6"
                {...{ style: { fontSize: "clamp(2.25rem, 4vw, 56px)" } } as React.HTMLAttributes<HTMLElement>}
              >
                Start your build.
              </SplitText>
              <ScrollReveal direction="up" distance={30} delay={0.4} start="top 95%">
                <p className="text-text-secondary text-lg leading-relaxed max-w-[40ch]">
                  One call. We map your business, identify gaps, and design the
                  system. No pitch. No pressure. Just a clear picture of
                  what&apos;s possible.
                </p>
              </ScrollReveal>
            </div>

            <ScrollReveal direction="up" distance={20} delay={0.5} start="top 95%">
              <div className="flex flex-col gap-6">
                <div>
                  <p className="font-body text-xs font-medium text-text-muted uppercase tracking-wider mb-1">
                    Email
                  </p>
                  <a
                    href="mailto:info@linearmarketingsolutions.com"
                    className="text-accent hover:opacity-80 transition-opacity"
                  >
                    info@linearmarketingsolutions.com
                  </a>
                </div>
                <div>
                  <p className="font-body text-xs font-medium text-text-muted uppercase tracking-wider mb-1">
                    Response time
                  </p>
                  <p className="text-text-primary">
                    Within 24 hours.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right — form */}
          <ScrollReveal direction="right" distance={40} delay={0.3} start="top 90%">
            <div>
              <ContactForm />
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </Section>
  );
}
