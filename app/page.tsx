import { CapabilityBento } from "@/components/v6/CapabilityBento";
import { CoverageMap } from "@/components/v6/CoverageMap";
import { DirectoryList } from "@/components/v6/DirectoryList";
import { EarmarkBar } from "@/components/v6/EarmarkBar";
import { FinalCTAV6 } from "@/components/v6/FinalCTAV6";
import { HeroV6 } from "@/components/v6/HeroV6";
import { ImpactSpotlight } from "@/components/v6/ImpactSpotlight";
import { SystemLayersV6 } from "@/components/v6/SystemLayersV6";

export default function Home() {
  return (
    <>
      <HeroV6 />
      <EarmarkBar />
      <CapabilityBento />
      <SystemLayersV6 />
      <DirectoryList />
      <CoverageMap />
      <ImpactSpotlight />
      <FinalCTAV6 />
    </>
  );
}
