"use client";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { fadeUp, transitionBase } from "@/lib/animations";
import { motion } from "framer-motion";

const REVIEWS = [
  {
    quote:
      "Blake and his team didn't just run our marketing — they rebuilt our entire go-to-market system from scratch. Within 90 days we had a content engine, a CRM that actually worked, and campaigns producing real leads. I've never seen execution like this from a single partner.",
    author: "Marcus T.",
    role: "CEO, Pacific Rim Distributors",
  },
  {
    quote:
      "We came to LMS for social media help and left with an automated lead pipeline, a new website, and a custom dashboard that our sales team uses every day. The scope of what they can do is genuinely surprising.",
    author: "Danielle K.",
    role: "Founder, Clearpath Wellness",
  },
  {
    quote:
      "The AI integration work alone was worth the engagement. Our team now runs on tools that Blake built and trained us to use. We operate faster and smarter than companies three times our size.",
    author: "Jordan M.",
    role: "Director of Operations, NexLayer Tech",
  },
  {
    quote:
      "I was skeptical about outsourcing marketing and operations to one partner. Six months later our monthly revenue has tripled and I have more clarity on our business than I've ever had. LMS is the real deal.",
    author: "Sofia R.",
    role: "Co-Founder, Forma Studio",
  },
  {
    quote:
      "The website they built us is the best thing that's happened to our brand. It doesn't look like a template. It looks like us — better than we could have imagined. And the ongoing support has been seamless.",
    author: "Derek W.",
    role: "President, SummitCore Group",
  },
];

export function Reviews() {
  return (
    <Section id="reviews">
      <Container as="div">
        <motion.h2
          variants={fadeUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          transition={transitionBase}
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "var(--text-h2)",
            color: "var(--color-text-primary)",
            marginBottom: "var(--space-xl)",
          }}
        >
          Client operations.
        </motion.h2>

        {/* Mobile: horizontal scroll */}
        <div className="md:hidden overflow-x-auto pb-4 -mx-[var(--space-lg)] px-[var(--space-lg)] scrollbar-thin">
          <div className="flex gap-4" style={{ width: "max-content" }}>
            {REVIEWS.map((r, i) => (
              <motion.div
                key={r.author}
                variants={fadeUp}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                transition={{ ...transitionBase, delay: i * 0.05 }}
                className="flex-shrink-0 w-[85vw] max-w-[380px] rounded-[var(--radius-lg)] p-6 relative overflow-hidden"
                style={{
                  background: "var(--color-surface-2)",
                  boxShadow: "var(--shadow-card)",
                }}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-[3px]"
                  style={{ background: "var(--color-accent-primary)" }}
                />
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--text-body)",
                    color: "var(--color-text-primary)",
                    lineHeight: 1.6,
                    marginBottom: "var(--space-md)",
                  }}
                >
                  &ldquo;{r.quote}&rdquo;
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--text-small)",
                    color: "var(--color-text-secondary)",
                  }}
                >
                  — {r.author}, {r.role}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Desktop: 3-column grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-6">
          {REVIEWS.map((r, i) => (
            <motion.div
              key={r.author}
              variants={fadeUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              transition={{ ...transitionBase, delay: i * 0.05 }}
              className="rounded-[var(--radius-lg)] p-6 relative overflow-hidden"
              style={{
                background: "var(--color-surface-2)",
                boxShadow: "var(--shadow-card)",
              }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-[3px]"
                style={{ background: "var(--color-accent-primary)" }}
              />
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-body)",
                  color: "var(--color-text-primary)",
                  lineHeight: 1.6,
                  marginBottom: "var(--space-md)",
                }}
              >
                &ldquo;{r.quote}&rdquo;
              </p>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-small)",
                  color: "var(--color-text-secondary)",
                }}
              >
                — {r.author}, {r.role}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
