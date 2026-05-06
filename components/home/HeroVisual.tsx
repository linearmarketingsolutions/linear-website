"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

/**
 * HeroVisual — placeholder for the upcoming Lottie L-mark assembly animation.
 *
 * Until `~/LMS/internal/linear-website/public/lottie/lms-mark-assembly.json`
 * lands, this renders a static isometric architectural composition: tilted
 * violet faces in the cmcc.vc cube-cluster spirit, with the v4 LMS lockup
 * floating on the brightest plane. Subtle idle drift via motion.
 *
 * Replace this file's body with the Lottie player once the JSON is delivered;
 * the surrounding Hero layout doesn't need to change.
 */
export function HeroVisual() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || reduce) return;
    const el = ref.current;
    let raf = 0;
    let mx = 0,
      my = 0,
      tx = 0,
      ty = 0;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      mx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      my = ((e.clientY - r.top) / r.height - 0.5) * 2;
    };
    const onLeave = () => {
      mx = 0;
      my = 0;
    };
    const tick = () => {
      tx += (mx - tx) * 0.06;
      ty += (my - ty) * 0.06;
      el.style.setProperty("--tx", `${tx}`);
      el.style.setProperty("--ty", `${ty}`);
      raf = requestAnimationFrame(tick);
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(tick);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [reduce]);

  return (
    <div
      ref={ref}
      className="relative w-full h-full isolate"
      style={{
        transformStyle: "preserve-3d",
        perspective: "1400px",
      }}
      aria-hidden="true"
    >
      {/* Far back violet block — deepest plane */}
      <motion.div
        className="absolute right-[6%] top-[8%] w-[72%] h-[68%] rounded-[28px]"
        style={{
          background:
            "linear-gradient(135deg, #A78BFA 0%, #7C3AED 55%, #4C1D95 100%)",
          boxShadow:
            "60px 90px 120px rgba(76, 29, 149, 0.35), inset 0 0 80px rgba(255,255,255,0.06)",
          transform:
            "rotateX(calc(var(--ty, 0) * -3deg)) rotateY(calc(var(--tx, 0) * 4deg + 18deg)) rotateZ(-6deg)",
          transformOrigin: "center center",
        }}
        animate={reduce ? undefined : { y: [0, -8, 0] }}
        transition={{ duration: 8, ease: "easeInOut", repeat: Infinity }}
      />

      {/* Mid cream plane — paper/architectural surface */}
      <motion.div
        className="absolute right-[18%] top-[20%] w-[52%] h-[52%] rounded-[24px] overflow-hidden"
        style={{
          background:
            "linear-gradient(150deg, #FFFFFF 0%, #F5F3FF 60%, #EDE9FE 100%)",
          boxShadow:
            "30px 50px 80px rgba(31, 17, 71, 0.18), inset 0 0 50px rgba(124,58,237,0.04)",
          transform:
            "rotateX(calc(var(--ty, 0) * -4deg)) rotateY(calc(var(--tx, 0) * 5deg + 12deg)) rotateZ(-3deg) translateZ(40px)",
          transformOrigin: "center center",
        }}
        animate={reduce ? undefined : { y: [0, -4, 0] }}
        transition={{ duration: 6.5, ease: "easeInOut", repeat: Infinity, delay: 0.4 }}
      >
        <div className="absolute inset-0 flex items-center justify-center p-[12%]">
          <Image
            src="/lms-mark.svg"
            alt=""
            width={400}
            height={400}
            className="w-[68%] h-auto select-none drop-shadow-[0_20px_40px_rgba(124,58,237,0.25)]"
            priority
          />
        </div>
      </motion.div>

      {/* Foreground accent block — small violet face */}
      <motion.div
        className="absolute right-[30%] top-[44%] w-[26%] h-[28%] rounded-[18px]"
        style={{
          background:
            "linear-gradient(135deg, #C4B5FD 0%, #8B5CF6 100%)",
          boxShadow:
            "18px 30px 50px rgba(124, 58, 237, 0.28)",
          transform:
            "rotateX(calc(var(--ty, 0) * -5deg)) rotateY(calc(var(--tx, 0) * 6deg + 8deg)) rotateZ(2deg) translateZ(80px)",
          transformOrigin: "center center",
        }}
        animate={reduce ? undefined : { y: [0, 5, 0], rotate: [2, 4, 2] }}
        transition={{ duration: 5.5, ease: "easeInOut", repeat: Infinity, delay: 0.8 }}
      />

      {/* Small ink-side block — depth contrast, lower-right */}
      <motion.div
        className="absolute right-[2%] bottom-[10%] w-[20%] h-[18%] rounded-[14px]"
        style={{
          background:
            "linear-gradient(160deg, #1F1147 0%, #0F0A1F 100%)",
          boxShadow:
            "12px 22px 36px rgba(15, 10, 31, 0.35)",
          transform:
            "rotateX(calc(var(--ty, 0) * -4deg)) rotateY(calc(var(--tx, 0) * 4deg + 22deg)) rotateZ(-8deg) translateZ(60px)",
          transformOrigin: "center center",
        }}
        animate={reduce ? undefined : { y: [0, -3, 0] }}
        transition={{ duration: 7, ease: "easeInOut", repeat: Infinity, delay: 1.2 }}
      />

      {/* Tiny background scaffolding squares — depth filler upper-right */}
      <div className="absolute right-[2%] top-[2%] flex gap-2 opacity-50">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="w-3 h-3 rounded-sm"
            style={{
              background: i === 1 ? "#7C3AED" : "#C4B5FD",
              transform: `translateY(${i * 4}px) rotate(${i * 6}deg)`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
