import React, { useEffect, useId, useRef } from "react";
import ScreenImage from "./ScreenImage";

/**
 * Accessible full-screen lightbox for gallery screens and SVG artifacts.
 * theme: "mededge" (default) | "rise"
 * svgDisplay: "contain" (default) | "scroll" — scroll keeps the artifact readable
 * instead of shrinking a tall or wide board to the viewport.
 */
export default function Lightbox({
  items,
  index,
  onClose,
  onPrev,
  onNext,
  theme = "mededge",
  svgDisplay = "contain",
}) {
  const item = items[index];
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const titleId = useId();
  const showNav = items.length > 1;
  const isSvg =
    item?.kind === "svg" || /\.svg($|\?)/i.test(String(item?.src || ""));
  const isRise = theme === "rise";
  const scrollBoard = svgDisplay === "scroll";
  const ring = isRise
    ? "focus-visible:ring-[#FFC500]"
    : "focus-visible:ring-[#2FCFAE]";

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (showNav && e.key === "ArrowLeft") onPrev();
      if (showNav && e.key === "ArrowRight") onNext();
      if (e.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll(
          'button, [href], [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, onPrev, onNext, showNav]);

  if (!item) return null;

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-6 md:p-8"
      style={{ backgroundColor: isRise ? "rgba(20,22,26,0.94)" : "rgba(9,38,58,0.92)" }}
      onClick={onClose}
    >
      <div
        className={`relative flex max-h-[94vh] w-full flex-col ${scrollBoard ? "max-w-[96vw]" : "max-w-7xl"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-3 flex items-center justify-between gap-4 sm:mb-4">
          <p
            id={titleId}
            className="font-body text-base font-semibold tracking-tight text-white sm:text-lg"
          >
            {item.title}
          </p>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close lightbox"
            className={`rounded-full border border-white/25 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-white outline-none focus-visible:ring-2 ${ring}`}
          >
            Close
          </button>
        </div>

        <div
          className={`min-h-0 flex-1 rounded-lg p-2 sm:p-4 ${
            scrollBoard ? "overflow-auto" : "overflow-hidden"
          } ${isRise ? "bg-[#14161A]" : "bg-[#0B2F46]/40"}`}
        >
          {isSvg ? (
            <img
              src={item.src}
              alt={item.title}
              width={item.width}
              height={item.height}
              decoding="async"
              draggable={false}
              className={`block h-auto object-contain select-none ${
                scrollBoard
                  ? "max-w-none"
                  : "mx-auto max-h-[80vh] max-w-full"
              }`}
              style={
                scrollBoard
                  ? { width: item.width, maxWidth: "none" }
                  : { width: "auto", maxWidth: "100%" }
              }
            />
          ) : (
            <ScreenImage
              src={item.src}
              alt={item.title}
              width={item.width}
              height={item.height}
              priority
              className={
                scrollBoard
                  ? "w-full max-w-full"
                  : isRise
                    ? "max-h-[80vh] w-auto max-w-full"
                    : "w-full max-w-full"
              }
            />
          )}
        </div>

        {showNav && (
          <div className="mt-4 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={onPrev}
              aria-label="Previous screen"
              className={`rounded-full border border-white/25 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-white outline-none focus-visible:ring-2 ${ring}`}
            >
              Previous
            </button>
            <p className={`font-mono text-[11px] tabular-nums tracking-[0.16em] ${isRise ? "text-white/60" : "text-[#DCE8EB]"}`}>
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(items.length).padStart(2, "0")}
            </p>
            <button
              type="button"
              onClick={onNext}
              aria-label="Next screen"
              className={`rounded-full border border-white/25 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-white outline-none focus-visible:ring-2 ${ring}`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
