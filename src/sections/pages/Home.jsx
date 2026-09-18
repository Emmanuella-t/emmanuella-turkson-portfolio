import React from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Mail } from "lucide-react";

import { createPageUrl } from "@/utils/routes";
import Hero from "@/sections/Hero";
import CapabilityMarquee from "@/sections/CapabilityMarquee";

const EASE = [0.22, 1, 0.36, 1];
const RESUME_URL =
  "https://drive.google.com/file/d/14dn2VkynSd9wh2UevfpwyZAGx5UFN3jI/view?usp=sharing";
const SHELL = "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8";

const projects = [
  {
    number: "01",
    title: "MedEdge",
    category: "Product Design · Healthcare",
    description:
      "An AI-assisted clinical workspace that helps clinicians review patient context, spot risk, and evaluate guidance without losing control of care decisions.",
    impacts: [
      "Designed connected review flows for patient context, safety, and recommendations",
      "Clarified hierarchy between urgent risk and routine clinical information",
      "Kept clinician judgment visible at every decision point",
    ],
    image: "/case-studies/mededge-thumbnail.png",
    link: "MEDEdge",
  },
  {
    number: "02",
    title: "Zoom Accessibility Redesign",
    category: "UX Design · Accessibility",
    description:
      "A redesign of Zoom’s accessibility experience for Deaf and hard-of-hearing users, centered on captions, sign-language support, and meeting controls.",
    impacts: [
      "Brought accessibility into one discoverable hub",
      "Designed caption and sign-language controls for live meetings",
      "Extended support beyond the call with post-meeting review",
    ],
    image: "/case-studies/zoom-thumbnail.png",
    link: "ZoomRedesign",
  },
  {
    number: "03",
    title: "Rise by Synchrony",
    category: "UX / Product · Student credit",
    description:
      "A student credit-building experience that brings guidance to consequential financial decisions while keeping students in control.",
    impacts: [
      "Moved credit guidance to the moment before a costly decision",
      "Kept the student able to review, dismiss, or continue",
      "Connected graduated access, visible progress, and support in one experience",
    ],
    image:
      "/case-studies/synchrony_rise_case_stucy/assets/01_hero/rise-hero-three-phone.jpg",
    link: "case-studies/rise-by-synchrony",
  },
  {
    number: "04",
    title: "Career Match",
    category: "AI / Product · Matching Systems",
    description:
      "Explainable resume-to-job matching that moves beyond keyword overlap toward semantic understanding — with honest evaluation and failure analysis.",
    impacts: [
      "Built TF-IDF, MiniLM, and hybrid matchers with inspectable outputs",
      "Measured ranking quality on a labeled development benchmark",
      "Stress-tested stuffing and negation instead of trusting the metrics alone",
    ],
    image: "/case-studies/career_match_case_study/career-match-case-study-thumbnail.png",
    link: "CareerMatch",
  },
];

const capabilities = [
  {
    title: "Product & UX Design",
    line: "Turning complex problems into clear, accessible digital experiences.",
  },
  {
    title: "UX Research",
    line: "Listening closely to uncover needs, friction, and opportunities for inclusion.",
  },
  {
    title: "Software Engineering",
    line: "Building reliable and thoughtful products from interface to implementation.",
  },
  {
    title: "ML / AI",
    line: "Exploring intelligent systems that support real human decisions and workflows.",
  },
  {
    title: "Prototyping",
    line: "Making ideas tangible quickly so teams can learn, refine, and ship with confidence.",
  },
  {
    title: "Front-End Development",
    line: "Crafting performant, responsive interfaces with care for detail and polish.",
  },
];

const experience = [
  {
    company: "Dell Technologies",
    role: "Software Engineering Intern",
    year: "2025",
    impact: "AI-powered CLI log analysis, model evaluation, and LLM testing.",
  },
  {
    company: "Lawrence Berkeley National Laboratory",
    role: "Data Science Research Intern",
    year: "2024",
    impact: "ML models for catalyst selectivity using transfer learning and cheminformatics.",
  },
  {
    company: "Consumer Financial Protection Bureau",
    role: "Research Fellow / UX Fellow",
    year: "2024",
    impact: "Designed CreditBoost and conducted research for financial wellness flows.",
  },
];

function Reveal({
  children,
  className = "",
  delay = 0,
  duration = 0.65,
  distance = 32,
}) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function ProjectFeature({ project, imageLeft }) {
  const reduceMotion = useReducedMotion();

  const meta = (
    <div className="flex max-w-md flex-col justify-center">
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#BC7821]">
        {project.number}
      </p>
      <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-[#63333A]/85">
        {project.category}
      </p>
      <h3 className="mt-4 font-display text-[clamp(1.85rem,3.2vw,2.85rem)] font-semibold leading-[1.08] tracking-tight text-[#401216]">
        {project.title}
      </h3>
      <p className="mt-5 font-body text-base leading-relaxed text-[#401216]/75">
        {project.description}
      </p>
      {project.impacts?.length > 0 && (
        <ul className="mt-6 space-y-3">
          {project.impacts.map((item) => (
            <li
              key={item}
              className="border-l border-[#D5BCAD] pl-3 font-body text-sm leading-relaxed text-[#401216]/65"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
        <Link
          to={createPageUrl(project.link)}
          className="group/link inline-flex items-center gap-2 font-body text-sm font-semibold text-[#401216] transition-colors hover:text-[#BC7821] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#BC7821]"
        >
          View Case Study
          <ArrowRight
            size={16}
            className={`transition-transform duration-300 ${
              reduceMotion ? "" : "group-hover/link:translate-x-1"
            }`}
            aria-hidden
          />
        </Link>
        {project.liveHref && (
          <a
            href={project.liveHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-body text-sm font-semibold text-[#63333A] transition-colors hover:text-[#BC7821] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#BC7821]"
          >
            {project.liveLabel || "View prototype"}
            <ArrowUpRight size={15} aria-hidden />
          </a>
        )}
      </div>
    </div>
  );

  const visual = (
    <Link
      to={createPageUrl(project.link)}
      className="group/img relative block w-full overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#BC7821]"
      aria-label={`${project.title} case study`}
    >
      <img
        src={project.image}
        alt={`${project.title} project preview`}
        loading="lazy"
        decoding="async"
        className={`block h-auto w-full object-contain transition-transform duration-700 ease-out ${
          reduceMotion ? "" : "group-hover/img:scale-[1.015]"
        }`}
      />
    </Link>
  );

  return (
    <article className="grid items-center gap-10 md:gap-12 lg:grid-cols-12 lg:gap-16 xl:gap-24">
      {/* Visual column: larger share; first on mobile for focus */}
      <div
        className={`order-1 min-w-0 lg:col-span-8 ${
          imageLeft ? "lg:order-1" : "lg:order-2"
        }`}
      >
        {visual}
      </div>
      {/* Text column */}
      <div
        className={`order-2 min-w-0 lg:col-span-4 ${
          imageLeft ? "lg:order-2" : "lg:order-1"
        }`}
      >
        {meta}
      </div>
    </article>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FFEDDA] font-body text-[#401216]">
      <Hero />
      <CapabilityMarquee />

      {/* Introduction */}
      <section className="bg-[#FFEDDA] py-[clamp(72px,12vw,140px)]">
        <div className={SHELL}>
          <Reveal className="max-w-4xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#BC7821]">
              Introduction
            </p>
            <h2 className="mt-5 font-display text-[clamp(2rem,5.5vw,3.75rem)] font-semibold leading-[1.12] tracking-tight text-[#401216]">
              I create technology that is technically thoughtful, visually
              intentional, and grounded in real human needs.
            </h2>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-[#401216]/75 sm:text-lg">
              Emmanuella brings together software engineering, ML/AI, research,
              and product design — building work that is rigorous in craft and
              generous in who it serves.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Selected Work */}
      <section
        id="selected-work"
        className="border-t border-[#D5BCAD]/50 bg-[#FFEDDA] py-[clamp(88px,14vw,160px)]"
      >
        <div className={SHELL}>
          <Reveal className="mb-[clamp(64px,10vw,120px)] max-w-2xl">
            <h2 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-none tracking-tight text-[#401216]">
              Selected Work
            </h2>
          </Reveal>

          <div className="space-y-[clamp(96px,16vw,200px)]">
            {projects.map((project, i) => (
              <Reveal
                key={project.link}
                delay={i * 0.06}
                duration={0.85}
                distance={40}
              >
                <ProjectFeature project={project} imageLeft={i % 2 === 1} />
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-[clamp(72px,12vw,140px)] text-center">
            <Link
              to={createPageUrl("Work")}
              className="inline-flex items-center gap-2 font-body text-sm font-semibold text-[#63333A] transition-colors hover:text-[#BC7821]"
            >
              Browse all work
              <ArrowUpRight size={16} aria-hidden />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Capabilities */}
      <section className="bg-[#1C0A08] py-[clamp(72px,12vw,140px)] text-[#FFEDAD]">
        <div className={SHELL}>
          <Reveal className="mb-14 max-w-2xl sm:mb-20">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#E0A13A]">
              Capabilities
            </p>
            <h2 className="mt-4 font-display text-[clamp(2.5rem,6vw,4.25rem)] font-semibold leading-none tracking-tight">
              What I Bring
            </h2>
          </Reveal>

          <div className="divide-y divide-[#FFEDAD]/15 border-y border-[#FFEDAD]/15">
            {capabilities.map((cap, i) => (
              <Reveal key={cap.title} delay={i * 0.03}>
                <div className="grid gap-3 py-8 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.2fr)] sm:items-baseline sm:gap-10 sm:py-10">
                  <h3 className="font-display text-2xl font-semibold tracking-tight text-[#FFEDAD] sm:text-3xl">
                    {cap.title}
                  </h3>
                  <p className="font-body text-sm leading-relaxed text-[#FFEDAD]/65 sm:text-base">
                    {cap.line}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <p className="mt-12 max-w-3xl font-mono text-[11px] uppercase leading-relaxed tracking-[0.14em] text-[#FFEDAD]/45">
            Tools · Figma · React · Python · TypeScript · AWS · User Research ·
            Prototyping
          </p>
        </div>
      </section>

      {/* Experience */}
      <section className="bg-[#FFEDDA] py-[clamp(72px,12vw,140px)]">
        <div className={SHELL}>
          <Reveal className="mb-12 flex flex-col gap-4 sm:mb-16 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#BC7821]">
                Background
              </p>
              <h2 className="mt-4 font-display text-[clamp(2.5rem,6vw,4.25rem)] font-semibold leading-none tracking-tight text-[#401216]">
                Experience
              </h2>
            </div>
            <Link
              to={createPageUrl("Experience")}
              className="inline-flex items-center gap-2 font-body text-sm font-semibold text-[#63333A] transition-colors hover:text-[#BC7821]"
            >
              Full experience
              <ArrowRight size={16} aria-hidden />
            </Link>
          </Reveal>

          <ul className="divide-y divide-[#D5BCAD]/60 border-y border-[#D5BCAD]/60">
            {experience.map((item, i) => (
              <Reveal key={item.company} delay={i * 0.04}>
                <li className="group grid gap-3 py-8 transition-colors hover:bg-[#F5E6D4]/50 sm:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_5rem] sm:items-start sm:gap-8 sm:py-10 sm:px-2">
                  <div>
                    <h3 className="font-display text-2xl font-semibold text-[#401216] transition-colors group-hover:text-[#BC7821] sm:text-[1.75rem]">
                      {item.company}
                    </h3>
                    <p className="mt-1 font-body text-sm text-[#63333A]">
                      {item.role}
                    </p>
                  </div>
                  <p className="font-body text-sm leading-relaxed text-[#401216]/70 sm:text-base">
                    {item.impact}
                  </p>
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#9C7961] sm:text-right">
                    {item.year}
                  </p>
                </li>
              </Reveal>
            ))}
          </ul>

          <Reveal className="mt-10">
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-body text-sm font-semibold text-[#63333A] transition-colors hover:text-[#BC7821]"
            >
              View résumé
              <ArrowUpRight size={16} aria-hidden />
            </a>
          </Reveal>
        </div>
      </section>

      {/* About preview */}
      <section className="overflow-x-clip bg-[#F8EBDD] py-[clamp(72px,12vw,140px)]">
        <div className={SHELL}>
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
            <Reveal className="relative lg:col-span-5">
              <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.2em] text-[#BC7821]">
                Beyond the Screen
              </p>
              <div className="relative">
                <img
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6912295bcf607c90c75bc0c1/7a102b731_emmanuellaspicture.jpeg"
                  alt="Portrait of Emmanuella Turkson"
                  loading="lazy"
                  className="relative z-10 aspect-[4/5] w-full max-w-md object-cover object-top lg:max-w-none"
                  style={{
                    borderRadius: "1.5rem 1.5rem 0.5rem 1.5rem",
                  }}
                />
                <div
                  aria-hidden
                  className="absolute -bottom-6 -right-6 hidden h-40 w-40 bg-[#D5BCAD]/40 lg:block"
                  style={{ borderRadius: "0.75rem" }}
                />
              </div>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
              <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1.1] tracking-tight text-[#401216]">
                I am a Ghanaian technologist and designer interested in building
                work that creates access, dignity, and meaningful impact.
              </h2>
              <p className="mt-8 max-w-lg font-body text-base leading-relaxed text-[#401216]/75">
                My background spans software engineering, data science research,
                product design, and community-centered problem solving. I care
                about how technology works, how it feels, and who it serves.
              </p>
              <Link
                to={createPageUrl("About")}
                className="mt-10 inline-flex items-center gap-2 font-body text-sm font-semibold text-[#63333A] transition-colors hover:text-[#BC7821]"
              >
                More about me
                <ArrowRight size={16} aria-hidden />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-[#1C0A08] py-[clamp(96px,14vw,180px)] text-[#FFEDAD]">
        <div className={SHELL}>
          <Reveal className="max-w-4xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#E0A13A]">
              Available for 2027 opportunities
            </p>
            <h2 className="mt-6 font-display text-[clamp(2.5rem,7vw,5rem)] font-semibold leading-[1.05] tracking-tight">
              Let&apos;s create something meaningful together.
            </h2>
            <p className="mt-8 max-w-2xl font-body text-base leading-relaxed text-[#FFEDAD]/70 sm:text-lg">
              I am open to software engineering, ML/AI, product design, and UX
              opportunities where thoughtful technology can make a real
              difference.
            </p>
            <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center">
              <a
                href="mailto:imturkson@gmail.com"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#BC7821] px-8 py-3.5 font-body text-sm font-semibold text-[#1C0A08] transition-colors hover:bg-[#E0A13A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E0A13A]"
              >
                <Mail size={16} aria-hidden />
                Email Me
              </a>
              <a
                href="https://www.linkedin.com/in/emmanuella-turkson"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-body text-sm font-semibold text-[#FFEDAD]/80 transition-colors hover:text-[#E0A13A]"
              >
                LinkedIn
                <ArrowUpRight size={16} aria-hidden />
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
