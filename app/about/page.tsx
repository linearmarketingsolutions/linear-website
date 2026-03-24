import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "One operator. An AI-native growth engine built to prove that one person with the right systems can outperform a full agency.",
};

export default function About() {
  return (
    <>
      <Section id="about" className="!pt-[var(--space-3xl)]">
        <Container>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(2.25rem, 4.5vw, var(--text-h1))",
              lineHeight: 1.1,
              color: "var(--color-text-primary)",
              marginBottom: "var(--space-xl)",
              maxWidth: "18ch",
            }}
          >
            One operator. The full stack.
          </h1>

          <div
            className="grid grid-cols-1 md:grid-cols-[1fr_1px_1fr] gap-8 md:gap-12"
            style={{ marginBottom: "var(--space-2xl)" }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-lg)",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 18,
                  color: "var(--color-text-secondary)",
                  lineHeight: 1.7,
                }}
              >
                LMS started with a question: what happens when one person has
                access to every AI tool that exists — and knows how to deploy
                them?
              </p>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 18,
                  color: "var(--color-text-secondary)",
                  lineHeight: 1.7,
                }}
              >
                The answer is this company. Marketing, development, automation,
                intelligence, operations — built and run by a single operator
                with an AI-native infrastructure that scales without headcount.
              </p>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 18,
                  color: "var(--color-text-secondary)",
                  lineHeight: 1.7,
                }}
              >
                Every system you see here — this website, the brand, the
                client deliverables, the tools — was built by AI, directed by
                one person. The company itself is the proof of concept.
              </p>
            </div>

            <div
              className="hidden md:block"
              style={{ background: "var(--color-border)" }}
            />

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-lg)",
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
                  Operator
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "var(--text-h3)",
                    color: "var(--color-text-primary)",
                  }}
                >
                  Blake Pederson
                </p>
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
                  Focus
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--text-body)",
                    color: "var(--color-text-secondary)",
                    lineHeight: 1.6,
                  }}
                >
                  AI-powered marketing infrastructure, custom development,
                  workflow automation, and business operations for growth-stage
                  companies.
                </p>
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
                  Thesis
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--text-body)",
                    color: "var(--color-text-secondary)",
                    lineHeight: 1.6,
                  }}
                >
                  One person with AI infrastructure can outperform a 20-person
                  agency. Not in theory. In production. Every day.
                </p>
              </div>
            </div>
          </div>

          <div
            className="rounded-[var(--radius-lg)] p-8 md:p-10"
            style={{
              background: "var(--color-surface-1)",
              border: "1px solid var(--color-border-accent)",
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(var(--text-h3), 3vw, var(--text-h2))",
                color: "var(--color-accent-primary)",
                marginBottom: "var(--space-md)",
              }}
            >
              Slowly, then all at once.
            </p>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-body)",
                color: "var(--color-text-secondary)",
                lineHeight: 1.6,
                maxWidth: "50ch",
                margin: "0 auto var(--space-xl)",
              }}
            >
              The companies that deploy AI infrastructure now will be
              unreachable in 18 months. LMS exists to make sure you&apos;re
              one of them.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 rounded-[var(--radius-md)] font-medium transition-all hover:brightness-110 hover:shadow-[var(--shadow-glow)]"
              style={{
                background: "var(--color-accent-primary)",
                color: "#09090B",
                fontFamily: "var(--font-body)",
                fontWeight: 600,
                fontSize: 18,
              }}
            >
              Start your build
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
