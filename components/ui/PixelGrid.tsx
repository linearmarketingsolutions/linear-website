"use client";

import { useRef, useEffect, useCallback } from "react";

type PixelGridProps = {
  /** Grid columns (default 30) */
  cols?: number;
  /** Grid rows (default 13) */
  rows?: number;
  /** Pixel size in px (default 8) */
  pixelSize?: number;
  /** Gap between pixels in px (default 4) */
  gap?: number;
  /** Default pixel color (default "rgba(255,255,255,0.03)") */
  color?: string;
  /** Hover pixel color (default "#CCFF00") */
  hoverColor?: string;
  /** Hover radius in grid cells (default 3) */
  hoverRadius?: number;
  className?: string;
};

/**
 * Interactive pixel grid (inspired by etherfuse.com).
 * Grid of dots that light up in a radius around the cursor.
 * Each pixel has a randomized transition delay for organic feel.
 */
export function PixelGrid({
  cols = 30,
  rows = 13,
  pixelSize = 6,
  gap = 6,
  color = "rgba(255,255,255,0.04)",
  hoverColor = "rgba(204, 255, 0, 0.6)",
  hoverRadius = 4,
  className = "",
}: PixelGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const pixelsRef = useRef<HTMLDivElement[]>([]);
  const rafRef = useRef<number>(0);
  const mousePos = useRef({ x: -1000, y: -1000 });

  const setPixelRef = useCallback((el: HTMLDivElement | null, index: number) => {
    if (el) pixelsRef.current[index] = el;
  }, []);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const onMove = (e: MouseEvent) => {
      const rect = grid.getBoundingClientRect();
      mousePos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const onLeave = () => {
      mousePos.current = { x: -1000, y: -1000 };
    };

    grid.addEventListener("mousemove", onMove);
    grid.addEventListener("mouseleave", onLeave);

    const cellSize = pixelSize + gap;
    const animate = () => {
      const { x, y } = mousePos.current;
      const pixels = pixelsRef.current;

      for (let i = 0; i < pixels.length; i++) {
        const px = pixels[i];
        if (!px) continue;

        const col = i % cols;
        const row = Math.floor(i / cols);
        const cx = col * cellSize + pixelSize / 2;
        const cy = row * cellSize + pixelSize / 2;
        const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
        const maxDist = hoverRadius * cellSize;

        if (dist < maxDist) {
          const intensity = 1 - dist / maxDist;
          px.style.backgroundColor = hoverColor;
          px.style.opacity = String(0.15 + intensity * 0.85);
          px.style.transform = `scale(${1 + intensity * 0.4})`;
        } else {
          px.style.backgroundColor = color;
          px.style.opacity = "1";
          px.style.transform = "scale(1)";
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      grid.removeEventListener("mousemove", onMove);
      grid.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, [cols, rows, pixelSize, gap, color, hoverColor, hoverRadius]);

  return (
    <div
      ref={gridRef}
      className={`pointer-events-auto ${className}`}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, ${pixelSize}px)`,
        gridTemplateRows: `repeat(${rows}, ${pixelSize}px)`,
        gap: `${gap}px`,
      }}
    >
      {Array.from({ length: cols * rows }).map((_, i) => (
        <div
          key={i}
          ref={(el) => setPixelRef(el, i)}
          className="rounded-full"
          style={{
            width: pixelSize,
            height: pixelSize,
            backgroundColor: color,
            transition: `background-color ${20 + Math.random() * 230}ms ease, opacity ${20 + Math.random() * 230}ms ease, transform ${20 + Math.random() * 230}ms ease`,
          }}
        />
      ))}
    </div>
  );
}
