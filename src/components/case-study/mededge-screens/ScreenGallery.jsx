import React, { useCallback, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE, GALLERY, ME } from "./screenData";
import ScreenImage from "./ScreenImage";
import Lightbox from "./Lightbox";

/**
 * Editorial gallery of remaining high-fi screens + lightbox.
 */
export default function ScreenGallery() {
  const reduceMotion = useReducedMotion();
  const [hovered, setHovered] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const items = GALLERY;

  const open = (i) => setLightboxIndex(i);
  const close = () => setLightboxIndex(null);
  const prev = useCallback(() => {
    setLightboxIndex((i) =>
      i === null ? null : (i - 1 + items.length) % items.length
    );
  }, [items.length]);
  const next = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i + 1) % items.length));
  }, [items.length]);

  return (
    <section aria-labelledby="gallery-heading" className="w-full">
      <header className="mb-12 max-w-2xl">
        <p
          className="font-mono text-[12px] uppercase tracking-[0.2em]"
          style={{ color: ME.teal }}
        >
          Complete workflow
        </p>
        <h2
          id="gallery-heading"
          className="mt-4 font-body text-[clamp(1.85rem,3.4vw,2.75rem)] font-semibold leading-[1.1] tracking-tight"
          style={{ color: ME.navy }}
        >
          Explore the complete MedEdge workflow
        </h2>
      </header>

      <ul className="grid list-none grid-cols-1 gap-8 p-0 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-12">
        {items.map((item, i) => {
          const span =
            i === 0 || i === 5
              ? "lg:col-span-2"
              : i === 3
                ? "sm:col-span-2 lg:col-span-1"
                : "";
          const dimmed =
            hovered !== null && hovered !== item.slug && !reduceMotion;

          return (
            <motion.li
              key={item.slug}
              className={`min-w-0 ${span}`}
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.04, ease: EASE }}
            >
              <button
                type="button"
                onClick={() => open(i)}
                onMouseEnter={() => setHovered(item.slug)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(item.slug)}
                onBlur={() => setHovered(null)}
                className="group w-full text-left outline-none focus-visible:ring-2 focus-visible:ring-[#0EA8A7] focus-visible:ring-offset-4"
                aria-label={`Open ${item.title} fullscreen`}
                style={{
                  opacity: dimmed ? 0.7 : 1,
                  transition: "opacity 0.3s ease",
                }}
              >
                <div
                  className="overflow-hidden rounded-lg border transition-shadow duration-300"
                  style={{
                    backgroundColor: ME.bg,
                    borderColor: ME.pale,
                    boxShadow:
                      hovered === item.slug
                        ? "0 20px 40px -28px rgba(9,38,58,0.4)"
                        : "0 10px 24px -22px rgba(9,38,58,0.22)",
                  }}
                >
                  <div
                    className="origin-center p-2 transition-transform duration-300 sm:p-3"
                    style={{
                      transform:
                        hovered === item.slug && !reduceMotion
                          ? "scale(1.02)"
                          : "scale(1)",
                    }}
                  >
                    <ScreenImage
                      src={item.src}
                      alt={item.title}
                      width={item.width}
                      height={item.height}
                    />
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span
                    className="font-mono text-[10px] uppercase tracking-[0.16em]"
                    style={{ color: ME.teal }}
                  >
                    {item.category}
                  </span>
                  <span
                    className="font-body text-[15px] font-semibold tracking-tight"
                    style={{ color: ME.navy }}
                  >
                    {item.title}
                  </span>
                </div>
              </button>
            </motion.li>
          );
        })}
      </ul>

      {lightboxIndex !== null && (
        <Lightbox
          items={items}
          index={lightboxIndex}
          onClose={close}
          onPrev={prev}
          onNext={next}
        />
      )}
    </section>
  );
}
