/**
 * Earmark — the Palantir-signature uppercase tracking label.
 *
 * Every card/section/KPI in the v6 system is prefixed with one of these.
 * The label carries a taxonomy (CLIENT · MFG, DEPLOY · STAGE-2, PLAYBOOK ·
 * AMAZON-SEO). Single accent lever.
 */

type EarmarkProps = {
  children: React.ReactNode;
  className?: string;
  hot?: boolean;
  dot?: boolean;
  style?: React.CSSProperties;
};

export function Earmark({
  children,
  className = "",
  hot = false,
  dot = false,
  style,
}: EarmarkProps) {
  return (
    <span
      className={`v6-earmark ${hot ? "v6-earmark-hot" : ""} inline-flex items-center gap-2 ${className}`}
      style={style}
    >
      {dot && (
        <span
          className="inline-block w-1.5 h-1.5 rounded-full v6-pulse"
          style={{ background: "var(--v6-accent-soft)" }}
          aria-hidden
        />
      )}
      {children}
    </span>
  );
}
