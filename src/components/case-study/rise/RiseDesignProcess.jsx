import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Lightbox from "../mededge-screens/Lightbox";

const EASE = [0.22, 1, 0.36, 1];

const SRC =
  "/case-studies/synchrony_rise_case_stucy/assets/09_design_process/rise-design-process.jpg";

const PROCESS = {
  title: "Rise design process",
  src: SRC,
  width: 1024,
  height: 576,
};

function Reveal({ children, className = "", delay = 0 }) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

export default function RiseDesignProcess() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Reveal className="mx-auto w-[min(100%,95vw)] max-w-[1400px] px-3 sm:px-4">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="group block w-full cursor-zoom-in focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#14181F]"
          aria-label="Open design process diagram full screen"
        >
          <img
            src={PROCESS.src}
            alt="Rise design process — Discover, Define, Map, Sketch, Design, Prototype, and Refine"
            width={PROCESS.width}
            height={PROCESS.height}
            loading="lazy"
            decoding="async"
            draggable={false}
            className="mx-auto h-auto w-full object-contain transition-opacity duration-300 group-hover:opacity-[0.97]"
          />
        </button>
      </Reveal>

      {open && (
        <Lightbox
          theme="rise"
          items={[
            {
              title: PROCESS.title,
              src: PROCESS.src,
              width: PROCESS.width,
              height: PROCESS.height,
            },
          ]}
          index={0}
          onClose={() => setOpen(false)}
          onPrev={() => {}}
          onNext={() => {}}
        />
      )}
    </>
  );
}
