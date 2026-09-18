import React from "react";

export default function MediaPlaceholder({ label, aspect = "video" }) {
  const aspectClass =
    aspect === "square"
      ? "aspect-square"
      : aspect === "portrait"
        ? "aspect-[3/4]"
        : "aspect-video";

  return (
    <div
      className={`flex w-full items-center justify-center rounded-2xl border border-dashed border-cs-muted/50 bg-cs-alt/60 px-6 py-10 text-center ${aspectClass}`}
      role="img"
      aria-label={label}
    >
      <p className="max-w-md font-mono text-xs leading-relaxed text-cs-soft sm:text-sm">
        {label}
      </p>
    </div>
  );
}
