import { useEffect } from "react";
import RiseCaseStudy from "@/components/case-study/rise/RiseCaseStudy";
import study from "@/data/caseStudies/rise";

function setMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  const created = !el;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  const previous = el.getAttribute("content");
  el.setAttribute("content", content);
  return () => {
    if (created) el.remove();
    else if (previous == null) el.removeAttribute("content");
    else el.setAttribute("content", previous);
  };
}

export default function RiseBySynchrony() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = study.seo.title;
    const restore = [
      setMeta("name", "description", study.seo.description),
      setMeta("property", "og:title", study.seo.title),
      setMeta("property", "og:description", study.seo.description),
      setMeta("property", "og:type", "article"),
      setMeta("name", "twitter:card", "summary_large_image"),
      setMeta("name", "twitter:title", study.seo.title),
      setMeta("name", "twitter:description", study.seo.description),
    ];
    let canonical = document.head.querySelector('link[rel="canonical"]');
    const createdCanonical = !canonical;
    const previousHref = canonical?.getAttribute("href");
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", "/case-studies/rise-by-synchrony");
    return () => {
      document.title = previousTitle;
      restore.forEach((fn) => fn());
      if (createdCanonical) canonical.remove();
      else if (previousHref) canonical.setAttribute("href", previousHref);
    };
  }, []);

  return <RiseCaseStudy />;
}
