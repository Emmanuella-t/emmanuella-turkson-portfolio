import { useCallback, useRef, useState } from "react";
import Lightbox from "../mededge-screens/Lightbox";

const R = {
  yellow: "#FFC500",
  ink: "#14181F",
  paper: "#F6F3EE",
  mute: "#5C6570",
  line: "#E6E0D8",
};

const JOURNEY =
  "/case-studies/synchrony_rise_case_stucy/Rise-by-Synchrony-UserJourney/Rise User Journey/Journey";

function asset(file) {
  return encodeURI(`${JOURNEY}/${file}`);
}

const MASTER = {
  src: asset("Master Board.svg"),
  width: 6800,
  height: 3400,
  title: "Rise user journey — full map",
};

const STAGES = [
  {
    id: "discover",
    number: "01",
    title: "Discover and Join Rise",
    src: asset("Stage 01 — Discover and Join Rise.svg"),
    width: 800,
    height: 1510,
  },
  {
    id: "foundation",
    number: "02",
    title: "Set Up the Foundation Card",
    src: asset("Stage 02 — Set Up the Foundation Card.svg"),
    width: 800,
    height: 1470,
  },
  {
    id: "position",
    number: "03",
    title: "Understand Her Current Position",
    src: asset("Stage 03 — Understand Her Current Position.svg"),
    width: 840,
    height: 1510,
  },
  {
    id: "purchase",
    number: "04",
    title: "Face a Consequential Purchase",
    src: asset("Stage 04 — Face a Consequential Purchase.svg"),
    width: 1180,
    height: 1660,
  },
  {
    id: "progress",
    number: "05",
    title: "Build and Recognize Progress",
    src: asset("Stage 05 — Build and Recognize Progress.svg"),
    width: 840,
    height: 1510,
  },
  {
    id: "support",
    number: "06",
    title: "Find Support and Prepare to Transition",
    src: asset("Stage 06 — Find Support and Prepare to Transition.svg"),
    width: 1380,
    height: 1530,
  },
];

const DEFAULT_STAGE = 3;

export default function RiseUserJourney() {
  const [active, setActive] = useState(DEFAULT_STAGE);
  const [open, setOpen] = useState(false);
  const tabRefs = useRef([]);
  const stage = STAGES[active];

  const goTo = useCallback((index, { focus } = {}) => {
    const next = Math.max(0, Math.min(STAGES.length - 1, index));
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
      goTo(STAGES.length - 1, { focus: true });
    }
  };

  return (
    <div className="min-w-0">
      <div className="grid items-start gap-8 lg:grid-cols-12">
        <img
          src={asset("Maya/Identity.svg")}
          alt="Designed scenario identity card from the journey source"
          width={1540}
          height={330}
          loading="lazy"
          decoding="async"
          className="h-auto w-full object-contain lg:col-span-5"
        />
        <div className="lg:col-span-7">
          <img
            src={asset("Maya/Context.svg")}
            alt="Designed scenario context from the journey source"
            width={2960}
            height={330}
            loading="lazy"
            decoding="async"
            className="h-auto w-full object-contain"
          />
          <p className="mt-4 max-w-xl text-sm leading-relaxed" style={{ color: R.mute }}>
            The journey source currently names the student Aaliyah. This case study uses Maya as the narrative thread. The artwork has not been renamed.
          </p>
        </div>
      </div>

      <div className="mt-14 grid gap-6 lg:grid-cols-12 lg:items-end">
        <figure className="min-w-0 lg:col-span-7">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="block w-full overflow-hidden border text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#14181F]"
            style={{ borderColor: R.line, backgroundColor: "#F3EFE8" }}
          >
            <img
              src={MASTER.src}
              alt="Overview of the Rise user journey master board"
              width={MASTER.width}
              height={MASTER.height}
              loading="lazy"
              decoding="async"
              className="h-auto w-full object-contain"
            />
          </button>
          <figcaption className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em]" style={{ color: R.mute }}>
            Overview — tap to inspect the full map
          </figcaption>
        </figure>
        <div className="lg:col-span-5">
          <p className="text-sm leading-relaxed" style={{ color: R.mute }}>
            The complete map is too detailed to read at page scale. Use it as orientation, then read each stage below.
          </p>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="mt-5 inline-flex items-center border px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.16em] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#14181F]"
            style={{ borderColor: R.ink, color: R.ink, backgroundColor: R.paper }}
          >
            View full journey
          </button>
        </div>
      </div>

      <div className="mt-14 min-w-0 lg:grid lg:grid-cols-[minmax(13.5rem,24%)_minmax(0,1fr)] lg:items-start lg:gap-x-10 xl:gap-x-12">
        <div className="min-w-0 lg:sticky lg:top-[calc(var(--site-header-height)+1.25rem)] lg:self-start">
          <div
            className="-mx-5 flex gap-1 overflow-x-auto px-5 pb-1 lg:mx-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:border-l lg:px-0 lg:pb-0"
            style={{ borderColor: R.line }}
            role="tablist"
            aria-label="Journey stages"
            onKeyDown={onTabKey}
          >
            {STAGES.map((item, index) => {
              const selected = index === active;
              return (
                <button
                  key={item.id}
                  ref={(node) => {
                    tabRefs.current[index] = node;
                  }}
                  type="button"
                  role="tab"
                  id={`rise-journey-tab-${item.id}`}
                  aria-selected={selected}
                  aria-controls="rise-journey-stage"
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
              disabled={active === STAGES.length - 1}
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
          id="rise-journey-stage"
          aria-labelledby={`rise-journey-tab-${stage.id}`}
        >
          <p
            className="font-mono text-[10px] tracking-[0.2em]"
            style={{ color: R.yellow }}
          >
            {stage.number}
          </p>
          <h3 className="mt-2 font-display text-[1.35rem] font-semibold leading-snug sm:text-2xl">
            {stage.title}
          </h3>
          <div className="mt-6 overflow-x-auto">
            <img
              src={stage.src}
              alt={`Stage ${stage.number} — ${stage.title}`}
              width={stage.width}
              height={stage.height}
              loading="lazy"
              decoding="async"
              className="mx-auto h-auto w-full max-w-4xl object-contain"
            />
          </div>
          {active === 3 && (
            <figure className="mx-auto mt-12 max-w-sm">
              <img
                src={asset("Journey/Key Insight Bridge.svg")}
                alt="The most valuable moment is not after the statement arrives. It is while the decision can still change."
                width={400}
                height={1510}
                loading="lazy"
                decoding="async"
                className="mx-auto h-auto w-full object-contain"
              />
            </figure>
          )}
        </div>
      </div>

      <div className="mt-16 grid gap-8 border-t pt-10" style={{ borderColor: R.line }}>
        <img
          src={asset("Journey/Validation Legend.svg")}
          alt=""
          width={1980}
          height={330}
          loading="lazy"
          decoding="async"
          className="h-auto w-full max-w-xl object-contain opacity-80"
        />
        <img
          src={asset("Validation Footer.svg")}
          alt=""
          width={6560}
          height={180}
          loading="lazy"
          decoding="async"
          className="h-auto w-full object-contain opacity-80"
        />
      </div>

      {open && (
        <Lightbox
          theme="rise"
          svgDisplay="scroll"
          items={[
            {
              title: MASTER.title,
              src: MASTER.src,
              width: MASTER.width,
              height: MASTER.height,
              kind: "svg",
            },
          ]}
          index={0}
          onClose={() => setOpen(false)}
          onPrev={() => {}}
          onNext={() => {}}
        />
      )}
    </div>
  );
}
