"use client";

import createGlobe, { type COBEOptions } from "cobe";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

// cobe v2.0.1 ships onRender at runtime but omits it from the .d.ts.
// Augment the published type so the callsite typechecks cleanly.
type CobeOptionsWithRender = COBEOptions & {
  onRender?: (state: Record<string, number>) => void;
};

type CobeGlobeProps = {
  className?: string;
  size?: number;
};

/**
 * Interactive 3D globe (Cobe) — tuned to LMS violet palette, pinned to the
 * SoCal regions where LMS actively serves clients. Auto-rotates with subtle
 * cursor-driven phi offset for life.
 */
export function CobeGlobe({ className, size = 500 }: CobeGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerRef = useRef(0);
  const phiRef = useRef(0);
  const widthRef = useRef(size);

  useEffect(() => {
    if (!canvasRef.current) return;
    const onResize = () => {
      if (canvasRef.current) widthRef.current = canvasRef.current.offsetWidth;
    };
    onResize();
    window.addEventListener("resize", onResize);

    const opts: CobeOptionsWithRender = {
      devicePixelRatio: 2,
      width: widthRef.current * 2,
      height: widthRef.current * 2,
      phi: 0,
      theta: 0.3,
      dark: 1,
      diffuse: 1.4,
      mapSamples: 16000,
      mapBrightness: 5,
      baseColor: [0.15, 0.15, 0.25],
      markerColor: [0.486, 0.227, 0.929], // #7C3AED
      glowColor: [0.541, 0.361, 0.965], // #8B5CF6
      markers: [
        { location: [34.106, -117.594], size: 0.12 }, // Rancho Cucamonga (HQ)
        { location: [34.052, -118.243], size: 0.06 }, // Los Angeles
        { location: [33.953, -117.396], size: 0.06 }, // Riverside / IE
        { location: [33.641, -117.918], size: 0.06 }, // Costa Mesa / OC
        { location: [32.715, -117.161], size: 0.06 }, // San Diego
      ],
      onRender: (state) => {
        phiRef.current += 0.0035;
        state.phi = phiRef.current + pointerRef.current;
        state.width = widthRef.current * 2;
        state.height = widthRef.current * 2;
      },
    };
    const globe = createGlobe(canvasRef.current, opts as COBEOptions);

    const onPointerMove = (e: PointerEvent) => {
      if (!canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      const dx = (e.clientX - rect.left - rect.width / 2) / rect.width;
      pointerRef.current = dx * 0.6;
    };
    canvasRef.current.addEventListener("pointermove", onPointerMove);
    const cleanupEl = canvasRef.current;

    return () => {
      cleanupEl?.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", onResize);
      globe.destroy();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: "100%",
        height: "100%",
        maxWidth: size,
        maxHeight: size,
        aspectRatio: 1,
      }}
      className={cn("opacity-90", className)}
    />
  );
}
