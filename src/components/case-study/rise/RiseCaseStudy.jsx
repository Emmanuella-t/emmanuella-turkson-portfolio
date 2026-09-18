import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Pause, Play } from "lucide-react";
import { createPageUrl } from "@/utils/routes";
import { getNextCaseStudy } from "@/data/caseStudies";
import study from "@/data/caseStudies/rise";
import RiseUserJourney from "@/components/case-study/rise/RiseUserJourney";
import RiseLowFi from "@/components/case-study/rise/RiseLowFi";
import RiseUserFlows from "@/components/case-study/rise/RiseUserFlows";
import RiseHighFi from "@/components/case-study/rise/RiseHighFi";
import RiseDesignProcess from "@/components/case-study/rise/RiseDesignProcess";
import RiseVisualDirection from "@/components/case-study/rise/RiseVisualDirection";

const EASE = [0.22, 1, 0.36, 1];
const R = {
  yellow: "#FFC500",
  ink: "#14181F",
  charcoal: "#14161A",
  paper: "#F6F3EE",
  white: "#FFFFFF",
  mute: "#5C6570",
  line: "#E6E0D8",
};

const ASSETS =
  "/case-studies/synchrony_rise_case_stucy/assets";

/** 11.mp4 is the approved 53s product demo. */
const DEMO = "/case-studies/synchrony_rise_case_stucy/rise_by_synchrony/11.mp4";
const TEAM_SLIDE = "/case-studies/synchrony_rise_case_stucy/rise_by_synchrony/17.svg";

function Reveal({ children, className = "", delay = 0 }) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

function Shell({ children, className = "" }) {
  return <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-10 ${className}`}>{children}</div>;
}

function Eyebrow({ children, light = false }) {
  return (
    <p
      className="font-mono text-[11px] uppercase tracking-[0.2em]"
      style={{ color: light ? R.yellow : R.ink }}
    >
      {children}
    </p>
  );
}

function Shot({
  file,
  alt,
  width,
  height,
  priority = false,
  className = "",
}) {
  return (
    <img
      src={`${ASSETS}/${file}`}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : undefined}
      className={`h-auto w-full object-contain ${className}`}
      style={{ maxWidth: Math.round(width / 2) }}
    />
  );
}

function DemoPlayer() {
  const videoRef = useRef(null);
  const wrapRef = useRef(null);
  const userPaused = useRef(false);
  const reduceMotion = useReducedMotion();
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const wrap = wrapRef.current;
    if (!video || !wrap || reduceMotion) return;

    const playMuted = () => {
      if (userPaused.current) return;
      video.muted = true;
      video.play().catch(() => {});
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) playMuted();
      },
      { threshold: 0.4 }
    );
    observer.observe(wrap);
    return () => observer.disconnect();
  }, [reduceMotion]);

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      userPaused.current = false;
      video.muted = true;
      video.play();
    } else {
      userPaused.current = true;
      video.pause();
    }
  };

  return (
    <div ref={wrapRef} className="relative overflow-hidden bg-[#101114]">
      <div className="relative">
      {!ready && (
        <div className="absolute inset-0 animate-pulse bg-[#1C1E24]" aria-hidden />
      )}
      <video
        ref={videoRef}
        className="relative z-[1] h-auto w-full bg-[#101114] object-contain"
        width={3840}
        height={2160}
        muted
        playsInline
        preload={reduceMotion ? "none" : "auto"}
        controls
        onLoadedData={() => setReady(true)}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      >
        <source src={DEMO} type="video/mp4" />
      </video>
      </div>
      <div className="relative z-[2] flex items-center justify-between gap-4 border-t border-white/10 px-5 py-4">
        <button
          type="button"
          onClick={toggle}
          className="inline-flex items-center gap-2 rounded-full bg-[#FFC500] px-5 py-2.5 font-body text-sm font-semibold text-[#14181F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFC500]"
        >
          {playing ? <Pause size={16} aria-hidden /> : <Play size={16} aria-hidden />}
          {playing ? "Pause demo" : "Play demo"}
        </button>
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/50">
          Muted
        </p>
      </div>
    </div>
  );
}

export default function RiseCaseStudy() {
  const reduceMotion = useReducedMotion();
  const next = getNextCaseStudy(study.id);

  return (
    <article className="min-w-0" style={{ backgroundColor: R.paper, color: R.ink }}>
      {/* 01 Hero */}
      <section className="overflow-hidden bg-white">
        <Shell className="grid items-end gap-10 py-16 sm:py-20 lg:grid-cols-12 lg:gap-8 lg:py-28">
          <Reveal className="lg:col-span-5">
            <Eyebrow>UX / Product design case study</Eyebrow>
            <p className="mt-6 font-mono text-xs uppercase tracking-[0.18em]" style={{ color: R.mute }}>
              Rise by Synchrony
            </p>
            <h1 className="mt-4 font-display text-[clamp(2.6rem,6vw,4.6rem)] font-semibold leading-[0.98] tracking-tight">
              Building credit confidence before costly mistakes happen.
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed sm:text-lg" style={{ color: R.mute }}>
              A student credit-building experience that combines graduated access, visible progress, personalized support, and decision-moment AI guidance while keeping students in control.
            </p>
          </Reveal>
          <Reveal className="lg:col-span-7" delay={0.08}>
            <Shot
              file="08_reusable_cutouts/rise-cutout-three-phones.png"
              alt="Three transparent Rise phones showing the student experience"
              width={3072}
              height={2048}
              priority
            />
          </Reveal>
        </Shell>
        <Shell className="grid gap-8 border-t border-[#E6E0D8] py-10 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Role", "Product Designer / UX Designer"],
            ["Focus", "UX strategy, interaction design, AI experience design, visual design, prototyping"],
            ["Product", "Student credit-building experience"],
            ["Organization", "Synchrony"],
          ].map(([label, value]) => (
            <div key={label}>
              <dt className="font-mono text-[10px] uppercase tracking-[0.16em]" style={{ color: R.mute }}>
                {label}
              </dt>
              <dd className="mt-2 text-sm leading-relaxed">{value}</dd>
            </div>
          ))}
        </Shell>
      </section>

      {/* 02 First consequential decision */}
      <section className="py-20 sm:py-28">
        <Shell>
          <Reveal>
            <Eyebrow>02 — The first consequential decision</Eyebrow>
            <h2 className="mt-5 max-w-3xl font-display text-[clamp(2.2rem,5vw,4rem)] font-semibold leading-[1.02]">
              The most important credit lesson may arrive a few seconds too late.
            </h2>
          </Reveal>
          <Reveal className="mt-8 max-w-2xl" delay={0.05}>
            <p className="text-lg leading-relaxed" style={{ color: R.mute }}>
              Many students begin using credit before they fully understand utilization, balances, payment timing, delayed consequences, or long-term credit health. The important moment is often not after something has gone wrong. It is immediately before the decision.
            </p>
          </Reveal>
        </Shell>
        <Reveal className="mx-auto mt-12 w-full max-w-[1536px] px-5 sm:px-8">
          <img
            src={`${ASSETS}/02_student_problem/rise-campus-student-phone.jpg`}
            alt="College student on campus holding a phone displaying the Rise experience"
            width={3072}
            height={2048}
            loading="lazy"
            decoding="async"
            className="h-auto w-full object-cover"
          />
        </Reveal>
      </section>

      {/* 03 The gap */}
      <section className="bg-white py-20 sm:py-28">
        <Shell className="grid items-center gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <Eyebrow>03 — The gap</Eyebrow>
            <h2 className="mt-5 font-display text-[clamp(2.1rem,4.4vw,3.6rem)] font-semibold leading-[1.05]">
              Knowing the rule is not the same as recognizing the moment.
            </h2>
            <div className="mt-8 space-y-5 text-base leading-relaxed" style={{ color: R.mute }}>
              <p>
                General financial education can explain a rule. It rarely shows up when a student is about to act. Decision-time understanding is different: the same rule, attached to the choice still in front of them.
              </p>
              <p>
                The deeper problem is not simply that students need more financial literacy. A student may understand a general rule and still fail to recognize when that rule matters in a real decision.
              </p>
            </div>
          </Reveal>
          <Reveal className="lg:col-span-7" delay={0.06}>
            <Shot
              file="02_student_problem/rise-student-desk.jpg"
              alt="Overhead student desk with a Rise phone, Foundation Card, notebook, and campus objects"
              width={3072}
              height={2048}
            />
          </Reveal>
        </Shell>
      </section>

      {/* 04 Opportunity */}
      <section className="relative overflow-hidden py-24 sm:py-32" style={{ backgroundColor: R.charcoal, color: R.paper }}>
        <Shell className="relative grid items-center gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-8">
            <Eyebrow light>04 — The opportunity</Eyebrow>
            <h2 className="mt-5 font-display text-[clamp(2.3rem,5.2vw,4.4rem)] font-semibold leading-[1.02]">
              What if credit education appeared at the exact moment it became useful?
            </h2>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/70">
              Rise moves guidance closer to the decision itself. Before a potentially harmful action, the product can explain what may happen, why it matters, and what alternative exists. Then the student chooses.
            </p>
            <p className="mt-12 font-display text-3xl font-semibold leading-tight sm:text-5xl">
              The AI explains.
              <span className="mt-2 block" style={{ color: R.yellow }}>
                The student decides.
              </span>
            </p>
          </Reveal>
          <div className="pointer-events-none hidden lg:col-span-4 lg:block" aria-hidden>
            <img
              src={`${ASSETS}/08_reusable_cutouts/rise-cutout-foundation-card.png`}
              alt=""
              width={3072}
              height={2048}
              loading="lazy"
              className={`ml-auto w-[min(100%,280px)] object-contain ${reduceMotion ? "" : "motion-safe:animate-none"}`}
            />
          </div>
        </Shell>
      </section>

      {/* 05 Meet Maya */}
      <section className="bg-white py-20 sm:py-28">
        <Shell className="max-w-3xl">
          <Reveal>
            <Eyebrow>05 — Meet Maya</Eyebrow>
            <h2 className="mt-5 font-display text-[clamp(2.2rem,4.6vw,3.8rem)] font-semibold leading-[1.05]">
              A student still in the decision, not a statistic after it.
            </h2>
            <div className="mt-8 space-y-5 text-lg leading-relaxed" style={{ color: R.mute }}>
              <p>
                Maya is the student this case study follows. She is the thread between a rule she may already know and a moment she may not recognize in time. She is not a researched persona, and this page does not invent a biography, campus, income, or quote for her.
              </p>
              <p>
                Every later product decision is read through her: she can see the explanation, she can see another path, and she can still decide.
              </p>
            </div>
          </Reveal>
          {/*
            Held: 08_reusable_cutouts/rise-cutout-tablet-profile-concept.png
            The screen inside that cutout still says Aaliyah.
            Do not publish it until the profile is corrected to Maya.
            Do not rename Maya to Aaliyah to use the asset.
          */}
        </Shell>
      </section>

      {/* 06 Product reveal */}
      <section className="py-20 sm:py-28">
        <Shell>
          <Reveal>
            <Eyebrow>06 — Product reveal</Eyebrow>
            <h2 className="mt-5 max-w-3xl font-display text-[clamp(2.2rem,4.8vw,4rem)] font-semibold leading-[1.02]">
              One ecosystem. Different kinds of support.
            </h2>
          </Reveal>
        </Shell>
        <Reveal className="mx-auto mt-12 flex w-full max-w-[1672px] justify-center px-5">
          <Shot
            file="03_product_reveal/rise-responsive-ecosystem.jpg"
            alt="Rise shown as a connected experience across phone, tablet, and desktop"
            width={3344}
            height={1882}
          />
        </Reveal>
        <Shell className="mt-20 grid items-center gap-12 lg:grid-cols-12">
          <Reveal className="order-2 lg:order-1 lg:col-span-6">
            <Shot
              file="03_product_reveal/rise-product-system.jpg"
              alt="Rise product system connecting the app, Foundation Card, Pip, progress, and learning resources"
              width={2508}
              height={2508}
            />
          </Reveal>
          <Reveal className="order-1 lg:order-2 lg:col-span-6" delay={0.05}>
            <ul className="space-y-7">
              {[
                ["Foundation Card", "A graduated entry point into credit building."],
                ["Decision-moment guidance", "Relevant explanations before a potentially harmful decision."],
                ["Credit Health", "Visible progress and credit-health context."],
                ["Pip", "A lightweight credit-health companion. Two hands. Never an authority."],
                ["Rise Points", "Positive reinforcement around healthy credit-building behaviors. Not a credit score."],
                ["Resource Stack", "Personalized resources connected to the student's needs."],
                ["Graduated access", "An experience that evolves with the student's stage and progress."],
              ].map(([title, body], index) => (
                <li key={title} className="grid grid-cols-[2.5rem_1fr] gap-3 border-t pt-5" style={{ borderColor: R.line }}>
                  <span className="font-mono text-xs" style={{ color: R.mute }}>
                    0{index + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl font-semibold">{title}</h3>
                    <p className="mt-1 text-sm leading-relaxed" style={{ color: R.mute }}>
                      {body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </Shell>
      </section>

      {/* 07 Foundation Card */}
      <section className="bg-white py-20 sm:py-28">
        <Shell className="grid items-center gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <Eyebrow>07 — Foundation Card</Eyebrow>
            <h2 className="mt-5 font-display text-[clamp(2.1rem,4.4vw,3.6rem)] font-semibold leading-[1.05]">
              A starting point designed to grow with the student.
            </h2>
            <p className="mt-6 text-base leading-relaxed" style={{ color: R.mute }}>
              Graduated access means the experience can expand as the student builds context and habits. It is an entry point, not a promise of terms. This case study does not specify APR, fees, credit limits, approval logic, underwriting criteria, or eligibility.
            </p>
          </Reveal>
          <Reveal className="lg:col-span-7">
            <Shot
              file="04_foundation_card/rise-phone-foundation-card.jpg"
              alt="Rise mobile dashboard beside the black and yellow Foundation Card"
              width={3072}
              height={2048}
            />
          </Reveal>
        </Shell>
        <Shell className="mt-16 grid items-end gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <Shot
              file="04_foundation_card/rise-student-starter-kit.jpg"
              alt="Rise student starter kit with welcome materials, phone, guidebook, and Foundation Card"
              width={3072}
              height={2048}
            />
          </Reveal>
          <Reveal className="lg:col-span-5" delay={0.05}>
            <p className="font-display text-3xl font-semibold leading-tight">
              The program should feel holdable before it feels complex.
            </p>
            <p className="mt-4 text-base leading-relaxed" style={{ color: R.mute }}>
              A starter kit makes the first stage tangible: a card, a way to see progress, and materials that explain the experience without pretending the product is already underwritten.
            </p>
          </Reveal>
        </Shell>
      </section>

      {/* 08 AI before the damage */}
      <section className="relative py-20 sm:py-28" style={{ backgroundColor: R.charcoal, color: R.paper }}>
        <Shell className="grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <Eyebrow light>08 — AI before the damage</Eyebrow>
            <h2 className="mt-5 font-display text-[clamp(2.1rem,4.4vw,3.6rem)] font-semibold leading-[1.05]">
              Guidance before the decision. Control after the explanation.
            </h2>
            <ol className="mt-10 space-y-6">
              {[
                ["A consequential decision occurs.", "The moment still belongs to the student."],
                ["Relevant context surfaces.", "Not a lecture. The part of the rule that matters now."],
                ["The potential consequence is explained.", "Delayed outcomes, said earlier."],
                ["A lower-risk alternative appears.", "Useful, not judgmental."],
                ["The student chooses.", "Review, inspect, dismiss, or continue."],
              ].map(([title, body], index) => (
                <li key={title} className="grid grid-cols-[2.5rem_1fr] gap-3">
                  <span className="font-mono text-sm" style={{ color: R.yellow }}>
                    0{index + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-semibold">{title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-white/65">{body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-8 max-w-md text-sm leading-relaxed text-white/65">
              The AI can explain risk, consequences, context, and alternatives. It must not make the financial decision, block the transaction, underwrite, approve, or behave like an autonomous advisor. This section does not add risk percentages, confidence scores, or credit predictions.
            </p>
          </Reveal>
          <Reveal className="relative lg:col-span-7" delay={0.06}>
            <img
              src={`${ASSETS}/05_ai_guidance/rise-ai-intervention.jpg`}
              alt="Rise purchase review showing context, an alternative, Pip, and the student's final choice"
              width={3072}
              height={2048}
              loading="lazy"
              decoding="async"
              className="h-auto w-full object-contain"
            />
            <img
              src={`${ASSETS}/08_reusable_cutouts/rise-cutout-phone-angled.png`}
              alt=""
              width={2048}
              height={3072}
              loading="lazy"
              className="pointer-events-none absolute -bottom-8 -left-6 hidden w-36 object-contain lg:block"
            />
          </Reveal>
        </Shell>
      </section>

      {/* 09 Progress */}
      <section className="py-20 sm:py-28">
        <Shell>
          <Reveal className="max-w-3xl">
            <Eyebrow>09 — Making progress visible</Eyebrow>
            <h2 className="mt-5 font-display text-[clamp(2.1rem,4.6vw,3.8rem)] font-semibold leading-[1.04]">
              Make delayed consequences easier to understand.
            </h2>
            <p className="mt-6 text-lg leading-relaxed" style={{ color: R.mute }}>
              Financial outcomes can arrive late and feel abstract. Rise makes smaller signals visible earlier through Credit Health, Pip, and Rise Points. Points recognize a behavior. They do not improve a real credit score.
            </p>
          </Reveal>
        </Shell>
        <Reveal className="mx-auto mt-12 flex w-full max-w-[1672px] justify-center px-5">
          <Shot
            file="05_ai_guidance/rise-credit-state-comparison.jpg"
            alt="Two Rise phone states comparing healthier and more strained credit-health signals"
            width={3344}
            height={1882}
          />
        </Reveal>
        <Shell className="mt-16 grid items-center gap-10 lg:grid-cols-12">
          <Reveal className="hidden lg:col-span-4 lg:block">
            <img
              src={`${ASSETS}/08_reusable_cutouts/rise-cutout-phone-front.png`}
              alt=""
              width={2048}
              height={3072}
              loading="lazy"
              className="mx-auto w-full max-w-xs object-contain"
            />
          </Reveal>
          <Reveal className="lg:col-span-8">
            <div className="grid gap-8 sm:grid-cols-3">
              {[
                ["Credit Health", "A nearer reading of how a choice relates to credit health, before the statement arrives."],
                ["Pip", "Surfaces context, marks progress, and points toward support. Two hands. No shame, no commands, no pretense of being human."],
                ["Rise Points", "Reinforcement for a healthy action. Approachable feedback, not an authority and not a score."],
              ].map(([title, body]) => (
                <div key={title}>
                  <h3 className="font-display text-2xl font-semibold">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed" style={{ color: R.mute }}>
                    {body}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </Shell>
      </section>

      {/* 10 Resource Stack */}
      <section className="bg-white py-20 sm:py-28">
        <Shell className="grid items-center gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <Eyebrow>10 — Resource Stack</Eyebrow>
            <h2 className="mt-5 font-display text-[clamp(2.1rem,4.4vw,3.6rem)] font-semibold leading-[1.05]">
              Sometimes the problem is not the student's behavior.
            </h2>
            <p className="mt-6 text-base leading-relaxed" style={{ color: R.mute }}>
              Financial strain can come from limited resources, unfamiliar terminology, missing context, structural constraints, or no clear path to support. The Resource Stack connects a student with information or help that fits the current situation. This case study does not invent partnerships or campus services beyond what the concept shows.
            </p>
          </Reveal>
          <Reveal className="lg:col-span-7">
            <Shot
              file="06_resource_stack/rise-resource-stack-tablet.jpg"
              alt="Rise Resource Stack displayed on a tablet with education and financial-support objects"
              width={3072}
              height={2048}
            />
          </Reveal>
        </Shell>
      </section>

      {/* Design Process */}
      <section className="overflow-x-hidden py-20 sm:py-28" style={{ backgroundColor: "#F7F3EA" }}>
        <Shell>
          <Reveal className="mx-auto max-w-2xl text-center sm:text-left">
            <Eyebrow>DESIGN PROCESS</Eyebrow>
            <h2 className="mt-5 font-display text-[clamp(2.1rem,4.4vw,3.6rem)] font-semibold leading-[1.05]">
              From problem to product
            </h2>
            <p className="mt-5 text-base leading-relaxed sm:text-lg" style={{ color: R.mute }}>
              A seven-stage process that moved Rise from understanding the student problem to a clearer, more connected product experience.
            </p>
          </Reveal>
        </Shell>
        <div className="mt-12 sm:mt-16 lg:mt-20">
          <RiseDesignProcess />
        </div>
      </section>

      {/* Editorial detail — once */}
      <section className="py-16 sm:py-20">
        <Reveal className="mx-auto flex w-full max-w-[1536px] justify-center px-5">
          <figure>
            <img
              src={`${ASSETS}/05_ai_guidance/rise-editorial-ui-closeups.jpg`}
              alt="Editorial close-ups of Rise guidance, utilization, points, and Resource Stack interface details"
              width={3072}
              height={2048}
              loading="lazy"
              decoding="async"
              className="h-auto w-full object-contain"
            />
            <figcaption className="mt-4 font-mono text-[11px] uppercase tracking-[0.16em]" style={{ color: R.mute }}>
              Detail — guidance, health, points, and support in the same visual system
            </figcaption>
          </figure>
        </Reveal>
      </section>

      {/* 11 User journey */}
      <section className="bg-white py-20 sm:py-28">
        <Shell>
          <Reveal className="max-w-3xl">
            <Eyebrow>11 — User journey</Eyebrow>
            <h2 className="mt-5 font-display text-[clamp(2.1rem,4.4vw,3.6rem)] font-semibold leading-[1.05]">
              Understanding where support matters most.
            </h2>
            <p className="mt-6 text-base leading-relaxed" style={{ color: R.mute }}>
              The designed student journey maps where support has to show up — not a research deliverable and not a row of screenshots.
            </p>
          </Reveal>
          <div className="mt-12 min-w-0">
            <RiseUserJourney />
          </div>
        </Shell>
      </section>

      {/* 12 User flows */}
      <section className="py-24 sm:py-32" style={{ backgroundColor: "#EDE8DF" }}>
        <Shell className="grid items-end gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <Eyebrow>12 — User flows</Eyebrow>
            <h2 className="mt-6 font-display text-[clamp(2.4rem,5.2vw,4.35rem)] font-semibold leading-[1.02] tracking-tight">
              Designing the moments where guidance and control meet.
            </h2>
          </Reveal>
          <Reveal className="lg:col-span-5 lg:pb-1" delay={0.06}>
            <p className="max-w-md text-base leading-relaxed sm:text-lg" style={{ color: R.mute }}>
              These six diagrams are the interaction logic — start and end states, screens, student actions, decisions, branches, system responses, exits, and recovery — with control left with the student at every consequential step.
            </p>
          </Reveal>
        </Shell>
        <Reveal className="mx-auto mt-16 w-[min(100%,95vw)] max-w-[1760px] px-4 sm:px-6 lg:mt-20 lg:px-8">
          <RiseUserFlows />
        </Reveal>
      </section>

      {/* 13 Low-fi */}
      <section className="bg-white py-20 sm:py-28">
        <Shell className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <Eyebrow>13 — Low-fidelity wireframes</Eyebrow>
            <h2 className="mt-5 font-display text-[clamp(2.1rem,4.2vw,3.4rem)] font-semibold leading-[1.05]">
              Testing the structure before polishing the interface.
            </h2>
          </Reveal>
          <Reveal className="lg:col-span-7" delay={0.05}>
            <p className="text-base leading-relaxed" style={{ color: R.mute }}>
              The low-fidelity work is structural exploration, not a preview of the finished interface. Thirteen hand-drawn screens, grouped into four flows, were used to test where things live, what stays largest, when guidance appears, how progress is shown, and how Maya keeps control — before visual polish.
            </p>
            <ul className="mt-8 space-y-5">
              {[
                ["Navigation", "Where Foundation, guidance, progress, and support live so Maya can find them without a tour."],
                ["Hierarchy", "The decision in front of her stays larger than the decoration around it."],
                ["Intervention timing", "Guidance appears while the action can still change, not as a receipt."],
                ["Progress visibility", "A delayed outcome gets a nearer signal that does not pretend to be a score."],
                ["Student control", "Review, dismiss, and continue stay visible. The system never closes the choice."],
                ["Product structure", "Home, Card, Learn, Resources, and Profile are one product. Later screens are paths through that structure, not separate apps."],
              ].map(([title, body]) => (
                <li key={title} className="border-l-2 pl-4" style={{ borderColor: R.yellow }}>
                  <h3 className="font-display text-2xl font-semibold">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed" style={{ color: R.mute }}>{body}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </Shell>
        <Reveal className="mx-auto mt-16 w-[min(100%,95vw)] max-w-[1760px] px-4 sm:px-6 lg:mt-20 lg:px-8">
          <RiseLowFi />
        </Reveal>
      </section>

      {/* 14 High-fi */}
      <section className="py-20 sm:py-28" style={{ backgroundColor: "#F7F3EA" }}>
        <Shell>
          <Reveal className="max-w-2xl">
            <Eyebrow>14 — High-fidelity design</Eyebrow>
            <h2 className="mt-5 font-display text-[clamp(2.1rem,4.4vw,3.6rem)] font-semibold leading-[1.05]">
              High-Fidelity Design
            </h2>
            <p className="mt-5 text-base leading-relaxed sm:text-lg" style={{ color: R.mute }}>
              Turning the Rise system into a clear, responsive student experience.
            </p>
          </Reveal>
        </Shell>
        <div className="mx-auto mt-12 w-[min(100%,95vw)] max-w-[1200px] px-4 sm:mt-16 sm:px-6 lg:mt-20 lg:px-8">
          <RiseHighFi />
        </div>
      </section>

      {/* 15 Core experience */}
      <section className="bg-white py-20 sm:py-28">
        <Shell>
          <Reveal className="max-w-3xl">
            <Eyebrow>15 — Core student experience</Eyebrow>
            <h2 className="mt-5 font-display text-[clamp(2.1rem,4.4vw,3.6rem)] font-semibold leading-[1.05]">
              From guidance to action to visible progress.
            </h2>
            <p className="mt-6 font-body text-base leading-relaxed" style={{ color: R.mute }}>
              Foundation, then the dashboard, then guidance, then the student’s choice, then progress, then support. One sequence — not six equal frames.
            </p>
          </Reveal>
        </Shell>
        <Reveal className="mx-auto mt-12 flex w-full max-w-[1672px] justify-center px-5">
          <Shot
            file="07_core_experience/rise-mobile-journey.jpg"
            alt="Rise mobile screens in sequence, from foundation through guidance, choice, progress, and support"
            width={3344}
            height={1882}
          />
        </Reveal>
        {/*
          08_reusable_cutouts/rise-cutout-three-phones.png is available.
          Held here so the sequence above keeps its breathing room.
        */}
      </section>

      {/* 16 Demo */}
      <section className="py-20 sm:py-28" style={{ backgroundColor: R.charcoal, color: R.paper }}>
        <Shell>
          <Reveal className="max-w-3xl">
            <Eyebrow light>16 — Product demo</Eyebrow>
            <h2 className="mt-5 font-display text-[clamp(2.1rem,4.6vw,3.8rem)] font-semibold leading-[1.05]">
              Seeing Rise in motion
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-white/70">
              The prototype connects Rise’s major moments into one continuous experience, showing how guidance, progress, support, and student control work together.
            </p>
          </Reveal>
        </Shell>
        <div className="mx-auto mt-12 w-full max-w-6xl px-5 sm:px-8">
          <DemoPlayer />
        </div>
        <Shell className="mt-12 grid gap-8 sm:grid-cols-3">
          {[
            ["Decision-time guidance", "Guidance appears while the student can still reconsider the action."],
            ["Visible control", "The student remains able to review, dismiss, or continue."],
            ["Connected progress", "Credit Health, Pip, Rise Points, and support remain part of one experience."],
          ].map(([title, body]) => (
            <div key={title}>
              <h3 className="font-display text-2xl font-semibold" style={{ color: R.yellow }}>
                {title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/70">{body}</p>
            </div>
          ))}
        </Shell>
      </section>

      {/* 17 Visual direction */}
      <RiseVisualDirection />

      {/* 18 Synchrony */}
      <section className="py-20 sm:py-28">
        <Shell className="grid items-center gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <Eyebrow>18 — Why it works for Synchrony</Eyebrow>
            <h2 className="mt-5 font-display text-[clamp(2.1rem,4.2vw,3.4rem)] font-semibold leading-[1.05]">
              A relationship that starts with usefulness, not a claim of results.
            </h2>
            <ul className="mt-8 space-y-4 text-base leading-relaxed" style={{ color: R.mute }}>
              {[
                "An earlier relationship with younger customers, while they are still learning how credit behaves.",
                "Structured credit education attached to decisions, not only to onboarding.",
                "Graduated engagement that can evolve with the student’s stage.",
                "Product familiarity before a later, more consequential relationship.",
                "Trust built by useful support and visible control — not by taking the choice away.",
              ].map((item) => (
                <li key={item} className="border-t pt-4" style={{ borderColor: R.line }}>
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm leading-relaxed" style={{ color: R.mute }}>
              No revenue, retention, default, conversion, or credit-score outcome is claimed here. Those numbers were not evidenced in the project files.
            </p>
          </Reveal>
          <Reveal className="lg:col-span-6">
            <img
              src={`${ASSETS}/08_reusable_cutouts/rise-cutout-phone-foundation-card.png`}
              alt=""
              width={2748}
              height={2290}
              loading="lazy"
              className="mx-auto h-auto w-full max-w-md object-contain"
            />
          </Reveal>
        </Shell>
      </section>

      {/* 19 Pitch + contribution */}
      <section className="py-20 sm:py-28" style={{ backgroundColor: "#F7F3EA" }}>
        <Shell>
          <Reveal className="max-w-3xl">
            <Eyebrow>19 — Pitch outcome and my contribution</Eyebrow>
            <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.2rem)] font-semibold leading-[1.05]">
              Pitch Outcome + My Contribution
            </h2>
            <p className="mt-5 text-base leading-relaxed sm:text-lg" style={{ color: R.mute }}>
              Rise was pitched as team competition work for Synchrony. These photos are from pitch day with the three-person team.
            </p>
          </Reveal>

          <Reveal className="mt-10 sm:mt-12">
            <div className="flex flex-col gap-3 sm:gap-4 lg:flex-row lg:items-stretch lg:gap-4">
              <figure
                className="overflow-hidden border bg-[#F3EFE8] lg:w-[58%] lg:shrink-0"
                style={{ borderColor: R.line, borderRadius: 2 }}
              >
                <img
                  src="/case-studies/synchrony_rise_case_stucy/competition_evidence/64fdf5c2-ee5c-43fb-a032-7cd8f6dd47da.jpeg"
                  alt="Rise team presenting the pitch, with the Five Components slide on screen"
                  width={5120}
                  height={3840}
                  loading="lazy"
                  decoding="async"
                  className="h-auto w-full object-contain"
                />
              </figure>
              <div className="flex flex-col gap-3 sm:gap-4 lg:min-w-0 lg:flex-1">
                {[
                  {
                    src: "284baca8-0135-4b28-b9c3-49a32b2d705a.jpeg",
                    alt: "Rise team with a Synchrony representative after the pitch",
                    w: 1024,
                    h: 768,
                  },
                  {
                    src: "1179a4b4-3c06-4dca-82bf-0493dae7c624.jpeg",
                    alt: "Rise team in matching yellow sweatshirts after the competition",
                    w: 4032,
                    h: 3024,
                  },
                  {
                    src: "93ecafc6-f040-4b90-9c22-c430165866bb.jpeg",
                    alt: "Rise team selfie at the Synchrony competition venue",
                    w: 4032,
                    h: 3024,
                  },
                ].map((shot) => (
                  <figure
                    key={shot.src}
                    className="overflow-hidden border bg-[#F3EFE8]"
                    style={{ borderColor: R.line, borderRadius: 2 }}
                  >
                    <img
                      src={`/case-studies/synchrony_rise_case_stucy/competition_evidence/${shot.src}`}
                      alt={shot.alt}
                      width={shot.w}
                      height={shot.h}
                      loading="lazy"
                      decoding="async"
                      className="h-auto w-full object-contain"
                    />
                  </figure>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-14">
            <Reveal className="lg:col-span-5">
              <div className="space-y-4 text-base leading-relaxed" style={{ color: R.mute }}>
                <p>
                  I was the UX/UI designer on a three-person team, with James-Owolabi Olaoluwa (AI research and software) and Benedicta Nzekwe (business analysis). I do not claim sole ownership of the concept, the business model, or the engineering.
                </p>
                <p>
                  My contribution is the student-experience argument: when guidance appears, how an alternative is offered without becoming a command, and how progress and support stay visible without taking the final decision.
                </p>
              </div>
            </Reveal>
            <Reveal className="lg:col-span-7" delay={0.05}>
              <figure>
                <img
                  src={TEAM_SLIDE}
                  alt="Team slide naming James-Owolabi Olaoluwa, Benedicta Nzekwe, and Emmanuella Turkson as UX/UI Designer"
                  width={1920}
                  height={1080}
                  loading="lazy"
                  className="h-auto w-full object-contain"
                />
                <figcaption className="mt-3 text-sm" style={{ color: R.mute }}>
                  Team competition slide. Not a measured outcome.
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </Shell>
      </section>

      {/* 20 Validate next */}
      <section className="py-20 sm:py-28">
        <Shell>
          <Reveal className="max-w-3xl">
            <Eyebrow>20 — What I would validate next</Eyebrow>
            <h2 className="mt-5 font-display text-[clamp(2.1rem,4.4vw,3.5rem)] font-semibold leading-[1.05]">
              What I would test before moving the concept forward.
            </h2>
            <p className="mt-5 text-base leading-relaxed" style={{ color: R.mute }}>
              This testing has not happened. There are no participant counts, quotes, or scores to report.
            </p>
          </Reveal>
          <ul className="mt-12 grid gap-x-10 gap-y-6 sm:grid-cols-2">
            {[
              "Do students understand why guidance appeared?",
              "Can students distinguish guidance from a restriction?",
              "Is the consequence understandable?",
              "Does the alternative feel useful rather than judgmental?",
              "Can guidance be dismissed easily?",
              "Does Credit Health make delayed outcomes clearer?",
              "Does Pip support understanding without becoming distracting?",
              "Does the Resource Stack appear at the right moment?",
            ].map((question, index) => (
              <li key={question} className="border-t pt-4 text-base leading-relaxed" style={{ borderColor: R.line }}>
                <span className="mr-3 font-mono text-xs" style={{ color: R.mute }}>
                  0{index + 1}
                </span>
                {question}
              </li>
            ))}
          </ul>
        </Shell>
      </section>

      {/* 21 Reflection */}
      <section style={{ backgroundColor: R.charcoal, color: R.paper }}>
        <div className="mx-auto w-full max-w-[1672px]">
          <img
            src={`${ASSETS}/01_hero/rise-hero-dark-cinematic.jpg`}
            alt="Rise phone, Foundation Card, and Pip against a charcoal studio background"
            width={3344}
            height={1882}
            loading="lazy"
            decoding="async"
            className="h-auto w-full object-contain"
          />
        </div>
        <Shell className="max-w-3xl py-20 sm:py-28">
          <Reveal>
            <Eyebrow light>21 — Reflection</Eyebrow>
            <h2 className="mt-5 font-display text-[clamp(2.1rem,4.6vw,3.8rem)] font-semibold leading-[1.05]">
              The strongest intervention is not always the one that prevents an action.
            </h2>
            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              <p className="text-base leading-relaxed text-white/55">
                From: “How can a financial app stop students from making bad decisions?”
              </p>
              <p className="text-base leading-relaxed">
                To: “How can a product help students understand enough to make a more informed decision themselves?”
              </p>
            </div>
            <p className="mt-10 text-lg leading-relaxed text-white/80">
              Responsible AI experiences require more than recommendations. They require understandable reasoning, visible alternatives, easy exits, and clear ownership of the final decision.
            </p>
          </Reveal>
        </Shell>
      </section>

      {/* 22 Next */}
      {next && (
        <section className="bg-white">
          <Link
            to={createPageUrl(next.slug)}
            className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#14181F]"
          >
            <Shell className="grid items-center gap-8 py-16 sm:py-24 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em]" style={{ color: R.mute }}>
                  Next case study
                </p>
                <h2 className="mt-4 font-display text-[clamp(2.4rem,5vw,4.2rem)] font-semibold leading-[0.98] transition-transform duration-500 group-hover:translate-x-2">
                  {next.shortName || next.name}
                </h2>
                <p className="mt-4 max-w-md text-base leading-relaxed" style={{ color: R.mute }}>
                  {next.oneLiner}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">
                  Open project
                  <ArrowRight size={16} className="transition-transform duration-500 group-hover:translate-x-1.5" aria-hidden />
                </span>
              </div>
              <div className="lg:col-span-6">
                <img
                  src={next.heroImage?.src}
                  alt=""
                  width={next.heroImage?.width || 1448}
                  height={next.heroImage?.height || 1086}
                  loading="lazy"
                  className={`h-auto w-full object-contain ${reduceMotion ? "" : "transition-transform duration-700 group-hover:scale-[1.015]"}`}
                />
              </div>
            </Shell>
          </Link>
        </section>
      )}
    </article>
  );
}
