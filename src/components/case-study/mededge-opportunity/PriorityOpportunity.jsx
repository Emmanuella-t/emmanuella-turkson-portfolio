import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE, ME, cardShadow } from "./palette";

const LAYERS = [
  {
    id: "urgent",
    label: "Urgent condition",
    color: ME.coral,
    width: "100%",
  },
  {
    id: "allergy",
    label: "Allergy risk",
    color: ME.amber,
    width: "86%",
  },
  {
    id: "med",
    label: "Medication risk",
    color: "#F5A623",
    width: "72%",
  },
  {
    id: "recent",
    label: "Recent change",
    color: ME.softTeal,
    width: "58%",
  },
  {
    id: "secondary",
    label: "Secondary detail",
    color: ME.pale,
    width: "44%",
    muted: true,
  },
];

/**
 * Opp 01 — clinical signal-priority visualization (amber).
 */
export default function PriorityOpportunity({ title, description }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      className="flex h-full min-w-0 flex-col rounded-2xl bg-white p-6 sm:p-7"
      style={{ boxShadow: cardShadow }}
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.6, ease: EASE }}
    >
      <div className="flex items-start justify-between gap-3">
        <p
          className="font-mono text-[clamp(1.75rem,3vw,2.25rem)] font-semibold tabular-nums leading-none tracking-tight"
          style={{ color: ME.amber }}
        >
          01
        </p>
        <p
          className="pt-1 font-mono text-[11px] uppercase tracking-[0.18em]"
          style={{ color: ME.slate }}
        >
          Priority
        </p>
      </div>

      <h3
        className="mt-4 font-body text-[clamp(1.2rem,1.9vw,1.45rem)] font-semibold leading-tight tracking-tight"
        style={{ color: ME.navy }}
      >
        {title}
      </h3>
      <p
        className="mt-3 text-base leading-relaxed"
        style={{ color: ME.slate }}
      >
        {description}
      </p>

      <div
        className="mt-8"
        style={{
          perspective: reduceMotion ? undefined : "900px",
        }}
        aria-label="Priority layers: urgent signals rise above secondary detail"
      >
        <div
          className="flex flex-col gap-2.5"
          style={{
            transformStyle: "preserve-3d",
            transform: reduceMotion ? undefined : "rotateX(8deg)",
          }}
        >
          {LAYERS.map((layer, i) => (
            <motion.div
              key={layer.id}
              className="flex items-center gap-3"
              initial={
                reduceMotion
                  ? false
                  : { opacity: 0, y: 14, scale: 0.98 }
              }
              whileInView={
                reduceMotion
                  ? undefined
                  : {
                      opacity: layer.muted ? 0.72 : 1,
                      y: i * 3,
                      scale: 1 - i * 0.012,
                    }
              }
              viewport={{ once: true, margin: "-30px" }}
              transition={{
                duration: 0.55,
                delay: 0.12 + i * 0.09,
                ease: EASE,
              }}
              style={{
                transformStyle: "preserve-3d",
                translate: reduceMotion
                  ? undefined
                  : `0 0 ${(4 - i) * 6}px`,
              }}
            >
              <div
                className="h-3.5 rounded-full"
                style={{
                  width: layer.width,
                  backgroundColor: layer.color,
                  boxShadow: reduceMotion
                    ? "none"
                    : `0 ${(5 - i) * 2}px ${(6 - i) * 3}px -4px rgba(9,38,58,0.28)`,
                }}
              />
              <span
                className="shrink-0 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.12em] sm:text-[11px]"
                style={{
                  color: layer.muted ? ME.slate : ME.navy,
                  fontWeight: layer.muted ? 400 : 600,
                }}
              >
                {layer.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
