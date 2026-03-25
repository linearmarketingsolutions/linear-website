"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

/**
 * Full-bleed energy divider image with parallax and fade-in.
 * Uses Nano Banana generated section-divider-energy image.
 */
export function SectionDivider() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;

    gsap.fromTo(
      ref.current,
      { opacity: 0, scale: 1.1 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          once: true,
        },
      }
    );
  });

  return (
    <div ref={ref} className="relative w-full h-[200px] md:h-[300px] overflow-hidden opacity-0">
      <Image
        src="/images/section-divider-energy.webp"
        alt=""
        fill
        className="object-cover object-center pointer-events-none"
      />
      {/* Fade edges into background */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#09090B] via-transparent to-[#09090B]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#09090B] via-transparent to-[#09090B]" />
    </div>
  );
}
