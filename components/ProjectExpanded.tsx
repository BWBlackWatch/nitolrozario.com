import type { Project } from "@/lib/getProjects";
import { ExternalLink } from "lucide-react";

interface ProjectExpandedProps {
  project: Project;
}

export default function ProjectExpanded({ project }: ProjectExpandedProps) {
  return (
    <div className="flex w-full border-t border-gray-100 bg-white">
      {/* ── Left: Fixed meta column (desktop only) ─────────────── */}
      <div className="hidden md:flex flex-shrink-0 w-[260px] border-r border-gray-100 p-6 flex-col gap-5 bg-[#fafafa]">
        <div>
          <p className="text-[9px] tracking-[0.15em] uppercase text-gray-400 mb-1">
            Role
          </p>
          <p className="text-[12px] leading-snug text-gray-800">
            {project.role}
          </p>
        </div>
        <div>
          <p className="text-[9px] tracking-[0.15em] uppercase text-gray-400 mb-1">
            Client
          </p>
          <p className="text-[12px] text-gray-800">{project.client}</p>
        </div>
        <div>
          <p className="text-[9px] tracking-[0.15em] uppercase text-gray-400 mb-1">
            Year
          </p>
          <p className="text-[12px] text-gray-800">{project.year}</p>
        </div>
        <div>
          <p className="text-[9px] tracking-[0.15em] uppercase text-gray-400 mb-1">
            Location
          </p>
          <p className="text-[12px] text-gray-800">{project.location}</p>
        </div>
        <div>
          <p className="text-[9px] tracking-[0.15em] uppercase text-gray-400 mb-1">
            Type
          </p>
          <p className="text-[12px] text-gray-800">{project.type}</p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mt-auto">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[9px] tracking-[0.1em] uppercase border border-gray-200 text-gray-500 px-2 py-0.5"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Link */}
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            id={`project-link-${project.id}`}
            className="flex items-center gap-1.5 text-[10px] tracking-[0.12em] uppercase text-gray-600 hover:text-black transition-colors mt-1 group"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink className="w-3 h-3 group-hover:scale-110 transition-transform" />
            View Project
          </a>
        )}
      </div>

      {/* ── Right: Horizontal scroll content ──────────────────── */}
      <div
        className="flex-1 flex overflow-x-auto"
        style={{ scrollbarWidth: "thin" }}
      >
        {/* Panel 1: Short description + mobile meta */}
        <div className="flex-shrink-0 w-[85vw] md:w-[380px] p-6 md:p-8 flex flex-col justify-center border-r border-gray-100">
          <h3 className="text-sm font-medium mb-2">{project.title}</h3>
          <p className="text-[11px] tracking-[0.1em] uppercase text-gray-400 mb-4">
            {project.subtitle}
          </p>
          <p className="text-[13px] leading-relaxed text-gray-700">
            {project.short_description}
          </p>

          {/* Mobile-only meta */}
          <div className="mt-6 flex flex-col gap-3 md:hidden">
            <div>
              <p className="text-[9px] tracking-[0.15em] uppercase text-gray-400 mb-0.5">
                Role
              </p>
              <p className="text-[12px] text-gray-800">{project.role}</p>
            </div>
            <div className="flex gap-6">
              <div>
                <p className="text-[9px] tracking-[0.15em] uppercase text-gray-400 mb-0.5">
                  Year
                </p>
                <p className="text-[12px] text-gray-800">{project.year}</p>
              </div>
              <div>
                <p className="text-[9px] tracking-[0.15em] uppercase text-gray-400 mb-0.5">
                  Client
                </p>
                <p className="text-[12px] text-gray-800">{project.client}</p>
              </div>
            </div>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[10px] tracking-[0.12em] uppercase text-gray-600 hover:text-black transition-colors mt-1"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="w-3 h-3" />
                View Project
              </a>
            )}
          </div>
        </div>

        {/* Panel 2: Long description */}
        <div className="flex-shrink-0 w-[85vw] md:w-[420px] p-6 md:p-8 flex flex-col justify-center border-r border-gray-100">
          <div className="text-[12px] leading-[1.9] text-gray-600 whitespace-pre-line">
            {project.long_description}
          </div>
        </div>

        {/* Panel 3: Color accent block */}
        <div
          className="flex-shrink-0 w-[180px] md:w-[240px] flex flex-col justify-end p-6 md:p-8"
          style={{ backgroundColor: project.cover_color }}
        >
          <p className="text-white/70 text-[9px] tracking-[0.2em] uppercase mb-2">
            {project.status}
          </p>
          <p className="text-white text-base font-medium leading-tight">
            {project.title}
          </p>
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 text-white/80 text-[10px] tracking-[0.15em] uppercase flex items-center gap-1 hover:text-white transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              Watch ↗
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
