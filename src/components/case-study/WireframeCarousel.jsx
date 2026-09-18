import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const AUTO_MS = 2750;
const RESUME_MS = 4500;

export default function WireframeCarousel({
  slides = [],
  ariaLabel = "Wireframe gallery",
}) {
  const total = slides.length;
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const stageRef = useRef(null);
  const dragStartX = useRef(null);
  const isDragging = useRef(false);
  const pausedRef = useRef(false);
  const resumeTimerRef = useRef(null);
  const indexRef = useRef(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const goTo = useCallback(
    (next) => {
      if (total === 0) return;
      setIndex(((next % total) + total) % total);
    },
    [total]
  );

  const goPrev = useCallback(() => goTo(indexRef.current - 1), [goTo]);
  const goNext = useCallback(() => goTo(indexRef.current + 1), [goTo]);

  const pauseAutoplay = useCallback(() => {
    pausedRef.current = true;
    if (resumeTimerRef.current) {
      window.clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = null;
    }
  }, []);

  const scheduleResume = useCallback(() => {
    if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = window.setTimeout(() => {
      pausedRef.current = false;
      resumeTimerRef.current = null;
    }, RESUME_MS);
  }, []);

  const interact = useCallback(
    (action) => {
      pauseAutoplay();
      action?.();
      scheduleResume();
    },
    [pauseAutoplay, scheduleResume]
  );

  useEffect(() => {
    if (total < 2 || reduceMotion) return undefined;

    const id = window.setInterval(() => {
      if (pausedRef.current || isDragging.current) return;
      goNext();
    }, AUTO_MS);

    return () => window.clearInterval(id);
  }, [total, reduceMotion, goNext]);

  useEffect(() => {
    return () => {
      if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current);
    };
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") interact(goPrev);
      if (e.key === "ArrowRight") interact(goNext);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goPrev, goNext, interact]);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    let locked = false;
    const onWheel = (e) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      if (Math.abs(e.deltaX) < 18) return;
      e.preventDefault();
      if (locked) return;
      locked = true;
      interact(() => {
        if (e.deltaX > 0) goNext();
        else goPrev();
      });
      window.setTimeout(() => {
        locked = false;
      }, 420);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [goNext, goPrev, interact]);

  const onPointerDown = (e) => {
    dragStartX.current = e.clientX ?? e.touches?.[0]?.clientX ?? null;
    isDragging.current = true;
    pauseAutoplay();
  };

  const onPointerUp = (e) => {
    isDragging.current = false;
    if (dragStartX.current == null) {
      scheduleResume();
      return;
    }
    const endX = e.clientX ?? e.changedTouches?.[0]?.clientX ?? dragStartX.current;
    const delta = endX - dragStartX.current;
    dragStartX.current = null;
    if (Math.abs(delta) >= 48) {
      if (delta > 0) goPrev();
      else goNext();
    }
    scheduleResume();
  };

  if (!total) return null;

  const counter = `${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
  const peek = isMobile ? 72 : 52;
  const activeSlide = slides[index];
  const activeLabel = activeSlide?.label;
  const activeDescription = activeSlide?.description;

  return (
    <div
      className="relative w-full select-none"
      onMouseEnter={() => {
        setHovered(true);
        pauseAutoplay();
      }}
      onMouseLeave={() => {
        setHovered(false);
        scheduleResume();
      }}
    >
      <div className="mb-5 flex items-center justify-between gap-4 px-1 sm:mb-6">
        <p className="font-mono text-xs tracking-[0.18em] text-[#9C7961]">{counter}</p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => interact(goPrev)}
            aria-label="Previous slide"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D5BCAD]/60 bg-white/80 text-[#63333A] shadow-sm transition-colors hover:border-[#63333A] hover:bg-[#FFEDDA]"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => interact(goNext)}
            aria-label="Next slide"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D5BCAD]/60 bg-white/80 text-[#63333A] shadow-sm transition-colors hover:border-[#63333A] hover:bg-[#FFEDDA]"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div
        ref={stageRef}
        className="relative w-full touch-pan-y overflow-x-hidden overflow-y-visible"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onTouchStart={onPointerDown}
        onTouchEnd={onPointerUp}
        role="region"
        aria-roledescription="carousel"
        aria-label={ariaLabel}
      >
        <div
          className="relative mx-auto flex w-full items-center justify-center"
          style={{
            height: "min(60vh, 520px)",
            minHeight: isMobile ? 240 : 360,
            maxHeight: "60vh",
          }}
        >
          <div
            aria-hidden
            className={`pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[55%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(156,121,97,0.22)_0%,rgba(255,237,218,0.35)_42%,transparent_70%)] transition-opacity duration-[350ms] ease-out ${
              hovered ? "opacity-100" : "opacity-40"
            }`}
          />

          {slides.map((slide, i) => {
            let offset = i - index;
            if (offset > total / 2) offset -= total;
            if (offset < -total / 2) offset += total;

            const isActive = offset === 0;
            const abs = Math.abs(offset);
            if (abs > 2) return null;

            const baseScale = isActive ? 1 : abs === 1 ? 0.86 : 0.74;
            const hoverScale = isActive && hovered ? 1.025 : baseScale;
            const opacity = isActive ? 1 : abs === 1 ? 0.4 : 0.18;

            return (
              <motion.div
                key={slide.src}
                className="absolute left-1/2 top-1/2 flex w-[86%] max-w-[860px] cursor-grab items-center justify-center active:cursor-grabbing sm:w-[68%] lg:w-[62%]"
                style={{ zIndex: 30 - abs }}
                initial={false}
                animate={{
                  // Right-to-left advance: next enters from the right (positive offset)
                  x: `calc(-50% + ${offset * peek}%)`,
                  y: isActive && hovered ? "calc(-50% - 8px)" : "-50%",
                  scale: hoverScale,
                  opacity: isActive ? 1 : opacity,
                }}
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : {
                        type: "tween",
                        duration: 0.55,
                        ease: [0.22, 1, 0.36, 1],
                      }
                }
                onClick={() => {
                  if (!isActive) interact(() => goTo(i));
                }}
              >
                <div
                  className={`relative flex h-full w-full items-center justify-center overflow-visible rounded-[1.15rem] bg-white transition-[box-shadow,filter] duration-[350ms] ease-out ${
                    isActive && hovered
                      ? "shadow-[0_24px_60px_rgba(70,35,35,0.14)]"
                      : isActive
                        ? "shadow-[0_20px_50px_-24px_rgba(64,18,22,0.35),0_8px_20px_-12px_rgba(64,18,22,0.18)]"
                        : "shadow-[0_12px_32px_-20px_rgba(64,18,22,0.28)]"
                  }`}
                  style={{
                    filter:
                      isActive && hovered && !reduceMotion
                        ? "contrast(1.02)"
                        : "none",
                  }}
                >
                  <img
                    src={slide.src}
                    alt={slide.alt || slide.label}
                    className="pointer-events-none mx-auto block w-auto max-w-full object-contain"
                    style={{
                      width: "auto",
                      maxWidth: "100%",
                      height: "auto",
                      maxHeight: "60vh",
                      objectFit: "contain",
                      display: "block",
                      opacity: 1,
                    }}
                    draggable={false}
                    loading={abs <= 1 ? "eager" : "lazy"}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="mx-auto mt-5 max-w-xl px-1 text-center sm:mt-6">
        <p
          className={`font-mono text-[11px] uppercase tracking-[0.22em] transition-colors duration-300 ${
            hovered ? "text-[#63333A]" : "text-[#9C7961]"
          }`}
        >
          {activeLabel}
        </p>
        {activeDescription && (
          <p className="mt-2 text-sm leading-relaxed text-[#401216]/70">
            {activeDescription}
          </p>
        )}
      </div>

      <div
        className="mt-4 flex items-center justify-center gap-2 sm:mt-5"
        role="tablist"
        aria-label="Carousel slides"
      >
        {slides.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Show ${slide.label}`}
            onClick={() => interact(() => goTo(i))}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === index
                ? "w-8 bg-[#63333A]"
                : "w-1.5 bg-[#D5BCAD] hover:bg-[#9C7961]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
