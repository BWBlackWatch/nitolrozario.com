"use client";

import React, { useRef } from "react";
import type { Project } from "@/lib/getProjects";
import { ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectCardProps {
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

// High-end minimalist vector SVG logos tailored to each client/project
function ClientLogo({ clientId }: { clientId: string }) {
  switch (clientId) {
    case "bkash-eid-festival":
    case "bkash-luxury-offers":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="9" />
          <path d="M9 17V7h4a3 3 0 0 1 0 6H9m0 0h4a3 3 0 0 1 0 6H9" />
        </svg>
      );
    case "funtastic-energy-biscuit":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M18 6H8v6h8v2H8v6H6V4h12v2z" />
          <rect x="15" y="15" width="3" height="3" fill="currentColor" />
        </svg>
      );
    case "ride-secure-evie":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <circle cx="12" cy="11" r="3" />
        </svg>
      );
    case "shahjalal-snacks-rebranding":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2a8 8 0 0 0-8 8c0 4.42 3.58 8 8 8s8-3.58 8-8a8 8 0 0 0-8-8z" />
          <path d="M12 6a4 4 0 0 0-4 4c0 2.2 1.8 4 4 4s4-1.8 4-4a4 4 0 0 0-4-4z" />
        </svg>
      );
    case "crimson-strata":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="4" y="4" width="7" height="7" />
          <rect x="13" y="4" width="7" height="7" />
          <rect x="4" y="13" width="7" height="7" />
          <rect x="13" y="13" width="7" height="7" fill="currentColor" />
        </svg>
      );
    case "center-animation-game-dev":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <polygon points="6 3 20 12 6 21 6 3" />
          <line x1="6" y1="12" x2="20" y2="12" />
        </svg>
      );
    case "saladology-debut":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
          <path d="M12 6c-3.31 0-6 2.69-6 6h12c0-3.31-2.69-6-6-6z" fill="currentColor" />
        </svg>
      );
    default:
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M9 17V7h4a3 3 0 0 1 0 6H9" />
        </svg>
      );
  }
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

  // Extra images for scroll panel
  const allImages: string[] = [];
  if (coverSrc) allImages.push(coverSrc);
  if (project.images) {
    project.images.forEach((img) => {
      if (!allImages.includes(img)) allImages.push(img);
    });
  }

  // Refs for mouse click-and-drag horizontal scroll
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftVal = useRef(0);
  const dragStartPos = useRef({ x: 0, y: 0 });

  const onMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    isDragging.current = true;
    scrollRef.current.style.cursor = "grabbing";
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeftVal.current = scrollRef.current.scrollLeft;
    dragStartPos.current = { x: e.clientX, y: e.clientY };
  };

  const onMouseLeave = () => {
    isDragging.current = false;
    if (scrollRef.current) {
      scrollRef.current.style.cursor = "grab";
    }
  };

  const onMouseUp = (e: React.MouseEvent) => {
    isDragging.current = false;
    if (scrollRef.current) {
      scrollRef.current.style.cursor = "grab";
    }
    
    // Calculate drag distance
    const deltaX = Math.abs(e.clientX - dragStartPos.current.x);
    const deltaY = Math.abs(e.clientY - dragStartPos.current.y);
    
    // If movement is minor, it is treated as a simple toggle/click
    if (deltaX < 6 && deltaY < 6) {
      onToggle(project.id);
    }
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5; // Scroll speed modifier
    scrollRef.current.scrollLeft = scrollLeftVal.current - walk;
  };

  const handleCardClick = () => {
    onToggle(project.id);
  };

  return (
    <article className="project-row-container" id={`project-card-${project.id}`}>
      <motion.div 
        layout
        initial={false}
        animate={{ 
          backgroundColor: isOpen ? "#ffffff" : "rgba(255, 255, 255, 0)"
        }}
        transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
        className={`flex flex-row items-center mx-auto gap-4 md:gap-8 cursor-pointer select-none overflow-hidden rounded-xl ${isOpen ? 'w-full max-w-none' : 'w-full max-w-[600px]'}`}
        onClick={!isDragging.current ? handleCardClick : undefined}
        role="button"
        tabIndex={0}
        aria-label={isOpen ? `Collapse project ${project.title}` : `Expand project ${project.title}`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleCardClick();
          }
        }}
      >
        
        {/* ── Left Column: Logo, Titles, Metadata ── */}
        <motion.div 
          layout
          className="flex-none w-[140px] md:w-[220px] flex flex-col items-start text-left justify-center py-4 pl-4 md:pl-0"
        >
          <div className="project-logo-box select-none mb-3">
            <ClientLogo clientId={project.id} />
          </div>
          <h2 className="text-[14px] md:text-[18px] font-bold text-black tracking-tight leading-snug">
            {project.title}
          </h2>
          <p className="text-[9px] md:text-[11px] tracking-[0.2em] uppercase text-gray-400 mt-1.5 font-bold select-none">
            {project.location}
          </p>

          {/* Expanded Metadata (Revealed when open) */}
          <AnimatePresence>
            {isOpen && (
              <motion.div 
                initial={{ opacity: 0, height: 0, filter: "blur(4px)" }}
                animate={{ opacity: 1, height: "auto", filter: "blur(0px)" }}
                exit={{ opacity: 0, height: 0, filter: "blur(4px)" }}
                transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                className="expanded-meta-block text-left select-none mt-6 space-y-4 overflow-hidden"
              >
                <div>
                  <p className="text-[8px] md:text-[10px] tracking-[0.18em] uppercase text-gray-400 mb-1 font-bold">Client</p>
                  <p className="text-[9px] md:text-[11px] font-semibold text-gray-900 tracking-[0.05em] uppercase">{project.client}</p>
                </div>
                <div>
                  <p className="text-[8px] md:text-[10px] tracking-[0.18em] uppercase text-gray-400 mb-1 font-bold">Typology</p>
                  <p className="text-[9px] md:text-[11px] font-semibold text-gray-900 tracking-[0.05em] uppercase">{project.type}</p>
                </div>
                <div>
                  <p className="text-[8px] md:text-[10px] tracking-[0.18em] uppercase text-gray-400 mb-1 font-bold">Role</p>
                  <p className="text-[9px] md:text-[11px] font-semibold text-gray-900 tracking-[0.05em] uppercase max-w-xs break-words leading-relaxed">{project.role}</p>
                </div>
                <div>
                  <p className="text-[8px] md:text-[10px] tracking-[0.18em] uppercase text-gray-400 mb-1 font-bold">Status</p>
                  <p className="text-[9px] md:text-[11px] font-semibold text-gray-900 tracking-[0.05em] uppercase">{project.status}</p>
                </div>
                
                <div className="share-links-block pt-4 flex gap-3 text-gray-400 select-none justify-start items-center">
                  <span className="text-[8px] md:text-[9px] tracking-[0.18em] uppercase font-bold mr-2 text-gray-300">Share</span>
                  <a href="#" className="hover:text-black transition-colors" onClick={(e) => e.stopPropagation()}><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a>
                  <a href="#" className="hover:text-black transition-colors" onClick={(e) => e.stopPropagation()}><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg></a>
                  <a href="#" className="hover:text-black transition-colors" onClick={(e) => e.stopPropagation()}><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg></a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ── Right Column: Drag Scroll Wrapper ── */}
        <motion.div 
          layout
          ref={scrollRef}
          className={`flex flex-row flex-nowrap items-stretch gap-4 md:gap-6 w-full ${isOpen ? 'overflow-x-auto cursor-grab' : 'overflow-hidden cursor-pointer'} scrollbar-none py-4`}
          onMouseDown={isOpen ? onMouseDown : undefined}
          onMouseLeave={isOpen ? onMouseLeave : undefined}
          onMouseUp={isOpen ? onMouseUp : undefined}
          onMouseMove={isOpen ? onMouseMove : undefined}
        >
          {/* 1. Featured Square Image (Always visible, stays the same) */}
          <motion.div 
            layout
            className="flex-none w-[180px] h-[180px] md:w-[320px] md:h-[320px] relative bg-gray-50 flex flex-col items-center justify-center overflow-hidden"
          >
            {coverSrc ? (
              <img src={coverSrc} alt={`${project.title} cover`} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" draggable={false} />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center" style={{ backgroundColor: project.cover_color || "#f3f4f6" }}>
                <span className="text-[9px] tracking-[0.2em] uppercase text-black/40 mb-1 font-semibold">{project.type}</span>
                <span className="text-xs text-black/60 font-medium">{project.subtitle}</span>
              </div>
            )}
          </motion.div>

          {/* 2. Revealed Horizontal Contents (Scrollable) */}
          {isOpen && (
            <>
              {/* Text Description Block */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex-none w-[280px] md:w-[380px] bg-white border-l border-r border-gray-100 px-6 md:px-10 py-6 flex flex-col justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 mb-4">Project Description</h3>
                <p className="text-[13px] leading-relaxed text-black font-semibold mb-3">{project.short_description}</p>
                <p className="text-[11.5px] leading-[1.8] text-gray-600 whitespace-pre-line">{project.long_description}</p>
                {project.link && (
                  <div className="mt-6">
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[9px] tracking-widest uppercase bg-black text-white px-5 py-3 font-bold hover:bg-gray-800 transition-colors">
                      <ExternalLink className="w-3 h-3" /> Watch Campaign
                    </a>
                  </div>
                )}
              </motion.div>

              {/* Extra Gallery Images */}
              {allImages.slice(1).map((imgSrc, idx) => (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 + (idx * 0.05) }}
                  key={idx} 
                  className="flex-none h-[180px] md:h-[320px] aspect-[4/3] bg-gray-50"
                >
                  <img src={imgSrc} alt={`${project.title} gallery ${idx + 1}`} className="w-full h-full object-cover" draggable={false} />
                </motion.div>
              ))}
            </>
          )}
        </motion.div>

      </motion.div>
    </article>
  );
}
