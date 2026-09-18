import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  EASE,
  JOURNEY_COPY,
  JOURNEY_SVG,
  ME,
  expandButtonStyle,
} from "./journeyData";
import Lightbox from "../mededge-screens/Lightbox";

/**
 * 08 — User Journey
 * On-page: top-row preview, full content width, page-vertical scroll only.
 * Detail: full six-stage map in lightbox.
 */
export default function MedEdgeUserJourney() {
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);

  const lightboxItems = [
    {
      title: JOURNEY_SVG.title,
      src: JOURNEY_SVG.src,
      width: JOURNEY_SVG.width,
      height: JOURNEY_SVG.height,
      kind: "svg",
    },
  ];

  return (
    <div className="w-full min-w-0" aria-labelledby="mededge-journey-heading">
      <motion.header
        className="min-w-0 text-left"
        style={{ width: "min(100%, 760px)" }}
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <p
          className="font-mono text-[12px] uppercase tracking-[0.2em]"
          style={{ color: ME.teal }}
        >
          {JOURNEY_COPY.eyebrow}
        </p>
        <h2
          id="mededge-journey-heading"
          className="mt-3 font-body text-[clamp(1.85rem,3.4vw,2.75rem)] font-semibold leading-[1.1] tracking-tight"
          style={{ color: ME.navy }}
        >
          {JOURNEY_COPY.title}
        </h2>
        <p
          className="mt-3 text-base leading-relaxed sm:text-lg"
          style={{ color: ME.slate, maxWidth: "42rem" }}
        >
          {JOURNEY_COPY.intro}
        </p>
      </motion.header>

      <motion.div
        className="w-full min-w-0 text-left"
        style={{ marginTop: 48 }}
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <div className="mb-6 flex justify-end">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] outline-none focus-visible:ring-2 focus-visible:ring-[#0EA8A7]"
            style={expandButtonStyle}
          >
            <span className="md:hidden">Full journey map</span>
            <span className="hidden md:inline">View full journey map</span>
          </button>
        </div>

        <div className="w-full min-w-0 overflow-x-clip">
          <img
            src={JOURNEY_SVG.previewSrc}
            alt="MedEdge user journey — early stages from patient access through clinical context"
            width={JOURNEY_SVG.previewWidth}
            height={JOURNEY_SVG.previewHeight}
            loading="eager"
            decoding="async"
            draggable={false}
            className="block h-auto w-full max-w-full select-none"
          />
        </div>
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
