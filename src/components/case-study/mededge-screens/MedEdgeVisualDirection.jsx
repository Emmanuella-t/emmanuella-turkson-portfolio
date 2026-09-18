import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  EASE,
  ME,
  VISUAL_DIRECTION,
  VISUAL_DIRECTION_COPY,
  expandButtonStyle,
} from "../mededge-journey/journeyData";
import Lightbox from "./Lightbox";

/**
 * 11 — Visual Direction
 * Single PNG artifact, full content width, page-vertical scroll.
 * Detail inspection via lightbox.
 */
export default function MedEdgeVisualDirection() {
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);

  const lightboxItems = [
    {
      title: VISUAL_DIRECTION.title,
      src: VISUAL_DIRECTION.src,
      width: VISUAL_DIRECTION.width,
      height: VISUAL_DIRECTION.height,
    },
  ];

  return (
    <div className="w-full min-w-0" aria-labelledby="mededge-visual-heading">
      <motion.header
        className="min-w-0 text-left"
        style={{ width: "min(100%, 760px)" }}
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <p
          className="font-mono text-[12px] uppercase tracking-[0.2em]"
          style={{ color: ME.teal }}
        >
          {VISUAL_DIRECTION_COPY.eyebrow}
        </p>
        <h2
          id="mededge-visual-heading"
          className="mt-3 font-body text-[clamp(1.85rem,3.4vw,2.75rem)] font-semibold leading-[1.1] tracking-tight"
          style={{ color: ME.navy }}
        >
          {VISUAL_DIRECTION_COPY.title}
        </h2>
        <p
          className="mt-3 max-w-2xl text-base leading-relaxed sm:text-lg"
          style={{ color: ME.slate }}
        >
          {VISUAL_DIRECTION_COPY.intro}
        </p>
      </motion.header>

      <motion.div
        className="flex justify-end"
        style={{ marginTop: 40 }}
        initial={reduceMotion ? false : { opacity: 0, y: 10 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.45, ease: EASE }}
      >
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] outline-none focus-visible:ring-2 focus-visible:ring-[#0EA8A7]"
          style={expandButtonStyle}
        >
          View visual direction in detail
        </button>
      </motion.div>

      <motion.div
        className="w-full min-w-0 overflow-x-clip"
        style={{ marginTop: 24 }}
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.05 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <img
          src={VISUAL_DIRECTION.src}
          alt="MedEdge visual direction — design principles, color, typography, and clinical UI application"
          width={VISUAL_DIRECTION.width}
          height={VISUAL_DIRECTION.height}
          loading="eager"
          decoding="async"
          draggable={false}
          className="block h-auto w-full max-w-full select-none"
        />
      </motion.div>

      {open && (
        <Lightbox
          items={lightboxItems}
          index={0}
          onClose={() => setOpen(false)}
          onPrev={() => {}}
          onNext={() => {}}
        />
      )}
    </div>
  );
}
