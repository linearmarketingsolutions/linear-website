"use client";

/**
 * CommandPalette — ⌘K global navigator.
 *
 * Site-wide operator tool. Triggers on ⌘K / Ctrl+K anywhere on the page.
 * Fuzzy-matches across routes, services, case studies, and meta actions
 * (email, call, copy command). Makes the whole site feel operator-grade.
 *
 * Built on `cmdk`. Dialog blur-overlay, purple accent on the input caret,
 * earmark taxonomy labels on every result row.
 */

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Command } from "cmdk";
import { Earmark } from "./Earmark";

type Action = {
  id: string;
  label: string;
  kind: "route" | "service" | "work" | "meta";
  hint?: string;
  run: () => void;
};

export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const go = useCallback(
    (href: string) => {
      setOpen(false);
      router.push(href);
    },
    [router],
  );

  const actions: Action[] = [
    { id: "home", label: "Home", kind: "route", run: () => go("/") },
    { id: "work", label: "Work — selected case studies", kind: "route", run: () => go("/work") },
    { id: "about", label: "About — the operator", kind: "route", run: () => go("/about") },
    { id: "contact", label: "Contact — request deploy", kind: "route", run: () => go("/contact") },
    { id: "services", label: "Services — all modules", kind: "route", run: () => go("/services") },
    { id: "platform", label: "Platform — AI stack", kind: "route", run: () => go("/ai-tools") },

    { id: "growth", label: "Growth Engine", kind: "service", hint: "Full-funnel strategy + campaigns", run: () => go("/services/growth-engine") },
    { id: "content", label: "Content Pipeline", kind: "service", hint: "AI-assisted content at scale", run: () => go("/services/content-pipeline") },
    { id: "webdev", label: "Web & App Development", kind: "service", hint: "Next.js + Webflow builds", run: () => go("/services/web-development") },
    { id: "aiinfra", label: "AI Infrastructure", kind: "service", hint: "Agents · automation · CRM", run: () => go("/services/ai-infrastructure") },
    { id: "bizops", label: "Business Operations", kind: "service", hint: "CRM · analytics · enablement", run: () => go("/services/business-operations") },
    { id: "edu", label: "AI Education", kind: "service", hint: "Team onboarding + training", run: () => go("/services/ai-education") },

    {
      id: "mail",
      label: "Email — info@linearmarketingsolutions.com",
      kind: "meta",
      hint: "Open in client",
      run: () => {
        setOpen(false);
        window.location.href = "mailto:info@linearmarketingsolutions.com";
      },
    },
    {
      id: "copy-email",
      label: "Copy email address",
      kind: "meta",
      hint: "Clipboard",
      run: async () => {
        setOpen(false);
        try {
          await navigator.clipboard.writeText("info@linearmarketingsolutions.com");
        } catch {
          // silent
        }
      },
    },
    {
      id: "call",
      label: "Call — +1 (928) 302-4852",
      kind: "meta",
      hint: "Open tel:",
      run: () => {
        setOpen(false);
        window.location.href = "tel:+19283024852";
      },
    },
  ];

  const groups: Record<Action["kind"], Action[]> = {
    route: actions.filter((a) => a.kind === "route"),
    service: actions.filter((a) => a.kind === "service"),
    work: actions.filter((a) => a.kind === "work"),
    meta: actions.filter((a) => a.kind === "meta"),
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
      className="fixed inset-0 z-[2000] flex items-start justify-center pt-[16vh] px-4"
      style={{ background: "rgba(6, 4, 10, 0.65)", backdropFilter: "blur(8px)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) setOpen(false);
      }}
    >
      <Command
        label="Command palette"
        className="w-full max-w-[620px] rounded-xl border overflow-hidden shadow-2xl"
        style={{
          background: "var(--v6-bg)",
          borderColor: "var(--v6-border)",
          boxShadow: "0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(124,58,237,0.18)",
        }}
      >
        <div
          className="flex items-center gap-3 px-5 py-4 border-b"
          style={{ borderColor: "var(--v6-border)" }}
        >
          <Earmark hot>LMS · COMMAND</Earmark>
          <Command.Input
            autoFocus
            placeholder="Type a command or search…"
            className="flex-1 bg-transparent outline-none v6-mono text-[14px]"
            style={{ color: "var(--v6-fg)", caretColor: "var(--v6-accent-hot)" }}
          />
          <kbd
            className="v6-mono text-[10px] px-1.5 py-0.5 rounded border"
            style={{
              color: "var(--v6-fg-3)",
              borderColor: "var(--v6-border)",
              background: "rgba(23,18,31,0.5)",
            }}
          >
            ESC
          </kbd>
        </div>

        <Command.List
          className="max-h-[54vh] overflow-auto py-2"
          style={{ color: "var(--v6-fg)" }}
        >
          <Command.Empty
            className="px-5 py-6 v6-mono text-[12px]"
            style={{ color: "var(--v6-fg-3)" }}
          >
            No matches. Try: growth, content, web, ai, contact.
          </Command.Empty>

          <PaletteGroup heading="ROUTES" items={groups.route} />
          <PaletteGroup heading="SERVICES" items={groups.service} />
          <PaletteGroup heading="META" items={groups.meta} />
        </Command.List>
      </Command>
    </div>
  );
}

function PaletteGroup({ heading, items }: { heading: string; items: Action[] }) {
  if (items.length === 0) return null;
  return (
    <Command.Group
      heading={
        <span
          className="v6-earmark"
          style={{ color: "var(--v6-fg-3)" }}
        >
          {heading}
        </span>
      }
      className="px-2 pb-2"
    >
      {items.map((a) => (
        <Command.Item
          key={a.id}
          value={`${a.label} ${a.hint ?? ""}`}
          onSelect={a.run}
          className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-md cursor-pointer data-[selected=true]:bg-[rgba(124,58,237,0.14)]"
          style={{ color: "var(--v6-fg)" }}
        >
          <span className="v6-mono text-[13px]">{a.label}</span>
          {a.hint && (
            <span
              className="v6-mono text-[11px] tracking-[0.1em]"
              style={{ color: "var(--v6-fg-3)" }}
            >
              {a.hint}
            </span>
          )}
        </Command.Item>
      ))}
    </Command.Group>
  );
}
