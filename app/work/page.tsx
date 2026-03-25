"use client";

import { useState, useMemo } from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { WorkHero } from "@/components/work/WorkHero";
import { WorkFilter } from "@/components/work/WorkFilter";
import { ProjectCard } from "@/components/work/ProjectCard";
import { PROJECTS } from "@/components/work/projectsData";
import { motion } from "framer-motion";

export default function Work() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredProjects = useMemo(() => {
    if (!activeCategory) return PROJECTS;
    return PROJECTS.filter((p) => p.categories.includes(activeCategory));
  }, [activeCategory]);

  return (
    <>
      <WorkHero />
      <Section id="work-grid" className="light-section">
        <Container>
          <WorkFilter
            activeCategory={activeCategory}
            onSelect={setActiveCategory}
          />
          <motion.div
            layout
            className="layout-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: "var(--space-lg)",
            }}
          >
            {PROJECTS.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                isFilteredOut={
                  activeCategory !== null &&
                  !project.categories.includes(activeCategory)
                }
              />
            ))}
          </motion.div>
        </Container>
      </Section>
    </>
  );
}
