import React from "react";
import { ME } from "./screenData";

/** Vertical or horizontal step progress. */
export default function ProgressNav({
  total,
  active,
  onSelect,
  orientation = "vertical",
  labelPrefix = "Screen",
}) {
  const isVertical = orientation === "vertical";

  return (
    <div
      className={
        isVertical
          ? "flex flex-col items-center gap-3"
          : "flex items-center gap-2"
      }
      role="tablist"
      aria-label="Screen progress"
    >
      {Array.from({ length: total }).map((_, i) => {
        const isActive = i === active;
        return (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-label={`${labelPrefix} ${i + 1} of ${total}`}
            onClick={() => onSelect?.(i)}
            className="rounded-full outline-none transition-transform focus-visible:ring-2 focus-visible:ring-[#0EA8A7] focus-visible:ring-offset-2"
            style={{
              width: isActive ? 10 : 7,
              height: isActive ? 10 : 7,
              backgroundColor: isActive ? ME.teal : ME.pale,
              transform: isActive ? "scale(1.05)" : "scale(1)",
            }}
          />
        );
      })}
    </div>
  );
}
