import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Lightbox from "../mededge-screens/Lightbox";

const EASE = [0.22, 1, 0.36, 1];

const R = {
  yellow: "#FFC500",
  ink: "#14181F",
  mute: "#5C6570",
  line: "#E6E0D8",
  cream: "#F3EFE8",
};

const ROOT =
  "/case-studies/synchrony_rise_case_stucy/rise-by-synchrony-lowfiscreens";

function asset(file) {
  return encodeURI(`${ROOT}/${file}`);
}

function screen(flow, file) {
  return {
    src: asset(`${flow}/Screen Card/${file}`),
    annotation: asset(`${flow}/Screen Card/${file.split(" — ")[0]}/UX Annotation.png`),
    label: file.replace(/^LF-\d+ — /, ""),
    width: 780,
    height: 1688,
  };
}

const FLOWS = [
  {
    id: "enrollment",
    number: "01",
    title: "Enrollment and Foundation Card",
    caption:
      "Product structure, navigation, and hierarchy — program, profile, Foundation Card, then a home that holds the rest of the system.",
    board: {
      src: asset("Rise Low-Fi/Flow A — Enrollment and Foundation Card.png"),
      width: 3936,
      height: 2400,
      title: "Flow A — Enrollment and Foundation Card",
    },
    screens: [
      screen("Flow A", "LF-01 — Welcome to Rise.png"),
      screen("Flow A", "LF-02 — Student Profile.png"),
      screen("Flow A", "LF-03 — Foundation Card Setup.png"),
      screen("Flow A", "LF-04 — Home Dashboard.png"),
    ],
  },
  {
    id: "guidance",
    number: "02",
    title: "AI Decision Support",
    caption:
      "Intervention timing and student control — guidance appears before confirmation, and the choice stays open.",
    board: {
      src: asset("Rise Low-Fi/Flow B — AI Decision Support.png"),
      width: 3936,
      height: 2576,
      title: "Flow B — AI Decision Support",
    },
    screens: [
      screen("Flow B", "LF-05 — Card Activity.png"),
      screen("Flow B", "LF-07 — Purchase Review.png"),
      screen("Flow B", "LF-08 — AI Guidance.png"),
      screen("Flow B", "LF-09 — Decision Confirmation.png"),
    ],
  },
  {
    id: "progress",
    number: "03",
    title: "Building Progress",
    caption:
      "Progress visibility — Credit Health, Pip, and Rise Points show change without pretending to be a score.",
    board: {
      src: asset("Rise Low-Fi/Flow C — Building Progress.png"),
      width: 3936,
      height: 2576,
      title: "Flow C — Building Progress",
    },
    screens: [
      screen("Flow C", "LF-06 — Credit Health.png"),
      screen("Flow C", "LF-10 — Payment Milestone.png"),
      screen("Flow C", "LF-11 — Rise Points.png"),
    ],
  },
  {
    id: "support",
    number: "04",
    title: "Finding Support",
    caption:
      "Support when guidance alone is not enough — resources explain themselves and leave the official decision outside Rise.",
    board: {
      src: asset("Rise Low-Fi/Flow D — Finding Support.png"),
      width: 3936,
      height: 2400,
      title: "Flow D — Finding Support",
    },
    screens: [
      screen("Flow D", "LF-12 — Resource Stack.png"),
      screen("Flow D", "LF-13 — Resource Details.png"),
    ],
  },
];

const DEFAULT_FLOW = 1;
const LG_QUERY = "(min-width: 1024px)";

function useIsDesktop() {
  const [desktop, setDesktop] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia(LG_QUERY).matches : true
  );

  useEffect(() => {
    const mq = window.matchMedia(LG_QUERY);
    const sync = () => setDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return desktop;
}

export default function RiseLowFi() {
  const [active, setActive] = useState(DEFAULT_FLOW);
  const [open, setOpen] = useState(false);
  const tabRefs = useRef([]);
  const desktop = useIsDesktop();
  const reduceMotion = useReducedMotion();
  const flow = FLOWS[active];

  const goTo = useCallback((index, { focus, wrap } = {}) => {
    const next = wrap
      ? (index + FLOWS.length) % FLOWS.length
      : Math.max(0, Math.min(FLOWS.length - 1, index));
    setActive(next);
    if (focus) {
      requestAnimationFrame(() => tabRefs.current[next]?.focus());
    }
  }, []);

  const onTabKey = (event) => {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      goTo(active + 1, { focus: true });
    }
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      goTo(active - 1, { focus: true });
    }
    if (event.key === "Home") {
      event.preventDefault();
      goTo(0, { focus: true });
    }
    if (event.key === "End") {
      event.preventDefault();
      goTo(FLOWS.length - 1, { focus: true });
    }
  };

  const lightboxItems = FLOWS.map((item) => ({
    title: item.board.title,
    src: item.board.src,
    width: item.board.width,
    height: item.board.height,
  }));

  return (
    <div className="min-w-0">
      <div className="lg:grid lg:grid-cols-[minmax(13.5rem,24%)_minmax(0,1fr)] lg:items-start lg:gap-x-10 xl:gap-x-14">
        <div className="min-w-0 lg:sticky lg:top-[calc(var(--site-header-height)+1.25rem)] lg:self-start">
          <div
            className="-mx-4 flex gap-1 overflow-x-auto px-4 pb-1 lg:mx-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:border-l lg:px-0 lg:pb-0"
            style={{ borderColor: R.line }}
            role="tablist"
            aria-label="Low-fidelity flows"
            onKeyDown={onTabKey}
          >
            {FLOWS.map((item, index) => {
              const selected = index === active;
              return (
                <button
                  key={item.id}
                  ref={(node) => {
                    tabRefs.current[index] = node;
                  }}
                  type="button"
                  role="tab"
                  id={`rise-lowfi-tab-${item.id}`}
                  aria-selected={selected}
                  aria-controls="rise-lowfi-flow"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => goTo(index)}
                  className="shrink-0 border-b-2 px-3 py-3 text-left transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#14181F] lg:w-full lg:border-b-0 lg:border-l-2 lg:px-0 lg:py-4 lg:pl-5"
                  style={{
                    borderColor: selected ? R.yellow : "transparent",
                    color: selected ? R.ink : R.mute,
                  }}
                >
                  <span
                    className="font-mono text-[10px] tracking-[0.2em]"
                    style={{ color: selected ? R.yellow : R.mute }}
                  >
                    {item.number}
                  </span>
                  <span
                    className={`mt-1 block max-w-[12rem] font-display text-sm leading-snug lg:max-w-none lg:text-[0.95rem] ${
                      selected ? "font-semibold" : "font-medium"
                    }`}
                  >
                    {item.title}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 lg:hidden">
            <button
              type="button"
              onClick={() => goTo(active - 1)}
              disabled={active === 0}
              className="font-mono text-[10px] uppercase tracking-[0.18em] disabled:opacity-30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#14181F]"
              style={{ color: R.ink }}
            >
              Previous
            </button>
            <button
              type="button"
              onClick={() => goTo(active + 1)}
              disabled={active === FLOWS.length - 1}
              className="font-mono text-[10px] uppercase tracking-[0.18em] disabled:opacity-30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#14181F]"
              style={{ color: R.ink }}
            >
              Next
            </button>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="font-mono text-[10px] uppercase tracking-[0.18em] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#14181F]"
              style={{ color: R.ink }}
            >
              <span className="border-b pb-0.5" style={{ borderColor: R.yellow }}>
                View sequence
              </span>
            </button>
          </div>
        </div>

        <div
          className="mt-8 min-w-0 lg:mt-0"
          role="tabpanel"
          id="rise-lowfi-flow"
          aria-labelledby={`rise-lowfi-tab-${flow.id}`}
        >
          <p className="max-w-2xl text-sm leading-relaxed sm:text-base" style={{ color: R.mute }}>
            {flow.caption}
          </p>

          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={flow.id}
              className="mt-5 min-w-0"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              {desktop ? (
                <figure className="min-w-0">
                  <button
                    type="button"
                    onClick={() => setOpen(true)}
                    className="flex min-h-[min(78vh,52rem)] w-full items-center justify-center overflow-hidden border px-3 py-5 text-left sm:px-5 sm:py-7 lg:px-6 lg:py-8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#14181F]"
                    style={{ borderColor: R.line, backgroundColor: R.cream }}
                  >
                    <img
                      src={flow.board.src}
                      alt={flow.board.title}
                      width={flow.board.width}
                      height={flow.board.height}
                      loading="eager"
                      decoding="async"
                      draggable={false}
                      className="mx-auto block h-auto max-h-[min(78vh,52rem)] w-auto max-w-full object-contain"
                    />
                  </button>
                  <figcaption className="mt-5">
                    <button
                      type="button"
                      onClick={() => setOpen(true)}
                      className="font-mono text-[11px] uppercase tracking-[0.18em] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#14181F]"
                      style={{ color: R.ink }}
                    >
                      <span className="border-b pb-0.5" style={{ borderColor: R.yellow }}>
                        View sequence
                      </span>
                    </button>
                  </figcaption>
                </figure>
              ) : (
                <ol className="space-y-10">
                  {flow.screens.map((item) => (
                    <li key={item.src}>
                      <figure
                        className="overflow-hidden border"
                        style={{ borderColor: R.line, backgroundColor: R.cream }}
                      >
                        <img
                          src={item.src}
                          alt={item.label}
                          width={item.width}
                          height={item.height}
                          loading="lazy"
                          decoding="async"
                          className="mx-auto h-auto w-full object-contain"
                        />
                        <img
                          src={item.annotation}
                          alt=""
                          width={780}
                          height={388}
                          loading="lazy"
                          decoding="async"
                          className="h-auto w-full object-contain"
                        />
                      </figure>
                    </li>
                  ))}
                </ol>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {open && (
        <Lightbox
          theme="rise"
          items={lightboxItems}
          index={active}
          onClose={() => setOpen(false)}
          onPrev={() => goTo(active - 1, { wrap: true })}
          onNext={() => goTo(active + 1, { wrap: true })}
        />
      )}
    </div>
  );
}
