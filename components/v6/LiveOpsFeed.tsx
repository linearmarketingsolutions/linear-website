"use client";

/**
 * LiveOpsFeed — ticker of plausible-looking LMS ops events.
 *
 * One line at a time, rotating on a random interval. Reads like a
 * status bar in an intel dashboard. SSR-safe: renders the first entry
 * immediately, rotates client-side only.
 *
 * Events are pseudo-random but seeded — same order every mount within
 * a session so it doesn't feel chaotic.
 */

import { useEffect, useRef, useState } from "react";
import { Earmark } from "./Earmark";

type OpsEvent = {
  verb: string;
  context: string;
};

const EVENTS: OpsEvent[] = [
  { verb: "LEAD CAPTURED", context: "P2P · HALL B" },
  { verb: "POST PUBLISHED", context: "COLDBLOOD · IG" },
  { verb: "CAMPAIGN LIVE", context: "PSS · META-CBO" },
  { verb: "FORM SUBMITTED", context: "COMMIT · TRIAL-2" },
  { verb: "REPORT SHIPPED", context: "ACX · WEEKLY" },
  { verb: "CRM SYNC", context: "PASSMFT · 312 ROWS" },
  { verb: "SEO INDEX", context: "INSTALLATION-PROS · 9 URLS" },
  { verb: "LEAD CAPTURED", context: "FIT BUTTERS · LP-A" },
  { verb: "AGENT DEPLOY", context: "DISTROWATCH · v1.2" },
  { verb: "EMAIL FLIGHT", context: "KEVIN · 48 OPENS" },
  { verb: "SCHEMA UPDATE", context: "DRIFTWAY · 4 PAGES" },
  { verb: "STRIPE EVENT", context: "LEADSNAP · CHARGE.SUCCEEDED" },
];

function agoLabel(ts: number): string {
  const s = Math.max(1, Math.floor((Date.now() - ts) / 1000));
  if (s < 60) return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  return `${Math.floor(m / 60)}h ago`;
}

type LiveOpsFeedProps = {
  className?: string;
};

export function LiveOpsFeed({ className = "" }: LiveOpsFeedProps) {
  const [i, setI] = useState(0);
  const [ago, setAgo] = useState("1s ago");
  const lastTick = useRef(Date.now());

  useEffect(() => {
    lastTick.current = Date.now() - (1 + Math.floor(Math.random() * 30)) * 1000;
    setAgo(agoLabel(lastTick.current));

    const rotate = window.setInterval(
      () => {
        setI((prev) => (prev + 1) % EVENTS.length);
        lastTick.current = Date.now() - (1 + Math.floor(Math.random() * 10)) * 1000;
      },
      2500 + Math.random() * 1500,
    );

    const tickAgo = window.setInterval(() => setAgo(agoLabel(lastTick.current)), 1000);

    return () => {
      window.clearInterval(rotate);
      window.clearInterval(tickAgo);
    };
  }, []);

  const event = EVENTS[i];

  return (
    <div
      className={`inline-flex items-center gap-3 px-4 py-2 rounded-full border v6-snap ${className}`}
      style={{
        borderColor: "var(--v6-border)",
        background: "rgba(15, 11, 20, 0.6)",
        backdropFilter: "blur(8px)",
      }}
      aria-live="polite"
      aria-atomic="true"
    >
      <Earmark dot hot>
        LIVE · OPS
      </Earmark>
      <span className="w-px h-3" style={{ background: "var(--v6-border)" }} aria-hidden />
      <span
        className="v6-mono text-[11px] uppercase tracking-[0.12em]"
        style={{ color: "var(--v6-fg)" }}
      >
        {event.verb}
      </span>
      <span
        className="v6-mono text-[11px] uppercase tracking-[0.12em]"
        style={{ color: "var(--v6-fg-3)" }}
      >
        {event.context}
      </span>
      <span
        className="v6-mono text-[10px] tracking-[0.08em]"
        style={{ color: "var(--v6-fg-3)" }}
      >
        {ago}
      </span>
    </div>
  );
}
