import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  EASE,
  FLOW_LEGEND,
  FLOWS_COPY,
  FLOWS_SVG,
  ME,
  expandButtonStyle,
} from "./journeyData";
import Lightbox from "../mededge-screens/Lightbox";

function LegendSwatch({ tone }) {
  if (tone === "diamond") {
    return (
      <span
        aria-hidden
        className="inline-block h-3 w-3 rotate-45 border"
        style={{ borderColor: ME.navy, backgroundColor: ME.white }}
      />
    );
  }
  if (tone === "outline") {
    return (
      <span
        aria-hidden
        className="inline-block h-2.5 w-5 rounded-sm border"
        style={{ borderColor: ME.slate, backgroundColor: ME.white }}
      />
    );
  }
  const fill =
    tone === "navy"
      ? ME.navy
      : tone === "teal"
        ? ME.softTeal
        : tone === "amber"
          ? ME.amber
          : tone === "mint"
            ? ME.mint
            : ME.pale;
  return (
    <span
      aria-hidden
      className="inline-block h-2.5 w-5 rounded-sm"
      style={{ backgroundColor: fill }}
    />
  );
}

/**
 * 09 — User Flows
 * Single SVG artifact, full content width, page-vertical scroll.
 * Full inspection via lightbox.
 */
export default function MedEdgeUserFlows() {
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);

  const lightboxItems = [
    {
      title: FLOWS_SVG.title,
      src: FLOWS_SVG.src,
      width: FLOWS_SVG.width,
      height: FLOWS_SVG.height,
      kind: "svg",
    },
  ];

  return (
    <div className="w-full min-w-0" aria-labelledby="mededge-flows-heading">
      <motion.header
        className="min-w-0 text-left"
        style={{ width: "min(100%, 760px)" }}
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2, margin: "0px 0px -10% 0px" }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <p
          className="font-mono text-[12px] uppercase tracking-[0.2em]"
          style={{ color: ME.teal }}
        >
          {FLOWS_COPY.eyebrow}
        </p>
        <h2
          id="mededge-flows-heading"
          className="mt-3 font-body text-[clamp(1.85rem,3.4vw,2.75rem)] font-semibold leading-[1.1] tracking-tight"
          style={{ color: ME.navy }}
        >
          {FLOWS_COPY.title}
        </h2>
        <p
          className="mt-3 max-w-2xl text-base leading-relaxed sm:text-lg"
          style={{ color: ME.slate }}
        >
          {FLOWS_COPY.intro}
        </p>
      </motion.header>

      <motion.div
        className="mt-7 flex flex-wrap items-start justify-between gap-4"
        initial={reduceMotion ? false : { opacity: 0, y: 10 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.45, ease: EASE }}
      >
        <ul
          className="m-0 flex list-none flex-wrap gap-x-5 gap-y-3 p-0"
          aria-label="Flow diagram legend"
        >
          {FLOW_LEGEND.map((item) => (
            <li
              key={item.label}
              className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em]"
              style={{ color: ME.slate }}
            >
              <LegendSwatch tone={item.tone} />
              {item.label}
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="shrink-0 rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] outline-none focus-visible:ring-2 focus-visible:ring-[#0EA8A7]"
          style={expandButtonStyle}
        >
          View full user flows
        </button>
      </motion.div>

      <motion.div
        className="w-full min-w-0 overflow-x-clip"
        style={{ marginTop: 32 }}
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.05 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <img
          src={FLOWS_SVG.src}
          alt="MedEdge user flows — clinical review, medication safety, and AI recommendation review"
          width={FLOWS_SVG.width}
          height={FLOWS_SVG.height}
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
