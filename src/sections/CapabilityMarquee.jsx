import React, { useEffect, useRef, useState } from "react";
import { motion, animate, useMotionValue, useReducedMotion } from "framer-motion";

const ITEMS = [
  "SOFTWARE ENGINEERING",
  "ML / AI",
  "PRODUCT DESIGN",
  "UX RESEARCH",
  "FRONT-END DEVELOPMENT",
  "PROTOTYPING",
  "HUMAN-CENTERED TECHNOLOGY",
];

/**
 * Full-width capability marquee under the hero.
 * Seamless loop; pauses on hover; static for reduced motion.
 */
export default function CapabilityMarquee() {
  const reduceMotion = useReducedMotion();
  const trackRef = useRef(null);
  const x = useMotionValue(0);
  const [segmentWidth, setSegmentWidth] = useState(0);
  const [paused, setPaused] = useState(false);
  const controlsRef = useRef(null);

  useEffect(() => {
    if (!trackRef.current) return;
    const measure = () => {
      // First half of duplicated content
      setSegmentWidth(trackRef.current.scrollWidth / 2);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    if (reduceMotion || !segmentWidth) return undefined;

    controlsRef.current?.stop();
    if (paused) return undefined;

    controlsRef.current = animate(x, [0, -segmentWidth], {
      duration: Math.max(28, segmentWidth / 40),
      ease: "linear",
      repeat: Infinity,
      repeatType: "loop",
    });

    return () => controlsRef.current?.stop();
  }, [segmentWidth, paused, reduceMotion, x]);

  const row = (keyPrefix) =>
    ITEMS.map((item, i) => (
      <React.Fragment key={`${keyPrefix}-${item}`}>
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#FFEDAD]/75 sm:text-xs">
          {item}
        </span>
        <span
          aria-hidden
          className="mx-5 inline-block h-1 w-1 rounded-full bg-[#BC7821]/70 sm:mx-8"
        />
      </React.Fragment>
    ));

  if (reduceMotion) {
    return (
      <div className="border-y border-[#3A1A10] bg-[#240E08] py-4">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-6 gap-y-2 px-4">
          {ITEMS.map((item) => (
            <span
              key={item}
              className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#FFEDAD]/75"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative overflow-hidden border-y border-[#3A1A10] bg-[#240E08] py-4"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Areas of focus"
    >
      <motion.div
        ref={trackRef}
        style={{ x }}
        className="flex w-max whitespace-nowrap will-change-transform"
      >
        <div className="flex items-center px-2">{row("a")}</div>
        <div className="flex items-center px-2" aria-hidden>
          {row("b")}
        </div>
      </motion.div>
      {/* Soft edge fades so words never feel harshly cut */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[#240E08] to-transparent sm:w-20"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#240E08] to-transparent sm:w-20"
      />
    </div>
  );
}
