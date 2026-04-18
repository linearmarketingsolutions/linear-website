"use client";

/**
 * NumberTicker — live-feeling count-up metric.
 *
 * Animates from `from` to `to` over `duration` ms, optionally pulses +1
 * at `pulseInterval` ms to feel live. Formatter supports abbreviations
 * ($3.2M+ / 160K / 97%). Uses requestAnimationFrame with easeOutCubic.
 */

import { useEffect, useRef, useState } from "react";

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function defaultFormat(n: number): string {
  return Math.round(n).toLocaleString("en-US");
}

type NumberTickerProps = {
  to: number;
  from?: number;
  duration?: number;
  format?: (n: number) => string;
  pulseInterval?: number;
  pulseAmount?: number;
  className?: string;
  style?: React.CSSProperties;
};

export function NumberTicker({
  to,
  from = 0,
  duration = 1800,
  format = defaultFormat,
  pulseInterval,
  pulseAmount = 1,
  className = "",
  style,
}: NumberTickerProps) {
  const [display, setDisplay] = useState(from);
  const [target, setTarget] = useState(to);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            runTo(from, target, duration);
            io.disconnect();
          }
        });
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!started.current || pulseInterval === undefined) return;
    const id = window.setInterval(() => {
      setTarget((t) => {
        const next = t + pulseAmount;
        runTo(t, next, 1200);
        return next;
      });
    }, pulseInterval);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pulseInterval, pulseAmount]);

  function runTo(start: number, end: number, ms: number) {
    const t0 = performance.now();
    function frame(now: number) {
      const p = Math.min(1, (now - t0) / ms);
      const eased = easeOutCubic(p);
      setDisplay(start + (end - start) * eased);
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  return (
    <span ref={ref} className={className} style={style}>
      {format(display)}
    </span>
  );
}
