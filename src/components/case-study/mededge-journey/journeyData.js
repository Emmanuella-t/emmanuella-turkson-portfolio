/** MedEdge journey + flow asset map (exact local filenames). */

export const ME = {
  navy: "#09263A",
  teal: "#0EA8A7",
  mint: "#2FCFAE",
  softTeal: "#7FCFCD",
  coral: "#F76C5E",
  amber: "#FFB347",
  slate: "#6B8190",
  pale: "#DCE8EB",
  bg: "#F7FAFA",
  white: "#FFFFFF",
};

export const EASE = [0.22, 1, 0.36, 1];

const JOURNEY_BASE = "/case-studies/mededge_userjourney";
const FLOW_BASE = "/case-studies/mededge_userflow";

/**
 * Website journey SVG derivatives (master design asset unchanged).
 * Preview = top row only (on-page). Full = entire map (lightbox).
 */
export const JOURNEY_SVG = {
  masterSrc: `${JOURNEY_BASE}/user_journey_svg.svg`,
  /** On-page: top row crop — readable scale, real horizontal scroll, no mid-map gap. */
  previewSrc: `${JOURNEY_BASE}/user_journey_svg_preview.svg`,
  previewWidth: 2978,
  previewHeight: 1540,
  /** Lightbox: full six-stage map, tight canvas. */
  src: `${JOURNEY_BASE}/user_journey_svg_trimmed.svg`,
  width: 2978,
  height: 3706,
  title: "MedEdge user journey",
};

export const JOURNEY_COPY = {
  eyebrow: "08 — User Journey",
  title: "From patient context to clinical action",
  intro:
    "How MedEdge helps a healthcare professional move from fragmented information toward an evidence-supported, clinician-controlled decision.",
};

/**
 * Website user-flows SVG — trimmed viewBox derivative of the master export.
 */
export const FLOWS_SVG = {
  masterSrc: `${FLOW_BASE}/user_flow_svg.svg`,
  src: `${FLOW_BASE}/user_flow_svg_trimmed.svg`,
  width: 3354,
  height: 3552,
  title: "MedEdge user flows",
};

export const FLOWS_COPY = {
  eyebrow: "09 — User Flows",
  title: "User Flows",
  intro: "From journey stages to clinician-controlled product interactions",
};

export const FLOW_LEGEND = [
  { label: "Screen", tone: "navy" },
  { label: "Action / entry", tone: "outline" },
  { label: "Clinician decision", tone: "diamond" },
  { label: "Context & evidence", tone: "teal" },
  { label: "Risk", tone: "amber" },
  { label: "Clinician action", tone: "mint" },
];

/** Shared expand control styles for journey + flows. */
export const expandButtonStyle = {
  borderColor: ME.pale,
  color: ME.navy,
  backgroundColor: ME.bg,
};

/** 11 — Visual Direction (website PNG artifact). */
export const VISUAL_DIRECTION = {
  src: "/case-studies/visual_direction_png.png",
  width: 3200,
  height: 12339,
  title: "MedEdge visual direction",
};

export const VISUAL_DIRECTION_COPY = {
  eyebrow: "11 — Visual Direction",
  title: "Designing for clarity, trust, and clinical control",
  intro:
    "MedEdge’s visual system was designed to reduce cognitive load, distinguish risk from routine information, and make AI-assisted guidance understandable without competing with clinical judgment.",
};
