import { useEffect, useRef } from "react";

/**
 * Portfolio player: muted autoplay with native controls.
 */
export default function DemoVideoPlayer({
  src,
  mutedSrc,
  poster,
  alt = "Product demo video",
}) {
  const videoRef = useRef(null);
  const videoSrc = mutedSrc || src;

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const play = el.play();
    if (play?.catch) play.catch(() => {});
  }, [videoSrc]);

  return (
    <figure className="w-full" style={{ margin: 0 }}>
      <div className="relative overflow-hidden rounded-2xl bg-[#0f172a] shadow-[0_20px_50px_-24px_rgba(64,18,22,0.35)]">
        <video
          ref={videoRef}
          className="aspect-video w-full bg-black object-cover"
          controls
          playsInline
          loop
          autoPlay
          muted
          preload="metadata"
          poster={poster || undefined}
          aria-label={alt}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      </div>
    </figure>
  );
}
