import React from "react";
import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.04 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

/**
 * MedEdge Role & Collaboration — spacious three-part editorial layout.
 * Intro → roomy ownership cards → lighter collaboration block.
 */
export default function MedEdgeRole({ role }) {
  const reduceMotion = useReducedMotion();
  const groups = role.groups || [];
  const team = role.collaboration?.team || [];
  const didNotOwn = role.didNotOwn || [];

  return (
    <motion.div
      className="relative z-10 flex flex-col"
      style={{ gap: "clamp(3.5rem, 7vw, 5.5rem)" }}
      variants={container}
      initial={reduceMotion ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
    >
      {/* 1. Intro header — left-weighted so the stethoscope can begin in the top-right whitespace */}
      <motion.header variants={fadeUp} className="relative z-10 max-w-xl lg:max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-cs-muted sm:text-[13px]">
          03 — Role &amp; Collaboration
        </p>
        <h2 className="cs-display-serif mt-5 text-[clamp(2.25rem,4.5vw,3.5rem)] font-semibold leading-[1.08] tracking-tight text-cs-ink">
          What I owned
        </h2>
        <p className="mt-5 max-w-lg text-lg leading-relaxed text-cs-ink/70 sm:text-xl">
          {role.intro}
        </p>
      </motion.header>

      {/* 2. My role — three airy cards (opaque so tubing only shows in the gaps) */}
      <motion.div variants={fadeUp} className="relative z-10">
        <p className="mb-8 font-mono text-[11px] uppercase tracking-[0.18em] text-cs-muted">
          My role
        </p>
        <div className="grid gap-6 md:grid-cols-3 md:gap-7 lg:gap-8">
          {groups.map((group, groupIndex) => (
            <article
              key={group.title}
              className="relative z-10 flex flex-col rounded-[1.35rem] border border-cs-border/55 bg-cs-card px-7 py-8 shadow-[0_18px_40px_-32px_rgba(6,16,42,0.28)] sm:px-8 sm:py-9"
            >
              <span className="font-mono text-[11px] tabular-nums tracking-[0.2em] text-cs-accent/80">
                0{groupIndex + 1}
              </span>
              <h3 className="mt-4 font-body text-xl font-semibold tracking-tight text-cs-ink">
                {group.title}
              </h3>
              <ul className="mt-7 flex flex-col gap-5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="max-w-[18rem] border-t border-cs-border/50 pt-4 text-[15px] leading-relaxed text-cs-ink/70"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </motion.div>

      {/* 3. Collaboration — lighter secondary block */}
      <motion.div
        variants={fadeUp}
        className="relative z-10 border-t border-cs-border/60 pt-12 sm:pt-14"
      >
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16 xl:gap-20">
          <div className="relative z-10 min-w-0">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-cs-muted">
              Cross-functional collaboration
            </p>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-cs-ink/70 sm:text-lg">
              {role.collaboration?.copy}
            </p>

            <ul className="mt-8 flex flex-wrap gap-2.5">
              {team.map((member) => (
                <li
                  key={member}
                  className="rounded-full border border-cs-border/70 bg-cs-card/95 px-4 py-2 text-sm font-medium text-cs-ink/85 shadow-sm"
                >
                  {member}
                </li>
              ))}
            </ul>
          </div>

          <aside className="relative z-10 min-w-0 rounded-[1.35rem] border border-cs-border/60 bg-cs-card px-7 py-8 shadow-[0_18px_40px_-32px_rgba(6,16,42,0.22)] sm:px-8 sm:py-9">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-cs-muted">
              What I did not own
            </p>
            <ul className="mt-6 flex flex-col gap-3.5">
              {didNotOwn.map((item) => (
                <li
                  key={item}
                  className="text-[15px] leading-relaxed text-cs-ink/70"
                >
                  {item}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </motion.div>
    </motion.div>
  );
}
