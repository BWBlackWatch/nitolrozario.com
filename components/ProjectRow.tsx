"use client";

import { useRef } from "react";
import type { Project } from "@/lib/getProjects";
import ProjectExpanded from "./ProjectExpanded";

interface ProjectRowProps {
  project: Project;
  isOpen: boolean;
  onToggle: (id: string) => void;
}

// Extract YouTube video ID
function getYouTubeId(url?: string): string | null {
  if (!url) return null;
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([-\w]{11})/
  );
  return match ? match[1] : null;
}

export default function ProjectRow({
  project,
  isOpen,
  onToggle,
}: ProjectRowProps) {
  const expandedRef = useRef<HTMLDivElement>(null);
  const ytId = getYouTubeId(project.cover_video);
  const thumbnail = ytId
    ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`
    : null;

  const handleClick = () => onToggle(project.id);

  return (
    <article>
      {/* ── Collapsed row ─────────────────────────────────── */}
      <div
        className="grid grid-cols-1 md:grid-cols-[260px_1fr] border-t border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors duration-150 group"
        onClick={handleClick}
        role="button"
        tabIndex={0}
        id={`project-row-${project.id}`}
        aria-expanded={isOpen}
        aria-controls={`project-expanded-${project.id}`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleClick();
          }
        }}
      >
        {/* Left: Meta */}
        <div className="flex flex-col justify-end p-5 pb-4 gap-2">
          <div
            className="w-6 h-6 rounded-sm flex-shrink-0"
            style={{ backgroundColor: project.cover_color }}
            aria-hidden="true"
          />
          <div>
            <h2 className="text-[13px] font-medium leading-snug">
              {project.title}
            </h2>
            <p className="text-[10px] tracking-[0.12em] uppercase text-gray-500 mt-0.5">
              {project.type}&nbsp;·&nbsp;{project.year}
            </p>
          </div>
        </div>

        {/* Right: Cover image */}
        <div
          className="relative overflow-hidden"
          style={{ minHeight: "240px" }}
        >
          {thumbnail ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={thumbnail}
              alt={`${project.title} cover image`}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              style={{ minHeight: "240px", maxHeight: "360px", display: "block" }}
              loading="lazy"
              onError={(e) => {
                const target = e.currentTarget;
                target.style.display = "none";
                const parent = target.parentElement;
                if (parent) {
                  parent.style.backgroundColor = project.cover_color;
                }
              }}
            />
          ) : (
            <div
              className="w-full h-full flex items-end p-6"
              style={{
                backgroundColor: project.cover_color,
                minHeight: "240px",
              }}
            >
              <p className="text-white/70 text-xs tracking-wider uppercase font-light">
                {project.subtitle}
              </p>
            </div>
          )}

          {/* Plus/Close indicator */}
          <div
            className={`absolute top-4 right-4 w-7 h-7 bg-black/30 backdrop-blur-sm flex items-center justify-center transition-transform duration-300 ${
              isOpen ? "rotate-45" : ""
            }`}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <line x1="6" y1="0" x2="6" y2="12" stroke="white" strokeWidth="1.5" />
              <line x1="0" y1="6" x2="12" y2="6" stroke="white" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
      </div>

      {/* ── Expanded panel ────────────────────────────────── */}
      <div
        id={`project-expanded-${project.id}`}
        ref={expandedRef}
        aria-hidden={!isOpen}
        style={{
          maxHeight: isOpen
            ? expandedRef.current?.scrollHeight
              ? `${expandedRef.current.scrollHeight}px`
              : "700px"
            : "0px",
          overflow: "hidden",
          transition: "max-height 0.5s cubic-bezier(0.77, 0, 0.18, 1)",
        }}
      >
        <ProjectExpanded project={project} />
      </div>
    </article>
  );
}
