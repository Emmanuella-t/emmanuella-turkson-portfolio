import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Download } from "lucide-react";

import heroPortrait from "../assets/images/hero-portrait.png";

const EASE = [0.22, 1, 0.36, 1];
const RESUME_URL =
  "https://drive.google.com/file/d/14dn2VkynSd9wh2UevfpwyZAGx5UFN3jI/view?usp=sharing";

/**
 * Editorial hero — dark chocolate, oversized name, transparent portrait.
 * No mesh / ticker; marquee lives in a separate section below.
 */
export default function Hero() {
  const reduceMotion = useReducedMotion();

  const scrollToWork = () => {
    document.getElementById("selected-work")?.scrollIntoView({ behavior: "smooth" });
  };

  const reveal = (delay = 0) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 28 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: EASE },
        };

  const portraitReveal = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.85, delay: 0.2, ease: EASE },
      };

  return (
    <section
      id="top"
      className="relative min-h-[calc(100dvh-var(--site-header-height))] overflow-x-clip bg-[#1C0A08]"
    >
      <div className="relative z-10 mx-auto flex min-h-[calc(100dvh-var(--site-header-height))] w-full max-w-7xl items-end px-4 sm:px-6 lg:px-8">
        <div className="grid w-full grid-cols-1 items-end gap-6 pt-8 md:grid-cols-12 md:gap-6 lg:gap-10">
          {/* Copy */}
          <div className="relative z-20 min-w-0 pb-6 text-center md:col-span-6 md:pb-16 md:text-left lg:col-span-5 lg:pb-20">
            <motion.p
              {...reveal(0)}
              className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#E0A13A] sm:text-[11px]"
            >
              Currently open to 2027 internship and new-grad opportunities
            </motion.p>

            <motion.h1
              {...reveal(0.08)}
              className="mt-5 font-display text-[clamp(3.5rem,12vw,7.5rem)] font-semibold leading-[0.88] tracking-tight text-[#FFEDAD]"
            >
              <span className="block">Emmanuella</span>
              <span className="block text-[#E0A13A]">Turkson</span>
            </motion.h1>

            <motion.p
              {...reveal(0.18)}
              className="mt-5 font-body text-base font-medium tracking-wide text-[#FFEDAD]/90 sm:text-lg"
            >
              Software Engineer · ML/AI · Product &amp; UX Design
            </motion.p>

            <motion.p
              {...reveal(0.26)}
              className="mx-auto mt-5 max-w-md font-body text-sm leading-relaxed text-[#FFEDAD]/70 sm:text-base md:mx-0"
            >
              I design and build thoughtful digital products that connect
              technology, people, and meaningful impact.
            </motion.p>

            <motion.div
              {...reveal(0.36)}
              className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center md:justify-start"
            >
              <button
                type="button"
                onClick={scrollToWork}
                className="inline-flex h-12 items-center justify-center rounded-full bg-[#BC7821] px-7 font-body text-sm font-semibold text-[#1C0A08] transition-colors hover:bg-[#E0A13A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E0A13A]"
              >
                View Selected Work
              </button>
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-[#BC7821]/70 px-7 font-body text-sm font-semibold text-[#FFEDAD] transition-colors hover:border-[#E0A13A] hover:text-[#E0A13A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E0A13A]"
              >
                View Résumé
                <Download size={16} aria-hidden />
              </a>
            </motion.div>
          </div>

          {/* Portrait — bottom-right, unframed, native aspect */}
          <motion.div
            {...portraitReveal}
            className="relative z-10 flex w-full min-w-0 items-end justify-center overflow-hidden md:col-span-6 md:justify-end lg:col-span-7"
          >
            <img
              src={heroPortrait}
              alt="Portrait of Emmanuella Turkson"
              width={544}
              height={467}
              draggable={false}
              decoding="async"
              className="pointer-events-none block h-auto w-[min(82vw,18rem)] max-w-full object-contain object-bottom select-none sm:w-[min(58vw,22rem)] md:w-[min(100%,28rem)] lg:w-[min(100%,34rem)] xl:w-[min(100%,36rem)]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
