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
      <Section id="contact" className="!pt-32 lg:!pt-40">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left — info */}
            <div className="flex flex-col gap-8">
              <div>
                <h1 className="font-display font-bold text-text-primary leading-[1.1] mb-6" style={{ fontSize: "clamp(2.25rem, 4vw, 56px)" }}>
                  Start your build.
                </h1>
                <p className="text-text-secondary text-lg leading-relaxed max-w-[40ch]">
                  One call. We map your business, identify gaps, and design the
                  system. No pitch. No pressure. Just a clear picture of
                  what&apos;s possible.
                </p>
              </div>

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
            </div>

            {/* Right — form */}
            <div>
              <ContactForm />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
