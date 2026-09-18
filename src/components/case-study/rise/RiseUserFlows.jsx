import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Lightbox from "../mededge-screens/Lightbox";

const EASE = [0.22, 1, 0.36, 1];

const R = {
  yellow: "#FFC500",
  ink: "#14181F",
  mute: "#5C6570",
  line: "#D9D2C8",
  cream: "#F7F3EC",
};

const ROOT =
  "/case-studies/synchrony_rise_case_stucy/rise-by-synchrony-userflows";

const NESTED = "Rise User Flows/Rise User Flows";

function asset(file) {
  return encodeURI(`${ROOT}/${file}`);
}

const LEGEND = {
  notation: {
    src: asset(`${NESTED}/Rise User Flows/User Flows/User Flows/Notation Legend.png`),
    width: 4408,
    height: 180,
    alt: "Flow notation — start and end, product screen, student action, decision, system response, disclosure, external process, and error or recovery",
  },
  path: {
    src: asset(`${NESTED}/Rise User Flows/User Flows/User Flows/Path Legend.png`),
    width: 4192,
    height: 112,
    alt: "Path legend — yellow primary success path, charcoal standard flow, red dashed error or recovery",
  },
};

const FLOWS = [
  {
    id: "enrollment",
    number: "01",
    title: "Enrollment and Foundation Card Setup",
    caption:
      "Enrollment, eligibility boundaries, resume/recovery, and respectful exit.",
    board: {
      src: asset(`${NESTED}/Flow 01 — Enrollment and Foundation Card Setup.png`),
      width: 4416,
      height: 3112,
      title: "Flow 01 — Enrollment and Foundation Card Setup",
    },
  },
  {
    id: "intervention",
    number: "02",
    title: "AI Intervention Before a Harmful Purchase",
    caption:
      "Guidance before action, alternatives, recovery, and explicit student control.",
    board: {
      src: asset(`${NESTED}/Flow 02 — AI Intervention Before a Harmful Purchase.png`),
      width: 4416,
      height: 3860,
      title: "Flow 02 — AI Intervention Before a Harmful Purchase",
    },
  },
  {
    id: "health",
    number: "03",
    title: "Credit Health and Payment Progress",
    caption:
      "Credit Health, payment progress, external payment boundaries, and descriptive status.",
    board: {
      src: asset(`${NESTED}/Flow 03 — Credit Health and Payment Progress.png`),
      width: 4416,
      height: 3140,
      title: "Flow 03 — Credit Health and Payment Progress",
    },
  },
  {
    id: "points",
    number: "04",
    title: "Rise Points",
    caption:
      "Rise Points as progress support, not approval, eligibility, limit, or credit outcome.",
    board: {
      src: asset(`${NESTED}/Flow 04 — Rise Points.png`),
      width: 4416,
      height: 2740,
      title: "Flow 04 — Rise Points",
    },
  },
  {
    id: "resources",
    number: "05",
    title: "Resource Stack",
    caption:
      "Personalized resources, official-source handoff, save/share/dismiss, and recovery.",
    board: {
      src: asset(`${NESTED}/Flow 05 — Resource Stack.png`),
      width: 4416,
      height: 3620,
      title: "Flow 05 — Resource Stack",
    },
  },
  {
    id: "crossflow",
    number: "06",
    title: "Cross-flow Navigation + Recovery",
    caption:
      "Persistent navigation, return-to-dashboard behavior, and cross-flow recovery rules.",
    board: {
      src: asset(`${NESTED}/Cross-flow Navigation + Recovery.png`),
      width: 4416,
      height: 3340,
      title: "Cross-flow Navigation + Recovery",
    },
  },
];

const DEFAULT_FLOW = 1;

export default function RiseUserFlows() {
  const [active, setActive] = useState(DEFAULT_FLOW);
  const [open, setOpen] = useState(false);
  const tabRefs = useRef([]);
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
      <div className="max-w-xl">
        <p
          className="font-mono text-[10px] uppercase tracking-[0.2em]"
          style={{ color: R.mute }}
        >
          How to read
        </p>
        <div className="mt-4 space-y-1.5 opacity-80">
          <img
            src={LEGEND.notation.src}
            alt={LEGEND.notation.alt}
            width={LEGEND.notation.width}
            height={LEGEND.notation.height}
            loading="lazy"
            decoding="async"
            className="h-auto w-full object-contain"
          />
          <img
            src={LEGEND.path.src}
            alt={LEGEND.path.alt}
            width={LEGEND.path.width}
            height={LEGEND.path.height}
            loading="lazy"
            decoding="async"
            className="h-auto w-full object-contain"
          />
        </div>
      </div>

      <div className="mt-12 lg:grid lg:grid-cols-[minmax(13.5rem,24%)_minmax(0,1fr)] lg:items-start lg:gap-x-10 xl:gap-x-14">
        <div
          className="min-w-0 lg:sticky lg:top-[calc(var(--site-header-height)+1.25rem)] lg:self-start"
        >
          <div
            className="-mx-4 flex gap-1 overflow-x-auto px-4 pb-1 lg:mx-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:border-l lg:px-0 lg:pb-0"
            style={{ borderColor: R.line }}
            role="tablist"
            aria-label="User flows"
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
                  id={`rise-flows-tab-${item.id}`}
                  aria-selected={selected}
                  aria-controls="rise-flows-board"
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
          </div>
        </div>

        <div
          className="mt-8 min-w-0 lg:mt-0"
          role="tabpanel"
          id="rise-flows-board"
          aria-labelledby={`rise-flows-tab-${flow.id}`}
        >
          <p className="max-w-2xl text-sm leading-relaxed sm:text-base" style={{ color: R.mute }}>
            {flow.caption}
          </p>

          <AnimatePresence mode="wait">
            <motion.figure
              key={flow.id}
              className="mt-5 min-w-0"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              <div
                className="flex items-center justify-center overflow-hidden border px-3 py-5 sm:px-5 sm:py-7 lg:px-6 lg:py-8"
                style={{ backgroundColor: R.cream, borderColor: R.line }}
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
              </div>
              <figcaption className="mt-5">
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  className="font-mono text-[11px] uppercase tracking-[0.18em] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#14181F]"
                  style={{ color: R.ink }}
                >
                  <span className="border-b pb-0.5" style={{ borderColor: R.yellow }}>
                    View full flow
                  </span>
                </button>
              </figcaption>
            </motion.figure>
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
