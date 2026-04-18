"use client";

/**
 * TrustBand — quiet proof band.
 *
 * Single testimonial, client roster in JetBrains Mono, no card grid, no
 * star ratings. Reads like a credits block in a film, not a logo wall.
 */

const CLIENTS = [
  "Pass MFT",
  "P2P Distribution",
  "Playing Surface Sports",
  "Fit Butters",
  "Commit Fitness",
  "ACX Technologies",
  "Driftway",
  "Installation Pros",
];

export function TrustBand() {
  return (
    <section
      className="v5-dark relative py-24 md:py-32"
      aria-labelledby="v5-trust-heading"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-7">
          <div className="v5-eyebrow mb-6">§ Testimonial · 001</div>
          <blockquote
            className="v5-display"
            style={{
              fontSize: "clamp(1.75rem, 3.5vw, 3rem)",
              color: "var(--color-v5-fg-warm)",
              lineHeight: 1.15,
              fontStyle: "italic",
              fontVariationSettings: '"SOFT" 80, "WONK" 0, "opsz" 144',
            }}
          >
            <span
              style={{ color: "var(--color-v5-accent-glow)" }}
              aria-hidden
            >
              &ldquo;
            </span>
            Blake operates like a one-person growth department — strategy,
            build, ship, measurement. The kind of partner we stopped
            believing existed.
            <span
              style={{ color: "var(--color-v5-accent-glow)" }}
              aria-hidden
            >
              &rdquo;
            </span>
          </blockquote>
          <footer className="mt-8 v5-mono text-sm tracking-wide">
            <span style={{ color: "var(--color-text-primary)" }}>
              STEVE STARK
            </span>
            <span
              className="mx-3"
              style={{ color: "var(--color-text-muted)" }}
              aria-hidden
            >
              ·
            </span>
            <span style={{ color: "var(--color-text-muted)" }}>
              P2P DISTRIBUTION · OWNER
            </span>
          </footer>
        </div>

        <div className="md:col-span-5">
          <div
            className="v5-eyebrow mb-6"
            id="v5-trust-heading"
          >
            § Operating for
          </div>
          <ul className="space-y-3">
            {CLIENTS.map((client, i) => (
              <li
                key={client}
                className="v5-mono text-sm flex items-baseline gap-4"
              >
                <span
                  style={{ color: "var(--color-v5-accent-glow)", opacity: 0.6 }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  style={{
                    color: "var(--color-text-primary)",
                    letterSpacing: "0.04em",
                  }}
                >
                  {client}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
