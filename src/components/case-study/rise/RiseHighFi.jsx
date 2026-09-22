import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

const R = {
  yellow: "#FFC500",
  ink: "#14181F",
  mute: "#5C6570",
  line: "#E6E0D8",
  ivory: "#F7F3EA",
};

const ROOT =
  "/case-studies/synchrony_rise_case_stucy/new-rise-highfi-screens";

const FIGMA_URL =
  "https://www.figma.com/design/uW1I6lQcPOtBQZ3BZemPPe/Rise-by-Synchrony---highfi-screens?node-id=142-2&p=f&t=KiaoaEYNlai5RDQd-0";

/** Shared phone pair rhythm — one width, gap, and stagger for all moments. */
const PHONE =
  "w-full max-w-[19rem] sm:max-w-[21rem] lg:max-w-[23rem] xl:max-w-[24.5rem]";
const PHONE_GAP = "gap-8 sm:gap-5 lg:gap-6";
const PHONE_STAGGER = "lg:mt-12";
const LABEL_GAP = "mb-2.5";

const MOMENTS = [
  {
    id: "01",
    title: "Entering the Rise experience",
    body: "Welcome sets the tone. Home makes the next step clear.",
    reverse: false,
    screens: [
      {
        file: "01-welcome.png",
        label: "Welcome",
        alt: "Rise welcome screen — Your next chapter starts here",
      },
      {
        file: "02-home-dashboard.png",
        label: "Home Dashboard",
        alt: "Rise home dashboard — next action, progress, and tools",
      },
    ],
  },
  {
    id: "02",
    title: "Making better financial decisions",
    body: "The Foundation Card anchors starting credit. Rise Assistant steps in when a choice still matters.",
    reverse: true,
    screens: [
      {
        file: "03-foundation-card.png",
        label: "Foundation Card",
        alt: "Foundation Card screen — starting point and card status",
      },
      {
        file: "04-ai-guidance.png",
        label: "Rise Assistant",
        alt: "Rise Assistant — guidance before a purchase decision",
      },
    ],
  },
  {
    id: "03",
    title: "Building progress over time",
    body: "Rise Points make healthier habits visible. The Resource Stack connects support to the moment.",
    reverse: false,
    screens: [
      {
        file: "05-rise-points.png",
        label: "Rise Points",
        alt: "Rise Points progress — recognition without becoming a scoreboard",
      },
      {
        file: "06-resources.png",
        label: "Resource Stack",
        alt: "Resource Stack — personalized support with a clear next step",
      },
    ],
  },
];

function Reveal({ children, className = "", delay = 0 }) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.55, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

function Phone({ file, alt, label, delay = 0, shift = false, priority = false }) {
  return (
    <Reveal
      delay={delay}
      className={`${PHONE} shrink-0 ${shift ? PHONE_STAGGER : ""}`}
    >
      <p
        className={`${LABEL_GAP} text-left font-mono text-[10px] uppercase tracking-[0.18em]`}
        style={{ color: R.mute }}
      >
        {label}
      </p>
      <figure className="m-0 w-full">
        <img
          src={`${ROOT}/${file}`}
          alt={alt}
          width={852}
          height={1846}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          draggable={false}
          className="block h-auto w-full object-contain"
        />
      </figure>
    </Reveal>
  );
}

function Moment({ moment, priority = false }) {
  const copy = (
    <Reveal className="relative z-[1] w-full max-w-sm">
      <p
        className="font-mono text-[11px] uppercase tracking-[0.2em]"
        style={{ color: R.ink }}
      >
        {moment.id}
      </p>
      <h3
        className="mt-4 font-display text-[clamp(1.55rem,2.8vw,2.15rem)] font-semibold leading-[1.15]"
        style={{ color: R.ink }}
      >
        {moment.title}
      </h3>
      <p className="mt-4 text-base leading-relaxed" style={{ color: R.mute }}>
        {moment.body}
      </p>
    </Reveal>
  );

  const phones = (
    <div
      className={`relative z-[1] flex w-full flex-col items-center sm:flex-row sm:items-start sm:justify-start ${PHONE_GAP}`}
    >
      <Phone {...moment.screens[0]} delay={0.04} priority={priority} />
      <Phone {...moment.screens[1]} delay={0.12} shift priority={priority} />
    </div>
  );

  return (
    <div className="relative min-w-0 overflow-visible py-4 sm:py-6 lg:py-8">
      <span
        aria-hidden
        className="pointer-events-none absolute -left-1 top-6 z-0 select-none font-display text-[clamp(6.5rem,12vw,10.5rem)] font-semibold leading-none tracking-tight opacity-[0.035] sm:top-4 lg:left-0 lg:top-1/2 lg:-translate-y-1/2"
        style={{ color: R.ink }}
      >
        {moment.id}
      </span>

      <div
        className={`relative z-[1] grid items-start gap-8 sm:gap-9 lg:items-center lg:gap-10 xl:gap-12 ${
          moment.reverse
            ? "lg:grid-cols-[minmax(0,1fr)_minmax(15rem,17.5rem)]"
            : "lg:grid-cols-[minmax(15rem,17.5rem)_minmax(0,1fr)]"
        }`}
      >
        <div
          className={
            moment.reverse
              ? "lg:order-2 lg:self-center"
              : "lg:order-1 lg:self-center"
          }
        >
          {copy}
        </div>
        <div className={moment.reverse ? "lg:order-1" : "lg:order-2"}>
          {phones}
        </div>
      </div>
    </div>
  );
}

/**
 * Finalized high-fidelity showcase — 6 screens as 3 editorial moments.
 */
export default function RiseHighFi() {
  return (
    <div className="min-w-0 space-y-16 sm:space-y-20 lg:space-y-24">
      {MOMENTS.map((moment, i) => (
        <Moment key={moment.id} moment={moment} priority={i === 0} />
      ))}

      <div
        className="mx-auto max-w-xl border-t pt-10 text-center"
        style={{ borderColor: R.line }}
      >
        <a
          href={FIGMA_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#14181F]"
          style={{ color: R.ink }}
        >
          <span className="border-b pb-0.5" style={{ borderColor: R.yellow }}>
            Explore all high-fidelity screens in Figma
          </span>
          <span aria-hidden>↗</span>
        </a>
      </div>
    </div>
  );
}
