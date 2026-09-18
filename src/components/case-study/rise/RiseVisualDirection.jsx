import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Lightbox from "../mededge-screens/Lightbox";

const EASE = [0.22, 1, 0.36, 1];

const R = {
  yellow: "#FFC500",
  ink: "#14181F",
  charcoal: "#14161A",
  ivory: "#F7F3EA",
  paper: "#F6F3EE",
  mute: "#5C6570",
  line: "#E6E0D8",
};

const ROOT =
  "/case-studies/synchrony_rise_case_stucy/Rise by Synchrony - visual direction";
const VD = `${ROOT}/Rise by Synchrony - visual direction/Rise Visual Direction/VD`;

function asset(file) {
  return encodeURI(`${VD}/${file}`);
}

function Reveal({ children, className = "", delay = 0 }) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.5, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

function Canvas({ children, className = "", wide = false }) {
  return (
    <div
      className={`mx-auto w-full px-5 sm:px-8 ${wide ? "max-w-[1400px]" : "max-w-[1320px]"} ${className}`}
    >
      {children}
    </div>
  );
}

function Eyebrow({ children, light = false }) {
  return (
    <p
      className="font-mono text-[10px] uppercase tracking-[0.2em]"
      style={{ color: light ? R.yellow : R.ink }}
    >
      {children}
    </p>
  );
}

function Plate({ src, alt, width, height, priority = false, className = "" }) {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      draggable={false}
      className={`h-auto w-full max-w-full object-contain ${className}`}
    />
  );
}

const MASTER = {
  src: encodeURI(`${ROOT}/Master Board.jpg`),
  width: 4800,
  height: 28280,
  title: "Rise visual direction — full system",
};

const PRINCIPLES = [
  {
    src: asset("Principle 01/Serious information comes first.png"),
    alt: "01 — Serious information comes first. Financial status, consequences, dates, and next actions remain more prominent than mascots or decorative elements.",
    width: 4160,
    height: 700,
    span: true,
  },
  {
    src: asset("Principles/Principle 02/Optimism without false reassurance.png"),
    alt: "02 — Optimism without false reassurance. Rise should feel encouraging, but it must not minimize risk or imply guaranteed financial outcomes.",
    width: 1640,
    height: 840,
  },
  {
    src: asset("Principles/Principle 03/Risk is clear, not frightening.png"),
    alt: "03 — Risk is clear, not frightening. Consequences should be stated plainly with an explanation and next step.",
    width: 2440,
    height: 840,
  },
  {
    src: asset("Principles/Principle 04/AI guidance is transparent and optional.png"),
    alt: "04 — AI guidance is transparent and optional. The interface must explain why guidance appeared, what information influenced it, and what choices remain available.",
    width: 2520,
    height: 1020,
  },
  {
    src: asset("Principles/Principle 05/Progress motivates without becoming a game.png"),
    alt: "05 — Progress motivates without becoming a game. Pip and Rise Points reinforce understanding without trivializing debt or missed payments.",
    width: 1560,
    height: 900,
  },
];

const BRAND_COLOR = [
  { src: asset("02 Core System/Core System/Color/Brand Color/CHARCOAL.png"), alt: "Charcoal — primary text and high-contrast surfaces", width: 1000, height: 740 },
  { src: asset("02 Core System/Core System/Color/Brand Color/RISE YELLOW.png"), alt: "Rise Yellow #FFC500 — brand recognition, primary actions, selected states, positive emphasis", width: 1400, height: 740 },
  { src: asset("02 Core System/Core System/Color/Brand Color/WARM IVORY.png"), alt: "Warm Ivory — page and product surfaces", width: 808, height: 740 },
  { src: asset("02 Core System/Core System/Color/Brand Color/WHITE.png"), alt: "White — cards, sheets, and quiet surfaces", width: 808, height: 740 },
];

const FUNCTIONAL_COLOR = [
  { src: asset("02 Core System/Core System/Functional/Functional Color/INFORMATION.png"), alt: "Information — functional color", width: 800, height: 500 },
  { src: asset("02 Core System/Core System/Functional/Functional Color/MUTED TEXT.png"), alt: "Muted text — functional color", width: 800, height: 500 },
  { src: asset("02 Core System/Core System/Functional/Functional Color/SUCCESS.png"), alt: "Success — functional color", width: 800, height: 500 },
];

const PERSONALITY = [
  {
    src: asset("03 Core System/Character Imagery Motion/Foundation Card Direction.png"),
    alt: "Foundation Card direction",
    width: 2080,
    height: 1440,
  },
  {
    src: asset("03 Core System/Character Imagery Motion/Pip Direction.png"),
    alt: "Pip direction",
    width: 1952,
    height: 1440,
  },
  {
    src: asset("03 Core System/Character Imagery Motion/Photography Direction.png"),
    alt: "Photography direction — student life should feel lived-in, not staged",
    width: 2200,
    height: 1824,
  },
  {
    src: asset("03 Core System/Character Imagery Motion/Motion Direction.png"),
    alt: "Motion direction — movement clarifies state, it does not perform emotion",
    width: 1832,
    height: 1824,
  },
];

const FRAMES = [
  {
    id: "dashboard",
    number: "01",
    title: "Dashboard",
    caption: "Prioritize the next important action before secondary progress signals.",
    src: asset("Product Application/Style Frame A/Dashboard Panel.png"),
    width: 1560,
    height: 2840,
  },
  {
    id: "intervention",
    number: "02",
    title: "AI Intervention",
    caption: "Risk is explained clearly without removing Aaliyah's choice.",
    src: asset("Product Application/Style Frame B/AI Intervention Panel.png"),
    width: 2472,
    height: 2840,
  },
  {
    id: "progress",
    number: "03",
    title: "Progress",
    caption: "Recognition reinforces responsible activity without turning money into a game.",
    src: asset("Product Application/Style Frame C/Progress Panel.png"),
    width: 2016,
    height: 2600,
  },
  {
    id: "resources",
    number: "04",
    title: "Resource Stack",
    caption: "Recommendations show why they appeared and return students to official sources.",
    src: asset("Product Application/Style Frame D/Resource Stack Panel.png"),
    width: 2016,
    height: 2600,
  },
];

const DEFAULT_FRAME = 1;

const PROOF = [
  ["Clarity", "The next action is explicit."],
  ["Confidence", "Tone encourages without promising."],
  ["Credibility", "Product surfaces remain restrained."],
  ["Risk", "Consequences are plain, not alarming."],
  ["Transparency", "Guidance names its reason."],
  ["Control", "Aaliyah always sees her choices."],
];

function StyleFrames() {
  const [active, setActive] = useState(DEFAULT_FRAME);
  const [open, setOpen] = useState(false);
  const tabRefs = useRef([]);
  const reduceMotion = useReducedMotion();
  const frame = FRAMES[active];

  const goTo = useCallback((index, { focus, wrap } = {}) => {
    const next = wrap
      ? (index + FRAMES.length) % FRAMES.length
      : Math.max(0, Math.min(FRAMES.length - 1, index));
    setActive(next);
    if (focus) requestAnimationFrame(() => tabRefs.current[next]?.focus());
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
      goTo(FRAMES.length - 1, { focus: true });
    }
  };

  const lightboxItems = FRAMES.map((item) => ({
    title: `${item.number} — ${item.title}`,
    src: item.src,
    width: item.width,
    height: item.height,
  }));

  return (
    <div className="min-w-0">
      <div className="lg:grid lg:grid-cols-[minmax(10.5rem,30%)_minmax(0,70%)] lg:items-start lg:gap-x-8 xl:gap-x-10">
        <div className="min-w-0 lg:sticky lg:top-[calc(var(--site-header-height)+1rem)] lg:self-start">
          <div
            className="-mx-5 flex gap-1 overflow-x-auto px-5 pb-1 lg:mx-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:border-l lg:px-0 lg:pb-0"
            style={{ borderColor: R.line }}
            role="tablist"
            aria-label="Style frames"
            onKeyDown={onTabKey}
          >
            {FRAMES.map((item, index) => {
              const selected = index === active;
              return (
                <button
                  key={item.id}
                  ref={(node) => {
                    tabRefs.current[index] = node;
                  }}
                  type="button"
                  role="tab"
                  id={`rise-vd-tab-${item.id}`}
                  aria-selected={selected}
                  aria-controls="rise-vd-frame"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => goTo(index)}
                  className="shrink-0 border-b-2 px-3 py-2.5 text-left transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#14181F] lg:w-full lg:border-b-0 lg:border-l-2 lg:px-0 lg:py-3 lg:pl-4"
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
                    className={`mt-0.5 block max-w-[11rem] font-display text-sm leading-snug lg:max-w-none ${
                      selected ? "font-semibold" : "font-medium"
                    }`}
                  >
                    {item.title}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 lg:hidden">
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
              disabled={active === FRAMES.length - 1}
              className="font-mono text-[10px] uppercase tracking-[0.18em] disabled:opacity-30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#14181F]"
              style={{ color: R.ink }}
            >
              Next
            </button>
          </div>
        </div>

        <div
          className="mt-6 min-w-0 lg:mt-0"
          role="tabpanel"
          id="rise-vd-frame"
          aria-labelledby={`rise-vd-tab-${frame.id}`}
        >
          <div className="mx-auto flex w-full max-w-xl flex-col items-center sm:max-w-2xl">
            <p
              className="w-full text-center text-sm leading-relaxed"
              style={{ color: R.mute }}
            >
              {frame.caption}
            </p>

            <AnimatePresence initial={false} mode="wait">
              <motion.figure
                key={frame.id}
                className="mt-4 w-full"
                style={{ marginInline: "auto" }}
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.28, ease: EASE }}
              >
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  className="mx-auto flex w-full justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#14181F]"
                  style={{ marginInline: "auto" }}
                >
                  <img
                    src={frame.src}
                    alt={`${frame.number} — ${frame.title}`}
                    width={frame.width}
                    height={frame.height}
                    loading="eager"
                    decoding="async"
                    draggable={false}
                    className="mx-auto block h-auto max-h-[min(72vh,40rem)] w-auto max-w-full object-contain"
                    style={{ marginInline: "auto" }}
                  />
                </button>
              </motion.figure>
            </AnimatePresence>
          </div>
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

export default function RiseVisualDirection() {
  const [masterOpen, setMasterOpen] = useState(false);

  return (
    <div className="min-w-0">
      <section className="py-14 sm:py-16 lg:py-20" style={{ backgroundColor: R.ivory, color: R.ink }}>
        <Canvas className="grid items-end gap-8 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-7">
            <Eyebrow>17 — Visual Direction</Eyebrow>
            <h2 className="mt-4 font-display text-[clamp(1.9rem,3.8vw,3.1rem)] font-semibold leading-[1.06] tracking-tight">
              Designing for confidence, clarity, and student control
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed sm:text-base" style={{ color: R.mute }}>
              Optimism without hiding financial consequences.
            </p>
            <button
              type="button"
              onClick={() => setMasterOpen(true)}
              className="mt-5 font-mono text-[10px] uppercase tracking-[0.18em] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#14181F]"
              style={{ color: R.ink }}
            >
              <span className="border-b pb-0.5" style={{ borderColor: R.yellow }}>
                View full system
              </span>
            </button>
          </Reveal>
          <Reveal className="max-w-sm lg:col-span-5 lg:max-w-none lg:justify-self-end" delay={0.04}>
            <Plate
              src={asset("Header/Header/Product Signal.png")}
              alt="Foundation Card product signal — a credible starting point, not a shortcut"
              width={1576}
              height={1180}
              priority
              className="lg:max-h-[22rem]"
            />
          </Reveal>
        </Canvas>
      </section>

      <section className="bg-white py-14 sm:py-16" style={{ color: R.ink }}>
        <Canvas>
          <Reveal className="max-w-2xl">
            <Eyebrow>Principles</Eyebrow>
            <h3 className="mt-3 font-display text-[clamp(1.7rem,3.2vw,2.55rem)] font-semibold leading-[1.08]">
              Financial clarity before visual charm
            </h3>
            <p className="mt-3 max-w-lg text-sm leading-relaxed" style={{ color: R.mute }}>
              Establish the rules — what stays largest, what yellow may never carry, and where Aaliyah keeps control.
            </p>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:gap-5 lg:grid-cols-2">
            {PRINCIPLES.map((item) => (
              <Reveal key={item.src} className={item.span ? "lg:col-span-2" : ""}>
                <Plate {...item} />
              </Reveal>
            ))}
          </div>
        </Canvas>
      </section>

      <section className="py-14 sm:py-16" style={{ backgroundColor: R.ivory, color: R.ink }}>
        <Canvas>
          <Reveal className="max-w-2xl">
            <Eyebrow>Core system</Eyebrow>
            <h3 className="mt-3 font-display text-[clamp(1.7rem,3.2vw,2.55rem)] font-semibold leading-[1.08]">
              A system where every signal has a job
            </h3>
            <p className="mt-3 max-w-lg text-sm leading-relaxed" style={{ color: R.mute }}>
              How those rules become visual decisions — color roles, type hierarchy, shape, and labeled navigation.
            </p>
          </Reveal>

          <Reveal className="mt-8">
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-4">
              {BRAND_COLOR.map((item) => (
                <Plate key={item.src} {...item} />
              ))}
            </div>
          </Reveal>
          <Reveal className="mx-auto mt-4 max-w-4xl" delay={0.04}>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
              {FUNCTIONAL_COLOR.map((item) => (
                <Plate key={item.src} {...item} />
              ))}
            </div>
          </Reveal>

          <Reveal className="mt-8">
            <Plate
              src={asset("02 Core System/Core/Typography.png")}
              alt="Typography — Inter keeps consequential information calm, direct, and scannable"
              width={4160}
              height={1700}
              className="mx-auto max-h-[min(42vh,26rem)]"
            />
          </Reveal>
          <div className="mt-6 grid items-start gap-4 lg:grid-cols-2 lg:gap-5">
            <Reveal>
              <Plate
                src={asset("02 Core System/Core/Shape Language.png")}
                alt="Shape language — soft enough to welcome, structured enough to trust"
                width={1560}
                height={1688}
                className="max-h-[22rem]"
              />
            </Reveal>
            <Reveal delay={0.04}>
              <Plate
                src={asset("02 Core System/Core/Iconography.png")}
                alt="Iconography — recognizable metaphors, reinforced with labels"
                width={1580}
                height={1688}
                className="max-h-[22rem]"
              />
            </Reveal>
          </div>
        </Canvas>
      </section>

      <section className="py-14 sm:py-16" style={{ backgroundColor: R.charcoal, color: R.paper }}>
        <Canvas>
          <Reveal className="max-w-2xl">
            <Eyebrow light>Personality</Eyebrow>
            <h3 className="mt-3 font-display text-[clamp(1.7rem,3.2vw,2.55rem)] font-semibold leading-[1.08]">
              Personality supports the decision. It never becomes the decision.
            </h3>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/55">
              How the brand gains character — card, Pip, photography, and motion — without overpowering the product.
            </p>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-5">
            {PERSONALITY.map((item, index) => (
              <Reveal key={item.src} delay={index * 0.03} className="min-w-0">
                <Plate {...item} className="max-h-[18rem] sm:max-h-[20rem]" />
              </Reveal>
            ))}
          </div>
        </Canvas>
      </section>

      <section className="py-14 sm:py-16" style={{ backgroundColor: R.ivory, color: R.ink }}>
        <Canvas wide>
          <Reveal className="max-w-2xl">
            <Eyebrow>Product application</Eyebrow>
            <h3 className="mt-3 font-display text-[clamp(1.7rem,3.2vw,2.55rem)] font-semibold leading-[1.08]">
              The system earns trust in the moment of choice.
            </h3>
            <p className="mt-3 max-w-lg text-sm leading-relaxed" style={{ color: R.mute }}>
              Prove the system in real screens — next action first, guidance while the decision can still change, progress without a game, support that leaves the official source in charge.
            </p>
          </Reveal>
          <div className="mt-8">
            <StyleFrames />
          </div>
        </Canvas>
      </section>

      <section className="py-12 sm:py-16" style={{ backgroundColor: R.yellow, color: R.ink }}>
        <Canvas>
          <Reveal>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em]">Closing</p>
            <p className="mt-4 font-display text-[clamp(1.85rem,4.4vw,3.4rem)] font-semibold leading-[0.98] tracking-tight">
              THE AI EXPLAINS.
              <br />
              THE STUDENT DECIDES.
            </p>
          </Reveal>
        </Canvas>
      </section>

      <section className="bg-white py-12 sm:py-16" style={{ color: R.ink }}>
        <Canvas>
          <Reveal className="max-w-3xl">
            <h3 className="font-display text-[clamp(1.7rem,3.2vw,2.4rem)] font-semibold leading-[1.08]">
              Optimism is earned through clarity.
            </h3>
            <p className="mt-3 max-w-xl text-sm leading-relaxed" style={{ color: R.mute }}>
              Rise can feel warm, encouraging, and student-centered because consequences, choices, and sources remain explicit.
            </p>
          </Reveal>
          <Reveal className="mt-8">
            <ul className="grid gap-x-10 gap-y-4 sm:grid-cols-2">
              {PROOF.map(([title, body], index) => (
                <li key={title} className="border-t pt-3" style={{ borderColor: R.line }}>
                  <p className="font-mono text-[10px] tracking-[0.18em]" style={{ color: R.mute }}>
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h4 className="mt-1 font-display text-lg font-semibold">{title}</h4>
                  <p className="mt-1 text-sm leading-relaxed" style={{ color: R.mute }}>
                    {body}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
        </Canvas>
      </section>

      {masterOpen && (
        <Lightbox
          theme="rise"
          svgDisplay="scroll"
          items={[MASTER]}
          index={0}
          onClose={() => setMasterOpen(false)}
          onPrev={() => {}}
          onNext={() => {}}
        />
      )}
    </div>
  );
}
