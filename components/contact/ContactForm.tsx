"use client";

import { useState } from "react";
import { fadeUp, transitionBase } from "@/lib/animations";
import { motion } from "framer-motion";

type FormStatus = "idle" | "sending" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      company: (form.elements.namedItem("company") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Something went wrong.");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        variants={fadeUp}
        initial="initial"
        animate="animate"
        transition={transitionBase}
        className="rounded-[var(--radius-lg)] p-8"
        style={{
          background: "var(--color-surface-1)",
          border: "1px solid var(--color-accent-primary)",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "var(--text-h3)",
            color: "var(--color-accent-primary)",
            marginBottom: "var(--space-sm)",
          }}
        >
          Message received.
        </p>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-body)",
            color: "var(--color-text-secondary)",
          }}
        >
          We'll be in touch within 24 hours.
        </p>
      </motion.div>
    );
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 16px",
    background: "var(--color-surface-2)",
    border: "1px solid var(--color-border)",
    borderRadius: "var(--radius-md)",
    color: "var(--color-text-primary)",
    fontFamily: "var(--font-body)",
    fontSize: "var(--text-body)",
    outline: "none",
    transition: "var(--transition-fast)",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontFamily: "var(--font-body)",
    fontSize: "var(--text-small)",
    fontWeight: 500,
    color: "var(--color-text-secondary)",
    marginBottom: "var(--space-xs)",
    textTransform: "uppercase" as const,
    letterSpacing: "0.05em",
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "var(--space-lg)" }}>
      <div>
        <label htmlFor="name" style={labelStyle}>Name</label>
        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder="Your name"
          style={inputStyle}
          onFocus={(e) => (e.target.style.borderColor = "var(--color-accent-primary)")}
          onBlur={(e) => (e.target.style.borderColor = "var(--color-border)")}
        />
      </div>
      <div>
        <label htmlFor="email" style={labelStyle}>Email</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="you@company.com"
          style={inputStyle}
          onFocus={(e) => (e.target.style.borderColor = "var(--color-accent-primary)")}
          onBlur={(e) => (e.target.style.borderColor = "var(--color-border)")}
        />
      </div>
      <div>
        <label htmlFor="company" style={labelStyle}>Company</label>
        <input
          id="company"
          name="company"
          type="text"
          placeholder="Your company (optional)"
          style={inputStyle}
          onFocus={(e) => (e.target.style.borderColor = "var(--color-accent-primary)")}
          onBlur={(e) => (e.target.style.borderColor = "var(--color-border)")}
        />
      </div>
      <div>
        <label htmlFor="message" style={labelStyle}>Message</label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Tell us about your business and what you're looking to build."
          style={{ ...inputStyle, resize: "vertical" }}
          onFocus={(e) => (e.target.style.borderColor = "var(--color-accent-primary)")}
          onBlur={(e) => (e.target.style.borderColor = "var(--color-border)")}
        />
      </div>

      {status === "error" && (
        <p style={{ color: "#ef4444", fontFamily: "var(--font-body)", fontSize: "var(--text-small)" }}>
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center justify-center px-8 py-4 rounded-[var(--radius-md)] font-medium transition-all hover:brightness-110 hover:shadow-[var(--shadow-glow)]"
        style={{
          background: "var(--color-accent-primary)",
          color: "#09090B",
          fontFamily: "var(--font-body)",
          fontWeight: 600,
          fontSize: 18,
          border: "none",
          cursor: status === "sending" ? "wait" : "pointer",
          opacity: status === "sending" ? 0.7 : 1,
        }}
      >
        {status === "sending" ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}
