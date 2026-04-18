/**
 * MetadataLabel — the "OUTPUT 96 / SEED: 3573860127" ornament.
 *
 * Deterministic SSR-safe output — same seed on server + client.
 * Reads as technical chrome from a research-lab UI, adds zero functional weight.
 */

type MetadataLabelProps = {
  output?: number;
  seed?: string;
  version?: string;
  className?: string;
  style?: React.CSSProperties;
};

function hashSeed(input: string): string {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0).toString(16).padStart(8, "0");
}

export function MetadataLabel({
  output = 42,
  seed,
  version = "v5.0.0",
  className = "",
  style,
}: MetadataLabelProps) {
  const resolvedSeed = seed ?? hashSeed(`lms-${output}-${version}`);
  return (
    <div
      className={`v5-label flex items-center gap-3 ${className}`}
      style={style}
      aria-hidden
    >
      <span>OUTPUT {output.toString().padStart(2, "0")}</span>
      <span className="opacity-40">·</span>
      <span>SEED {resolvedSeed}</span>
      <span className="opacity-40">·</span>
      <span>{version}</span>
    </div>
  );
}

type LiveIndicatorProps = {
  label?: string;
  className?: string;
  style?: React.CSSProperties;
};

export function LiveIndicator({
  label = "SYSTEM ONLINE",
  className = "",
  style,
}: LiveIndicatorProps) {
  return (
    <div
      className={`v5-label inline-flex items-center gap-2 ${className}`}
      style={style}
    >
      <span className="relative inline-flex h-1.5 w-1.5">
        <span
          className="absolute inset-0 rounded-full"
          style={{ background: "var(--color-v5-accent-glow)" }}
        />
        <span
          className="absolute inset-0 rounded-full v5-blink"
          style={{ background: "var(--color-v5-accent-glow)" }}
        />
      </span>
      <span>{label}</span>
    </div>
  );
}
