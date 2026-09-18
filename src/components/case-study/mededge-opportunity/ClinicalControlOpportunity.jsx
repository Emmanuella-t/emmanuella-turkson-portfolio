import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE, ME, cardShadow } from "./palette";

const ACTIONS = [
  { id: "review", label: "Review", emphasis: false },
  { id: "question", label: "Question", emphasis: false },
  { id: "dismiss", label: "Dismiss", emphasis: false },
  { id: "act", label: "Act", emphasis: true },
];

/**
 * Opp 03 — clinician decision-control visualization (coral).
 */
export default function ClinicalControlOpportunity({ title, description }) {
  const reduceMotion = useReducedMotion();
  const [pressed, setPressed] = useState(null);
  const [focused, setFocused] = useState(null);

  return (
    <motion.article
      className="flex h-full min-w-0 flex-col rounded-2xl bg-white p-6 sm:p-7"
      style={{ boxShadow: cardShadow }}
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
    >
      <div className="flex items-start justify-between gap-3">
        <p
          className="font-mono text-[clamp(1.75rem,3vw,2.25rem)] font-semibold tabular-nums leading-none tracking-tight"
          style={{ color: ME.coral }}
        >
          03
        </p>
        <p
          className="pt-1 font-mono text-[11px] uppercase tracking-[0.18em]"
          style={{ color: ME.slate }}
        >
          Autonomy
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
        style={{ perspective: reduceMotion ? undefined : "900px" }}
        aria-label="Clinician controls: review, question, dismiss, or act. Demonstration only."
      >
        <motion.div
          className="rounded-lg px-4 py-3 text-center"
          style={{
            backgroundColor: "#FDECEA",
            color: ME.coral,
          }}
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease: EASE }}
        >
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] sm:text-[11px]">
            Clinician remains the decision maker
          </p>
        </motion.div>

        <div className="mt-3 grid grid-cols-2 gap-2.5">
          {ACTIONS.map((action, i) => {
            const isHot = focused === action.id || pressed === action.id;
            return (
              <motion.button
                key={action.id}
                type="button"
                className="min-h-[48px] rounded-md px-3 py-3 text-center text-[13px] font-semibold uppercase tracking-[0.08em] outline-none focus-visible:ring-2 focus-visible:ring-[#F76C5E] focus-visible:ring-offset-2"
                style={{
                  backgroundColor: action.emphasis ? ME.coral : ME.white,
                  color: action.emphasis ? ME.white : ME.navy,
                  border: action.emphasis
                    ? `1px solid ${ME.coral}`
                    : `1px solid ${ME.pale}`,
                  boxShadow: isHot
                    ? action.emphasis
                      ? "0 12px 22px -12px rgba(247,108,94,0.55)"
                      : "0 10px 18px -12px rgba(9,38,58,0.28)"
                    : "0 4px 10px -8px rgba(9,38,58,0.12)",
                }}
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: 0.2 + i * 0.06,
                  ease: EASE,
                }}
                whileHover={
                  reduceMotion
                    ? undefined
                    : { y: -3, transition: { duration: 0.18 } }
                }
                whileTap={
                  reduceMotion
                    ? undefined
                    : { scale: 0.97, y: 0, transition: { duration: 0.1 } }
                }
                onMouseEnter={() => setFocused(action.id)}
                onMouseLeave={() => {
                  setFocused(null);
                  setPressed(null);
                }}
                onFocus={() => setFocused(action.id)}
                onBlur={() => {
                  setFocused(null);
                  setPressed(null);
                }}
                onMouseDown={() => setPressed(action.id)}
                onMouseUp={() => setPressed(null)}
                onTouchStart={() => setPressed(action.id)}
                onTouchEnd={() => setPressed(null)}
                aria-label={`${action.label} (demonstration control)`}
              >
                {action.label}
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.article>
  );
}
