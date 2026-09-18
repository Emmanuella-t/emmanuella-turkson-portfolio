import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE, ME } from "./palette";

/**
 * Convergence: three opportunity accents → shared design principles.
 */
export default function OpportunitySynthesis() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="mx-auto flex w-full max-w-3xl flex-col items-center text-center"
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: EASE }}
    >
      <div className="mb-8 flex w-full max-w-md items-center" aria-hidden>
        {[ME.amber, ME.teal, ME.coral].map((color, i) => (
          <motion.span
            key={color}
            className="h-[3px] flex-1 rounded-full"
            style={{
              backgroundColor: color,
              transformOrigin: i === 0 ? "left" : i === 2 ? "right" : "center",
            }}
            initial={reduceMotion ? false : { scaleX: 0, opacity: 0 }}
            whileInView={
              reduceMotion ? undefined : { scaleX: 1, opacity: 1 }
            }
            viewport={{ once: true }}
            transition={{
              duration: 0.55,
              delay: 0.08 + i * 0.1,
              ease: EASE,
            }}
          />
        ))}
      </div>

      <p
        className="max-w-xl font-body text-[clamp(1.15rem,2.3vw,1.45rem)] font-semibold leading-snug tracking-tight"
        style={{ color: ME.navy }}
      >
        Together, these opportunities became the principles guiding every
        MedEdge design decision.
      </p>

      <motion.div
        className="mt-8 h-px w-full max-w-2xl"
        style={{ backgroundColor: ME.pale }}
        aria-hidden
        initial={reduceMotion ? false : { scaleX: 0 }}
        whileInView={reduceMotion ? undefined : { scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.25, ease: EASE }}
      />
    </motion.div>
  );
}
