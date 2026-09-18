/** Scoped MedEdge product-screen palette */
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
export const EASE_CSS = "cubic-bezier(0.22, 1, 0.36, 1)";

const LOW = "/case-studies/low_fi_wireframes";
const HIGH = "/case-studies/high_fi_wireframes";

/** Title from high-fi slug (without mededge- prefix). */
export function titleFromSlug(slug) {
  return slug
    .replace(/^mededge-/, "")
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function lowSrc(slug) {
  return `${LOW}/mededge-low-fi-${slug}.png`;
}

function highSrc(slug) {
  return `${HIGH}/mededge-${slug}.png`;
}

/** Low-fi workflow journey (ordered). */
export const LOW_FI_JOURNEY = [
  {
    slug: "practitioner-sign-in",
    title: "Practitioner sign in",
    src: lowSrc("practitioner-sign-in"),
    width: 2400,
    height: 1520,
  },
  {
    slug: "clinical-dashboard",
    title: "Clinical dashboard",
    src: lowSrc("clinical-dashboard"),
    width: 2400,
    height: 1520,
  },
  {
    slug: "patient-directory",
    title: "Patient directory",
    src: lowSrc("patient-directory"),
    width: 2400,
    height: 1520,
  },
  {
    slug: "patient-overview",
    title: "Patient overview",
    src: lowSrc("patient-overview"),
    width: 2400,
    height: 1520,
  },
  {
    slug: "medication-safety",
    title: "Medication safety",
    src: lowSrc("medication-safety"),
    width: 2400,
    height: 1520,
  },
  {
    slug: "medical-solutions-search",
    title: "Medical solutions search",
    src: lowSrc("medical-solutions-search"),
    width: 2400,
    height: 1520,
  },
  {
    slug: "clinical-alerts",
    title: "Clinical alerts",
    src: lowSrc("clinical-alerts"),
    width: 2400,
    height: 1520,
  },
  {
    slug: "recommendation-detail",
    title: "Recommendation detail",
    src: lowSrc("recommendation-detail"),
    width: 2400,
    height: 1520,
  },
  {
    slug: "treatment-plan",
    title: "Treatment plan",
    src: lowSrc("treatment-plan"),
    width: 2400,
    height: 1520,
  },
  {
    slug: "notification-center",
    title: "Notification center",
    src: lowSrc("notification-center"),
    width: 2400,
    height: 1520,
  },
];

/** High-fi product spotlight (ordered). */
export const SPOTLIGHT = [
  {
    slug: "clinical-dashboard",
    title: "Clinical Dashboard",
    src: highSrc("clinical-dashboard"),
    width: 2880,
    height: 2048,
    description:
      "See urgent conditions, recent patient activity, and treatment progress without scanning disconnected systems.",
    decisions: [
      "Patient safety information is prioritized",
      "Routine information remains available without competing for attention",
    ],
  },
  {
    slug: "patient-overview",
    title: "Patient Overview",
    src: highSrc("patient-overview"),
    width: 2880,
    height: 2048,
    description:
      "Bring patient history, current conditions, allergies, medications, and clinical activity into one connected view.",
    decisions: [
      "Related patient information is grouped by clinical relevance",
      "Safety context remains visible during review",
    ],
  },
  {
    slug: "medication-safety",
    title: "Medication Safety",
    src: highSrc("medication-safety"),
    width: 2880,
    height: 2048,
    description:
      "Make allergies, contraindications, and medication interactions easier to identify before treatment decisions are finalized.",
    decisions: [
      "Risk severity is communicated through more than color alone",
      "Critical conflicts are visually separated from routine medication data",
    ],
  },
  {
    slug: "recommendation-detail",
    title: "Recommendation Detail",
    src: highSrc("recommendation-detail"),
    width: 2880,
    height: 2048,
    description:
      "Explain why a recommendation appeared and connect it to the patient information and evidence that influenced it.",
    decisions: [
      "Supporting reasoning builds trust",
      "Review controls preserve clinical authority",
    ],
  },
  {
    slug: "treatment-plan",
    title: "Treatment Plan",
    src: highSrc("treatment-plan"),
    width: 2880,
    height: 2048,
    description:
      "Help clinicians translate reviewed recommendations into a clear, editable plan of care.",
    decisions: [
      "Clinicians can modify the plan before confirmation",
      "Treatment actions remain connected to patient context",
    ],
  },
];

export const EVOLUTION = {
  low: {
    slug: "recommendation-detail",
    title: "Recommendation detail",
    src: lowSrc("recommendation-detail"),
    width: 2400,
    height: 1520,
  },
  high: {
    slug: "recommendation-detail",
    title: "Recommendation detail",
    src: highSrc("recommendation-detail"),
    width: 2880,
    height: 2048,
  },
  copy: "The refined experience brings patient context, safety risks, supporting evidence, and clinician actions into one connected decision point.",
  annotations: [
    {
      title: "Critical information first",
      body: "Patient-specific risks appear before secondary information.",
    },
    {
      title: "Reasoning made visible",
      body: "Recommendations show the context and evidence that influenced them.",
    },
    {
      title: "Clinician remains in control",
      body: "The interface supports review, dismissal, and approval instead of making decisions automatically.",
    },
  ],
};

const SPOTLIGHT_SLUGS = new Set(SPOTLIGHT.map((s) => s.slug));

/** Remaining high-fi screens for gallery (not in spotlight). */
export const GALLERY = [
  "practitioner-sign-in",
  "practitioner-sign-in-validation-error",
  "patient-directory",
  "new-patient-intake",
  "medical-solutions-search",
  "clinical-alerts",
  "clinical-dashboard-critical-alert",
  "clinical-pathway-evidence",
  "recommendation-dismissal",
  "notification-center",
]
  .filter((slug) => !SPOTLIGHT_SLUGS.has(slug))
  .map((slug) => {
    const category = slug.includes("validation") || slug.includes("error")
      ? "Validation"
      : slug.includes("alert") || slug.includes("critical")
        ? "Alert state"
        : slug.includes("dismissal")
          ? "Dismissal"
          : slug.includes("evidence") || slug.includes("pathway")
            ? "Evidence"
            : slug.includes("notification")
              ? "Notifications"
              : slug.includes("intake")
                ? "Intake"
                : "Workflow";
    return {
      slug,
      title: titleFromSlug(slug),
      src: highSrc(slug),
      width: 2880,
      height: 2048,
      category,
    };
  });

/** All low-fi files accounted for (journey + unused alternate states). */
export const LOW_FI_ALTERNATES = [
  "clinical-dashboard-critical-alert",
  "clinical-pathway-evidence",
  "new-patient-intake",
  "practitioner-sign-in-validation-error",
  "recommendation-dismissal",
].map((slug) => ({
  slug,
  title: titleFromSlug(slug),
  src: lowSrc(slug),
  width: 2400,
  height: 1520,
}));
