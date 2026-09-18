import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Activity, Heart, HeartPulse } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1];

const WORKFLOW_ICONS = {
  activity: Activity,
  "heart-pulse": HeartPulse,
  heart: Heart,
};

const DETAIL_ROWS = [
  { key: "goals", label: "Goals" },
  { key: "frustrations", label: "Frustrations" },
  { key: "needs", label: "Needs" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
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

function PersonaBlock({ persona, index, reduceMotion }) {
  const imageLeft = index % 2 === 0;
  const WorkflowIcon = WORKFLOW_ICONS[persona.workflowIcon] || Activity;
  const number = String(index + 1).padStart(2, "0");

  return (
    <motion.article
      variants={stagger}
      initial={reduceMotion ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12 xl:gap-14"
    >
      <motion.div
        variants={fadeUp}
        className={`min-w-0 lg:col-span-5 ${
          imageLeft ? "lg:order-1" : "lg:order-2"
        }`}
      >
        <figure className="m-0 overflow-hidden rounded-[1.35rem] bg-cs-card shadow-[0_22px_50px_-34px_rgba(6,16,42,0.4)]">
          <img
            src={persona.image.src}
            alt={persona.image.alt}
            width={819}
            height={1024}
            loading="lazy"
            decoding="async"
            className="block h-auto w-full max-w-full object-contain object-top"
            style={{ aspectRatio: "819 / 1024" }}
          />
        </figure>
      </motion.div>

      <motion.div
        variants={stagger}
        className={`flex min-w-0 flex-col gap-7 lg:col-span-7 ${
          imageLeft ? "lg:order-2" : "lg:order-1"
        }`}
      >
        <motion.div variants={fadeUp}>
          <p className="font-mono text-[11px] tabular-nums tracking-[0.2em] text-cs-accent">
            {number}
          </p>
          <h3 className="mt-3 font-body text-[clamp(1.75rem,2.8vw,2.35rem)] font-semibold leading-[1.1] tracking-tight text-cs-ink">
            {persona.name}
          </h3>
          <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-cs-muted">
            {persona.role}
          </p>
          <p className="mt-4 inline-flex items-center gap-2 text-sm text-cs-ink/65">
            <WorkflowIcon className="h-4 w-4 shrink-0 text-cs-accent" strokeWidth={1.75} />
            <span>{persona.workflow}</span>
          </p>
        </motion.div>

        <motion.blockquote
          variants={fadeUp}
          className="border-l-2 border-cs-accent/40 pl-5"
        >
          <p className="text-base leading-relaxed text-cs-ink/80 sm:text-lg">
            “{persona.quote}”
          </p>
        </motion.blockquote>

        <motion.div
          variants={fadeUp}
          className="grid gap-7 sm:grid-cols-3 sm:gap-6"
        >
          {DETAIL_ROWS.map(({ key, label }) => (
            <div key={key} className="min-w-0">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-cs-muted">
                {label}
              </p>
              <ul className="mt-3 space-y-2.5">
                {(persona[key] || []).map((item) => (
                  <li
                    key={item}
                    className="text-sm leading-relaxed text-cs-ink/75"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="border-t border-cs-border/60 pt-6"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-cs-accent">
            What MedEdge should support
          </p>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-cs-ink/80 sm:text-[15px]">
            {persona.support}
          </p>
        </motion.div>
      </motion.div>
    </motion.article>
  );
}

/**
 * MedEdge Users — spacious alternating editorial persona profiles.
 */
export default function MedEdgeUsers({ users }) {
  const reduceMotion = useReducedMotion();
  const personas = users?.personas || [];

  return (
    <div className="flex flex-col" style={{ gap: "clamp(3rem, 6vw, 5rem)" }}>
      <motion.header
        className="max-w-2xl"
        initial={reduceMotion ? false : { opacity: 0, y: 22 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-cs-muted sm:text-[13px]">
          06 — Users
        </p>
        <h2 className="cs-display-serif mt-5 text-[clamp(2.25rem,4.5vw,3.5rem)] font-semibold leading-[1.08] tracking-tight text-cs-ink">
          Defining the user
        </h2>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-cs-ink/70 sm:text-xl">
          {users?.summary}
        </p>
      </motion.header>

      <div
        className="flex flex-col"
        style={{ gap: "clamp(3.5rem, 7vw, 5.5rem)" }}
      >
        {personas.map((persona, index) => (
          <PersonaBlock
            key={persona.name}
            persona={persona}
            index={index}
            reduceMotion={Boolean(reduceMotion)}
          />
        ))}
      </div>
    </div>
  );
}
