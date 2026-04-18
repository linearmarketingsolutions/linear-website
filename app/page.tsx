import { CapabilityMatrix } from "@/components/v5/CapabilityMatrix";
import { CaseStudyChapter } from "@/components/v5/CaseStudyChapter";
import { FinalCTAV5 } from "@/components/v5/FinalCTAV5";
import { HeroV5 } from "@/components/v5/HeroV5";
import { MetadataStrip } from "@/components/v5/MetadataStrip";
import { NumberedSteps } from "@/components/v5/NumberedSteps";
import { TrustBand } from "@/components/v5/TrustBand";

export default function Home() {
  return (
    <>
      <HeroV5 />
      <MetadataStrip output={12} />
      <NumberedSteps />
      <CapabilityMatrix />
      <MetadataStrip output={24} />
      <CaseStudyChapter />
      <TrustBand />
      <FinalCTAV5 />
    </>
  );
}
