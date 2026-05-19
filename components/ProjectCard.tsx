"use client";

import React, { useRef, useEffect } from "react";
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
  const coverSrc = project.featured_image;

  // Refs for mouse click-and-drag horizontal scroll
  const cardRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftVal = useRef(0);
  const dragStartPos = useRef({ x: 0, y: 0 });

  // Click outside listener to unexpand
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        onToggle(project.id);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen, project.id, onToggle]);

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
    <motion.article 
      className="project-row-container" 
      id={`project-card-${project.id}`} 
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div 
        layout
        initial={false}
        animate={{ 
          backgroundColor: isOpen ? "#ffffff" : "rgba(255, 255, 255, 0)"
        }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`flex flex-row items-start mx-auto gap-4 md:gap-8 cursor-pointer select-none overflow-hidden rounded-xl ${isOpen ? 'w-full max-w-none' : 'w-full max-w-[600px]'}`}
        onClick={!isOpen ? handleCardClick : undefined}
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
          className={`flex-none flex flex-col items-start text-left justify-start py-4 pl-4 md:pl-0 ${isOpen ? 'w-[180px] md:w-[300px]' : 'w-[140px] md:w-[220px]'}`}
        >
          <div className="project-logo-box select-none mb-4">
            <ClientLogo clientId={project.id} />
          </div>
          <h2 className={`font-bold text-black tracking-tight leading-snug ${isOpen ? 'text-[18px] md:text-[24px]' : 'text-[14px] md:text-[18px]'}`}>
            {project.title}
          </h2>
          <p className={`tracking-[0.2em] uppercase text-gray-400 mt-2 font-bold select-none ${isOpen ? 'text-[11px] md:text-[14px]' : 'text-[9px] md:text-[11px]'}`}>
            {project.location}
          </p>

          {/* Expanded Metadata (Revealed when open) */}
          <AnimatePresence>
            {isOpen && (
              <motion.div 
                initial={{ opacity: 0, height: 0, filter: "blur(4px)", marginTop: 0 }}
                animate={{ opacity: 1, height: "auto", filter: "blur(0px)", marginTop: 24 }}
                exit={{ opacity: 0, height: 0, filter: "blur(4px)", marginTop: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="expanded-meta-block text-left select-none space-y-4 overflow-hidden"
              >
                <div>
                  <p className="text-[10px] md:text-[13px] tracking-[0.18em] uppercase text-gray-400 mb-1.5 font-bold">Client</p>
                  <p className="text-[12px] md:text-[15px] font-bold text-gray-900 tracking-[0.05em] uppercase">{project.client}</p>
                </div>
                <div>
                  <p className="text-[10px] md:text-[13px] tracking-[0.18em] uppercase text-gray-400 mb-1.5 font-bold">Typology</p>
                  <p className="text-[12px] md:text-[15px] font-bold text-gray-900 tracking-[0.05em] uppercase">{project.type}</p>
                </div>
                <div>
                  <p className="text-[10px] md:text-[13px] tracking-[0.18em] uppercase text-gray-400 mb-1.5 font-bold">Role</p>
                  <p className="text-[12px] md:text-[15px] font-bold text-gray-900 tracking-[0.05em] uppercase max-w-xs break-words leading-relaxed">{project.role}</p>
                </div>
                <div>
                  <p className="text-[10px] md:text-[13px] tracking-[0.18em] uppercase text-gray-400 mb-1.5 font-bold">Status</p>
                  <p className="text-[12px] md:text-[15px] font-bold text-gray-900 tracking-[0.05em] uppercase">{project.status}</p>
                </div>
                
                <div className="share-links-block pt-6 flex gap-4 text-gray-400 select-none justify-start items-center">
                  <span className="text-[10px] md:text-[12px] tracking-[0.18em] uppercase font-bold mr-2 text-gray-300">Share</span>
                  <a href="#" className="hover:text-black transition-colors" onClick={(e) => e.stopPropagation()}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a>
                  <a href="#" className="hover:text-black transition-colors" onClick={(e) => e.stopPropagation()}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg></a>
                  <a href="#" className="hover:text-black transition-colors" onClick={(e) => e.stopPropagation()}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg></a>
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
          {/* 1. Featured Square Image (Always visible, expands when open) */}
          <motion.div 
            layout
            className={`flex-none relative bg-gray-50 flex flex-col items-center justify-center overflow-hidden shrink-0 ${isOpen ? 'w-[240px] h-[240px] md:w-[600px] md:h-[600px]' : 'w-[180px] h-[180px] md:w-[320px] md:h-[320px]'}`}
          >
            {coverSrc ? (
              <img src={coverSrc} alt={`${project.title} cover`} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" draggable={false} />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center" style={{ backgroundColor: project.cover_color || "#f3f4f6" }}>
                <span className={`tracking-[0.2em] uppercase text-black/40 mb-1 font-semibold ${isOpen ? 'text-[12px]' : 'text-[9px]'}`}>{project.type}</span>
                <span className={`text-black/60 font-medium ${isOpen ? 'text-[16px]' : 'text-xs'}`}>{project.subtitle}</span>
              </div>
            )}
          </motion.div>

          {/* 2. Revealed Horizontal Contents (Slides Sequence) */}
          {isOpen && project.slides && project.slides.map((slide, idx) => (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 + (idx * 0.05) }}
              key={idx} 
              className="flex-none flex flex-row items-stretch bg-white border border-gray-100 shrink-0 h-[240px] md:h-[600px] shadow-sm rounded-sm overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Slide Image */}
              <div className="w-[320px] md:w-[800px] h-full shrink-0 relative bg-gray-50 border-r border-gray-100">
                <img src={slide.image} alt={slide.title || `Slide ${idx + 1}`} className="w-full h-full object-cover" draggable={false} />
              </div>

              {/* Slide Text */}
              <div className="w-[280px] md:w-[460px] h-full px-6 py-6 md:px-12 md:py-12 flex flex-col justify-center shrink-0">
                {slide.subtitle && (
                  <h3 className="text-[10px] md:text-[14px] font-bold uppercase tracking-[0.15em] text-gray-400 mb-2 md:mb-3">{slide.subtitle}</h3>
                )}
                {slide.title && (
                  <h4 className="text-[16px] md:text-[26px] leading-snug text-black font-bold mb-3 md:mb-4">{slide.title}</h4>
                )}
                {slide.description && (
                  <p className="text-[12px] md:text-[16px] leading-[1.7] text-gray-600 line-clamp-6">{slide.description}</p>
                )}
                
                {project.link && idx === project.slides!.length - 1 && (
                  <div className="mt-auto pt-6 select-none">
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[9px] md:text-[12px] tracking-widest uppercase bg-black text-white px-5 py-3 md:px-6 md:py-4 font-bold hover:bg-gray-800 transition-colors">
                      <ExternalLink className="w-3 h-3 md:w-4 md:h-4" /> Watch Campaign
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

      </motion.div>
    </motion.article>
  );
}
