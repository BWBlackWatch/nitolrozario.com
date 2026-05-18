"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-5 h-12 bg-white border-b border-gray-100">
        {/* Hamburger */}
        <button
          id="hamburger-btn"
          onClick={() => setMenuOpen((v) => !v)}
          className={`flex flex-col gap-[5px] justify-center items-center w-8 h-8 -ml-1 ${menuOpen ? "hamburger-open" : ""}`}
          aria-label="Toggle menu"
        >
          <span className="hamburger-line" />
          <span className="hamburger-line" />
          <span className="hamburger-line" />
        </button>

        {/* Logo / Name */}
        <Link
          href="/"
          className="absolute left-1/2 -translate-x-1/2 text-xs font-semibold tracking-[0.2em] uppercase hover:opacity-60 transition-opacity"
          id="site-logo"
        >
          Nitol Rozario
        </Link>

        {/* Right side — desktop nav */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Primary navigation">
          <Link
            href="/"
            id="nav-projects"
            className={`text-[11px] tracking-[0.15em] uppercase transition-opacity hover:opacity-50 ${
              pathname === "/" ? "opacity-100 font-medium" : "opacity-60"
            }`}
          >
            Projects
          </Link>
          <Link
            href="/about"
            id="nav-about"
            className={`text-[11px] tracking-[0.15em] uppercase transition-opacity hover:opacity-50 ${
              pathname === "/about" ? "opacity-100 font-medium" : "opacity-60"
            }`}
          >
            About
          </Link>
          <Link
            href="/contact"
            id="nav-contact"
            className={`text-[11px] tracking-[0.15em] uppercase transition-opacity hover:opacity-50 ${
              pathname === "/contact" ? "opacity-100 font-medium" : "opacity-60"
            }`}
          >
            Contact
          </Link>
        </nav>
      </header>

      {/* Mobile / Full nav overlay */}
      <div
        id="nav-overlay"
        className={`nav-overlay ${menuOpen ? "open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Close button area */}
        <button
          onClick={() => setMenuOpen(false)}
          className="absolute top-4 left-5 flex flex-col gap-[5px] justify-center items-center w-8 h-8 hamburger-open"
          aria-label="Close menu"
        >
          <span className="hamburger-line" />
          <span className="hamburger-line" />
          <span className="hamburger-line" />
        </button>

        <nav className="flex flex-col gap-8" aria-label="Mobile navigation">
          <Link
            href="/"
            id="nav-overlay-projects"
            className="text-3xl md:text-5xl font-light tracking-[0.05em] uppercase hover:opacity-40 transition-opacity"
          >
            Projects
          </Link>
          <Link
            href="/about"
            id="nav-overlay-about"
            className="text-3xl md:text-5xl font-light tracking-[0.05em] uppercase hover:opacity-40 transition-opacity"
          >
            About
          </Link>
          <Link
            href="/contact"
            id="nav-overlay-contact"
            className="text-3xl md:text-5xl font-light tracking-[0.05em] uppercase hover:opacity-40 transition-opacity"
          >
            Contact
          </Link>
        </nav>

        {/* Footer info in overlay */}
        <div className="absolute bottom-8 left-5 text-[11px] text-gray-400 tracking-wider uppercase">
          Nitol Vincent Rozario · Dhaka, Bangladesh
        </div>
      </div>
    </>
  );
}
