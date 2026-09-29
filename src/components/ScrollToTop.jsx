import { useLayoutEffect, useEffect } from "react";
import { useLocation } from "react-router-dom";

function disableBrowserScrollRestoration() {
  if (typeof window === "undefined") return;
  if ("scrollRestoration" in window.history) {
    window.history.scrollRestoration = "manual";
  }
}

/** Instant jump to the top of the document (no smooth scrolling). */
function scrollWindowToTop() {
  if (typeof window === "undefined") return;

  const topLeft = { top: 0, left: 0 };

  try {
    window.scrollTo({ ...topLeft, behavior: "instant" });
  } catch {
    window.scrollTo(topLeft.top, topLeft.left);
  }

  // Fallback for engines that ignore window.scrollTo in some layouts.
  if (typeof document !== "undefined") {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }
}

function scrollToHash(hash) {
  const id = decodeURIComponent(String(hash || "").replace(/^#/, ""));
  if (!id || typeof document === "undefined") return false;
  const el = document.getElementById(id);
  if (!el) return false;
  el.scrollIntoView();
  return true;
}

// Run as early as this module loads so the browser does not restore mid-page
// scroll before the first React effect.
disableBrowserScrollRestoration();

/**
 * Global route scroll restoration for the whole portfolio.
 * Pathname changes always open at the top. Hash links still jump to sections.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    disableBrowserScrollRestoration();
  }, []);

  // Before paint: correct the scroll position as soon as the route updates.
  useLayoutEffect(() => {
    if (hash) {
      // Same-page / cross-page anchors — do not force top.
      scrollToHash(hash);
      return;
    }
    scrollWindowToTop();
  }, [pathname, hash]);

  // After paint: catch late browser restoration or layout shifts, then retry hash.
  useEffect(() => {
    if (hash) {
      const id = window.setTimeout(() => scrollToHash(hash), 0);
      return () => window.clearTimeout(id);
    }

    scrollWindowToTop();
    const id = window.requestAnimationFrame(() => scrollWindowToTop());
    return () => window.cancelAnimationFrame(id);
  }, [pathname, hash]);

  return null;
}
