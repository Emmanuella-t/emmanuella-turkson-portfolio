import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { EASE, ME, SPOTLIGHT } from "./screenData";
import ScreenImage from "./ScreenImage";
import ProgressNav from "./ProgressNav";

const TRANSITION = {
  duration: 0.92,
  ease: EASE,
};

const FADE_ONLY = {
  duration: 0.2,
  ease: "easeOut",
};

const controlStyle = {
  borderColor: ME.pale,
  color: ME.navy,
  backgroundColor: ME.white,
};

/**
 * High-fidelity product spotlight.
 * Click / keyboard navigation only. No scroll pinning.
 */
export default function ProductSpotlight() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const screens = SPOTLIGHT;
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(0);

  const goTo = useCallback(
    (index, dir = 0) => {
      const next = Math.max(0, Math.min(screens.length - 1, index));
      if (next === active) return;
      setDirection(dir || (next > active ? 1 : -1));
      setActive(next);
    },
    [active, screens.length]
  );

  const goPrev = useCallback(() => goTo(active - 1, -1), [active, goTo]);
  const goNext = useCallback(() => goTo(active + 1, 1), [active, goTo]);

  useEffect(() => {
    const onKey = (e) => {
      const root = sectionRef.current;
      if (!root) return;
      const focused =
        root.contains(document.activeElement) ||
        document.activeElement === root;
      if (!focused) return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrev]);

  const current = screens[active];
  const canPrev = active > 0;
  const canNext = active < screens.length - 1;

  const copyVariants = reduceMotion
    ? {
        enter: { opacity: 0 },
        center: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        enter: (dir) => ({
          x: dir > 0 ? 40 : -40,
          opacity: 0,
        }),
        center: { x: 0, opacity: 1 },
        exit: (dir) => ({
          x: dir > 0 ? -40 : 40,
          opacity: 0.3,
        }),
      };

  const stageVariants = reduceMotion
    ? {
        enter: { opacity: 0 },
        center: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        enter: (dir) => ({
          x: dir > 0 ? 40 : -40,
          opacity: 0,
          scale: 0.97,
        }),
        center: { x: 0, opacity: 1, scale: 1 },
        exit: (dir) => ({
          x: dir > 0 ? -40 : 40,
          opacity: 0.35,
          scale: 0.97,
        }),
      };

  return (
    <section
      ref={sectionRef}
      tabIndex={0}
      aria-labelledby="spotlight-heading"
      aria-roledescription="carousel"
      aria-label="High-fidelity product spotlight"
      className="w-full min-w-0 outline-none focus-visible:ring-2 focus-visible:ring-[#0EA8A7] focus-visible:ring-offset-4"
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-start gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.34fr)_minmax(0,0.66fr)] lg:items-center lg:gap-12 lg:px-8">
        <div className="min-w-0">
          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.div
              key={current.slug + "-copy"}
              custom={direction}
              variants={copyVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={reduceMotion ? FADE_ONLY : TRANSITION}
            >
              <p
                className="font-mono text-[11px] uppercase tracking-[0.2em]"
                style={{ color: ME.teal }}
              >
                High-fidelity product
              </p>
              <p
                className="mt-4 font-mono text-[13px] tabular-nums tracking-[0.16em]"
                style={{ color: ME.slate }}
                aria-live="polite"
              >
                {String(active + 1).padStart(2, "0")} /{" "}
                {String(screens.length).padStart(2, "0")}
              </p>
              <h3
                className="mt-4 font-body text-[clamp(1.5rem,2.4vw,2.1rem)] font-semibold leading-tight tracking-tight"
                style={{ color: ME.navy }}
              >
                {current.title}
              </h3>
              <p
                className="mt-4 text-base leading-relaxed"
                style={{ color: ME.slate }}
              >
                {current.description}
              </p>
              <ul className="mt-6 space-y-3">
                {current.decisions.map((d) => (
                  <li
                    key={d}
                    className="border-l-2 pl-3 text-sm leading-relaxed"
                    style={{ borderColor: ME.softTeal, color: ME.navy }}
                  >
                    {d}
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <ProgressNav
              total={screens.length}
              active={active}
              onSelect={(i) => goTo(i)}
              orientation="horizontal"
              labelPrefix="Product screen"
            />
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={goPrev}
                disabled={!canPrev}
                aria-label="Previous screen"
                className="rounded-full border px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.14em] outline-none transition-opacity focus-visible:ring-2 focus-visible:ring-[#0EA8A7] disabled:cursor-not-allowed disabled:opacity-35"
                style={controlStyle}
              >
                Previous
              </button>
              <button
                type="button"
                onClick={goNext}
                disabled={!canNext}
                aria-label="Next screen"
                className="rounded-full border px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.14em] outline-none transition-opacity focus-visible:ring-2 focus-visible:ring-[#0EA8A7] disabled:cursor-not-allowed disabled:opacity-35"
                style={controlStyle}
              >
                Next
              </button>
            </div>
          </div>
        </div>

        <div
          className="relative min-h-[280px] min-w-0 overflow-hidden rounded-xl border sm:min-h-[320px]"
          style={{
            backgroundColor: ME.bg,
            borderColor: ME.pale,
            boxShadow: "0 24px 50px -32px rgba(9,38,58,0.35)",
          }}
        >
          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.div
              key={current.slug}
              custom={direction}
              variants={stageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={reduceMotion ? FADE_ONLY : TRANSITION}
              className="p-3 sm:p-5"
            >
              <ScreenImage
                src={current.src}
                alt={current.title}
                width={current.width}
                height={current.height}
                priority={active === 0}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
