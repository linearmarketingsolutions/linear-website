"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import type { Project } from "./projectsData";

type ProjectCardProps = {
  project: Project;
  isFilteredOut: boolean;
};

export function ProjectCard({ project, isFilteredOut }: ProjectCardProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      opacity: isFilteredOut ? 0.35 : 1,
      scale: isFilteredOut ? 0.96 : 1,
      duration: 0.3,
      ease: "power2.inOut",
    });
  }, [isFilteredOut]);

  return (
    <article
      ref={ref}
      className="group bg-surface-1 rounded-2xl overflow-hidden border border-border shadow-[var(--shadow-card)] flex flex-col transition-all duration-300 hover:border-accent/20 hover:shadow-[0_0_30px_rgba(124,58,237,0.08)]"
    >
      {/* Screenshot */}
      <div className="relative aspect-[16/10] bg-gradient-to-br from-surface-2 to-surface-1 border-b border-border overflow-hidden">
        {project.screenshot ? (
          <Image
            src={project.screenshot}
            alt={`${project.title} screenshot`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display font-bold text-text-muted/20 text-3xl tracking-tight">
              {project.title.split(" ")[0]}
            </span>
          </div>
        )}
      </div>

      <div className="p-6 flex-1 flex flex-col gap-3">
        <h3 className="font-display font-bold text-text-primary text-xl">
          {project.title}
        </h3>

        <div className="flex flex-wrap gap-1.5">
          {project.categories.map((cat) => (
            <span
              key={cat}
              className="font-mono text-[11px] text-accent/70 bg-accent/[0.08] px-2.5 py-1 rounded-full"
            >
              {cat}
            </span>
          ))}
        </div>

        <p className="text-text-secondary leading-relaxed flex-1">
          {project.result}
        </p>
      </div>
    </article>
  );
}
