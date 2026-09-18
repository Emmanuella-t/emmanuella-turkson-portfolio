import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

const DEVICES = {
  desktop: {
    src: "/case-studies/mededge-hero-desktop.png",
    alt: "MedEdge dashboard on a desktop monitor",
    className:
      "absolute left-[6%] top-[0%] z-[1] w-[90%] origin-center md:left-[8%] md:w-[88%]",
    // Cap at the asset's native pixel width so it is never upscaled past its usable resolution.
    maxWidth: 861,
    rotate: 2,
    enter: { x: 72, y: 16 },
    floatAmp: 8,
    floatDuration: 6.5,
    floatDelay: 0.15,
    shadow:
      "drop-shadow(0 28px 40px rgba(0, 20, 60, 0.45)) drop-shadow(0 0 24px rgba(37, 99, 235, 0.22))",
  },
  tabletAi: {
    src: "/case-studies/mededge-hero-tablet-ai.png",
    alt: "MedEdge AI Suggestions on a tablet",
    className:
      "absolute bottom-[-2%] left-[-2%] z-[3] w-[44%] max-w-[320px] origin-bottom-left sm:left-[-4%] sm:w-[42%] sm:max-w-[340px]",
    rotate: -3,
    enter: { x: -56, y: 64 },
    floatAmp: 6,
    floatDuration: 7.2,
    floatDelay: 0.55,
    shadow:
      "drop-shadow(0 22px 28px rgba(0, 20, 60, 0.4)) drop-shadow(0 0 18px rgba(37, 99, 235, 0.2))",
  },
  tabletPatient: {
    src: "/case-studies/mededge-hero-tablet-patient.png",
    alt: "MedEdge Add Patient Data on a tablet",
    className:
      "absolute bottom-[-4%] right-[-1%] z-[2] w-[46%] max-w-[340px] origin-bottom-right sm:right-[-2%] sm:w-[44%] sm:max-w-[360px]",
    rotate: 3,
    enter: { x: 56, y: 64 },
    floatAmp: 10,
    floatDuration: 8,
    floatDelay: 1.1,
    shadow:
      "drop-shadow(0 22px 28px rgba(0, 20, 60, 0.4)) drop-shadow(0 0 18px rgba(37, 99, 235, 0.2))",
  },
};

/**
 * Entrance, then a very subtle perpetual float (off when reduced-motion).
 */
function FloatingDevice({ config, delay, reduceMotion }) {
  const [floating, setFloating] = useState(false);

  return (
    <motion.div
      className={`${config.className} overflow-visible`}
      style={{ maxWidth: config.maxWidth }}
      initial={
        reduceMotion
          ? false
          : { opacity: 0, x: config.enter.x, y: config.enter.y, rotate: config.rotate }
      }
      animate={
        reduceMotion
          ? { opacity: 1, x: 0, y: 0, rotate: config.rotate }
          : floating
            ? {
                opacity: 1,
                x: 0,
                y: [0, -config.floatAmp, 0],
                rotate: config.rotate,
              }
            : { opacity: 1, x: 0, y: 0, rotate: config.rotate }
      }
      transition={
        reduceMotion
          ? { duration: 0 }
          : floating
            ? {
                y: {
                  duration: config.floatDuration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: config.floatDelay,
                },
              }
            : { duration: 0.9, delay, ease: EASE }
      }
      onAnimationComplete={() => {
        if (!reduceMotion && !floating) setFloating(true);
      }}
    >
      <img
        src={config.src}
        alt={config.alt}
        draggable={false}
        className="pointer-events-none block h-auto w-full select-none object-contain"
        style={{ filter: config.shadow }}
      />
    </motion.div>
  );
}

/**
 * Cinematic MedEdge case-study hero — three layered transparent devices
 * on a navy-to-electric-blue field with editorial left copy.
 */
export default function MedEdgeHero({
  eyebrow = "UI/UX CASE STUDY",
  title = "MedEdge",
  tagline = "Intelligence that supports better care.",
  meta = ["Healthcare AI", "Product Designer", "2024"],
}) {
  const reduceMotion = useReducedMotion();
  const match = title.match(/^(Med)(Edge)$/i);
  const med = match ? match[1] : title;
  const edge = match ? match[2] : "";

  return (
    <section className="relative min-h-[100vh] overflow-hidden bg-[#06102A]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 72% 48%, rgba(37,99,235,0.45) 0%, transparent 58%), linear-gradient(135deg, #040B1C 0%, #0A1A3A 42%, #1238A0 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[8%] top-[18%] h-[70%] w-[55%] rounded-full bg-[radial-gradient(circle,rgba(96,165,250,0.28)_0%,transparent_68%)] blur-3xl"
      />

      <div className="relative z-10 mx-auto flex min-h-[100vh] w-full max-w-7xl flex-col justify-center gap-10 overflow-visible px-4 py-16 sm:px-6 lg:flex-row lg:items-center lg:gap-8 lg:px-8 lg:py-20">
        {/* Left copy ~38% */}
        <div className="w-full shrink-0 lg:w-[38%]">
          <motion.p
            className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#93C5FD]"
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            {eyebrow}
          </motion.p>

          <motion.h1
            className="mt-5 font-display text-[clamp(3.25rem,8vw,5.75rem)] font-semibold leading-[0.92] tracking-tight"
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.08, ease: EASE }}
          >
            <span className="text-white">{med}</span>
            {edge ? <span className="text-[#3B82F6]">{edge}</span> : null}
          </motion.h1>

          <motion.p
            className="mt-5 max-w-sm font-body text-lg leading-relaxed text-white/75 sm:text-xl"
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.16, ease: EASE }}
          >
            {tagline}
          </motion.p>

          <motion.ul
            className="mt-8 flex flex-wrap gap-x-5 gap-y-2"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.24, ease: EASE }}
          >
            {meta.map((item) => (
              <li
                key={item}
                className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#93C5FD]/90"
              >
                {item}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Device composition ~62% */}
        <div className="relative w-full overflow-visible pb-10 lg:w-[62%] lg:pb-0">
          {/* md+: layered composition */}
          <div className="relative mx-auto hidden aspect-[16/12] w-full max-w-[720px] overflow-visible md:block lg:max-w-none">
            <FloatingDevice
              config={DEVICES.desktop}
              delay={0.2}
              reduceMotion={reduceMotion}
            />
            <FloatingDevice
              config={DEVICES.tabletAi}
              delay={0.38}
              reduceMotion={reduceMotion}
            />
            <FloatingDevice
              config={DEVICES.tabletPatient}
              delay={0.52}
              reduceMotion={reduceMotion}
            />
          </div>

          {/* Mobile: stacked, readable */}
          <div className="flex flex-col items-center gap-6 md:hidden">
            <motion.img
              src={DEVICES.desktop.src}
              alt={DEVICES.desktop.alt}
              className="w-full max-w-md object-contain"
              style={{ filter: DEVICES.desktop.shadow }}
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE }}
            />
            <div className="grid w-full max-w-md grid-cols-2 gap-3">
              <motion.img
                src={DEVICES.tabletAi.src}
                alt={DEVICES.tabletAi.alt}
                className="w-full object-contain"
                style={{ filter: DEVICES.tabletAi.shadow }}
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.12, ease: EASE }}
              />
              <motion.img
                src={DEVICES.tabletPatient.src}
                alt={DEVICES.tabletPatient.alt}
                className="w-full object-contain"
                style={{ filter: DEVICES.tabletPatient.shadow }}
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
