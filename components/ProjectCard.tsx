"use client";

import { useRef, useEffect } from "react";
import type { Project } from "@/lib/getProjects";
import { ExternalLink } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  isOpen: boolean;
  onToggle: (id: string) => void;
}

function getYouTubeId(url?: string): string | null {
  if (!url) return null;
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([-\w]{11})/
  );
  return match ? match[1] : null;
}

export default function ProjectCard({
  project,
  isOpen,
  onToggle,
}: ProjectCardProps) {
  const ytId = getYouTubeId(project.cover_video);
  const coverSrc = ytId
    ? `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`
    : null;

  // Extra images for horizontal scroll (use cover + project.images)
  const allImages: string[] = [];
  if (coverSrc) allImages.push(coverSrc);
  if (project.images) {
    project.images.forEach((img) => {
      if (!allImages.includes(img)) allImages.push(img);
    });
  }

  const rightPanelRef = useRef<HTMLDivElement>(null);

  // Reset scroll when closing
  useEffect(() => {
    if (!isOpen && rightPanelRef.current) {
      rightPanelRef.current.scrollLeft = 0;
    }
  }, [isOpen]);

  const handleCardClick = () => {
    onToggle(project.id);
  };

  return (
    <article
      id={`project-card-${project.id}`}
      className={`project-item ${isOpen ? "is-expanded" : ""}`}
      style={{ minHeight: isOpen ? "480px" : "auto" }}
    >
      {/* ── Cover image ──────────────────────────────────── */}
      <div
        className="project-cover"
        onClick={handleCardClick}
        role="button"
        tabIndex={0}
        aria-expanded={isOpen}
        aria-controls={`project-info-${project.id}`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleCardClick();
          }
        }}
        style={{ cursor: "pointer" }}
      >
        {coverSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={coverSrc}
            alt={`${project.title} cover`}
            style={{
              width: "100%",
              height: isOpen ? "480px" : "320px",
              objectFit: "cover",
              display: "block",
              transition:
                "transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), filter 0.4s ease, height 0.5s ease",
              transform: isOpen ? "scale(1.06)" : "scale(1)",
              filter: isOpen ? "brightness(0.45)" : "brightness(1)",
            }}
            loading="lazy"
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: isOpen ? "480px" : "320px",
              backgroundColor: project.cover_color,
              transition: "height 0.5s ease",
              filter: isOpen ? "brightness(0.45)" : "brightness(1)",
            }}
          />
        )}

        {/* Collapsed label at bottom left */}
        {!isOpen && (
          <div
            className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between pointer-events-none"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%)",
            }}
          >
            <div>
              <p className="text-[9px] tracking-[0.18em] uppercase text-white/60 mb-1">
                {project.type} · {project.year}
              </p>
              <h2 className="text-white text-sm font-medium leading-snug">
                {project.title}
              </h2>
              {project.subtitle && (
                <p className="text-white/50 text-[10px] tracking-wide mt-0.5">
                  {project.subtitle}
                </p>
              )}
            </div>

            {/* Plus icon */}
            <div className="w-7 h-7 bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0 mb-0.5">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <line
                  x1="6"
                  y1="0"
                  x2="6"
                  y2="12"
                  stroke="white"
                  strokeWidth="1.5"
                />
                <line
                  x1="0"
                  y1="6"
                  x2="12"
                  y2="6"
                  stroke="white"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* ── Expanded overlay (absolute over image) ──────────── */}
      <div
        id={`project-info-${project.id}`}
        aria-hidden={!isOpen}
        className="project-expanded-overlay"
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "row",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          transition: "opacity 0.4s ease",
        }}
      >
        {/* Left meta panel */}
        <div className="project-left-panel">
          {/* Close button */}
          <button
            onClick={handleCardClick}
            className="w-7 h-7 bg-white/20 backdrop-blur-sm flex items-center justify-center mb-2 flex-shrink-0 self-start"
            aria-label="Close project"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              style={{ transform: "rotate(45deg)" }}
            >
              <line
                x1="6"
                y1="0"
                x2="6"
                y2="12"
                stroke="white"
                strokeWidth="1.5"
              />
              <line
                x1="0"
                y1="6"
                x2="12"
                y2="6"
                stroke="white"
                strokeWidth="1.5"
              />
            </svg>
          </button>

          <div>
            <p className="text-[9px] tracking-[0.18em] uppercase text-white/50 mb-1">
              Client
            </p>
            <p className="text-[12px] text-white leading-snug">
              {project.client}
            </p>
          </div>
          <div>
            <p className="text-[9px] tracking-[0.18em] uppercase text-white/50 mb-1">
              Year
            </p>
            <p className="text-[12px] text-white">{project.year}</p>
          </div>
          <div>
            <p className="text-[9px] tracking-[0.18em] uppercase text-white/50 mb-1">
              Role
            </p>
            <p className="text-[11px] text-white/80 leading-snug">
              {project.role}
            </p>
          </div>
          <div>
            <p className="text-[9px] tracking-[0.18em] uppercase text-white/50 mb-1">
              Location
            </p>
            <p className="text-[12px] text-white">{project.location}</p>
          </div>
          <div>
            <p className="text-[9px] tracking-[0.18em] uppercase text-white/50 mb-1">
              Status
            </p>
            <p className="text-[12px] text-white">{project.status}</p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mt-1">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[9px] tracking-[0.08em] uppercase border border-white/30 text-white/60 px-2 py-0.5"
              >
                {tag}
              </span>
            ))}
          </div>

          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              id={`project-link-${project.id}`}
              className="flex items-center gap-1.5 text-[10px] tracking-[0.12em] uppercase text-white/70 hover:text-white transition-colors mt-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="w-3 h-3" />
              Watch / View
            </a>
          )}
        </div>

        {/* Center: Project title */}
        <div
          className="flex-1 flex flex-col justify-end p-6 pointer-events-none"
          style={{ minWidth: 0 }}
        >
          <p className="text-[9px] tracking-[0.18em] uppercase text-white/50 mb-2">
            {project.type} · {project.year}
          </p>
          <h2 className="text-white text-xl md:text-2xl font-light leading-tight mb-1">
            {project.title}
          </h2>
          {project.subtitle && (
            <p className="text-white/40 text-xs tracking-wide">
              {project.subtitle}
            </p>
          )}
        </div>

        {/* Right: Description + extra images — horizontal scroll */}
        <div
          ref={rightPanelRef}
          className="project-right-panel"
          style={{ maxWidth: "55%", minWidth: "220px" }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-row gap-0 h-full">
            {/* Panel: Short description */}
            <div
              className="flex-shrink-0 flex flex-col justify-center pr-8 border-r border-white/10"
              style={{ width: "280px", paddingTop: "2rem", paddingBottom: "2rem" }}
            >
              <p className="text-white text-[13px] leading-relaxed mb-4">
                {project.short_description}
              </p>
              <p className="text-white/50 text-[11px] leading-[1.8]">
                {project.long_description}
              </p>
            </div>

            {/* Panels: Extra images */}
            {allImages.slice(1).map((imgSrc, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 ml-4"
                style={{ width: "280px" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imgSrc}
                  alt={`${project.title} image ${idx + 2}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
