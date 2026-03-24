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
        <motion.div
          variants={fadeUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          transition={transitionBase}
          className="mb-12"
        >
          <h2 className="font-display font-bold text-text-primary text-[clamp(2rem,3.5vw,40px)] leading-tight mb-4">
            Client operations.
          </h2>
          <p className="text-text-secondary text-lg max-w-[52ch] leading-relaxed">
            Real results from real engagements. No case study fluff.
          </p>
        </motion.div>

        {/* Masonry-like grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-5 space-y-5">
          {REVIEWS.map((r, i) => (
            <motion.div
              key={r.author}
              variants={fadeUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              transition={{ ...transitionBase, delay: i * 0.06 }}
              className="break-inside-avoid"
            >
              <div className="group relative rounded-[var(--radius-lg)] p-7 bg-surface-2 border border-border overflow-hidden transition-all duration-300 hover:border-accent/20">
                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent to-accent-secondary" />

                {/* Quote icon */}
                <svg className="text-accent/20 mb-4" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>

                <p className="text-text-primary leading-relaxed mb-5">
                  {r.quote}
                </p>

                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  {/* Avatar placeholder */}
                  <div className="flex items-center justify-center w-9 h-9 rounded-full bg-accent/10 text-accent font-mono text-xs font-bold">
                    {r.author.charAt(0)}
                  </div>
                  <div>
                    <p className="text-text-primary text-sm font-medium">
                      {r.author}
                    </p>
                    <p className="text-text-muted text-xs">
                      {r.role}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
