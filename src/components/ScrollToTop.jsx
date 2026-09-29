import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Scrolls to the top on every route pathname change.
 * Same-page hash/anchor links are left alone so intentional section jumps still work.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (typeof window === "undefined" || !("scrollRestoration" in window.history)) {
      return undefined;
    }
    const previous = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    return () => {
      window.history.scrollRestoration = previous;
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Preserve intentional in-page anchors (e.g. /work#projects).
    if (hash) {
      const id = decodeURIComponent(hash.replace(/^#/, ""));
      if (!id) return;
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView();
      });
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, hash]);

  return null;
}
