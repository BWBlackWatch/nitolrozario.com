"use client";

import { useState } from "react";
import type { Project } from "@/lib/getProjects";
import ProjectCard from "./ProjectCard";

interface ProjectListProps {
  projects: Project[];
  initialOpenId?: string;
}

export default function ProjectList({
  projects,
  initialOpenId,
}: ProjectListProps) {
  const [openId, setOpenId] = useState<string | null>(initialOpenId ?? null);

  const handleToggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section aria-label="Projects" className="mt-12">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          isOpen={openId === project.id}
          onToggle={handleToggle}
        />
      ))}
    </section>
  );
}
