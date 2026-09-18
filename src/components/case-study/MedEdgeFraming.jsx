import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import OpportunityAreasStory from "./mededge-opportunity/OpportunityAreasStory";

const EASE = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE },
  },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

/**
 * MedEdge Framing — synthesis from research into design direction.
 */
export default function MedEdgeFraming({ framing }) {
  const reduceMotion = useReducedMotion();
  const opportunities = framing.opportunities || [];
  const principles = framing.principles || [];

  return (
    <motion.div
      className="flex flex-col"
      style={{ gap: "clamp(2.75rem, 5.5vw, 4.5rem)" }}
      variants={stagger}
      initial={reduceMotion ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
    >
      <motion.header variants={fadeUp} className="max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-cs-muted sm:text-[13px]">
          07 — Framing
        </p>
        <h2 className="cs-display-serif mt-5 text-[clamp(2.25rem,4.5vw,3.5rem)] font-semibold leading-[1.08] tracking-tight text-cs-ink">
          Turning insight into direction
        </h2>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-cs-ink/70 sm:text-xl">
          {framing.intro}
        </p>
      </motion.header>

      <motion.div variants={fadeUp} className="max-w-3xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-cs-muted">
          Final problem statement
        </p>
        <p className="mt-4 text-xl font-medium leading-relaxed tracking-tight text-cs-ink sm:text-2xl">
          {framing.statement}
        </p>
      </motion.div>

      <motion.div variants={fadeUp} className="w-full min-w-0 max-w-full">
        <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.18em] text-cs-muted">
          How might we
        </p>
        <div className="relative aspect-[4/3] w-full max-w-full overflow-x-clip overscroll-contain sm:aspect-[16/10]">
          <iframe
            title={
              framing.hmwEmbed?.title ||
              "MedEdge How Might We UX synthesis artifact"
            }
            src={
              framing.hmwEmbed?.src ||
              "https://embed.figma.com/board/Jv92GNQtp2hF1C5CtaLwi3/MedEdge---How-Might-We?node-id=1-2&embed-host=share"
            }
            loading="lazy"
            allowFullScreen
            className="absolute inset-0 h-full w-full max-w-full border-0 bg-transparent"
            style={{ touchAction: "pan-x pan-y pinch-zoom" }}
          />
        </div>
      </motion.div>

      <motion.div variants={fadeUp} className="w-full min-w-0 max-w-full">
        <OpportunityAreasStory
          opportunities={opportunities}
          principles={principles}
        />
      </motion.div>
    </motion.div>
  );
}
