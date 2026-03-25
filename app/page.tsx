import { Capabilities } from "@/components/home/Capabilities";
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
      <SystemLayersSection />
      <Capabilities />
      <HowItWorks />
      <Reviews />
      <WhoWeWorkWith />
      <FinalCTA />
    </>
  );
}
