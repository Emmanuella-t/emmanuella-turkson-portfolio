import React from "react";
import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

function WirePlate({ children, className = "" }) {
  return (
    <div
      className={`overflow-hidden rounded-sm bg-[#E8ECF2] ${className}`}
    >
      {children}
    </div>
  );
}

function WireImage({ item, priority = false, className = "" }) {
  return (
    <img
      src={item.src}
      alt={item.alt || item.title}
      width={item.width}
      height={item.height}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      draggable={false}
      className={`mx-auto block h-auto w-full max-w-full object-contain object-center select-none ${className}`}
    />
  );
}

/**
 * MedEdge Wireframes — editorial gallery.
 * One featured screen, then a measured sequence. No carousel, frames, or glow.
 */
export default function MedEdgeWireframes({ wireframes }) {
  const reduceMotion = useReducedMotion();
  const featured = wireframes.featured;
  const items = wireframes.items || [];
  const decision = wireframes.decision;

  return (
    <motion.div
      className="flex flex-col"
      style={{ gap: "clamp(3.25rem, 6.5vw, 5.5rem)" }}
      variants={stagger}
      initial={reduceMotion ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
    >
      {/* Intro */}
      <motion.header variants={fadeUp} className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="max-w-xl lg:col-span-7">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-cs-accent sm:text-[13px]">
            {wireframes.eyebrow || "08 — Wireframes"}
          </p>
          <h2 className="cs-display-serif mt-5 text-[clamp(2.25rem,4.4vw,3.4rem)] font-semibold leading-[1.08] tracking-tight text-cs-ink">
            {wireframes.title || "Mapping structure before polish"}
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-cs-ink/70 sm:text-lg">
            {wireframes.intro}
          </p>
        </div>

        {decision && (
          <div className="lg:col-span-5 lg:pt-14">
            <div className="border-l border-cs-accent/50 pl-5 sm:pl-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-cs-accent">
                {decision.label}
              </p>
              <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-cs-ink/75 sm:text-base">
                {decision.text}
              </p>
            </div>
          </div>
        )}
      </motion.header>

      {/* Featured — primary compositional weight */}
      {featured && (
        <motion.figure variants={fadeUp} className="min-w-0">
          <div className="mb-5 flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <span className="font-mono text-[11px] tabular-nums tracking-[0.2em] text-cs-accent">
              {featured.number}
            </span>
            <h3 className="font-body text-lg font-semibold tracking-tight text-cs-ink sm:text-xl">
              {featured.title}
            </h3>
            {featured.caption && (
              <p className="w-full text-sm leading-relaxed text-cs-ink/55 sm:w-auto sm:max-w-md">
                {featured.caption}
              </p>
            )}
          </div>
          <WirePlate className="px-3 py-6 sm:px-8 sm:py-10 lg:px-12 lg:py-12">
            <WireImage
              item={featured}
              priority
              className="max-h-[min(68vh,640px)]"
            />
          </WirePlate>
        </motion.figure>
      )}

      {/* Supporting sequence */}
      {items.length > 0 && (
        <motion.div variants={fadeUp}>
          <div className="mb-8 flex items-center gap-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-cs-muted">
              Core flows
            </p>
            <span className="h-px flex-1 bg-cs-border/70" />
          </div>

          <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-2">
            {items.map((item) => (
              <motion.li
                key={item.src}
                variants={fadeUp}
                className="min-w-0 list-none"
              >
                <figure>
                  <WirePlate className="px-3 py-5 sm:px-5 sm:py-7">
                    <WireImage
                      item={item}
                      className="max-h-[min(42vh,380px)]"
                    />
                  </WirePlate>
                  <figcaption className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="font-mono text-[11px] tabular-nums tracking-[0.18em] text-cs-accent">
                      {item.number}
                    </span>
                    <span className="font-body text-[15px] font-semibold tracking-tight text-cs-ink">
                      {item.title}
                    </span>
                    {item.caption && (
                      <span className="w-full text-sm leading-relaxed text-cs-ink/55">
                        {item.caption}
                      </span>
                    )}
                  </figcaption>
                </figure>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.div>
  );
}
