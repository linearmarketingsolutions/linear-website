"use client";

import { SplitText } from "@/components/ui/SplitText";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { GlowBlob } from "@/components/ui/GlowBlob";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { PixelGrid } from "@/components/ui/PixelGrid";
import Link from "next/link";

export function FinalCTA() {
  return (
    <section
      id="final-cta"
      className="relative overflow-hidden min-h-[80vh] flex items-center justify-center"
    >
      {/* Pixel grid background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-15 overflow-hidden pointer-events-none">
        <PixelGrid
          cols={40}
          rows={20}
          pixelSize={5}
          gap={8}
          hoverRadius={5}
          color="rgba(255,255,255,0.02)"
          hoverColor="rgba(204, 255, 0, 0.4)"
          className="pointer-events-auto"
        />
      </div>

      <GlowBlob color="rgba(204, 255, 0, 0.5)" size={600} opacity={0.1} blur="140px" />
      <GlowBlob color="rgba(163, 230, 53, 0.4)" size={400} opacity={0.06} blur="100px" duration={15} />

      <div className="relative z-10 text-center px-6 max-w-[900px]">
        <SplitText
          as="h2"
          mode="chars"
          stagger={0.02}
          duration={0.5}
          className="font-display font-bold text-accent leading-[0.95] tracking-[-0.03em] mb-8"
          {...{ style: { fontSize: "clamp(3rem, 7vw, 100px)" } } as React.HTMLAttributes<HTMLElement>}
        >
          Ready to deploy?
        </SplitText>

        <ScrollReveal direction="up" distance={30} delay={0.3}>
          <p className="text-text-secondary text-xl leading-relaxed max-w-[40ch] mx-auto mb-12">
            One call. No pitch. A clear picture of what&apos;s possible —
            and a timeline to build it.
          </p>
        </ScrollReveal>

        <ScrollReveal direction="up" distance={20} delay={0.5}>
          <div className="flex flex-wrap justify-center gap-5">
            <MagneticButton strength={0.3}>
              <Link
                href="/contact"
                className="group relative inline-flex items-center justify-center px-12 py-6 bg-accent text-bg font-body font-bold text-xl rounded-full overflow-hidden transition-all duration-200 hover:shadow-[0_0_100px_rgba(204,255,0,0.4)]"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                <span className="relative">Begin your build</span>
              </Link>
            </MagneticButton>
            <MagneticButton strength={0.3}>
              <Link
                href="/services"
                className="inline-flex items-center justify-center px-12 py-6 font-body font-bold text-xl text-text-primary border border-white/10 bg-white/[0.03] backdrop-blur-sm rounded-full transition-all duration-300 hover:border-accent/40 hover:bg-accent/5"
              >
                View capabilities
              </Link>
            </MagneticButton>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
