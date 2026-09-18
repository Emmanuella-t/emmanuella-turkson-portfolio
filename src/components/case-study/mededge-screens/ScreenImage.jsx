import React from "react";

/** Sharp Figma export — never stretch beyond natural size. */
export default function ScreenImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className = "",
}) {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      draggable={false}
      className={`mx-auto block h-auto max-w-full object-contain select-none ${
        className.includes("w-") ? "" : "w-full"
      } ${className}`}
    />
  );
}
