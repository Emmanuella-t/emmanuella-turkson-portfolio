import React from "react";

/**
 * Shared MedEdge wrapper for sections 03–05.
 * Stethoscope earpieces sit ~1.5in to the right of the “What I owned” intro copy,
 * with tubing flowing diagonally behind the ownership cards.
 */
export default function MedEdgeStethoscopeBand({ children }) {
  return (
    <div
      className="relative bg-cs-bg"
      style={{ position: "relative", overflow: "visible" }}
    >
      {/* Decorative stethoscope layer */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] hidden overflow-visible md:block"
      >
        <img
          src="/case-studies/mededge-stethoscope.png"
          alt=""
          draggable={false}
          className="absolute top-2 select-none opacity-[0.26] lg:top-0 lg:opacity-[0.3]"
          style={{
            /* Shell start + intro paragraph width (max-w-lg) + 1.5in − image width
               so the earpieces (top-right of the asset) sit just past the copy. */
            left: "calc(max(clamp(16px, 4vw, 48px), 50% - 640px) + 32rem + 2.15in - min(700px, 56vw))",
            width: "min(700px, 56vw)",
            height: "auto",
            maxWidth: "none",
            filter:
              "contrast(1.12) saturate(1.15) drop-shadow(0 18px 40px rgba(10,26,58,0.18))",
          }}
        />
      </div>

      {/* All section content stacks above the illustration */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
