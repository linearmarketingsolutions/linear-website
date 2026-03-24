"use client";

import { useState } from "react";
import { fadeUp, transitionBase } from "@/lib/animations";
import { motion } from "framer-motion";

type FormStatus = "idle" | "sending" | "success" | "error";

const INPUT_CLASS =
  "w-full px-4 py-3 bg-surface-2 border border-border rounded-[var(--radius-md)] text-text-primary font-body outline-none transition-[border-color] duration-150 focus-visible:border-accent placeholder:text-text-muted";

const LABEL_CLASS =
  "block font-body text-xs font-medium text-text-secondary uppercase tracking-wider mb-1.5";

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
        className="rounded-[var(--radius-lg)] p-10 bg-surface-1 border border-accent text-center"
      >
        {/* Checkmark animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
          className="flex items-center justify-center w-16 h-16 rounded-full bg-accent/15 mx-auto mb-5"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </motion.div>
        <p className="font-display font-bold text-accent text-2xl mb-2">
          Message received.
        </p>
        <p className="text-text-secondary">
          We&apos;ll be in touch within 24 hours.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div>
        <label htmlFor="name" className={LABEL_CLASS}>Name</label>
        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder="Your name"
          className={INPUT_CLASS}
        />
      </div>

      <div>
        <label htmlFor="email" className={LABEL_CLASS}>Email</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="you@company.com"
          className={INPUT_CLASS}
        />
      </div>

      <div>
        <label htmlFor="company" className={LABEL_CLASS}>Company</label>
        <input
          id="company"
          name="company"
          type="text"
          placeholder="Your company (optional)"
          className={INPUT_CLASS}
        />
      </div>

      <div>
        <label htmlFor="message" className={LABEL_CLASS}>Message</label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Tell us about your business and what you're looking to build."
          className={`${INPUT_CLASS} resize-y`}
        />
      </div>

      {status === "error" && (
        <p className="text-red-400 text-sm">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center justify-center px-8 py-4 bg-accent text-bg font-body font-semibold text-lg rounded-[var(--radius-md)] border-none cursor-pointer transition-all duration-150 hover:brightness-110 hover:shadow-[var(--shadow-glow)] disabled:opacity-70 disabled:cursor-wait"
      >
        {status === "sending" ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}
