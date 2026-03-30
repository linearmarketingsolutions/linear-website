"use client";

import { useState, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

type FormStatus = "idle" | "sending" | "success" | "error";

const INPUT_CLASS =
  "w-full px-4 py-3 bg-surface-2 border border-border rounded-[var(--radius-md)] text-text-primary font-body outline-none transition-[border-color] duration-150 focus-visible:border-accent placeholder:text-text-muted";

const LABEL_CLASS =
  "block font-body text-xs font-medium text-text-secondary uppercase tracking-wider mb-1.5";

const SELECT_CLASS =
  `${INPUT_CLASS} appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2371717a%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px] bg-[right_12px_center] bg-no-repeat pr-10`;

const SERVICE_OPTIONS = [
  "Growth Engine (Marketing Strategy)",
  "Content Pipeline",
  "Web & App Development",
  "AI Infrastructure",
  "Business Operations",
  "AI Education & Training",
  "Multiple / Not sure yet",
];

const BUDGET_OPTIONS = [
  "Under $2,500/mo",
  "$2,500 – $5,000/mo",
  "$5,000 – $10,000/mo",
  "$10,000+/mo",
  "Project-based (one-time)",
  "Let's discuss",
];

function SuccessMessage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current || !iconRef.current) return;
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power2.inOut" },
      );
      gsap.fromTo(
        iconRef.current,
        { scale: 0 },
        { scale: 1, duration: 0.6, delay: 0.1, ease: "back.out(2.5)" },
      );
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      style={{ opacity: 0 }}
      className="rounded-[var(--radius-lg)] p-10 bg-surface-1 border border-accent text-center"
    >
      <div
        ref={iconRef}
        style={{ transform: "scale(0)" }}
        className="flex items-center justify-center w-16 h-16 rounded-full bg-accent/15 mx-auto mb-5"
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-accent"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <p className="font-display font-bold text-accent text-2xl mb-2">
        Message received.
      </p>
      <p className="text-text-secondary">
        We&apos;ll be in touch within 24 hours.
      </p>
    </div>
  );
}

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    const form = e.currentTarget;
    const fd = form.elements;
    const data = {
      name: (fd.namedItem("name") as HTMLInputElement).value,
      email: (fd.namedItem("email") as HTMLInputElement).value,
      phone: (fd.namedItem("phone") as HTMLInputElement).value || undefined,
      company: (fd.namedItem("company") as HTMLInputElement).value || undefined,
      website: (fd.namedItem("website") as HTMLInputElement).value || undefined,
      service: (fd.namedItem("service") as HTMLSelectElement).value || undefined,
      budget: (fd.namedItem("budget") as HTMLSelectElement).value || undefined,
      referral: (fd.namedItem("referral") as HTMLInputElement).value || undefined,
      message: (fd.namedItem("message") as HTMLTextAreaElement).value,
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
      setErrorMsg(
        err instanceof Error ? err.message : "Something went wrong.",
      );
    }
  }

  if (status === "success") {
    return <SuccessMessage />;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Row 1 — Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className={LABEL_CLASS}>
            Name *
          </label>
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
          <label htmlFor="email" className={LABEL_CLASS}>
            Email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@company.com"
            className={INPUT_CLASS}
          />
        </div>
      </div>

      {/* Row 2 — Phone + Company */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="phone" className={LABEL_CLASS}>
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="(555) 555-5555"
            className={INPUT_CLASS}
          />
        </div>
        <div>
          <label htmlFor="company" className={LABEL_CLASS}>
            Company
          </label>
          <input
            id="company"
            name="company"
            type="text"
            placeholder="Your company"
            className={INPUT_CLASS}
          />
        </div>
      </div>

      {/* Website */}
      <div>
        <label htmlFor="website" className={LABEL_CLASS}>
          Website
        </label>
        <input
          id="website"
          name="website"
          type="url"
          placeholder="https://yourcompany.com"
          className={INPUT_CLASS}
        />
      </div>

      {/* Row 3 — Service + Budget */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="service" className={LABEL_CLASS}>
            What do you need?
          </label>
          <select id="service" name="service" className={SELECT_CLASS}>
            <option value="">Select a service</option>
            {SERVICE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="budget" className={LABEL_CLASS}>
            Budget range
          </label>
          <select id="budget" name="budget" className={SELECT_CLASS}>
            <option value="">Select a range</option>
            {BUDGET_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Referral */}
      <div>
        <label htmlFor="referral" className={LABEL_CLASS}>
          How did you find us?
        </label>
        <input
          id="referral"
          name="referral"
          type="text"
          placeholder="Google, referral, social media..."
          className={INPUT_CLASS}
        />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className={LABEL_CLASS}>
          Tell us about your project *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="What are you building? What problems are you trying to solve? What does success look like?"
          className={`${INPUT_CLASS} resize-y`}
        />
      </div>

      {status === "error" && (
        <p role="alert" className="text-red-600 text-sm">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#7C3AED] to-[#6366F1] text-white font-body font-semibold text-lg rounded-[var(--radius-md)] border-none cursor-pointer transition-all duration-150 hover:brightness-110 hover:shadow-[var(--shadow-glow)] disabled:opacity-70 disabled:cursor-wait"
      >
        {status === "sending" ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}
