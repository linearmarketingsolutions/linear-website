"use client";

import { ALL_CATEGORIES } from "./projectsData";

interface WorkFilterProps {
  activeCategory: string | null;
  onSelect: (category: string | null) => void;
}

export function WorkFilter({ activeCategory, onSelect }: WorkFilterProps) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "var(--space-sm)",
        marginBottom: "var(--space-xl)",
      }}
    >
      <button
        type="button"
        onClick={() => onSelect(null)}
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 14,
          fontWeight: 500,
          padding: "8px 16px",
          borderRadius: "var(--radius-md)",
          border:
            activeCategory === null
              ? "1px solid var(--color-accent-primary)"
              : "1px solid var(--color-border)",
          background:
            activeCategory === null
              ? "rgba(204, 255, 0, 0.12)"
              : "var(--color-surface-1)",
          color:
            activeCategory === null
              ? "var(--color-text-primary)"
              : "var(--color-text-secondary)",
          cursor: "pointer",
          transition: "var(--transition-fast)",
        }}
      >
        All
      </button>
      {ALL_CATEGORIES.map((cat) => (
        <button
          key={cat}
          type="button"
          onClick={() => onSelect(cat)}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 14,
            fontWeight: 500,
            padding: "8px 16px",
            borderRadius: "var(--radius-md)",
            border:
              activeCategory === cat
                ? "1px solid var(--color-accent-primary)"
                : "1px solid var(--color-border)",
            background:
              activeCategory === cat
                ? "rgba(204, 255, 0, 0.12)"
                : "var(--color-surface-1)",
            color:
              activeCategory === cat
                ? "var(--color-text-primary)"
                : "var(--color-text-secondary)",
            cursor: "pointer",
            transition: "var(--transition-fast)",
          }}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
