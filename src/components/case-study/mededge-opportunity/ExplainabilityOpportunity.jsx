import React, { useId, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE, ME, cardShadow } from "./palette";

const EVIDENCE = [
  { id: "context", label: "Patient context" },
  { id: "risk", label: "Risk indicators" },
  { id: "support", label: "Evidence" },
];

/**
 * Opp 02 — recommendation + evidence-chain visualization (teal).
 */
export default function ExplainabilityOpportunity({ title, description }) {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(null);
  const uid = useId();

  return (
    <motion.article
      className="flex h-full min-w-0 flex-col rounded-2xl bg-white p-6 sm:p-7 lg:scale-[1.03]"
      style={{ boxShadow: cardShadow }}
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.6, delay: 0.06, ease: EASE }}
    >
      <div className="flex items-start justify-between gap-3">
        <p
          className="font-mono text-[clamp(1.75rem,3vw,2.25rem)] font-semibold tabular-nums leading-none tracking-tight"
          style={{ color: ME.teal }}
        >
          02
        </p>
        <p
          className="pt-1 font-mono text-[11px] uppercase tracking-[0.18em]"
          style={{ color: ME.slate }}
        >
          Explainability
        </p>
      </div>

      <h3
        className="mt-4 font-body text-[clamp(1.25rem,2vw,1.55rem)] font-semibold leading-tight tracking-tight"
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
        style={{ perspective: reduceMotion ? undefined : "900px" }}
        aria-label="Recommendation connected to patient context, risk indicators, and supporting evidence"
      >
        <motion.div
          className="rounded-lg px-4 py-3.5"
          style={{
            backgroundColor: ME.navy,
            boxShadow: "0 14px 28px -18px rgba(9,38,58,0.5)",
            transform: reduceMotion ? undefined : "translateZ(18px)",
          }}
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <p
            className="font-mono text-[10px] uppercase tracking-[0.16em]"
            style={{ color: ME.softTeal }}
          >
            AI-assisted suggestion
          </p>
        </motion.div>

        {/* Structured connectors */}
        <div className="relative flex justify-around px-6" aria-hidden>
          {EVIDENCE.map((item) => (
            <motion.div
              key={item.id}
              className="h-5 w-px"
              style={{
                backgroundColor:
                  active === item.id || reduceMotion ? ME.mint : ME.softTeal,
              }}
              initial={reduceMotion ? false : { scaleY: 0, opacity: 0 }}
              whileInView={
                reduceMotion ? undefined : { scaleY: 1, opacity: 1 }
              }
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: 0.25, ease: EASE }}
            />
          ))}
        </div>

        <div className="grid grid-cols-3 gap-2">
          {EVIDENCE.map((item, i) => {
            const isActive = active === item.id;
            return (
              <motion.button
                key={item.id}
                type="button"
                id={`${uid}-${item.id}`}
                onMouseEnter={() => setActive(item.id)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(item.id)}
                onBlur={() => setActive(null)}
                className="rounded-md border px-2 py-3 text-center outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-[#0EA8A7] focus-visible:ring-offset-2"
                style={{
                  backgroundColor: ME.white,
                  borderColor: isActive ? ME.mint : ME.pale,
                  color: ME.navy,
                  boxShadow: isActive
                    ? "0 10px 20px -12px rgba(14,168,167,0.45)"
                    : "none",
                  transform: reduceMotion
                    ? undefined
                    : isActive
                      ? "translateZ(10px) translateY(-2px)"
                      : "translateZ(0)",
                }}
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: 0.28 + i * 0.07,
                  ease: EASE,
                }}
                aria-pressed={isActive}
              >
                <span className="block font-mono text-[9px] uppercase leading-snug tracking-[0.1em] sm:text-[10px]">
                  {item.label}
                </span>
              </motion.button>
            );
          })}
        </div>

        <p
          className="mt-4 text-center font-mono text-[11px] tracking-[0.04em]"
          style={{ color: ME.teal }}
        >
          Recommendation + visible supporting context
        </p>
      </div>
    </motion.article>
  );
}
