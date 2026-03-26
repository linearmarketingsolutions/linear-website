import Image from "next/image";
import { Capabilities } from "@/components/home/Capabilities";
import { DepthReveal } from "@/components/home/DepthReveal";
import { FinalCTA } from "@/components/home/FinalCTA";
import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { MarqueeStrip } from "@/components/home/MarqueeStrip";
import { Repositioning } from "@/components/home/Repositioning";
import { Reviews } from "@/components/home/Reviews";
import { SystemLayersSection } from "@/components/home/SystemLayersSection";
import { WhoWeWorkWith } from "@/components/home/WhoWeWorkWith";

export default function Home() {
  return (
    <>
      <Hero />
      <MarqueeStrip />
      <Repositioning />
      <DepthReveal />
      <SystemLayersSection />
      <Capabilities />

      {/* Section divider — AI infrastructure visual */}
      <div className="relative w-full h-[30vh] md:h-[40vh] overflow-hidden">
        <Image
          src="/images/ai-infrastructure-bg.png"
          alt=""
          fill
          className="object-cover"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAFAFA] via-transparent to-[#FAFAFA]" />
      </div>

      <HowItWorks />
      <Reviews />
      <WhoWeWorkWith />
      <FinalCTA />
    </>
  );
}
