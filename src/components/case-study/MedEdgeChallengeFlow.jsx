import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { Clock, EyeOff, Layers, ShieldAlert } from "lucide-react";

const ICONS = {
  layers: Layers,
  clock: Clock,
  "eye-off": EyeOff,
  "shield-alert": ShieldAlert,
};

/** Shared cobalt back face — distinct from card 4's deep-navy front. */
const BACK_FACE =
  "border-[#60A5FA]/35 bg-[#1D4ED8] text-white";

const FLIP_EASE = [0.22, 1, 0.36, 1];
const FLIP_MS = 620;
const HOLD_MS = 780;
const GAP_MS = 300;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: FLIP_EASE },
  },
};

function useFinePointer() {
  const [fine, setFine] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setFine(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return fine;
}

function wait(ms, signal) {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(new DOMException("Aborted", "AbortError"));
      return;
    }
    const id = window.setTimeout(resolve, ms);
    const onAbort = () => {
      window.clearTimeout(id);
      reject(new DOMException("Aborted", "AbortError"));
    };
    signal?.addEventListener("abort", onAbort, { once: true });
  });
}

function FlipCard({
  stage,
  index,
  autoFlipped,
  interactive,
  reduceMotion,
}) {
  const Icon = ICONS[stage.icon] || Layers;
  const isFinal = index === 3;
  const finePointer = useFinePointer();
  const cardRef = useRef(null);
  const [tappedOpen, setTappedOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  const manualFlipped = interactive
    ? finePointer
      ? hovered
      : tappedOpen
    : false;
  const flipped = Boolean(autoFlipped || manualFlipped);
  const lift = !reduceMotion && flipped;

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 220, damping: 22, mass: 0.4 });
  const springY = useSpring(my, { stiffness: 220, damping: 22, mass: 0.4 });
  const tiltX = useTransform(springY, [-0.5, 0.5], [6, -6]);
  const tiltY = useTransform(springX, [-0.5, 0.5], [-7, 7]);
  const tiltEnabled = interactive && finePointer && !reduceMotion;

  const resetTilt = () => {
    mx.set(0);
    my.set(0);
  };

  const onPointerMove = (event) => {
    if (!tiltEnabled || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    mx.set(px);
    my.set(py);
  };

  const faceBase =
    "absolute inset-0 flex flex-col justify-between overflow-hidden rounded-2xl border p-5 sm:p-6";

  const frontFace = isFinal
    ? "border-cs-accent/35 bg-cs-inkbg text-cs-onink"
    : "border-cs-border/80 bg-cs-card text-cs-ink";

  return (
    <motion.li variants={item} className="min-h-0 list-none">
      <div
        ref={cardRef}
        className="relative h-full min-h-[210px] sm:min-h-[232px]"
        style={{ perspective: reduceMotion ? undefined : 1100 }}
        onPointerMove={onPointerMove}
        onPointerEnter={() => {
          if (interactive && finePointer) setHovered(true);
        }}
        onPointerLeave={() => {
          if (finePointer) {
            setHovered(false);
            resetTilt();
          }
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-2 rounded-[1.6rem] blur-xl transition-opacity duration-500"
          style={{
            background: flipped
              ? "radial-gradient(circle at 40% 25%, rgba(37,99,235,0.38) 0%, transparent 70%)"
              : isFinal
                ? "radial-gradient(circle at 40% 25%, rgba(37,99,235,0.28) 0%, transparent 70%)"
                : "radial-gradient(circle at 40% 25%, rgba(37,99,235,0.16) 0%, transparent 70%)",
            opacity: flipped || hovered ? 1 : 0.65,
          }}
        />

        <motion.div
          className="relative h-full w-full"
          style={{
            transformStyle: reduceMotion ? undefined : "preserve-3d",
            rotateX: tiltEnabled ? tiltX : 0,
            rotateY: tiltEnabled ? tiltY : 0,
          }}
          animate={{
            y: lift ? -6 : 0,
            scale: lift ? 1.015 : 1,
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <motion.button
            type="button"
            aria-pressed={flipped}
            aria-label={`${stage.label}. ${flipped ? "Showing details" : "Show details"}`}
            className="relative h-full w-full cursor-pointer text-left outline-none focus-visible:ring-2 focus-visible:ring-cs-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-cs-alt"
            style={{ transformStyle: reduceMotion ? undefined : "preserve-3d" }}
            onClick={() => {
              if (!interactive || finePointer) return;
              setTappedOpen((open) => !open);
            }}
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={{
              duration: reduceMotion ? 0.01 : FLIP_MS / 1000,
              ease: FLIP_EASE,
            }}
          >
            {/* Front */}
            <div
              className={`${faceBase} ${frontFace}`}
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                boxShadow: isFinal
                  ? "0 22px 44px -24px rgba(6,16,42,0.7), inset 0 1px 0 rgba(147,197,253,0.18)"
                  : "0 18px 40px -24px rgba(6,16,42,0.35), inset 0 1px 0 rgba(255,255,255,0.85)",
              }}
            >
              <div className="flex items-start justify-between gap-3">
                <span
                  className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${
                    isFinal
                      ? "bg-cs-accent/25 text-[#93C5FD] ring-1 ring-cs-accent/40"
                      : "bg-cs-alt text-cs-accent ring-1 ring-cs-accent/15"
                  }`}
                >
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <span
                  className={`font-mono text-[11px] tabular-nums tracking-[0.2em] ${
                    isFinal ? "text-cs-onink/45" : "text-cs-muted/70"
                  }`}
                >
                  0{index + 1}
                </span>
              </div>

              <div>
                <p
                  className={`font-body text-base font-semibold leading-snug tracking-tight sm:text-[1.05rem] ${
                    isFinal ? "text-white" : "text-cs-ink"
                  }`}
                >
                  {stage.label}
                </p>
                <p
                  className={`mt-2 text-sm leading-relaxed ${
                    isFinal ? "text-cs-onink/70" : "text-cs-ink/60"
                  }`}
                >
                  {stage.description}
                </p>
                <p
                  className={`mt-4 font-mono text-[10px] uppercase tracking-[0.16em] ${
                    isFinal ? "text-[#93C5FD]/70" : "text-cs-muted/80"
                  }`}
                >
                  {finePointer ? "Hover for more" : "Tap for more"}
                </p>
              </div>
            </div>

            {/* Back — shared rich cobalt for all four cards */}
            <div
              className={`${faceBase} ${BACK_FACE}`}
              style={{
                transform: "rotateY(180deg)",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                boxShadow:
                  "0 24px 48px -24px rgba(29,78,216,0.55), inset 0 1px 0 rgba(191,219,254,0.28)",
                backgroundImage:
                  "linear-gradient(145deg, #2563EB 0%, #1D4ED8 48%, #1E3A8A 100%)",
              }}
            >
              <div className="flex items-start justify-between gap-3">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/70">
                  Why it matters
                </span>
                <span className="font-mono text-[11px] tabular-nums tracking-[0.2em] text-white/45">
                  0{index + 1}
                </span>
              </div>

              <div>
                <p className="font-body text-base font-semibold leading-snug tracking-tight text-white sm:text-[1.05rem]">
                  {stage.label}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-white/90">
                  {stage.detail || stage.description}
                </p>
              </div>
            </div>
          </motion.button>
        </motion.div>
      </div>
    </motion.li>
  );
}

/**
 * MedEdge Challenge — compact 2×2 interactive 3D flip cards.
 * Auto-plays a one-time flip sequence when the section enters view.
 */
export default function MedEdgeChallengeFlow({ stages = [] }) {
  const reduceMotion = useReducedMotion();
  const rootRef = useRef(null);
  const startedRef = useRef(false);
  const [autoIndex, setAutoIndex] = useState(null);
  const [demoRunning, setDemoRunning] = useState(false);
  const [demoDone, setDemoDone] = useState(false);

  useEffect(() => {
    // Wait until preference is known; skip auto-play when reduced motion is on.
    if (reduceMotion === null || !stages.length) return undefined;

    if (reduceMotion) {
      setDemoDone(true);
      return undefined;
    }

    const root = rootRef.current;
    if (!root) return undefined;

    const controller = new AbortController();

    const runSequence = async () => {
      setDemoRunning(true);
      try {
        // Brief settle after enter before the first flip
        await wait(420, controller.signal);

        for (let i = 0; i < stages.length; i += 1) {
          setAutoIndex(i);
          await wait(FLIP_MS + HOLD_MS, controller.signal);
          setAutoIndex(null);
          await wait(
            FLIP_MS + (i < stages.length - 1 ? GAP_MS : 80),
            controller.signal
          );
        }
      } catch (err) {
        if (err?.name !== "AbortError") throw err;
      } finally {
        setAutoIndex(null);
        setDemoRunning(false);
        setDemoDone(true);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting || startedRef.current) return;
        startedRef.current = true;
        observer.disconnect();
        runSequence();
      },
      { threshold: 0.32, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(root);

    return () => {
      controller.abort();
      observer.disconnect();
    };
  }, [reduceMotion, stages.length]);

  if (!stages.length) return null;

  const interactive = Boolean(reduceMotion) || (demoDone && !demoRunning);

  return (
    <motion.ol
      ref={rootRef}
      className="relative grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-3.5"
      variants={container}
      initial={reduceMotion ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
    >
      {stages.map((stage, index) => (
        <FlipCard
          key={stage.label}
          stage={stage}
          index={index}
          autoFlipped={autoIndex === index}
          interactive={interactive}
          reduceMotion={Boolean(reduceMotion)}
        />
      ))}
    </motion.ol>
  );
}
