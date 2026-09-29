import React from "react";
import { motion, useReducedMotion } from "framer-motion";

function Chip({ label, tone = "before" }) {
  const styles =
    tone === "after"
      ? "bg-cs-accent text-white ring-1 ring-inset ring-white/30"
      : "bg-cs-border/70 text-cs-soft ring-1 ring-inset ring-white/70";
  return (
    <span
      className={`pointer-events-none absolute left-3 top-3 z-10 rounded-full px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] shadow-sm ${styles}`}
    >
      {label}
    </span>
  );
}

/**
 * Layered before/after showcase.
 * Before: parked upper-left, behind, slightly rotated.
 * After: lower-right, in front, straight, larger and more prominent.
 * Accent colors follow the active case-study theme tokens.
 */
export default function IterationShowcase({ items = [] }) {
  const reduceMotion = useReducedMotion();
  if (!items.length) return null;

  return (
    <div className="space-y-16 sm:space-y-24">
      {items.map((item, i) => (
        <motion.div
          key={item.title}
          className="grid items-center gap-8 lg:grid-cols-5 lg:gap-14"
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Images ~60% */}
          <div className="lg:col-span-3">
            <div className="group/iter relative mx-auto w-full max-w-[560px] lg:mx-0">
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-x-6 -inset-y-4 -z-10 rounded-[40%] bg-[radial-gradient(60%_60%_at_40%_35%,rgb(var(--cs-accent)/0.16),rgb(var(--cs-accent)/0.05)_55%,transparent_75%)] blur-2xl"
              />

              {/* spacer keeps the overlap area tall enough on desktop/tablet */}
              <div className="hidden sm:block" style={{ paddingBottom: "64%" }} />

              {/* Before — behind, upper-left, slight rotation */}
              {item.before && (
                <motion.figure
                  className="relative sm:absolute sm:left-0 sm:top-0 sm:w-[70%] lg:w-[72%] lg:-rotate-[2deg]"
                  style={{ margin: 0, zIndex: 1 }}
                  whileHover={
                    reduceMotion ? undefined : { x: -6, y: -6, scale: 0.98 }
                  }
                  transition={{ type: "spring", stiffness: 240, damping: 24 }}
                >
                  <div className="relative overflow-hidden rounded-2xl border-2 border-white bg-white shadow-[0_14px_34px_-22px_rgba(9,38,58,0.28)] ring-1 ring-black/5 transition-all duration-300 group-hover/iter:shadow-[0_20px_44px_-24px_rgba(9,38,58,0.36)]">
                    <Chip label="Before" tone="before" />
                    <img
                      src={item.before.src}
                      alt={item.before.alt || "Before"}
                      className="block h-auto w-full object-contain"
                      loading="lazy"
                      draggable={false}
                    />
                  </div>
                </motion.figure>
              )}

              {/* After — in front, lower-right, straight, larger */}
              {item.after && (
                <motion.figure
                  className="relative mt-4 sm:mt-0 sm:absolute sm:bottom-0 sm:right-0 sm:w-[82%] lg:w-[84%]"
                  style={{ margin: 0, zIndex: 3 }}
                  whileHover={reduceMotion ? undefined : { y: -10 }}
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                >
                  <div className="relative overflow-hidden rounded-2xl border-2 border-white bg-white shadow-[0_26px_58px_-24px_rgb(var(--cs-accent)/0.35),0_12px_26px_-16px_rgba(9,38,58,0.28)] ring-1 ring-cs-accent/15 transition-all duration-300 group-hover/iter:shadow-[0_36px_72px_-22px_rgb(var(--cs-accent)/0.42),0_16px_32px_-16px_rgba(9,38,58,0.32)]">
                    <Chip label="After" tone="after" />
                    <img
                      src={item.after.src}
                      alt={item.after.alt || "After"}
                      className="block h-auto w-full object-contain"
                      loading="lazy"
                      draggable={false}
                    />
                  </div>
                </motion.figure>
              )}
            </div>
          </div>

          {/* Text ~40% */}
          <div className="flex flex-col justify-center lg:col-span-2">
            <span className="mb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-cs-accent">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="font-display text-xl font-semibold text-cs-ink sm:text-2xl">
              {item.title}
            </h3>
            {item.description && (
              <p className="mt-3 max-w-md leading-relaxed text-cs-ink/75">
                {item.description}
              </p>
            )}
            {item.note && (
              <p className="mt-4 max-w-md text-sm leading-relaxed text-cs-ink/60">
                <span className="font-semibold text-cs-accent">
                  What changed:
                </span>{" "}
                {item.note}
              </p>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
