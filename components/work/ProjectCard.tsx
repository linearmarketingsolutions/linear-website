"use client";

import { motion } from "framer-motion";
import type { Project } from "./projectsData";

type ProjectCardProps = {
  project: Project;
  isFilteredOut: boolean;
};

export function ProjectCard({ project, isFilteredOut }: ProjectCardProps) {
  return (
    <motion.article
      layout
      initial={false}
      animate={{
        opacity: isFilteredOut ? 0.35 : 1,
        scale: isFilteredOut ? 0.96 : 1,
      }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="group bg-surface-1 rounded-[var(--radius-lg)] overflow-hidden border border-border flex flex-col transition-all duration-300 hover:border-accent/20 hover:shadow-[var(--shadow-glow)]"
    >
      {/* Screenshot placeholder */}
      <div className="relative flex items-center justify-center text-center aspect-[16/10] bg-gradient-to-br from-surface-2 to-bg border-b border-border">
        <span className="font-mono text-xs text-text-muted">
          [Screenshot — swap for real asset]
        </span>
      </div>

      <div className="p-6 flex-1 flex flex-col gap-2">
        <h3 className="font-display font-bold text-text-primary text-xl">
          {project.title}
        </h3>

        <div className="flex flex-wrap gap-1.5">
          {project.categories.map((cat) => (
            <span
              key={cat}
              className="font-body text-xs text-text-muted bg-surface-2 px-2 py-1 rounded-[var(--radius-sm)]"
            >
              {cat}
            </span>
          ))}
        </div>

        <p className="text-text-secondary leading-relaxed flex-1">
          {project.result}
        </p>

        <a
          href="#"
          title="Case study coming soon"
          className="inline-flex items-center text-sm font-medium text-accent mt-2 group-hover:underline"
        >
          View operation
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1 transition-transform duration-200 group-hover:translate-x-1">
            <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
          </svg>
        </a>
      </div>
    </motion.article>
  );
}
