"use client";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SERVICE_ICONS, type ServiceIconKey } from "./icons";
import type { Pillar } from "./data";
import { fadeUp, transitionBase } from "@/lib/animations";
import { motion } from "framer-motion";

type ServicePillarProps = {
  pillar: Pillar;
  index: number;
};

function CapabilityCard({
  title,
  description,
  iconKey,
  cardIndex,
}: {
  title: string;
  description: string;
  iconKey: ServiceIconKey;
  cardIndex: number;
}) {
  const Icon = SERVICE_ICONS[iconKey] ?? SERVICE_ICONS.content;
  return (
    <motion.div
      variants={fadeUp}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      transition={{ ...transitionBase, delay: cardIndex * 0.03 }}
      className="group relative rounded-[var(--radius-lg)] p-6 bg-surface-2 border border-border overflow-hidden transition-all duration-300 hover:border-accent/30 hover:shadow-[var(--shadow-glow)] hover:-translate-y-0.5"
    >
      {/* Top accent line on hover */}
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
    </motion.div>
  );
}

export function ServicePillar({ pillar, index }: ServicePillarProps) {
  return (
    <Section id={pillar.id}>
      <div className="w-full border-t border-border" />
      <Container as="div">
        <motion.h2
          variants={fadeUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          transition={transitionBase}
          className="font-display font-bold text-text-primary text-[clamp(1.75rem,3vw,40px)] leading-tight mt-12 mb-3"
        >
          {pillar.title}
        </motion.h2>
        <motion.p
          variants={fadeUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          transition={{ ...transitionBase, delay: 0.05 }}
          className="text-text-secondary leading-relaxed max-w-[60ch] mb-10"
        >
          {pillar.tagline}
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {pillar.capabilities.map((cap, i) => (
            <CapabilityCard
              key={cap.title}
              title={cap.title}
              description={cap.description}
              iconKey={cap.icon}
              cardIndex={index * 10 + i}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
