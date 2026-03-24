"use client";

import { ALL_CATEGORIES } from "./projectsData";

type WorkFilterProps = {
  activeCategory: string | null;
  onSelect: (category: string | null) => void;
};

export function WorkFilter({ activeCategory, onSelect }: WorkFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-10">
      <FilterButton
        label="All"
        isActive={activeCategory === null}
        onClick={() => onSelect(null)}
      />
      {ALL_CATEGORIES.map((cat) => (
        <FilterButton
          key={cat}
          label={cat}
          isActive={activeCategory === cat}
          onClick={() => onSelect(cat)}
        />
      ))}
    </div>
  );
}

function FilterButton({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`font-body text-sm font-medium px-4 py-2 rounded-[var(--radius-md)] border cursor-pointer transition-all duration-150 ${
        isActive
          ? "border-accent bg-accent/10 text-text-primary"
          : "border-border bg-surface-1 text-text-secondary hover:border-accent/30 hover:text-text-primary"
      }`}
    >
      {label}
    </button>
  );
}
