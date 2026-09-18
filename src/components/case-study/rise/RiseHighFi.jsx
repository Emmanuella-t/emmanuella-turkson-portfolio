import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

const R = {
  yellow: "#FFC500",
  ink: "#14181F",
  mute: "#5C6570",
  line: "#E6E0D8",
  ivory: "#F7F3EA",
  cream: "#F3EFE8",
};

const ROOT =
  "/case-studies/synchrony_rise_case_stucy/rise-by-synchrony-high-fi-screens";

function src(path) {
  return encodeURI(`${ROOT}/${path}`);
}

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

function Frame({ path, alt, width, height, className = "", priority = false }) {
  return (
    <figure
      className={`overflow-hidden border bg-white ${className}`}
      style={{ borderColor: R.line }}
    >
      <img
        src={src(path)}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        draggable={false}
        className="mx-auto block h-auto w-full object-contain"
      />
    </figure>
  );
}

/**
 * Curated high-fidelity showcase — 6 screens, AI Intervention as the climax.
 * Mobile paths: 05.xxM · Tablet paths: 05.xxT
 */
export default function RiseHighFi() {
  return (
    <div className="min-w-0">
      {/* Hero — AI Intervention / Student Control */}
      <Reveal className="mx-auto max-w-[28rem] lg:max-w-[32rem]">
        <p
          className="mb-4 text-center font-mono text-[10px] uppercase tracking-[0.2em]"
          style={{ color: R.mute }}
        >
          AI Intervention · Student Control
        </p>
        <Frame
          path="05.08M/AI Intervention/Student Control.png"
          alt="Rise AI intervention — a pause before Best Buy, with review alternatives, continue anyway, and cancel purchase"
          width={780}
          height={1688}
          priority
          className="shadow-[0_24px_60px_-28px_rgba(20,24,31,0.35)]"
        />
      </Reveal>

      {/* Responsive pair — AI tablet + note (desktop/tablet only; mobile keeps the phone hero) */}
      <div className="mx-auto mt-14 hidden max-w-[1100px] items-end gap-8 md:grid lg:mt-20 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:col-span-7" delay={0.04}>
          <Frame
            path="05.08T/AI Intervention/Student Control.png"
            alt="Rise AI intervention on tablet — consequence explained before the student chooses"
            width={2048}
            height={1536}
          />
        </Reveal>
        <Reveal className="lg:col-span-5 lg:pb-6" delay={0.08}>
          <p
            className="max-w-sm font-display text-xl font-semibold leading-snug sm:text-2xl"
            style={{ color: R.ink }}
          >
            Guidance appears while the decision can still change.
          </p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed" style={{ color: R.mute }}>
            The interface explains the consequence, offers an alternative, and leaves continue and cancel visible.
          </p>
        </Reveal>
      </div>

      {/* Home + Foundation */}
      <div className="relative mx-auto mt-16 max-w-[920px] lg:mt-24">
        <Reveal className="grid items-end gap-6 sm:grid-cols-2 sm:gap-8 lg:gap-10">
          <div>
            <p
              className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em]"
              style={{ color: R.mute }}
            >
              Dashboard
            </p>
            <Frame
              path="05.05M/Dashboard/Home.png"
              alt="Rise home dashboard — next action, credit health, and progress"
              width={780}
              height={1688}
            />
          </div>
          <div className="sm:translate-y-8 lg:translate-y-12">
            <p
              className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em]"
              style={{ color: R.mute }}
            >
              Foundation Card
            </p>
            <Frame
              path="05.06M/Foundation Card/Detail.png"
              alt="Foundation Card detail — starting point and card status"
              width={780}
              height={1688}
            />
          </div>
        </Reveal>
      </div>

      {/* Purchase + Progress, slight overlap on desktop */}
      <div className="relative mx-auto mt-16 max-w-[980px] lg:mt-28">
        <div className="grid items-start gap-6 sm:grid-cols-2 lg:gap-0">
          <Reveal className="relative z-[1] lg:max-w-[22rem] lg:justify-self-start">
            <p
              className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em]"
              style={{ color: R.mute }}
            >
              Purchase
            </p>
            <Frame
              path="05.07M/Purchase/Select Merchant.png"
              alt="Select merchant — purchase flow before confirmation"
              width={780}
              height={1688}
              className="shadow-[0_18px_40px_-24px_rgba(20,24,31,0.3)]"
            />
          </Reveal>
          <Reveal
            className="relative z-[2] sm:-mt-4 lg:-ml-10 lg:mt-16 lg:max-w-[22rem] lg:justify-self-end"
            delay={0.06}
          >
            <p
              className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em]"
              style={{ color: R.mute }}
            >
              Rise Points
            </p>
            <Frame
              path="05.09M/Rise Points/Progress.png"
              alt="Rise Points progress — recognition without becoming a scoreboard"
              width={780}
              height={1688}
              className="shadow-[0_18px_40px_-24px_rgba(20,24,31,0.3)]"
            />
          </Reveal>
        </div>
      </div>

      {/* Resource Stack */}
      <Reveal className="mx-auto mt-16 max-w-[26rem] lg:mt-24 lg:max-w-[28rem]">
        <p
          className="mb-3 text-center font-mono text-[10px] uppercase tracking-[0.18em]"
          style={{ color: R.mute }}
        >
          Resource Stack
        </p>
        <Frame
          path="05.10M/Resource Stack/Default.png"
          alt="Resource Stack — personalized support with official-source handoff"
          width={780}
          height={1688}
        />
      </Reveal>

      {/* Figma CTA */}
      <div className="mx-auto mt-16 max-w-xl border-t pt-10 text-center lg:mt-20" style={{ borderColor: R.line }}>
        <a
          href="https://www.figma.com/design/uW1I6lQcPOtBQZ3BZemPPe/Rise-by-Synchrony---highfi-screens?node-id=142-2&p=f&t=KiaoaEYNlai5RDQd-0"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#14181F]"
          style={{ color: R.ink }}
        >
          <span className="border-b pb-0.5" style={{ borderColor: R.yellow }}>
            View all high-fidelity screens in Figma
          </span>
          <span aria-hidden>↗</span>
        </a>
        <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed" style={{ color: R.mute }}>
          Explore the complete responsive screen set and product states in Figma.
        </p>
      </div>
    </div>
  );
}
