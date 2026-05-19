import type { Metadata } from "next";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "About — Nitol Rozario",
  description:
    "Architect, 3D Generalist & CGI Artist. Bachelor of Architecture from RUET, Bangladesh. Working across architecture, animation, and digital visualization.",
};

const workExperience = [
  {
    role: "3D Animation Lead — Design Consultant",
    company: "Fablecube Studios",
    location: "Dhaka, Bangladesh",
    period: "Feb 2026 – Present",
    description: [
      "Led CG set design and dynamic product animation for high-profile live-action/3D mixed-media advertisements, delivering national campaigns for major international and national brands.",
      "Pioneered AI-integrated workflow for CGI set extensions, accelerating environment generation pipelines and reducing project turnaround time by over 40%.",
      "Executed complex live-action VFX compositing for major brand activations, blending physical footage with digital environments to enhance visual storytelling.",
    ],
  },
  {
    role: "Design Executive",
    company: "Olik Studio Ltd",
    location: "Dhaka, Bangladesh",
    period: "Jan 2025 – Jan 2026",
    description: [
      "Directed architectural design and spatial planning for in-house game development and 3D short films.",
      "Produced high-fidelity 3D product animations and technical explainer videos for defense agency contracts.",
      "Executed advanced object rigging and keyframe animation for cinematic productions and advertisements.",
    ],
  },
  {
    role: "3D Generalist — Architectural Consultant (Remote)",
    company: "108RE Agency",
    location: "Toronto, Canada",
    period: "Aug 2023 – Present",
    description: [
      "Developed large-scale CGI proof-of-concepts for fulfillment centers and logistical distribution hubs for enterprise clients including Amazon and DSV.",
      "Integrated photorealistic 3D architectural renders into live-action drone footage to deliver immersive project proposals.",
      "Designed, rigged, and animated automated warehouse machinery within virtual environments to validate logistical workflows prior to construction.",
    ],
  },
  {
    role: "Architectural Intern — 3D Visualization",
    company: "Studio Dhaka Ltd",
    location: "Dhaka, Bangladesh",
    period: "Apr 2023 – May 2023",
    description: [
      "Collaborated with senior architects to refine massing, facade design, and interior spatial planning.",
      "Developed a custom asset library that improved workflow efficiency and reduced project setup time by 20%.",
      "Produced photorealistic interior/exterior renders and immersive walkthroughs using Blender, Lumion, and Photoshop.",
    ],
  },
];

const education = [
  {
    degree: "Bachelor of Architecture",
    institution: "Rajshahi University of Engineering & Technology",
    location: "Rajshahi, Bangladesh",
    period: "Jan 2018 – Jan 2025",
    notes:
      "Advanced Architectural Design, Digital Simulation, BIM, Architectural Rendering, Structural Systems Analysis, Acoustical & Lighting Design, Urban Design.",
  },
  {
    degree: "Higher Secondary Certificate (H.S.C.)",
    institution: "Notre Dame College",
    location: "Dhaka, Bangladesh",
    period: "Jun 2015 – Jul 2017",
  },
  {
    degree: "Secondary School Certificate (S.S.C.)",
    institution: "St. Joseph Higher Secondary School",
    location: "Dhaka, Bangladesh",
    period: "Jan 2013 – May 2015",
  },
];

const awards = [
  {
    year: "2026",
    title: "Buildner International Architecture Competition",
    subtitle: "Hospice – Home for the Terminally Ill",
    result: "Top 20",
    link: null,
  },
  {
    year: "2025",
    title: "Claymire International Idea Competition",
    subtitle: "A Healing Space — Beyond the Boundary: Healing Through Rejuvenation",
    result: "Top 30",
    link: "https://www.claymire.site/past-competition/a-healing-space/beyond-the-boundary-healing-through-rejuvenation",
  },
  {
    year: "2021",
    title: "FGT3D Competition",
    subtitle: "The Explorar",
    result: "Honorable Mention",
    link: null,
  },
  {
    year: "2015",
    title: "Christian Credit Union Ltd.",
    subtitle: "Student Scholarship Award for Academic Excellence",
    result: "Scholarship",
    link: null,
  },
];

const softwareSkills = [
  "Blender",
  "SketchUp",
  "AutoCAD",
  "Lumion",
  "FreeCAD",
  "Fusion 360",
  "Adobe Photoshop",
  "After Effects",
  "DaVinci Resolve",
  "Substance Painter",
  "SynthEyes",
  "Marvelous Designer",
];

const languages = [
  { name: "Bengali", level: "Native" },
  { name: "English", level: "C2 Proficient" },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="page-enter">

      <div className="pt-12 site-container">
        {/* ── Hero ──────────────────────────────────────────── */}
        <div className="border-b border-gray-100 py-14 md:py-20 grid md:grid-cols-[260px_1fr] gap-10">
          <div>
            <h1 className="text-[10px] tracking-[0.2em] uppercase text-gray-400 mb-2">
              About
            </h1>
            {/* Color block avatar */}
            <div
              className="w-16 h-16 rounded-sm mt-4"
              style={{ background: "linear-gradient(135deg, #1a3a5c, #8b2020)" }}
              aria-hidden="true"
            />
          </div>
          <div className="max-w-2xl">
            <p className="text-xl md:text-2xl font-light leading-relaxed text-gray-900 mb-6">
              Nitol Vincent Rozario is an architect, 3D generalist, and CGI
              artist based in Dhaka, Bangladesh — working at the intersection of
              architecture, digital visualization, and motion.
            </p>
            <p className="text-[13px] leading-relaxed text-gray-600">
              With a Bachelor of Architecture from RUET and years of professional
              experience spanning live-action VFX, product animation, and
              large-scale CGI environments, Nitol brings a rigorous architectural
              sensibility to every digital production.
            </p>
            <div className="mt-8 flex gap-6 text-[10px] tracking-[0.15em] uppercase text-gray-400">
              <span>Nationality: Bangladeshi</span>
              <span>Based in: Dhaka</span>
              <span>DOB: 06 Jan 1998</span>
            </div>
          </div>
        </div>

        {/* ── Work Experience ───────────────────────────────── */}
        <section aria-label="Work Experience">
          <div className="pt-10 pb-4 grid md:grid-cols-[260px_1fr]">
            <h2 className="text-[10px] tracking-[0.2em] uppercase text-gray-400">
              Experience
            </h2>
          </div>
          {workExperience.map((job, i) => (
            <div
              key={i}
              className="grid md:grid-cols-[260px_1fr] border-t border-gray-100 py-7 gap-4 md:gap-10"
            >
              <div>
                <p className="text-[11px] tracking-[0.1em] uppercase text-gray-500 mb-1">
                  {job.period}
                </p>
                <p className="text-[11px] text-gray-400">{job.location}</p>
              </div>
              <div>
                <h3 className="text-[13px] font-medium mb-0.5">{job.role}</h3>
                <p className="text-[12px] tracking-[0.08em] uppercase text-gray-500 mb-3">
                  {job.company}
                </p>
                <ul className="space-y-1.5">
                  {job.description.map((d, j) => (
                    <li
                      key={j}
                      className="text-[12px] text-gray-600 leading-relaxed flex gap-2"
                    >
                      <span className="text-gray-300 flex-shrink-0 mt-1">—</span>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </section>

        {/* ── Education ─────────────────────────────────────── */}
        <section aria-label="Education">
          <div className="pt-10 pb-4 grid md:grid-cols-[260px_1fr]">
            <h2 className="text-[10px] tracking-[0.2em] uppercase text-gray-400">
              Education
            </h2>
          </div>
          {education.map((edu, i) => (
            <div
              key={i}
              className="grid md:grid-cols-[260px_1fr] border-t border-gray-100 py-7 gap-4 md:gap-10"
            >
              <div>
                <p className="text-[11px] tracking-[0.1em] uppercase text-gray-500 mb-1">
                  {edu.period}
                </p>
                <p className="text-[11px] text-gray-400">{edu.location}</p>
              </div>
              <div>
                <h3 className="text-[13px] font-medium mb-0.5">{edu.degree}</h3>
                <p className="text-[12px] tracking-[0.08em] uppercase text-gray-500 mb-2">
                  {edu.institution}
                </p>
                {edu.notes && (
                  <p className="text-[12px] text-gray-500 leading-relaxed">
                    {edu.notes}
                  </p>
                )}
              </div>
            </div>
          ))}
        </section>

        {/* ── Skills ────────────────────────────────────────── */}
        <section aria-label="Skills" className="border-t border-gray-100">
          <div className="py-10 grid md:grid-cols-[260px_1fr] gap-6 md:gap-10">
            <h2 className="text-[10px] tracking-[0.2em] uppercase text-gray-400">
              Software Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {softwareSkills.map((skill) => (
                <span
                  key={skill}
                  className="text-[10px] tracking-[0.1em] uppercase border border-gray-200 text-gray-600 px-3 py-1 hover:border-gray-400 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── Awards ────────────────────────────────────────── */}
        <section aria-label="Awards and Honours">
          <div className="pt-10 pb-4 grid md:grid-cols-[260px_1fr]">
            <h2 className="text-[10px] tracking-[0.2em] uppercase text-gray-400">
              Honours & Awards
            </h2>
          </div>
          {awards.map((award, i) => (
            <div
              key={i}
              className="grid md:grid-cols-[260px_1fr] border-t border-gray-100 py-5 gap-4 md:gap-10"
            >
              <p className="text-[11px] tracking-[0.1em] uppercase text-gray-400">
                {award.year}
              </p>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-[13px] font-medium mb-0.5">
                    {award.title}
                  </h3>
                  <p className="text-[12px] text-gray-500">{award.subtitle}</p>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="text-[10px] tracking-[0.1em] uppercase border border-gray-200 text-gray-500 px-2 py-0.5">
                    {award.result}
                  </span>
                  {award.link && (
                    <a
                      href={award.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] tracking-[0.1em] uppercase text-gray-400 hover:text-black transition-colors"
                    >
                      ↗
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* ── Languages ─────────────────────────────────────── */}
        <section
          aria-label="Languages"
          className="border-t border-gray-100 border-b"
        >
          <div className="py-10 grid md:grid-cols-[260px_1fr] gap-6 md:gap-10">
            <h2 className="text-[10px] tracking-[0.2em] uppercase text-gray-400">
              Languages
            </h2>
            <div className="flex gap-8">
              {languages.map((lang) => (
                <div key={lang.name}>
                  <p className="text-[13px] font-medium">{lang.name}</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">
                    {lang.level}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
    </>
  );
}
