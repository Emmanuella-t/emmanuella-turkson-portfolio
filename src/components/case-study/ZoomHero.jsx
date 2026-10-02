import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

const ASSETS = {
  avatar: "/case-studies/zoom/zoom-hero-section-ai-signlanguage-image.png",
  taylor: "/case-studies/zoom/zoom-hero-section-image2.png",
  martinez: "/case-studies/zoom/zoom-hero-section-image3.png",
  caption: "/case-studies/zoom/zoom-hero-section-image4.png",
  alex: "/case-studies/zoom/zoom-hero-section-image5.png",
  controls: "/case-studies/zoom/zoom-hero-section-image6.png",
};

/**
 * Positions are percentages of the visual stage.
 * PNG canvases include transparent padding, so widths are larger than the
 * visible tile so the opaque artwork lands in the requested size range.
 */
const LAYERS = [
  {
    key: "taylor",
    src: ASSETS.taylor,
    alt: "Taylor Brooks in the meeting",
    width: 1536,
    height: 1024,
    style: { width: "31%", left: "0%", top: "23%", zIndex: 2 },
    initial: { opacity: 0, y: 12 },
    transition: { duration: 0.7, delay: 0.22, ease: EASE },
  },
  {
    key: "avatar",
    src: ASSETS.avatar,
    alt: "AI sign language avatar signing in the main meeting window",
    width: 1578,
    height: 996,
    style: { width: "68%", left: "12%", top: "6%", zIndex: 3 },
    initial: { opacity: 0, scale: 0.97 },
    transition: { duration: 0.85, delay: 0.08, ease: EASE },
  },
  {
    key: "alex",
    src: ASSETS.alex,
    alt: "Alex Kim in the meeting",
    width: 1330,
    height: 1182,
    style: { width: "23.5%", left: "72%", top: "0%", zIndex: 4 },
    initial: { opacity: 0, y: 8 },
    transition: { duration: 0.65, delay: 0.3, ease: EASE },
  },
  {
    key: "martinez",
    src: ASSETS.martinez,
    alt: "Dr. Martinez in the meeting",
    width: 1536,
    height: 1024,
    style: { width: "26%", left: "71%", top: "27%", zIndex: 4 },
    initial: { opacity: 0, y: 8 },
    transition: { duration: 0.65, delay: 0.38, ease: EASE },
  },
  {
    key: "caption",
    src: ASSETS.caption,
    alt: "Live caption: That’s a great point. I completely agree.",
    width: 1536,
    height: 1024,
    style: { width: "42%", left: "1%", top: "-6%", zIndex: 6 },
    initial: { opacity: 0 },
    transition: { duration: 0.7, delay: 0.42, ease: EASE },
  },
  {
    key: "controls",
    src: ASSETS.controls,
    alt: "Meeting controls with Sign Language selected",
    width: 2172,
    height: 724,
    style: { width: "84%", left: "16%", top: "38%", zIndex: 8 },
    initial: { opacity: 0, y: 16 },
    transition: { duration: 0.75, delay: 0.28, ease: EASE },
  },
];

export default function ZoomHero() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="zoom-hero relative isolate"
      style={{
        backgroundColor: "#06142F",
        backgroundImage: [
          "radial-gradient(ellipse 46% 42% at 82% 38%, rgba(45, 140, 255, 0.22), transparent 68%)",
          "radial-gradient(ellipse 34% 30% at 68% 72%, rgba(11, 92, 255, 0.16), transparent 70%)",
          "linear-gradient(102deg, #06142F 0%, #06142F 34%, #0A2458 62%, #1265EA 100%)",
        ].join(", "),
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(6, 20, 47, 0.55) 0%, rgba(6, 20, 47, 0.2) 38%, transparent 58%)",
        }}
      />

      <div className="relative mx-auto flex w-full max-w-[1680px] flex-col items-center gap-12 px-5 py-16 sm:gap-14 sm:px-8 sm:py-20 min-[1200px]:min-h-[max(820px,100svh)] min-[1200px]:grid min-[1200px]:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] min-[1200px]:items-center min-[1200px]:gap-4 min-[1200px]:py-8 min-[1200px]:pl-[clamp(3.5rem,5.5vw,6.5rem)] min-[1200px]:pr-0">
        <motion.div
          className="w-full max-w-[34rem] min-w-0 md:max-w-[26rem] min-[1200px]:max-w-[32rem]"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.7, ease: EASE }}
        >
          <p
            className="mb-5 text-[0.72rem] font-semibold uppercase tracking-[0.22em] sm:mb-6"
            style={{ fontFamily: "Inter, system-ui, sans-serif", color: "#9BB6E8" }}
          >
            UI / UX Case Study
          </p>
          <h1
            className="font-display text-[clamp(3.15rem,8.4vw,4.6rem)] font-normal tracking-[-0.03em] text-white md:text-[clamp(3rem,3.5vw,4.4rem)] min-[1200px]:text-[clamp(4.6rem,5.15vw,6.35rem)]"
            style={{
              fontFamily: '"DM Serif Display", Georgia, serif',
              fontWeight: 400,
              lineHeight: 0.92,
            }}
          >
            <span className="block text-white">Zoom</span>
            <span
              className="mt-1 block"
              style={{
                backgroundImage: "linear-gradient(180deg, #E7F1FF 0%, #8EBEFF 48%, #3D8DFF 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Accessibility
            </span>
          </h1>
          <p
            className="mt-6 max-w-[22rem] text-[1.02rem] leading-relaxed sm:mt-7 sm:text-lg min-[1200px]:mt-8 min-[1200px]:max-w-[24rem] min-[1200px]:text-[1.2rem]"
            style={{ fontFamily: "Inter, system-ui, sans-serif", color: "rgba(255,255,255,0.88)" }}
          >
            Bringing sign language interpretation
            <br />
            directly into the meeting experience.
          </p>
          <p
            className="mt-7 text-[0.68rem] font-medium uppercase tracking-[0.16em] sm:mt-8 min-[1200px]:mt-10"
            style={{ fontFamily: "Inter, system-ui, sans-serif", color: "rgba(214, 226, 255, 0.72)" }}
          >
            Product Design
            <span aria-hidden="true" className="px-2">
              ·
            </span>
            Accessibility
            <span aria-hidden="true" className="px-2">
              ·
            </span>
            AI
            <span aria-hidden="true" className="px-2">
              ·
            </span>
            2026
          </p>
        </motion.div>

        <div className="relative w-full min-w-0 md:w-auto">
          <div className="relative mx-auto aspect-[1000/760] w-full max-w-[680px] sm:max-w-[760px] min-[1200px]:mx-0 min-[1200px]:max-w-none">
            {LAYERS.map((layer) => (
              <motion.div
                key={layer.key}
                className={`absolute ${layer.key === "martinez" ? "max-[420px]:hidden" : ""}`}
                style={layer.style}
                initial={reduceMotion ? false : layer.initial}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={reduceMotion ? { duration: 0 } : layer.transition}
              >
                <img
                  src={layer.src}
                  alt={layer.alt}
                  width={layer.width}
                  height={layer.height}
                  draggable="false"
                  className="pointer-events-none block h-auto w-full select-none"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
