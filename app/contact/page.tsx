import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start your build. One call to map your business, identify gaps, and deploy an AI-powered growth system.",
};

export default function Contact() {
  return (
    <>
      <Section id="contact" className="!pt-[var(--space-3xl)]">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            <div>
              <h1
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "clamp(2rem, 4vw, var(--text-h1))",
                  lineHeight: 1.1,
                  color: "var(--color-text-primary)",
                  marginBottom: "var(--space-lg)",
                }}
              >
                Start your build.
              </h1>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-body)",
                  color: "var(--color-text-secondary)",
                  lineHeight: 1.7,
                  maxWidth: "40ch",
                  marginBottom: "var(--space-xl)",
                }}
              >
                One call. We map your business, identify gaps, and design the
                system. No pitch. No pressure. Just a clear picture of
                what&apos;s possible.
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "var(--space-md)",
                }}
              >
                <div>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "var(--text-small)",
                      fontWeight: 500,
                      color: "var(--color-text-muted)",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      marginBottom: "var(--space-xs)",
                    }}
                  >
                    Email
                  </p>
                  <a
                    href="mailto:info@linearmarketingsolutions.com"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "var(--text-body)",
                      color: "var(--color-accent-primary)",
                      textDecoration: "none",
                    }}
                  >
                    info@linearmarketingsolutions.com
                  </a>
                </div>
                <div>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "var(--text-small)",
                      fontWeight: 500,
                      color: "var(--color-text-muted)",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      marginBottom: "var(--space-xs)",
                    }}
                  >
                    Response time
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "var(--text-body)",
                      color: "var(--color-text-primary)",
                    }}
                  >
                    Within 24 hours.
                  </p>
                </div>
              </div>
            </div>
            <div>
              <ContactForm />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
