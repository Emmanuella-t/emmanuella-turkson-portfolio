import React, { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { EASE, LOW_FI_JOURNEY, ME } from "./screenData";
import ScreenImage from "./ScreenImage";
import ProgressNav from "./ProgressNav";

const TRANSITION = {
  duration: 0.95,
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
 * Low-fidelity wireframe sequence.
 * Click / keyboard navigation only. No scroll pinning.
 */
export default function LowFiJourney() {
  const reduceMotion = useReducedMotion();
  const screens = LOW_FI_JOURNEY;
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(0);
  const sectionRef = React.useRef(null);

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
      const focused = root.contains(document.activeElement) || document.activeElement === root;
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

  const screen = screens[active];
  const canPrev = active > 0;
  const canNext = active < screens.length - 1;
  const progress = (active + 1) / screens.length;

  const variants = reduceMotion
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
        center: {
          x: 0,
          opacity: 1,
        },
        exit: (dir) => ({
          x: dir > 0 ? -40 : 40,
          opacity: 0.25,
        }),
      };

  return (
    <section
      ref={sectionRef}
      tabIndex={0}
      aria-labelledby="lowfi-journey-heading"
      aria-roledescription="carousel"
      aria-label="Low-fidelity wireframe sequence"
      className="w-full min-w-0 outline-none focus-visible:ring-2 focus-visible:ring-[#0EA8A7] focus-visible:ring-offset-4"
    >
      <Header />

      <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
        <p
          className="min-w-0 font-mono text-[11px] uppercase tracking-[0.16em]"
          style={{ color: ME.slate }}
          aria-live="polite"
        >
          {String(active + 1).padStart(2, "0")} of{" "}
          {String(screens.length).padStart(2, "0")}: {screen?.title}
        </p>

        <div className="flex items-center gap-3">
          <ProgressNav
            total={screens.length}
            active={active}
            onSelect={(i) => goTo(i)}
            orientation="horizontal"
            labelPrefix="Wireframe"
          />
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={goPrev}
              disabled={!canPrev}
              aria-label="Previous wireframe"
              className="rounded-full border px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.14em] outline-none transition-opacity focus-visible:ring-2 focus-visible:ring-[#0EA8A7] disabled:cursor-not-allowed disabled:opacity-35"
              style={controlStyle}
            >
              Previous
            </button>
            <button
              type="button"
              onClick={goNext}
              disabled={!canNext}
              aria-label="Next wireframe"
              className="rounded-full border px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.14em] outline-none transition-opacity focus-visible:ring-2 focus-visible:ring-[#0EA8A7] disabled:cursor-not-allowed disabled:opacity-35"
              style={controlStyle}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <div
        className="mt-4 h-[2px] w-full overflow-hidden rounded-full"
        style={{ backgroundColor: ME.pale }}
        aria-hidden
      >
        <motion.div
          className="h-full origin-left rounded-full"
          style={{ backgroundColor: ME.teal }}
          initial={false}
          animate={{ scaleX: Math.max(0.08, progress) }}
          transition={reduceMotion ? { duration: 0 } : TRANSITION}
        />
      </div>

      <div className="relative mt-8 w-full min-w-0 overflow-x-clip">
        <div className="relative mx-auto w-full max-w-[920px]">
          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.div
              key={screen.slug}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={reduceMotion ? FADE_ONLY : TRANSITION}
              className="w-full"
            >
              <div
                className="overflow-hidden rounded-lg border"
                style={{
                  backgroundColor: ME.white,
                  borderColor: ME.pale,
                  boxShadow: "0 22px 48px -28px rgba(9,38,58,0.28)",
                }}
              >
                <ScreenImage
                  src={screen.src}
                  alt={screen.title}
                  width={screen.width}
                  height={screen.height}
                  priority
                  className="w-full"
                />
              </div>
              <p
                className="mt-4 font-body text-[15px] font-semibold"
                style={{ color: ME.navy }}
              >
                <span
                  className="mr-2 font-mono text-[11px] font-normal tabular-nums tracking-[0.18em]"
                  style={{ color: ME.teal }}
                >
                  {String(active + 1).padStart(2, "0")}
                </span>
                {screen.title}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function Header() {
  return (
    <header className="max-w-2xl">
      <p
        className="font-mono text-[12px] uppercase tracking-[0.2em]"
        style={{ color: ME.teal }}
      >
        Low-fidelity wireframes
      </p>
      <h2
        id="lowfi-journey-heading"
        className="mt-3 font-body text-[clamp(1.85rem,3.4vw,2.75rem)] font-semibold leading-[1.1] tracking-tight"
        style={{ color: ME.navy }}
      >
        Shaping the clinical workflow
      </h2>
      <p
        className="mt-4 max-w-xl text-base leading-relaxed sm:text-lg"
        style={{ color: ME.slate }}
      >
        Early wireframes helped define how clinicians could move from patient
        context to clinical action without losing critical information along the
        way.
      </p>
    </header>
  );
}
