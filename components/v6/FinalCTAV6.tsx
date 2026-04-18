"use client";

/**
 * FinalCTAV6 — terminal-styled closing moment.
 *
 * Big Geist display prompt over a 2-column grid:
 *   Left: KPI-first engagement numbers (days-to-deploy, operators, clients).
 *   Right: a mini "request deploy" console — type a message, submit.
 *
 * The form POSTs to /api/contact so existing contact-form infrastructure
 * doesn't regress. Success state flips to "OPERATOR INBOUND" with a
 * pulsing accent dot.
 */

import { useState } from "react";
import Link from "next/link";
import { Earmark } from "./Earmark";

type State =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "ok" }
  | { kind: "error"; message: string };

export function FinalCTAV6() {
  const [state, setState] = useState<State>({ kind: "idle" });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) {
      setState({ kind: "error", message: "EMAIL REQUIRED" });
      return;
    }
    setState({ kind: "submitting" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name || "—", email, message: message || "(no message)" }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setState({ kind: "ok" });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "UNKNOWN";
      setState({ kind: "error", message: `SEND FAILED · ${msg}` });
    }
  }

  return (
    <section
      className="v6-dark relative overflow-hidden"
      style={{ minHeight: "90vh" }}
      aria-labelledby="v6-final-heading"
    >
      <div className="absolute inset-0 v6-grid-bg opacity-40" aria-hidden />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 25% 40%, rgba(124,58,237,0.15), transparent 65%), radial-gradient(ellipse 40% 35% at 85% 75%, rgba(196,181,253,0.1), transparent 60%)",
        }}
        aria-hidden
      />
      <span className="v6-scanline" style={{ top: 0 }} aria-hidden />

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 py-20 md:py-28 min-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <Earmark>§ DEPLOY · SIGNAL</Earmark>
          <Earmark hot dot>
            CONSOLE READY
          </Earmark>
        </div>

        <h2
          id="v6-final-heading"
          className="v6-display-tight mt-8"
          style={{
            fontSize: "clamp(3rem, 9vw, 9rem)",
            color: "var(--v6-fg)",
            maxWidth: "16ch",
            lineHeight: 0.95,
          }}
        >
          Ship the{" "}
          <span style={{ color: "var(--v6-accent-hot)", fontStyle: "italic" }}>
            operator.
          </span>
        </h2>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <p
              className="v6-body max-w-[44ch]"
              style={{ color: "var(--v6-fg-2)" }}
            >
              One conversation scopes it. One build ships it. After that, the
              system runs — compounding against your business every day,
              whether or not you&apos;re awake.
            </p>

            <dl
              className="mt-10 grid grid-cols-3 gap-x-6 gap-y-2 border-t pt-6"
              style={{ borderColor: "var(--v6-border)" }}
            >
              <KPI value="14 days" label="AVG TO DEPLOY" />
              <KPI value="1" label="OPERATOR" />
              <KPI value="10+" label="ACTIVE CLIENTS" />
            </dl>

            <div className="mt-10 flex flex-wrap gap-6">
              <Link
                href="mailto:info@linearmarketingsolutions.com"
                className="v6-mono text-[13px] tracking-[0.12em] uppercase v6-snap"
                style={{ color: "var(--v6-fg-2)" }}
              >
                → info@linearmarketingsolutions.com
              </Link>
              <Link
                href="tel:+19283024852"
                className="v6-mono text-[13px] tracking-[0.12em] uppercase v6-snap"
                style={{ color: "var(--v6-fg-2)" }}
              >
                → +1 (928) 302-4852
              </Link>
            </div>
          </div>

          {/* Console form */}
          <form
            onSubmit={onSubmit}
            className="md:col-span-7 rounded-lg border overflow-hidden"
            style={{
              borderColor: "var(--v6-border)",
              background: "rgba(23, 18, 31, 0.72)",
              backdropFilter: "blur(10px)",
            }}
          >
            <div
              className="flex items-center justify-between px-5 py-3 border-b"
              style={{ borderColor: "var(--v6-border)" }}
            >
              <Earmark hot>LMS · REQUEST DEPLOY</Earmark>
              <Earmark>ROUTE · /api/contact</Earmark>
            </div>

            <div className="p-6 space-y-4">
              <Field
                label="OPERATOR NAME"
                value={name}
                onChange={setName}
                placeholder="Blake Pederson"
                disabled={state.kind === "submitting" || state.kind === "ok"}
              />
              <Field
                label="RESPONSE CHANNEL · EMAIL"
                value={email}
                onChange={setEmail}
                placeholder="you@company.com"
                type="email"
                required
                disabled={state.kind === "submitting" || state.kind === "ok"}
              />
              <Field
                label="DEPLOY SCOPE"
                value={message}
                onChange={setMessage}
                placeholder="Tell us what you're trying to build…"
                textarea
                disabled={state.kind === "submitting" || state.kind === "ok"}
              />

              <div className="flex items-center justify-between gap-4 pt-2">
                <div className="v6-mono text-[10px] tracking-[0.14em] uppercase" style={{ color: "var(--v6-fg-3)" }}>
                  {state.kind === "submitting" && "TRANSMITTING…"}
                  {state.kind === "ok" && <span style={{ color: "var(--v6-accent-hot)" }}>● OPERATOR INBOUND · REPLY WITHIN 24H</span>}
                  {state.kind === "error" && <span style={{ color: "#FCA5A5" }}>{state.message}</span>}
                </div>
                <button
                  type="submit"
                  disabled={state.kind === "submitting" || state.kind === "ok"}
                  className="v6-snap inline-flex items-center gap-3 px-5 py-2.5 rounded-full border disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    borderColor: "var(--v6-border-hot)",
                    background: "rgba(124, 58, 237, 0.08)",
                    color: "var(--v6-fg)",
                  }}
                >
                  <span
                    className="v6-mono text-[11px] tracking-[0.2em] uppercase"
                    style={{ color: "var(--v6-accent-hot)" }}
                  >
                    ›
                  </span>
                  <span className="v6-mono text-[12px] tracking-[0.18em] uppercase font-medium">
                    {state.kind === "ok" ? "Sent" : "Transmit"}
                  </span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function KPI({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <dt
        className="v6-display-tight"
        style={{
          fontSize: "clamp(1.5rem, 2.4vw, 2rem)",
          color: "var(--v6-accent-hot)",
          letterSpacing: "-0.02em",
        }}
      >
        {value}
      </dt>
      <dd
        className="v6-mono text-[10px] tracking-[0.14em] uppercase mt-1"
        style={{ color: "var(--v6-fg-3)" }}
      >
        {label}
      </dd>
    </div>
  );
}

type FieldProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
  disabled?: boolean;
};

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
  textarea,
  disabled,
}: FieldProps) {
  const commonProps = {
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      onChange(e.target.value),
    placeholder,
    required,
    disabled,
    className:
      "w-full bg-transparent outline-none v6-mono text-[14px] py-2 border-b focus:border-[rgba(124,58,237,0.5)] transition-colors duration-150",
    style: {
      color: "var(--v6-fg)",
      borderColor: "var(--v6-border)",
      caretColor: "var(--v6-accent-hot)",
    },
  };

  return (
    <label className="block">
      <span
        className="v6-mono text-[10px] tracking-[0.14em] uppercase block mb-2"
        style={{ color: "var(--v6-fg-3)" }}
      >
        {label}
      </span>
      {textarea ? (
        <textarea
          {...commonProps}
          rows={3}
          className={`${commonProps.className} resize-none`}
        />
      ) : (
        <input type={type} {...commonProps} />
      )}
    </label>
  );
}
