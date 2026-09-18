import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE, ME } from "./palette";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE },
  },
};

/**
 * Design Principles — Deep Navy foundation, editorial 2×2.
 */
export default function DesignPrinciples({ principles = [] }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      className="relative w-full min-w-0 overflow-hidden"
      aria-labelledby="mededge-design-principles-heading"
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: EASE }}
      style={{ backgroundColor: ME.navy }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-[12%] right-0 hidden w-14 bg-[#0B2F46] md:block"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-[8%] hidden h-8 w-[28%] bg-[#0B2F46] md:block"
      />

      <div
        className="relative mx-auto w-full max-w-5xl"
        style={{
          padding:
            "clamp(3.5rem, 7vw, 5.5rem) clamp(1.25rem, 4vw, 2.5rem)",
        }}
      >
        <p
          className="font-mono text-[12px] uppercase tracking-[0.2em] sm:text-[13px]"
          style={{ color: ME.teal }}
        >
          Four design principles
        </p>
        <h3
          id="mededge-design-principles-heading"
          className="mt-4 font-body text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold leading-tight tracking-tight text-white"
        >
          The rules that shaped the interface
        </h3>

        <motion.ol
          className="mt-12 grid list-none gap-0 p-0 sm:grid-cols-2"
          variants={reduceMotion ? undefined : stagger}
          initial={reduceMotion ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
        >
          {principles.map((principle, index) => {
            const isLeft = index % 2 === 0;
            const isTop = index < 2;
            return (
              <motion.li
                key={principle.title}
                variants={reduceMotion ? undefined : item}
                className={[
                  "min-w-0 py-8 sm:py-10",
                  isLeft ? "sm:pr-8 lg:pr-12" : "sm:pl-8 lg:pl-12",
                  !isLeft
                    ? "sm:border-l sm:border-white/10"
                    : "",
                  !isTop ? "border-t border-white/10" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <span
                  className="font-mono text-[13px] tabular-nums tracking-[0.18em]"
                  style={{ color: ME.mint }}
                >
                  0{index + 1}
                </span>
                <h4 className="mt-3 font-body text-[clamp(1.2rem,2vw,1.45rem)] font-semibold tracking-tight text-white">
                  {principle.title}
                </h4>
                <p
                  className="mt-3 max-w-sm text-base leading-relaxed"
                  style={{ color: ME.pale }}
                >
                  {principle.description}
                </p>
              </motion.li>
            );
          })}
        </motion.ol>
      </div>
    </motion.section>
  );
}
