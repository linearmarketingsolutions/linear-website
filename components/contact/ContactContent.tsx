"use client";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SplitText } from "@/components/ui/SplitText";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ContactForm } from "./ContactForm";

type ContactItem = { text: string; href?: string };
type ContactBlock = { label: string; items: ContactItem[] };

const CONTACT_INFO: ContactBlock[] = [
  {
    label: "Email",
    items: [
      { text: "blake@linearmarketingsolutions.com", href: "mailto:blake@linearmarketingsolutions.com" },
      { text: "info@linearmarketingsolutions.com", href: "mailto:info@linearmarketingsolutions.com" },
    ],
  },
  {
    label: "Phone",
    items: [
      { text: "(928) 302-4852", href: "tel:+19283024852" },
    ],
  },
  {
    label: "Based in",
    items: [
      { text: "Rancho Cucamonga, CA" },
    ],
  },
  {
    label: "Service area",
    items: [
      { text: "Los Angeles, Inland Empire, Orange County, San Diego — and remote nationwide" },
    ],
  },
  {
    label: "Response time",
    items: [
      { text: "Within 24 hours." },
    ],
  },
];

export function ContactContent() {
  return (
    <Section id="contact" className="!pt-32 lg:!pt-40 relative overflow-hidden">
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
                {...{ style: { fontSize: "clamp(3rem, 5vw, 72px)" } } as React.HTMLAttributes<HTMLElement>}
              >
                Start your build.
              </SplitText>
              <ScrollReveal direction="up" distance={30} delay={0.4} start="top 95%">
                <p className="text-text-secondary text-xl leading-relaxed max-w-[40ch]">
                  One call. We map your business, identify gaps, and design the
                  system. No pitch. No pressure. Just a clear picture of
                  what&apos;s possible.
                </p>
              </ScrollReveal>
            </div>

            <ScrollReveal direction="up" distance={20} delay={0.5} start="top 95%">
              <div className="flex flex-col gap-5">
                {CONTACT_INFO.map((block) => (
                  <div key={block.label}>
                    <p className="font-body text-xs font-medium text-text-muted uppercase tracking-wider mb-1">
                      {block.label}
                    </p>
                    {block.items.map((item) =>
                      item.href ? (
                        <a
                          key={item.text}
                          href={item.href}
                          className="block text-accent hover:opacity-80 transition-opacity"
                        >
                          {item.text}
                        </a>
                      ) : (
                        <p key={item.text} className="text-text-primary">
                          {item.text}
                        </p>
                      ),
                    )}
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* Book a call CTA */}
            <ScrollReveal direction="up" distance={20} delay={0.6} start="top 95%">
              <div className="rounded-[var(--radius-lg)] p-6 bg-accent/[0.04] border border-accent/10">
                <p className="font-display font-bold text-text-primary text-lg mb-2">
                  Prefer to talk live?
                </p>
                <p className="text-text-secondary text-sm mb-4">
                  Book a 30-minute discovery call. We&apos;ll map your business
                  and outline what an AI-powered system looks like for you.
                </p>
                <a
                  href="https://calendar.google.com/calendar/appointments/schedules/AcZssZ0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#7C3AED] to-[#6366F1] text-white font-body font-semibold rounded-[var(--radius-md)] transition-all duration-150 hover:brightness-110 hover:shadow-[var(--shadow-glow)]"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  Book a call
                </a>
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
