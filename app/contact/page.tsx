"use client";

import { useState } from "react";
import Header from "@/components/Header";
import { ChevronDown } from "lucide-react";

interface AccordionItemProps {
  id: string;
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function AccordionItem({
  id,
  title,
  children,
  defaultOpen = false,
}: AccordionItemProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="contact-accordion">
      <button
        id={`accordion-${id}`}
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-5 md:px-10 py-5 text-left hover:bg-gray-50 transition-colors"
        aria-expanded={open}
        aria-controls={`accordion-content-${id}`}
      >
        <span className="text-[10px] tracking-[0.2em] uppercase font-medium">
          {title}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        id={`accordion-content-${id}`}
        role="region"
        aria-labelledby={`accordion-${id}`}
        className={`overflow-hidden transition-all duration-400 ${
          open ? "max-h-[600px]" : "max-h-0"
        }`}
        style={{
          transition: "max-height 0.4s cubic-bezier(0.77, 0, 0.18, 1)",
        }}
      >
        <div className="px-5 md:px-10 pb-8 pt-2">{children}</div>
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <main className="page-enter">
      <Header />

      <div className="pt-12">
        {/* ── Header ───────────────────────────────────────── */}
        <div className="px-5 md:px-10 py-14 md:py-20 border-b border-gray-100">
          <h1 className="text-[10px] tracking-[0.2em] uppercase text-gray-400 mb-6">
            Contact
          </h1>
          <p className="text-xl md:text-3xl font-light leading-relaxed max-w-xl text-gray-900">
            Let&apos;s work together.
          </p>
          <p className="text-[13px] text-gray-500 mt-4 max-w-md leading-relaxed">
            Available for freelance projects, collaborations, and full-time
            opportunities in architectural visualization, CGI animation, and
            3D production.
          </p>
        </div>

        {/* ── Accordions ──────────────────────────────────── */}
        <div className="mt-0">
          {/* Email */}
          <AccordionItem id="email" title="Email" defaultOpen={true}>
            <div className="space-y-2">
              <a
                href="mailto:nitolrozario@gmail.com"
                id="contact-email-link"
                className="block text-[13px] text-gray-700 hover:text-black transition-colors link-underline"
              >
                nitolrozario@gmail.com
              </a>
              <p className="text-[11px] text-gray-400 tracking-wider">
                Preferred contact method. Response within 24 hours.
              </p>
            </div>
          </AccordionItem>

          {/* Location */}
          <AccordionItem id="location" title="Location">
            <div className="space-y-1">
              <p className="text-[13px] text-gray-700 font-medium">
                Dhaka, Bangladesh
              </p>
              <p className="text-[12px] text-gray-500">
                Available for remote work globally.
              </p>
              <p className="text-[12px] text-gray-500 mt-2">
                Open to relocation for the right opportunity.
              </p>
            </div>
          </AccordionItem>

          {/* Social */}
          <AccordionItem id="social" title="Social & Work">
            <div className="space-y-3">
              <a
                href="https://www.youtube.com/@nitolrozario"
                target="_blank"
                rel="noopener noreferrer"
                id="contact-youtube"
                className="flex items-center gap-3 group"
              >
                <span className="text-[10px] tracking-[0.15em] uppercase text-gray-400 w-20">
                  YouTube
                </span>
                <span className="text-[13px] text-gray-700 group-hover:text-black transition-colors link-underline">
                  @nitolrozario
                </span>
              </a>
              <a
                href="https://www.linkedin.com/in/nitolrozario"
                target="_blank"
                rel="noopener noreferrer"
                id="contact-linkedin"
                className="flex items-center gap-3 group"
              >
                <span className="text-[10px] tracking-[0.15em] uppercase text-gray-400 w-20">
                  LinkedIn
                </span>
                <span className="text-[13px] text-gray-700 group-hover:text-black transition-colors link-underline">
                  Nitol Rozario
                </span>
              </a>
            </div>
          </AccordionItem>

          {/* References */}
          <AccordionItem id="references" title="References">
            <div className="space-y-8">
              <div>
                <p className="text-[12px] font-medium mb-0.5">
                  Z H M Monjur Murshed
                </p>
                <p className="text-[11px] text-gray-500 mb-2">
                  Assistant Professor, RUET — Thesis Advisor
                </p>
                <div className="space-y-0.5">
                  <a
                    href="mailto:zhm@arch.ruet.ac.bd"
                    className="block text-[11px] text-gray-400 hover:text-black transition-colors"
                  >
                    zhm@arch.ruet.ac.bd
                  </a>
                  <p className="text-[11px] text-gray-400">(+880) 1711585212</p>
                </div>
              </div>
              <div>
                <p className="text-[12px] font-medium mb-0.5">
                  Md. Sabbir Ahsan
                </p>
                <p className="text-[11px] text-gray-500 mb-2">
                  Head of Department of Architecture, RUET
                </p>
                <div className="space-y-0.5">
                  <a
                    href="mailto:sabbirahsan@arch.ruet.ac.bd"
                    className="block text-[11px] text-gray-400 hover:text-black transition-colors"
                  >
                    sabbirahsan@arch.ruet.ac.bd
                  </a>
                  <p className="text-[11px] text-gray-400">(+880) 1935191319</p>
                </div>
              </div>
              <div>
                <p className="text-[12px] font-medium mb-0.5">
                  KH Samiul Alam
                </p>
                <p className="text-[11px] text-gray-500 mb-2">
                  Managing Director, Fablecube Studios
                </p>
                <p className="text-[11px] text-gray-400">(+880) 1521105832</p>
              </div>
            </div>
          </AccordionItem>
        </div>

        {/* ── Bottom bar ──────────────────────────────────── */}
        <div className="px-5 md:px-10 py-8 border-t border-gray-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-[10px] tracking-[0.15em] uppercase text-gray-300">
            © {new Date().getFullYear()} Nitol Vincent Rozario
          </p>
          <p className="text-[10px] tracking-[0.15em] uppercase text-gray-300">
            Architect · 3D Generalist · CGI Artist
          </p>
        </div>
      </div>
    </main>
  );
}
