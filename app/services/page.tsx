import type { Metadata } from "next";
import { ServicesHero } from "@/components/services/ServicesHero";
import { ServicePillar } from "@/components/services/ServicePillar";
import { OpenClawCallout } from "@/components/services/OpenClawCallout";
import { PILLARS } from "@/components/services/data";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Full-stack marketing, development, AI infrastructure, and business operations. Deployed as a single integrated system.",
};

export default function Services() {
  const [pillar1, pillar2, pillar3, pillar4] = PILLARS;

  return (
    <>
      <ServicesHero />
      <ServicePillar pillar={pillar1} index={0} />
      <ServicePillar pillar={pillar2} index={1} />
      <ServicePillar pillar={pillar3} index={2} />
      <OpenClawCallout />
      <ServicePillar pillar={pillar4} index={3} />
    </>
  );
}
