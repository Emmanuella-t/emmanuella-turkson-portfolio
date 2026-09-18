import React, { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];
const ZOOM_BLUE = "#2D8CFF";
const CONNECTOR = "rgba(91, 110, 130, 0.5)";

/**
 * Optical scale so the visible 3D tiles feel equally sized despite each
 * asset carrying a different amount of transparent canvas.
 */
const ICON_SCALE = {
  feature: 0.9,
  testing: 1.0,
  launch: 0.9,
  partnerships: 0.97,
  monitoring: 0.92,
};

/**
 * Desktop composition. Each entry maps 1:1 to the ordered steps.
 * pos  = icon center as % of the roadmap stage (icons sit on the ribbon).
 * copy = where the text block sits relative to its icon.
 */
const DESKTOP = [
  { pos: { left: "24%", top: "86%" }, copy: "right" },
  { pos: { left: "35%", top: "68%" }, copy: "left" },
  { pos: { left: "45%", top: "50%" }, copy: "right" },
  { pos: { left: "55%", top: "32%" }, copy: "left" },
  { pos: { left: "66%", top: "14%" }, copy: "right" },
];

/* Broad ribbon + fine centre line, drawn in a 1120×820 stage space. */
const RIBBON_D =
  "M 175 760 C 320 690, 350 610, 430 500 C 510 390, 560 300, 660 205 C 710 160, 748 130, 815 52";

/* copy width kept comfortably inside the page margins. */
function maxWFor() {
  return "clamp(210px, 15vw, 250px)";
}

/* ── copy placement relative to the icon-sized wrapper ── */
function copyStyle(kind) {
  switch (kind) {
    case "left":
      return { right: "calc(100% + 30px)", top: "50%", transform: "translateY(-58%)" };
    case "above-left":
      return { bottom: "calc(100% + 30px)", right: "calc(50% + 0px)" };
    case "above":
      return { bottom: "calc(100% + 34px)", left: "50%", transform: "translateX(-50%)" };
    case "below-right":
      return { top: "calc(100% + 28px)", left: "calc(50% + 0px)" };
    case "right":
      return { left: "calc(100% + 30px)", top: "50%", transform: "translateY(-50%)" };
    default:
      return {};
  }
}

function Connector({ kind }) {
  const base = { position: "absolute", overflow: "visible", color: CONNECTOR };
  const stroke = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.4,
    strokeLinecap: "round",
  };
  const node = { fill: "currentColor" };

  switch (kind) {
    case "left":
      return (
        <svg style={{ ...base, right: "100%", top: "44%", width: 36, height: 14 }} viewBox="0 0 36 14" aria-hidden>
          <path d="M36 7 L 6 7" {...stroke} />
          <circle cx="6" cy="7" r="2.6" {...node} />
        </svg>
      );
    case "above-left":
      return (
        <svg style={{ ...base, bottom: "100%", left: "40%", width: 16, height: 34 }} viewBox="0 0 16 34" aria-hidden>
          <path d="M9 34 L 3 6" {...stroke} />
          <circle cx="3" cy="6" r="2.6" {...node} />
        </svg>
      );
    case "above":
      return (
        <svg style={{ ...base, bottom: "100%", left: "50%", transform: "translateX(-50%)", width: 8, height: 34 }} viewBox="0 0 8 34" aria-hidden>
          <path d="M4 34 L 4 6" {...stroke} />
          <circle cx="4" cy="6" r="2.6" {...node} />
        </svg>
      );
    case "below-right":
      return (
        <svg style={{ ...base, top: "100%", left: "50%", width: 38, height: 34 }} viewBox="0 0 38 34" aria-hidden>
          <path d="M4 2 L 32 28" {...stroke} />
          <circle cx="32" cy="28" r="2.6" {...node} />
        </svg>
      );
    case "right":
      return (
        <svg style={{ ...base, left: "100%", top: "50%", transform: "translateY(-50%)", width: 36, height: 14 }} viewBox="0 0 36 14" aria-hidden>
          <path d="M0 7 L 30 7" {...stroke} />
          <circle cx="30" cy="7" r="2.6" {...node} />
        </svg>
      );
    default:
      return null;
  }
}

function IconImg({ step }) {
  const scale = ICON_SCALE[step.id] ?? 1;
  return (
    <img
      src={step.icon.src}
      alt={step.icon.alt}
      draggable={false}
      className="block h-full w-full object-contain object-center transition-[filter,transform] duration-300 ease-out group-hover/ms:[filter:drop-shadow(0_16px_28px_rgba(45,140,255,0.36))] group-hover/ms:translate-y-[-5px] group-hover/ms:scale-[1.02]"
      style={{
        transform: `scale(${scale})`,
        filter: "drop-shadow(0 10px 18px rgba(45, 140, 255, 0.18))",
      }}
    />
  );
}

function CopyBlock({ step, align = "left", maxW = "clamp(215px, 16vw, 260px)" }) {
  return (
    <div
      className="roadmap-copy"
      style={{ width: maxW, textAlign: align }}
    >
      <p
        className="font-mono uppercase"
        style={{ margin: "0 0 8px", fontSize: 12, letterSpacing: "0.2em", color: ZOOM_BLUE }}
      >
        {step.number}
      </p>
      <h3
        className="roadmap-step-title font-display font-semibold text-[#401216] transition-colors duration-300 group-hover/ms:text-[#2D8CFF]"
        style={{ margin: "0 0 14px", fontSize: "clamp(20px, 1.6vw, 25px)", lineHeight: 1.15 }}
      >
        {step.title}
      </h3>
      <ul
        style={{
          display: "grid",
          gap: 8,
          margin: 0,
          padding: 0,
          listStyle: "none",
          fontSize: "clamp(14px, 1vw, 16px)",
          lineHeight: 1.45,
          textAlign: "left",
          width: "fit-content",
          maxWidth: "100%",
          marginInline:
            align === "center" ? "auto" : align === "right" ? "auto 0" : 0,
        }}
      >
        {step.items.map((item) => (
          <li key={item} className="flex gap-2.5 text-[#401216]/75">
            <span
              className="mt-[0.5em] h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ backgroundColor: "rgba(45, 140, 255, 0.7)" }}
              aria-hidden
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Desktop milestone: icon + copy + connector as one coordinated, animated unit. */
function DesktopMilestone({ step, config, index, visible, reduceMotion }) {
  const delay = 0.65 + index * 0.15;
  const align = config.copy === "left" ? "right" : "left";

  return (
    <div
      className="group/ms absolute"
      style={{
        left: config.pos.left,
        top: config.pos.top,
        width: "clamp(135px, 10vw, 158px)",
        aspectRatio: "1",
        transform: "translate(-50%, -50%)",
        zIndex: 3,
      }}
    >
      <motion.div
        className="relative h-full w-full"
        style={{ display: "grid", placeItems: "center" }}
        initial={reduceMotion ? false : { opacity: 0, y: 18, scale: 0.96 }}
        animate={
          visible
            ? { opacity: 1, y: 0, scale: 1 }
            : { opacity: 0, y: 18, scale: 0.96 }
        }
        transition={{ duration: 0.55, delay, ease: EASE }}
      >
        {/* icon */}
        <div className="roadmap-icon-wrap h-full w-full" style={{ display: "grid", placeItems: "center" }}>
          <IconImg step={step} />
        </div>

        {/* connector */}
        <Connector kind={config.copy} />

        {/* copy */}
        <div
          className="roadmap-copy-anchor absolute"
          style={{ ...copyStyle(config.copy), zIndex: 4 }}
        >
          <CopyBlock step={step} align={align} maxW={maxWFor(config.copy)} />
        </div>
      </motion.div>
    </div>
  );
}

function RoadmapRibbon({ visible, reduceMotion }) {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
      viewBox="0 0 1120 820"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <linearGradient id="nsRibbon" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#2D8CFF" stopOpacity="0.1" />
          <stop offset="55%" stopColor="#8BA6C4" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#2D8CFF" stopOpacity="0.12" />
        </linearGradient>
      </defs>

      {/* broad dimensional ribbon */}
      <motion.path
        d={RIBBON_D}
        fill="none"
        stroke="url(#nsRibbon)"
        strokeWidth="108"
        strokeLinecap="round"
        initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
        animate={visible ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: 1.15, ease: EASE }}
      />
      {/* faint inner highlight for depth */}
      <motion.path
        d={RIBBON_D}
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="34"
        strokeLinecap="round"
        strokeOpacity="0.35"
        initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
        animate={visible ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: 1.15, ease: EASE }}
      />
      {/* fine centre line */}
      <motion.path
        d={RIBBON_D}
        fill="none"
        stroke={ZOOM_BLUE}
        strokeWidth="2"
        strokeLinecap="round"
        strokeOpacity="0.3"
        initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
        animate={visible ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: 1.15, ease: EASE }}
      />
      {/* subtle upward tip — a natural taper of the path, not an arrow */}
      <motion.path
        d="M 792 74 C 812 48, 832 26, 850 4 C 838 34, 828 60, 832 86 Z"
        fill={ZOOM_BLUE}
        fillOpacity="0.2"
        initial={reduceMotion ? false : { opacity: 0, y: 6 }}
        animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
        transition={{ duration: 0.5, delay: 0.95, ease: EASE }}
      />
    </svg>
  );
}

/**
 * Ascending growth roadmap for the Zoom case study Next Steps section.
 * Desktop: broad rising ribbon with five milestones sitting on it.
 * Tablet: compact staggered layout with a soft vertical ribbon.
 * Mobile: vertical timeline in normal document flow.
 */
export default function NextStepsRoadmap({ steps = [] }) {
  const reduceMotion = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const visible = reduceMotion || inView;

  if (!steps.length) return null;

  return (
    <div ref={ref} className="w-full">
      {/* ── Mobile: vertical timeline ── */}
      <div className="relative md:hidden">
        <div
          aria-hidden
          className="absolute bottom-6 left-[55px] top-6 w-[2.5px] rounded-full bg-gradient-to-b from-[#2D8CFF]/35 via-[#8BA6C4]/25 to-[#2D8CFF]/12"
        />
        <ol className="relative m-0 flex list-none flex-col gap-11 p-0">
          {steps.map((step, i) => (
            <motion.li
              key={step.id}
              className="group/ms relative z-[1] flex items-start gap-4"
              initial={reduceMotion ? false : { opacity: 0, y: 16, scale: 0.96 }}
              animate={
                visible
                  ? { opacity: 1, y: 0, scale: 1 }
                  : { opacity: 0, y: 16, scale: 0.96 }
              }
              transition={{ duration: 0.5, delay: 0.25 + i * 0.14, ease: EASE }}
            >
              <div
                className="roadmap-icon-wrap shrink-0"
                style={{ width: 115, aspectRatio: "1", display: "grid", placeItems: "center" }}
              >
                <IconImg step={step} />
              </div>
              <div className="min-w-0 flex-1 pt-2">
                <CopyBlock step={step} align="left" maxW="100%" />
              </div>
            </motion.li>
          ))}
        </ol>
      </div>

      {/* ── Tablet: compact staggered layout ── */}
      <div className="relative mx-auto hidden max-w-[760px] md:block lg:hidden">
        <div
          aria-hidden
          className="absolute bottom-8 left-1/2 top-8 w-[3px] -translate-x-1/2 rounded-full bg-gradient-to-b from-[#2D8CFF]/12 via-[#8BA6C4]/22 to-[#2D8CFF]/32"
        />
        <ol className="relative m-0 flex list-none flex-col gap-12 p-0">
          {steps.map((step, i) => {
            const iconLeft = i % 2 === 0;
            return (
              <motion.li
                key={step.id}
                className="group/ms relative z-[1] grid items-center gap-6"
                style={{ gridTemplateColumns: "1fr 150px 1fr" }}
                initial={reduceMotion ? false : { opacity: 0, y: 18, scale: 0.96 }}
                animate={
                  visible
                    ? { opacity: 1, y: 0, scale: 1 }
                    : { opacity: 0, y: 18, scale: 0.96 }
                }
                transition={{ duration: 0.5, delay: 0.3 + i * 0.14, ease: EASE }}
              >
                {iconLeft ? (
                  <>
                    <div
                      className="roadmap-icon-wrap justify-self-end"
                      style={{ width: 150, aspectRatio: "1", display: "grid", placeItems: "center", gridColumn: 1 }}
                    >
                      <IconImg step={step} />
                    </div>
                    <div style={{ gridColumn: 3 }}>
                      <CopyBlock step={step} align="left" maxW="100%" />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-right" style={{ gridColumn: 1 }}>
                      <CopyBlock step={step} align="right" maxW="100%" />
                    </div>
                    <div
                      className="roadmap-icon-wrap justify-self-start"
                      style={{ width: 150, aspectRatio: "1", display: "grid", placeItems: "center", gridColumn: 3 }}
                    >
                      <IconImg step={step} />
                    </div>
                  </>
                )}
              </motion.li>
            );
          })}
        </ol>
      </div>

      {/* ── Desktop: ascending growth roadmap ── */}
      <div
        className="next-steps-roadmap relative mx-auto hidden lg:block"
        style={{
          width: "100%",
          minHeight: 820,
          marginInline: "auto",
          marginBottom: 40,
          padding: "48px 0 64px",
          boxSizing: "border-box",
          overflow: "visible",
        }}
      >
        <div className="relative w-full" style={{ height: 750, maxWidth: "100%" }}>
          <RoadmapRibbon visible={visible} reduceMotion={reduceMotion} />
          {steps.map((step, i) => (
            <DesktopMilestone
              key={step.id}
              step={step}
              config={DESKTOP[i]}
              index={i}
              visible={visible}
              reduceMotion={reduceMotion}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
