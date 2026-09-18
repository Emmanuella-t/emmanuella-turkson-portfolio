import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE, EVOLUTION, ME } from "./screenData";
import ScreenImage from "./ScreenImage";
import Annotation from "./Annotation";

/**
 * Low-fi → high-fi evolution for Recommendation Detail.
 */
export default function EvolutionCompare() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="evolution-heading"
      className="w-full"
      style={{ backgroundColor: ME.white }}
    >
      <header className="mx-auto max-w-3xl text-center">
        <p
          className="font-mono text-[12px] uppercase tracking-[0.2em]"
          style={{ color: ME.teal }}
        >
          Evolution
        </p>
        <h2
          id="evolution-heading"
          className="mt-4 font-body text-[clamp(1.85rem,3.4vw,2.75rem)] font-semibold leading-[1.1] tracking-tight"
          style={{ color: ME.navy }}
        >
          From structure to clinical clarity
        </h2>
        <p
          className="mx-auto mt-4 max-w-2xl text-base leading-relaxed sm:text-lg"
          style={{ color: ME.slate }}
        >
          {EVOLUTION.copy}
        </p>
      </header>

      <div className="mt-12 grid items-start gap-8 lg:grid-cols-[1fr_auto_1fr] lg:gap-6 xl:gap-10">
        <motion.figure
          className="min-w-0"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          <figcaption
            className="mb-3 font-mono text-[11px] uppercase tracking-[0.16em]"
            style={{ color: ME.slate }}
          >
            Wireframe
          </figcaption>
          <div
            className="overflow-hidden rounded-lg border"
            style={{ backgroundColor: ME.bg, borderColor: ME.pale }}
          >
            <ScreenImage
              src={EVOLUTION.low.src}
              alt={`Low-fidelity ${EVOLUTION.low.title}`}
              width={EVOLUTION.low.width}
              height={EVOLUTION.low.height}
              priority
            />
          </div>
        </motion.figure>

        <div className="hidden items-center justify-center self-center lg:flex">
          <p
            className="whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.18em]"
            style={{ color: ME.teal }}
          >
            Wireframe → Refined experience
          </p>
        </div>

        <p
          className="text-center font-mono text-[11px] uppercase tracking-[0.18em] lg:hidden"
          style={{ color: ME.teal }}
        >
          Wireframe → Refined experience
        </p>

        <motion.figure
          className="min-w-0"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, delay: 0.08, ease: EASE }}
        >
          <figcaption
            className="mb-3 font-mono text-[11px] uppercase tracking-[0.16em]"
            style={{ color: ME.slate }}
          >
            Refined experience
          </figcaption>
          <div
            className="overflow-hidden rounded-lg border"
            style={{
              backgroundColor: ME.white,
              borderColor: ME.pale,
              boxShadow: "0 22px 48px -30px rgba(9,38,58,0.32)",
            }}
          >
            <ScreenImage
              src={EVOLUTION.high.src}
              alt={`High-fidelity ${EVOLUTION.high.title}`}
              width={EVOLUTION.high.width}
              height={EVOLUTION.high.height}
              priority
            />
          </div>
        </motion.figure>
      </div>

      <div className="mx-auto mt-12 grid max-w-5xl gap-8 sm:grid-cols-3 sm:gap-10">
        {EVOLUTION.annotations.map((item) => (
          <Annotation key={item.title} title={item.title} body={item.body} />
        ))}
      </div>
    </section>
  );
}
