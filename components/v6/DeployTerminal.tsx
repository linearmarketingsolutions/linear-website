"use client";

/**
 * DeployTerminal — types a fake-but-plausible LMS deploy log.
 *
 * Sequenced lines type character-by-character at ~22ms/char with a
 * small pause between lines. Auto-loops after completion. Cursor blinks
 * when idle between lines. Sits in the hero right-column as the primary
 * "operator" visual.
 */

import { useEffect, useRef, useState } from "react";

type Line = {
  prompt?: string;
  text: string;
  kind: "prompt" | "info" | "ok" | "hot" | "muted";
  pauseAfter?: number;
};

const LINES: Line[] = [
  { prompt: "operator@lms", text: "./deploy --client acme --playbook growth", kind: "prompt", pauseAfter: 400 },
  { text: "› scanning intent signals ............................ 4,182 matched", kind: "info" },
  { text: "› drafting positioning doc ........................... v1.2 written", kind: "info" },
  { text: "› compiling site build ............................... 11.6 kB ok", kind: "ok" },
  { text: "› wiring stripe · ga4 · gsc · linear ................. 4 providers", kind: "info" },
  { text: "› seeding crm (hubspot) .............................. 312 rows ok", kind: "info" },
  { text: "› flighting email sequence (5) ....................... queued", kind: "info" },
  { text: "› agent/distrowatch v1.2 ............................. online", kind: "hot" },
  { text: "› operator online · compounding every hour", kind: "muted", pauseAfter: 2400 },
];

const CHAR_MS = 20;
const LINE_PAUSE_MS = 260;

function colorFor(kind: Line["kind"]): string {
  switch (kind) {
    case "prompt": return "var(--v6-fg)";
    case "info":   return "rgba(250, 250, 250, 0.78)";
    case "ok":     return "var(--v6-accent-soft)";
    case "hot":    return "var(--v6-accent-hot)";
    case "muted":  return "var(--v6-fg-3)";
  }
}

type DeployTerminalProps = {
  className?: string;
};

export function DeployTerminal({ className = "" }: DeployTerminalProps) {
  const [rendered, setRendered] = useState<string[]>([]);
  const [currentText, setCurrentText] = useState("");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    let charIdx = 0;
    const line = LINES[currentIdx];
    if (!line) return;

    function typeNext() {
      if (cancelled) return;
      if (charIdx <= line.text.length) {
        setCurrentText(line.text.slice(0, charIdx));
        charIdx += 1;
        window.setTimeout(typeNext, CHAR_MS);
      } else {
        window.setTimeout(
          () => {
            if (cancelled) return;
            setRendered((r) => [...r, line.text]);
            setCurrentText("");
            if (currentIdx + 1 >= LINES.length) {
              // Loop — reset after the final pause
              window.setTimeout(
                () => {
                  if (cancelled) return;
                  setRendered([]);
                  setCurrentIdx(0);
                },
                2600,
              );
            } else {
              setCurrentIdx((i) => i + 1);
            }
          },
          line.pauseAfter ?? LINE_PAUSE_MS,
        );
      }
    }

    typeNext();
    return () => {
      cancelled = true;
    };
  }, [currentIdx]);

  useEffect(() => {
    const t = window.setInterval(() => setCursorVisible((v) => !v), 500);
    return () => window.clearInterval(t);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [rendered, currentText]);

  const line = LINES[currentIdx];
  const renderLines = rendered.map((text, i) => ({ text, kind: LINES[i].kind }));

  return (
    <div
      className={`relative overflow-hidden rounded-lg border ${className}`}
      style={{
        borderColor: "var(--v6-border)",
        background: "rgba(23, 18, 31, 0.72)",
        backdropFilter: "blur(10px)",
      }}
      aria-label="LMS deploy log"
    >
      {/* Title bar */}
      <div
        className="flex items-center justify-between px-4 py-2.5 border-b"
        style={{ borderColor: "var(--v6-border)" }}
      >
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(250,250,250,0.12)" }} />
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(250,250,250,0.12)" }} />
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ background: "var(--v6-accent)", boxShadow: "0 0 8px rgba(124,58,237,0.6)" }}
          />
        </div>
        <span
          className="v6-mono text-[10px] tracking-[0.14em] uppercase"
          style={{ color: "var(--v6-fg-3)" }}
        >
          lms · operator-console
        </span>
        <span
          className="v6-mono text-[10px] tracking-[0.14em] uppercase"
          style={{ color: "var(--v6-accent-soft)" }}
        >
          ● online
        </span>
      </div>

      {/* Scrollable log */}
      <div
        ref={scrollRef}
        className="v6-mono text-[13px] leading-relaxed p-5 overflow-hidden"
        style={{ height: "320px", color: "var(--v6-fg)" }}
      >
        {renderLines.map((l, i) => (
          <div key={i} className="whitespace-pre" style={{ color: colorFor(l.kind) }}>
            {LINES[i].kind === "prompt" ? (
              <>
                <span style={{ color: "var(--v6-accent-soft)" }}>operator@lms</span>
                <span style={{ color: "var(--v6-fg-3)" }}>:</span>
                <span style={{ color: "var(--v6-accent-hot)" }}>~</span>
                <span style={{ color: "var(--v6-fg-3)" }}>$ </span>
                <span style={{ color: "var(--v6-fg)" }}>{l.text}</span>
              </>
            ) : (
              l.text
            )}
          </div>
        ))}
        {line && (
          <div className="whitespace-pre" style={{ color: colorFor(line.kind) }}>
            {line.kind === "prompt" ? (
              <>
                <span style={{ color: "var(--v6-accent-soft)" }}>operator@lms</span>
                <span style={{ color: "var(--v6-fg-3)" }}>:</span>
                <span style={{ color: "var(--v6-accent-hot)" }}>~</span>
                <span style={{ color: "var(--v6-fg-3)" }}>$ </span>
                <span style={{ color: "var(--v6-fg)" }}>{currentText}</span>
              </>
            ) : (
              currentText
            )}
            <span
              className="inline-block w-[7px] ml-0.5"
              style={{
                height: "14px",
                verticalAlign: "text-bottom",
                background: cursorVisible ? "var(--v6-accent-hot)" : "transparent",
              }}
              aria-hidden
            />
          </div>
        )}
      </div>
    </div>
  );
}
