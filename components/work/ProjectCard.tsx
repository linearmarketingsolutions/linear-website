"use client";

import { motion } from "framer-motion";
import type { Project } from "./projectsData";

interface ProjectCardProps {
  project: Project;
  isFilteredOut: boolean;
}

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
      style={{
        background: "var(--color-surface-1)",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        border: "1px solid var(--color-border)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Screenshot placeholder — labeled for easy swap */}
      <div
        className="relative flex items-center justify-center text-center"
        style={{
          aspectRatio: "16/10",
          background:
            "linear-gradient(135deg, var(--color-surface-2) 0%, var(--color-bg) 100%)",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-small)",
            color: "var(--color-text-muted)",
          }}
        >
          [Screenshot placeholder — swap for real asset]
        </span>
      </div>
      <div
        style={{
          padding: "var(--space-lg)",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-sm)",
        }}
      >
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "var(--text-h3)",
            color: "var(--color-text-primary)",
          }}
        >
          {project.title}
        </h3>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "var(--space-xs)",
          }}
        >
          {project.categories.map((cat) => (
            <span
              key={cat}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 12,
                color: "var(--color-text-muted)",
                background: "var(--color-surface-2)",
                padding: "4px 8px",
                borderRadius: "var(--radius-sm)",
              }}
            >
              {cat}
            </span>
          ))}
        </div>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-body)",
            color: "var(--color-text-secondary)",
            lineHeight: 1.5,
            flex: 1,
          }}
        >
          {project.result}
        </p>
        <a
          href="#"
          title="Case study coming soon"
          className="inline-flex items-center text-sm font-medium mt-auto"
          style={{
            color: "var(--color-accent-primary)",
            fontFamily: "var(--font-body)",
          }}
        >
          View operation →
        </a>
      </div>
    </motion.article>
  );
}
