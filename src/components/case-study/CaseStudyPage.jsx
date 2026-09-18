import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { createPageUrl } from "@/utils/routes";
import { getNextCaseStudy } from "@/data/caseStudies";
import MediaPlaceholder from "./MediaPlaceholder";
import WireframeCarousel from "./WireframeCarousel";
import MedEdgeProductScreens from "./mededge-screens/MedEdgeProductScreens";
import MedEdgeUserJourney from "./mededge-journey/MedEdgeUserJourney";
import MedEdgeUserFlows from "./mededge-journey/MedEdgeUserFlows";
import MedEdgeVisualDirection from "./mededge-journey/MedEdgeVisualDirection";
import IterationShowcase from "./IterationShowcase";
import NextStepsRoadmap from "./NextStepsRoadmap";
import DemoVideoPlayer from "./DemoVideoPlayer";
import MedEdgeHero from "./MedEdgeHero";
import MedEdgeChallengeFlow from "./MedEdgeChallengeFlow";
import MedEdgeRole from "./MedEdgeRole";
import MedEdgeStethoscopeBand from "./MedEdgeStethoscopeBand";
import MedEdgeUsers from "./MedEdgeUsers";
import MedEdgeFraming from "./MedEdgeFraming";

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.55, ease: "easeOut" },
};

/**
 * Global case-study page grid.
 * Outer shell is shared so every section shares one left edge.
 * Inner tiers constrain content width without recentering headings.
 */
const PAGE_GUTTER = "clamp(16px, 4vw, 48px)";
const PAGE_MAX = "1280px";

const WIDTH_TIER = {
  narrow: "760px",
  default: "980px",
  medium: "980px",
  wide: "1180px",
};

const csShellStyle = {
  width: `min(calc(100% - (${PAGE_GUTTER} * 2)), ${PAGE_MAX})`,
  maxWidth: PAGE_MAX,
  marginInline: "auto",
};

const csShellClass = "case-study-container mx-auto min-w-0";

function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  tone = "white",
  width = "default",
}) {
  const tones = {
    white: "bg-cs-bg",
    cream: "bg-cs-alt",
    ink: "bg-cs-inkbg text-cs-onink",
    transparent: "bg-transparent",
  };
  const contentMax = WIDTH_TIER[width] || WIDTH_TIER.default;

  return (
    <section
      id={id}
      className={`cs-section ${tones[tone]}`}
      style={{ paddingBlock: "clamp(48px, 7vh, 88px)" }}
    >
      <motion.div
        className={`${csShellClass} flex flex-col`}
        style={{
          ...csShellStyle,
          gap: "clamp(20px, 3vh, 36px)",
        }}
        {...fadeUp}
      >
        {(eyebrow || title || intro) && (
          <header
            className="section-heading-group min-w-0"
            style={{
              width: "min(100%, 760px)",
              marginBottom: "clamp(4px, 0.5vw, 8px)",
            }}
          >
            {eyebrow && (
              <p
                className={`mb-2 font-mono text-xs uppercase tracking-[0.18em] ${
                  tone === "ink" ? "text-cs-onink/70" : "text-cs-muted"
                }`}
              >
                {eyebrow}
              </p>
            )}
            {title && (
              <h2
                className={`font-display text-3xl font-semibold tracking-tight sm:text-4xl md:text-[2.75rem] ${
                  tone === "ink" ? "text-cs-onink" : "text-cs-ink"
                }`}
              >
                {title}
              </h2>
            )}
            {intro && (
              <p
                className={`mt-2 text-base leading-relaxed sm:text-lg ${
                  tone === "ink" ? "text-cs-onink/80" : "text-cs-ink/70"
                }`}
              >
                {intro}
              </p>
            )}
          </header>
        )}
        <div
          className="content-tier min-w-0 w-full"
          style={{ width: "min(100%, " + contentMax + ")" }}
        >
          {children}
        </div>
      </motion.div>
    </section>
  );
}

const visualWrapperStyle = {
  width: "fit-content",
  maxWidth: "100%",
  marginInline: "auto",
  padding: 0,
  overflow: "hidden",
  height: "auto",
  minHeight: 0,
  display: "block",
};

function getVisualImgStyle(size = "default") {
  const maxWidth =
    size === "compact"
      ? "min(100%, 960px)"
      : size === "hero"
        ? "min(100%, 1100px)"
        : "min(100%, 1180px)";

  return {
    display: "block",
    width: "auto",
    maxWidth,
    maxHeight: size === "hero" ? "62vh" : "68vh",
    height: "auto",
    objectFit: "contain",
    imageRendering: "auto",
  };
}

function MediaBlock({
  src,
  alt,
  caption,
  mediaNeeded,
  aspect,
  fit: _fit = "contain",
  variant = "framed",
  size = "default",
  video,
  videoMuted,
  poster,
}) {
  const imgStyle = getVisualImgStyle(size);

  if (mediaNeeded || (!src && !video)) {
    return (
      <figure className="w-full" style={{ margin: 0 }}>
        <MediaPlaceholder label={mediaNeeded || "[MEDIA NEEDED]"} aspect={aspect} />
        {caption && (
          <figcaption className="mt-3 text-sm text-cs-ink/65">{caption}</figcaption>
        )}
      </figure>
    );
  }

  if (video) {
    return (
      <div className="space-y-3">
        <DemoVideoPlayer
          src={video}
          mutedSrc={videoMuted || video}
          poster={poster}
          alt={alt || "Product demo video"}
        />
        {caption && (
          <p className="mx-auto max-w-5xl text-sm leading-relaxed text-cs-ink/65">
            {caption}
          </p>
        )}
      </div>
    );
  }

  if (variant === "sticker") {
    return (
      <figure className="mx-auto w-fit max-w-full bg-transparent" style={{ marginInline: "auto" }}>
        <div
          className="visual-wrapper bg-transparent"
          style={{
            ...visualWrapperStyle,
            borderRadius: "inherit",
          }}
        >
          <img
            src={src}
            alt={alt || ""}
            className="bg-transparent"
            style={{
              ...imgStyle,
              background: "transparent",
            }}
            loading="lazy"
          />
        </div>
        {caption && (
          <figcaption className="mt-3 text-center text-sm leading-relaxed text-cs-ink/65">
            {caption}
          </figcaption>
        )}
      </figure>
    );
  }

  return (
    <figure className="mx-auto w-fit max-w-full" style={{ marginInline: "auto" }}>
      <div
        className="visual-wrapper overflow-hidden rounded-2xl"
        style={{
          ...visualWrapperStyle,
          borderRadius: "1rem",
          boxShadow: "var(--cs-shadow)",
        }}
      >
        <img
          src={src}
          alt={alt || ""}
          className="rounded-2xl"
          style={imgStyle}
          loading="lazy"
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-sm leading-relaxed text-cs-ink/65">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

function MetaGrid({ overview }) {
  const items = [
    { label: "Role", value: overview.role },
    { label: "Timeline", value: overview.duration },
    { label: "Platform", value: overview.platform },
    { label: "Tools", value: overview.tools },
    overview.team ? { label: "Team", value: overview.team } : null,
  ].filter(Boolean);

  return (
    <dl className="grid grid-cols-2 gap-5 border-y border-cs-border/40 py-6 md:grid-cols-4 md:gap-8 md:py-7">
      {items.map((item) => (
        <div key={item.label} className="min-w-0">
          <dt className="mb-1 font-mono text-[11px] uppercase tracking-[0.16em] text-cs-muted">
            {item.label}
          </dt>
          <dd className="text-sm font-medium leading-snug text-cs-ink sm:text-base">
            {item.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function InsightCard({ insight, index }) {
  return (
    <article className="border-t border-cs-border/50 py-8 first:border-t-0 first:pt-0">
      <div className="grid gap-4 md:grid-cols-[4rem_1fr] md:gap-8">
        <span className="font-display text-3xl text-cs-muted/70">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="min-w-0 space-y-3">
          <h3 className="text-xl font-semibold text-cs-ink">{insight.title}</h3>
          <p className="leading-relaxed text-cs-ink/75">{insight.discovery}</p>
          {insight.evidence && (
            <p className="text-sm leading-relaxed text-cs-soft">
              <span className="font-semibold">Evidence: </span>
              {insight.evidence}
            </p>
          )}
          {insight.whyItMattered && (
            <p className="text-sm leading-relaxed text-cs-ink/70">
              <span className="font-semibold">Why it mattered: </span>
              {insight.whyItMattered}
            </p>
          )}
          {insight.designImpact && (
            <p className="text-sm leading-relaxed text-cs-ink/70">
              <span className="font-semibold">Design impact: </span>
              {insight.designImpact}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}

function GoalColumns({ goals, elevated = false }) {
  const columns = [
    { key: "user", title: "User goals" },
    { key: "design", title: "Design goals" },
    { key: "organizationalValue", title: "Intended organizational value" },
    { key: "business", title: "Business / org goals" },
    { key: "successCriteria", title: "Intended success criteria" },
  ].filter((col) => goals[col.key]?.length);

  return (
    <div className="space-y-6">
      <div
        className={`grid gap-6 ${
          columns.length === 1 ? "md:grid-cols-1" : "md:grid-cols-2"
        }`}
      >
        {columns.map((col) => (
          <div
            key={col.key}
            className={
              elevated
                ? "relative z-10 rounded-2xl border border-cs-border/50 bg-cs-card p-6 shadow-[0_18px_40px_-32px_rgba(6,16,42,0.22)] sm:p-8"
                : "rounded-2xl bg-cs-alt/80 p-6 sm:p-8"
            }
          >
            <h3 className="mb-5 font-display text-xl font-semibold text-cs-soft">
              {col.title}
            </h3>
            <ul className="space-y-3">
              {goals[col.key].map((item) => (
                <li key={item} className="flex gap-3 text-cs-ink/80">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cs-muted" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {goals.note && (
        <p
          className={`text-sm leading-relaxed text-cs-ink/55 ${
            elevated ? "relative z-10" : ""
          }`}
        >
          {goals.note}
        </p>
      )}
    </div>
  );
}

export default function CaseStudyPage({ study }) {
  if (!study) return null;

  const next = getNextCaseStudy(study.id);
  const overview = study.overview || {};
  const themeKey =
    study.theme ||
    (study.id === "mededge" || study.heroShowcase?.variant === "mededge-devices"
      ? "mededge"
      : undefined);

  return (
    <div
      data-cs-theme={themeKey}
      className="min-h-screen bg-cs-bg font-body text-cs-ink"
    >
      {/* Sticky back bar */}
      <div className="sticky top-16 z-40 border-b border-cs-border/30 bg-cs-alt/95 backdrop-blur-md">
        <div
          className={`${csShellClass} flex items-center justify-between gap-4 py-3`}
          style={csShellStyle}
        >
          <Link
            to={createPageUrl("Work")}
            className="inline-flex items-center gap-2 text-sm font-medium text-cs-soft transition-colors hover:text-cs-ink"
          >
            <ArrowLeft size={16} />
            All work
          </Link>
          <span className="hidden truncate font-mono text-xs uppercase tracking-[0.14em] text-cs-muted sm:block">
            {study.shortName || study.name}
          </span>
        </div>
      </div>

      {/* 1. Hero */}
      {study.heroShowcase?.variant === "mededge-devices" ? (
        <MedEdgeHero
          eyebrow={study.heroShowcase.eyebrow}
          title={study.heroShowcase.title}
          tagline={study.heroShowcase.tagline}
          meta={study.heroShowcase.meta}
        />
      ) : (
      <section
        className="bg-gradient-to-b from-cs-alt to-cs-bg"
        style={{ paddingBlock: "clamp(48px, 7vh, 88px)" }}
      >
        <motion.div
          className={`${csShellClass} flex flex-col`}
          style={{
            ...csShellStyle,
            gap: "clamp(20px, 3vh, 36px)",
          }}
          {...fadeUp}
        >
          <div className="min-w-0" style={{ width: "min(100%, 760px)" }}>
            <p className="mb-2 font-mono text-xs uppercase tracking-[0.18em] text-cs-muted">
              {study.category}
            </p>
            <h1 className="font-display text-4xl font-semibold leading-[1.1] tracking-tight text-cs-ink sm:text-5xl md:text-6xl">
              {overview.product || study.name}
            </h1>
            <p className="mt-2 text-lg leading-relaxed text-cs-ink/70 sm:text-xl">
              {study.oneLiner}
            </p>
          </div>

          <div style={{ width: "min(100%, 1180px)" }} className="min-w-0 space-y-8">
            <MetaGrid overview={overview} />

            <div className="flex w-full justify-center">
              <MediaBlock
                src={study.heroImage?.src}
                alt={study.heroImage?.alt}
                fit={study.heroImage?.fit || "contain"}
                size={study.heroImage?.size || "hero"}
                mediaNeeded={
                  !study.heroImage?.src
                    ? "[MEDIA NEEDED: Full-width project hero mockup]"
                    : undefined
                }
              />
            </div>
          </div>
        </motion.div>
      </section>
      )}

      {/* 2. Overview */}
      <Section
        id="overview"
        eyebrow="01 — Overview"
        title="Project overview"
        width={overview.layout === "editorial" ? "wide" : "narrow"}
      >
        {overview.layout === "editorial" ? (
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] lg:gap-16">
            <p className="max-w-2xl text-lg leading-relaxed text-cs-ink/80 sm:text-xl">
              {overview.summary}
            </p>
            <dl className="border-t border-cs-border/60">
              {[
                ["Role", overview.role],
                ["Timeline", overview.timeline],
                ["Team", overview.team],
                ["Competition", overview.competition],
                ["Tools", overview.tools],
              ]
                .filter(([, value]) => value)
                .map(([label, value]) => (
                  <div
                    key={label}
                    className="flex flex-col gap-1 border-b border-cs-border/60 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
                  >
                    <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-cs-muted">
                      {label}
                    </dt>
                    <dd className="font-body text-sm font-medium leading-snug text-cs-ink sm:max-w-[62%] sm:text-right sm:text-base">
                      {value}
                    </dd>
                  </div>
                ))}
            </dl>
          </div>
        ) : (
          <div className="space-y-5 text-base leading-relaxed text-cs-ink/80 sm:text-lg">
            {(overview.what || overview.product) && (
              <p>
                <span className="font-semibold text-cs-ink">What it is. </span>
                {overview.what || overview.product}
              </p>
            )}
            {overview.audience && (
              <p>
                <span className="font-semibold text-cs-ink">Who it&apos;s for. </span>
                {overview.audience}
              </p>
            )}
            {overview.why && (
              <p>
                <span className="font-semibold text-cs-ink">Why it exists. </span>
                {overview.why}
              </p>
            )}
            {overview.teamOwnership && (
              <p>
                <span className="font-semibold text-cs-ink">Team &amp; ownership. </span>
                {overview.teamOwnership}
              </p>
            )}
            {!overview.teamOwnership && overview.team === null && (
              <p className="rounded-xl border border-dashed border-cs-muted/40 bg-cs-alt/50 px-4 py-3 font-mono text-xs text-cs-soft sm:text-sm">
                [CONTENT NEEDED: Team or collaborators — who else worked on this project]
              </p>
            )}
            {!overview.teamOwnership &&
              typeof overview.team === "string" &&
              overview.team.startsWith("[") && (
                <p className="rounded-xl border border-dashed border-cs-muted/40 bg-cs-alt/50 px-4 py-3 font-mono text-xs text-cs-soft sm:text-sm">
                  {overview.team}
                </p>
              )}
          </div>
        )}
      </Section>

      {/* 3. Challenge */}
      {study.challenge &&
        (study.challenge.layout === "editorial" ? (
          <Section id="challenge" tone="cream" width="wide">
            <div className="flex flex-col gap-10 lg:gap-14">
              {/* Large section label */}
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-cs-muted sm:text-[13px]">
                02 — Challenge
              </p>

              {/* Editorial composition: headline + copy | problem flow */}
              <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)] lg:gap-14 xl:gap-16">
                <div className="min-w-0">
                  <h2 className="cs-display-serif text-[clamp(2rem,4.2vw,3.35rem)] font-semibold leading-[1.08] tracking-tight text-cs-ink">
                    {study.challenge.headline}
                  </h2>
                  <div className="mt-6 max-w-xl space-y-4 text-base leading-relaxed text-cs-ink/75 sm:text-lg">
                    {(study.challenge.body || []).map((paragraph) => (
                      <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                    ))}
                  </div>
                </div>

                <MedEdgeChallengeFlow stages={study.challenge.flow} />
              </div>

              {/* Constraints — compact branded tags embedded in the composition */}
              {study.challenge.constraints?.length > 0 && (
                <div className="border-t border-cs-border/70 pt-8">
                  <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-cs-muted">
                      Project constraints
                    </p>
                    <p className="text-sm text-cs-ink/50">
                      Boundaries that shaped the work
                    </p>
                  </div>
                  <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {study.challenge.constraints.map((constraint, index) => (
                      <li
                        key={constraint}
                        className="group relative overflow-hidden rounded-xl border border-cs-border/80 bg-cs-card/80 px-4 py-3.5 shadow-[0_12px_28px_-22px_rgba(6,16,42,0.45)]"
                      >
                        <span
                          aria-hidden
                          className="absolute inset-y-0 left-0 w-[3px] bg-cs-accent/80 transition-opacity group-hover:opacity-100"
                          style={{ opacity: 0.55 + index * 0.1 }}
                        />
                        <span className="block pl-2 font-mono text-[10px] uppercase tracking-[0.16em] text-cs-muted/80">
                          0{index + 1}
                        </span>
                        <span className="mt-1 block pl-2 text-sm font-medium leading-snug text-cs-ink">
                          {constraint}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </Section>
        ) : (
          <Section
            id="challenge"
            eyebrow="02 — Challenge"
            title="The challenge"
            tone="cream"
            width="wide"
          >
            <div
              className={`grid items-start ${
                study.challenge.media ? "lg:grid-cols-[auto_minmax(0,1fr)]" : ""
              }`}
              style={
                study.challenge.media
                  ? { columnGap: "clamp(32px, 4vw, 64px)", rowGap: "2rem" }
                  : undefined
              }
            >
              {study.challenge.media && (
                <MediaBlock
                  src={study.challenge.media.src}
                  alt={study.challenge.media.alt}
                />
              )}
              <div className="space-y-5">
                <p className="text-xl font-medium leading-relaxed text-cs-ink sm:text-2xl">
                  {study.challenge.problem}
                </p>
                {study.challenge.affected && (
                  <p className="leading-relaxed text-cs-ink/75">
                    <span className="font-semibold text-cs-ink">Who was affected. </span>
                    {study.challenge.affected}
                  </p>
                )}
                {study.challenge.whyItMatters && (
                  <p className="leading-relaxed text-cs-ink/75">
                    <span className="font-semibold text-cs-ink">Why it mattered. </span>
                    {study.challenge.whyItMatters}
                  </p>
                )}
                {study.challenge.context && (
                  <p className="leading-relaxed text-cs-ink/75">
                    {study.challenge.context}
                  </p>
                )}
                {study.challenge.findings?.length > 0 && (
                  <ul className="mt-6 space-y-3">
                    {study.challenge.findings.map((item) => (
                      <li
                        key={item}
                        className="rounded-xl bg-cs-card/80 px-4 py-3 text-cs-ink/80 shadow-sm"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
                {study.challenge.constraints && (
                  <p className="mt-4 rounded-xl border border-dashed border-cs-muted/40 bg-cs-card/60 px-4 py-3 font-mono text-xs text-cs-soft sm:text-sm">
                    {Array.isArray(study.challenge.constraints)
                      ? study.challenge.constraints.join(" · ")
                      : study.challenge.constraints}
                  </p>
                )}
              </div>
            </div>
          </Section>
        ))}

      {/* 4–7. Role → Goals → Research (MedEdge stethoscope band when editorial) */}
      {study.role?.layout === "editorial" ? (
        <MedEdgeStethoscopeBand>
          {study.role && (
            <Section id="role" width="wide" tone="transparent">
              <MedEdgeRole role={study.role} />
            </Section>
          )}

          {study.goals && (
            <Section
              id="goals"
              eyebrow="04 — Goals"
              title="Goals and success criteria"
              tone="transparent"
            >
              <GoalColumns goals={study.goals} elevated />
            </Section>
          )}

          {(study.research || study.insights) && (
            <Section
              id="research"
              eyebrow="05 — Discovery"
              title="Research and insights"
              intro={study.research?.summary}
              width="wide"
              tone="transparent"
            >
              {study.research?.methods?.length > 0 && (
                <div className="relative z-10 flex flex-wrap gap-2">
                  {study.research.methods.map((method) => (
                    <span
                      key={method}
                      className="rounded-full border border-cs-border/60 bg-cs-card px-4 py-1.5 text-sm text-cs-soft shadow-sm"
                    >
                      {method}
                    </span>
                  ))}
                </div>
              )}

              {study.research?.media?.length > 0 && (
                <div className="relative z-10 space-y-6">
                  {study.research.media.map((m) => (
                    <MediaBlock key={m.src || m.mediaNeeded} {...m} />
                  ))}
                </div>
              )}

              {study.insights?.length > 0 && (
                <div className="relative z-10">
                  <h3 className="mb-6 font-display text-2xl font-semibold text-cs-ink">
                    Key insights
                  </h3>
                  <div className="rounded-[1.35rem] border border-cs-border/50 bg-cs-card/95 px-6 py-2 shadow-[0_18px_40px_-32px_rgba(6,16,42,0.22)] sm:px-8">
                    {study.insights.map((insight, i) => (
                      <InsightCard key={insight.title} insight={insight} index={i} />
                    ))}
                  </div>
                </div>
              )}

              {study.research?.limitations && (
                <p className="relative z-10 mt-10 rounded-xl border border-dashed border-cs-muted/40 bg-cs-card/90 px-4 py-3 font-mono text-xs text-cs-soft sm:text-sm">
                  {study.research.limitations}
                </p>
              )}
            </Section>
          )}
        </MedEdgeStethoscopeBand>
      ) : (
        <>
          {/* 4. Role */}
          {study.role && (
            <Section id="role" eyebrow="03 — Role" title="My role and contributions" width="default">
              {study.role.groups?.length > 0 ? (
                <div className="grid gap-8 sm:grid-cols-2">
                  {study.role.groups.map((group) => (
                    <div key={group.title}>
                      <h3 className="mb-4 font-display text-lg font-semibold text-cs-soft">
                        {group.title}
                      </h3>
                      <ul className="space-y-2.5">
                        {group.items.map((item) => (
                          <li key={item} className="flex gap-3 text-cs-ink/80">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cs-muted" />
                            <span className="leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : (
                <ul className="grid gap-3 sm:grid-cols-2">
                  {(study.role.responsibilities || []).map((item) => (
                    <li
                      key={item}
                      className="rounded-xl border border-cs-border/40 bg-cs-alt/40 px-5 py-4 leading-relaxed text-cs-ink/85"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}
              {(study.role.collaborators || study.role.didNotOwn) && (
                <div className="mt-8 space-y-3">
                  {study.role.collaborators &&
                    (typeof study.role.collaborators === "string" &&
                    study.role.collaborators.startsWith("[") ? (
                      <p className="rounded-xl border border-dashed border-cs-muted/40 bg-cs-alt/50 px-4 py-3 font-mono text-xs text-cs-soft sm:text-sm">
                        {study.role.collaborators}
                      </p>
                    ) : (
                      <p className="text-sm leading-relaxed text-cs-ink/65">
                        <span className="font-semibold text-cs-ink">Collaborated with. </span>
                        {study.role.collaborators}
                      </p>
                    ))}
                  {study.role.didNotOwn &&
                    (typeof study.role.didNotOwn === "string" &&
                    study.role.didNotOwn.startsWith("[") ? (
                      <p className="rounded-xl border border-dashed border-cs-muted/40 bg-cs-alt/50 px-4 py-3 font-mono text-xs text-cs-soft sm:text-sm">
                        {study.role.didNotOwn}
                      </p>
                    ) : Array.isArray(study.role.didNotOwn) ? (
                      <p className="text-sm leading-relaxed text-cs-ink/65">
                        <span className="font-semibold text-cs-ink">Areas I did not own. </span>
                        {study.role.didNotOwn.join(" · ")}
                      </p>
                    ) : (
                      <p className="text-sm leading-relaxed text-cs-ink/65">
                        <span className="font-semibold text-cs-ink">Areas I did not own. </span>
                        {study.role.didNotOwn}
                      </p>
                    ))}
                </div>
              )}
            </Section>
          )}

          {/* 5. Goals */}
          {study.goals && (
            <Section
              id="goals"
              eyebrow="04 — Goals"
              title="Goals and success criteria"
              tone="cream"
            >
              <GoalColumns goals={study.goals} />
            </Section>
          )}

          {/* 6–7. Research + Insights */}
          {(study.research || study.insights) && (
            <Section
              id="research"
              eyebrow="05 — Discovery"
              title="Research and insights"
              intro={study.research?.summary}
              width="wide"
            >
              {study.research?.methods?.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {study.research.methods.map((method) => (
                    <span
                      key={method}
                      className="rounded-full border border-cs-border/60 bg-cs-alt/50 px-4 py-1.5 text-sm text-cs-soft"
                    >
                      {method}
                    </span>
                  ))}
                </div>
              )}

              {study.research?.media?.length > 0 && (
                <div className="space-y-6">
                  {study.research.media.map((m) => (
                    <MediaBlock key={m.src || m.mediaNeeded} {...m} />
                  ))}
                </div>
              )}

              {study.insights?.length > 0 && (
                <div>
                  <h3 className="mb-6 font-display text-2xl font-semibold text-cs-ink">
                    Key insights
                  </h3>
                  <div>
                    {study.insights.map((insight, i) => (
                      <InsightCard key={insight.title} insight={insight} index={i} />
                    ))}
                  </div>
                </div>
              )}

              {study.research?.limitations && (
                <p className="mt-10 rounded-xl border border-dashed border-cs-muted/40 bg-cs-alt/50 px-4 py-3 font-mono text-xs text-cs-soft sm:text-sm">
                  {study.research.limitations}
                </p>
              )}
            </Section>
          )}
        </>
      )}

      {/* 8. Users */}
      {study.users &&
        (study.users.layout === "editorial" ? (
          <Section id="users" width="wide" tone="cream">
            <MedEdgeUsers users={study.users} />
          </Section>
        ) : (
          <Section
            id="users"
            eyebrow="06 — Users"
            title="Defining the user"
            intro={study.users.summary}
            tone="cream"
            width="wide"
          >
            {study.users.placeholder || study.users.contentNeeded ? (
              <MediaPlaceholder
                label={
                  study.users.contentNeeded ||
                  "[CONTENT NEEDED: User definition artifacts]"
                }
                aspect="video"
              />
            ) : (
              <div className="space-y-8">
                {study.users.personas?.map((persona) => (
                  <article
                    key={persona.title || persona.name}
                    className="overflow-hidden rounded-2xl bg-transparent"
                  >
                    {persona.image && (
                      <MediaBlock
                        src={persona.image.src}
                        alt={persona.image.alt}
                        fit={persona.image.fit || "contain"}
                        size={persona.image.size || "compact"}
                      />
                    )}
                    {persona.painPoints?.length > 0 && (
                      <div className="rounded-b-2xl bg-cs-card p-6 shadow-sm sm:p-8">
                        <h3 className="font-display text-xl font-semibold text-cs-soft">
                          {persona.title || persona.name}
                        </h3>
                        <ul className="mt-5 space-y-2.5">
                          {persona.painPoints.map((pain) => (
                            <li key={pain} className="flex gap-3 text-cs-ink/80">
                              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cs-soft" />
                              <span className="leading-relaxed">{pain}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </article>
                ))}
              </div>
            )}
          </Section>
        ))}

      {/* 9. Problem framing */}
      {study.problemFraming &&
        (study.problemFraming.layout === "editorial" ? (
          <Section id="framing" width="wide">
            <MedEdgeFraming framing={study.problemFraming} />
          </Section>
        ) : (
          <Section id="framing" eyebrow="07 — Framing" title="Problem framing" width="narrow">
            {study.problemFraming.statement && (
              <blockquote className="rounded-2xl bg-cs-inkbg px-6 py-8 text-lg leading-relaxed text-cs-onink sm:px-10 sm:py-10 sm:text-xl">
                {study.problemFraming.statement}
              </blockquote>
            )}
            {study.problemFraming.hmw && (
              <p className="mt-6 text-lg font-medium text-cs-soft">
                {study.problemFraming.hmw}
              </p>
            )}
            {study.problemFraming.principles?.length > 0 && (
              <ul className="mt-8 space-y-3">
                {study.problemFraming.principles.map((p) => (
                  <li
                    key={typeof p === "string" ? p : p.title}
                    className="leading-relaxed text-cs-ink/80"
                  >
                    {typeof p === "string" ? (
                      p
                    ) : (
                      <>
                        <span className="font-semibold text-cs-ink">{p.title}. </span>
                        {p.description}
                      </>
                    )}
                  </li>
                ))}
              </ul>
            )}
            {study.problemFraming.opportunities?.length > 0 && (
              <ul className="mt-6 space-y-3">
                {study.problemFraming.opportunities.map((p) => (
                  <li
                    key={typeof p === "string" ? p : p.title}
                    className="leading-relaxed text-cs-ink/80"
                  >
                    {typeof p === "string" ? (
                      p
                    ) : (
                      <>
                        <span className="font-semibold text-cs-ink">{p.title}. </span>
                        {p.description}
                      </>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </Section>
        ))}

      {/* 10. Journey */}
      {study.journey &&
        (study.journey.layout === "editorial" ? (
          <section
            id="journey"
            className="cs-section overflow-x-clip"
            style={{
              backgroundColor: "#F7FAFA",
              paddingBlock: "clamp(48px, 7vh, 88px)",
            }}
          >
            {/* Full case-study shell (same left edge as siblings); skip narrower content-tier so the SVG can use the canvas. */}
            <div className={csShellClass} style={csShellStyle}>
              <MedEdgeUserJourney />
            </div>
          </section>
        ) : (
        <Section
          id="journey"
          eyebrow="08 — Journey"
          title="User journey"
          intro={
            study.journey.placeholder
              ? undefined
              : study.journey.explanation
          }
          tone="cream"
          width="wide"
        >
          {study.journey.stages?.length > 0 && (
            <div className="mb-10 flex flex-wrap gap-3">
              {study.journey.stages.map((stage, i) => (
                <div
                  key={stage}
                  className="inline-flex items-center gap-2 rounded-full bg-cs-card px-4 py-2 text-sm text-cs-ink shadow-sm"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-cs-muted text-xs font-semibold text-white">
                    {i + 1}
                  </span>
                  {stage}
                </div>
              ))}
            </div>
          )}
          {study.journey.placeholder || study.journey.mediaNeeded ? (
            <MediaPlaceholder
              label={
                study.journey.mediaNeeded ||
                study.journey.explanation ||
                "[MEDIA NEEDED: User journey map]"
              }
            />
          ) : (
            <div
              className={`grid gap-6 ${
                study.journey.media?.length > 1 ? "lg:grid-cols-2" : ""
              }`}
            >
              {study.journey.media?.map((m) => (
                <MediaBlock key={m.src} {...m} />
              ))}
            </div>
          )}
        </Section>
        ))}

      {/* Empathy map */}
      {study.empathyMap && (
        <Section
          id="empathy"
          eyebrow="08 — Empathy"
          title="Empathy map"
          intro={study.empathyMap.explanation}
          tone="cream"
          width="wide"
        >
          {study.empathyMap.media?.map((m) => (
            <MediaBlock key={m.src} {...m} />
          ))}
        </Section>
      )}

      {/* 11–12. Flows / IA */}
      {study.flows &&
        (study.flows.layout === "editorial" ? (
          <section
            id="flows"
            className="cs-section overflow-x-clip"
            style={{
              backgroundColor: "#FFFFFF",
              paddingBlock: "clamp(48px, 7vh, 88px)",
            }}
          >
            <div className={csShellClass} style={csShellStyle}>
              <MedEdgeUserFlows />
            </div>
          </section>
        ) : (
        <Section
          id="flows"
          eyebrow="09 — Flows"
          title="User flows"
          intro={study.flows.explanation}
          width="wide"
        >
          <div className="space-y-8">
            {study.flows.media?.map((m) => (
              <MediaBlock key={m.src || m.mediaNeeded} {...m} />
            ))}
            {study.flows.mediaNeeded && !study.flows.media?.length && (
              <MediaPlaceholder label={study.flows.mediaNeeded} />
            )}
          </div>
        </Section>
        ))}

      {study.informationArchitecture && (
        <Section
          id="ia"
          eyebrow="Information architecture"
          title="Information architecture"
          intro={study.informationArchitecture.explanation}
          width="wide"
        >
          {study.informationArchitecture.media?.map((m) => (
            <MediaBlock key={m.src || m.mediaNeeded} {...m} />
          ))}
          {study.informationArchitecture.mediaNeeded && (
            <MediaPlaceholder label={study.informationArchitecture.mediaNeeded} />
          )}
        </Section>
      )}

      {/* 13. Ideation */}
      {study.ideation && (
        <Section
          id="ideation"
          eyebrow="Ideation"
          title="Concept exploration"
          intro={study.ideation.explanation}
          tone="cream"
        >
          {study.ideation.phases?.map((phase) => (
            <div key={phase.title} className="mb-8 last:mb-0">
              <h3 className="mb-2 font-display text-xl font-semibold text-cs-soft">
                {phase.title}
              </h3>
              <p className="leading-relaxed text-cs-ink/80">
                {phase.body || phase.description}
              </p>
              {phase.decision && (
                <p className="mt-3 font-medium text-cs-ink">{phase.decision}</p>
              )}
            </div>
          ))}
          {study.ideation.mediaNeeded && (
            <MediaPlaceholder label={study.ideation.mediaNeeded} />
          )}
        </Section>
      )}

      {/* 14. Wireframes / product screens */}
      {study.wireframes &&
        (study.wireframes.layout === "editorial" ? (
          <Section id="wireframes" width="wide" tone="transparent">
            <MedEdgeProductScreens />
          </Section>
        ) : (
        <Section
          id="wireframes"
          eyebrow="10 — Wireframes"
          title="Wireframes"
          intro={study.wireframes.explanation}
          width="wide"
        >
          {study.wireframes.phases?.map((phase) => (
            <div key={phase.title} className="mb-10 last:mb-0">
              <h3 className="mb-2 font-display text-xl font-semibold text-cs-soft">
                {phase.title}
              </h3>
              <p className="mb-2 leading-relaxed text-cs-ink/80">
                {phase.body || phase.description}
              </p>
              {phase.decision && (
                <p className="font-medium text-cs-ink">{phase.decision}</p>
              )}
            </div>
          ))}
          {study.wireframes.placeholder || study.wireframes.mediaNeeded ? (
            <MediaPlaceholder
              label={
                study.wireframes.mediaNeeded ||
                "[MEDIA NEEDED: Wireframe gallery]"
              }
            />
          ) : study.wireframes.carousel ? (
            <WireframeCarousel slides={study.wireframes.items} />
          ) : (
            <div
              className={`grid gap-8 ${
                study.wireframes.items?.length > 1 ? "md:grid-cols-2" : ""
              }`}
            >
              {study.wireframes.items?.map((item) => (
                <MediaBlock key={item.src || item.caption} {...item} />
              ))}
            </div>
          )}
        </Section>
        ))}

      {/* 15. Visual direction */}
      {study.visualDirection &&
        (study.visualDirection.layout === "editorial" ? (
          <section
            id="visual"
            className="cs-section overflow-x-clip"
            style={{
              backgroundColor: "#F7FAFA",
              paddingBlock: "clamp(48px, 7vh, 88px)",
            }}
          >
            <div className={csShellClass} style={csShellStyle}>
              <MedEdgeVisualDirection />
            </div>
          </section>
        ) : (
        <Section
          id="visual"
          eyebrow="11 — Visual direction"
          title="Visual direction"
          intro={study.visualDirection.explanation}
          tone="cream"
          width="wide"
        >
          <div
            className={`grid gap-6 ${
              study.visualDirection.media?.length > 1 ? "lg:grid-cols-2" : ""
            }`}
          >
            {study.visualDirection.media?.map((m) => (
              <MediaBlock key={m.src} {...m} />
            ))}
          </div>
        </Section>
        ))}

      {/* 16. Design system placeholder */}
      {study.designSystem && (
        <Section id="system" eyebrow="Design system" title="Design system" width="wide">
          {study.designSystem.explanation && (
            <p className="mb-8 max-w-2xl leading-relaxed text-cs-ink/75">
              {study.designSystem.explanation}
            </p>
          )}
          {study.designSystem.mediaNeeded && (
            <MediaPlaceholder label={study.designSystem.mediaNeeded} />
          )}
          {study.designSystem.media?.map((m) => (
            <MediaBlock key={m.src || m.mediaNeeded} {...m} />
          ))}
        </Section>
      )}

      {/* 17. Final interface — skipped when editorial product screens cover this story */}
      {study.finalInterface && study.wireframes?.layout !== "editorial" && (
        <Section
          id="interface"
          eyebrow="12 — Solution"
          title="Final interface"
          intro={study.finalInterface.explanation}
          width="wide"
        >
          <div className="space-y-10 sm:space-y-12">
            {study.finalInterface.items?.map((item, i) => (
              <div
                key={item.src || item.title}
                className={
                  item.gallery
                    ? ""
                    : i % 2 === 1
                      ? "md:pl-6 lg:pl-10"
                      : "md:pr-6 lg:pr-10"
                }
              >
                {item.title && (
                  <h3 className="mb-4 font-display text-2xl font-semibold text-cs-ink">
                    {item.title}
                  </h3>
                )}
                {item.gallery ? (
                  <WireframeCarousel
                    slides={item.gallery}
                    ariaLabel="Main screens gallery"
                  />
                ) : (
                  <MediaBlock
                    src={item.src}
                    alt={item.alt}
                    caption={item.caption}
                    mediaNeeded={item.mediaNeeded}
                    video={item.video}
                    videoMuted={item.videoMuted}
                    poster={item.poster}
                    fit={item.fit}
                    size={item.size}
                  />
                )}
              </div>
            ))}
          </div>
          {study.solution?.prototypeLink && (
            <a
              href={study.solution.prototypeLink.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-12 inline-flex items-center gap-2 text-base font-medium text-cs-soft underline-offset-4 hover:underline"
            >
              {study.solution.prototypeLink.label}
              <ArrowRight size={16} />
            </a>
          )}
        </Section>
      )}

      {/* 18. Features */}
      {study.features?.length > 0 && (
        <Section
          id="features"
          eyebrow="13 — Features"
          title="Key feature breakdowns"
          tone="cream"
          width="wide"
        >
          <div className="grid gap-6 md:grid-cols-2">
            {study.features.map((feature) => (
              <article
                key={feature.title}
                className="rounded-2xl bg-cs-card p-6 shadow-sm sm:p-8"
              >
                <h3 className="font-display text-xl font-semibold text-cs-ink">
                  {feature.title}
                </h3>
                {feature.problem && (
                  <p className="mt-3 text-sm leading-relaxed text-cs-ink/65">
                    <span className="font-semibold text-cs-soft">Problem. </span>
                    {feature.problem}
                  </p>
                )}
                <p className="mt-3 leading-relaxed text-cs-ink/80">
                  {feature.solution || feature.description}
                </p>
                {feature.benefit && (
                  <p className="mt-3 text-sm leading-relaxed text-cs-ink/65">
                    <span className="font-semibold text-cs-soft">Benefit. </span>
                    {feature.benefit}
                  </p>
                )}
                {feature.media && (
                  <div className="mt-6">
                    <MediaBlock {...feature.media} />
                  </div>
                )}
              </article>
            ))}
          </div>
        </Section>
      )}

      {/* Design decisions */}
      {study.designDecisions?.length > 0 && (
        <Section
          id="decisions"
          eyebrow="Design decisions"
          title="Why it works this way"
          width="narrow"
        >
          <div className="space-y-8">
            {study.designDecisions.map((d) => (
              <div key={d.title}>
                <h3 className="mb-2 font-display text-xl font-semibold text-cs-soft">
                  {d.title}
                </h3>
                <p className="leading-relaxed text-cs-ink/80">{d.rationale}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* 19–22 placeholders / testing / iterations / a11y */}
      {study.testing && (
        <Section id="testing" eyebrow="14 — Testing" title="Usability testing" tone="cream" width="default">
          {study.testing.contentNeeded || study.testing.placeholder ? (
            <MediaPlaceholder
              label={
                study.testing.contentNeeded ||
                "[CONTENT NEEDED: Usability testing method, participants, tasks, and findings]"
              }
            />
          ) : study.testing.blocks ? (
            <div className="space-y-8">
              {study.testing.intro && (
                <p className="max-w-3xl text-lg leading-relaxed text-cs-ink/80">
                  {study.testing.intro}
                </p>
              )}
              <div className="grid gap-4 sm:grid-cols-2 lg:gap-5">
                {study.testing.blocks.map((block) => (
                  <div
                    key={block.label}
                    className="rounded-2xl border-l-2 border-cs-accent bg-cs-card/70 p-5 sm:p-6"
                  >
                    <h3 className="mb-2 font-mono text-[11px] uppercase tracking-[0.16em] text-cs-accent">
                      {block.label}
                    </h3>
                    <p className="leading-relaxed text-cs-ink/80">{block.text}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4 text-cs-ink/80">
              {study.testing.method && <p>{study.testing.method}</p>}
              {study.testing.findings?.map((f) => (
                <p key={f}>{f}</p>
              ))}
            </div>
          )}
        </Section>
      )}

      {study.iterations && (
        <Section id="iterations" eyebrow="15 — Iterations" title="Iterations" width="wide">
          {study.iterations.contentNeeded || study.iterations.placeholder ? (
            <MediaPlaceholder
              label={
                study.iterations.contentNeeded ||
                study.iterations.mediaNeeded ||
                "[MEDIA NEEDED: Before-and-after iteration comparisons]"
              }
            />
          ) : Array.isArray(study.iterations.items) ? (
            <div className="space-y-10">
              {study.iterations.intro && (
                <p className="max-w-3xl text-lg leading-relaxed text-cs-ink/80">
                  {study.iterations.intro}
                </p>
              )}
              <IterationShowcase items={study.iterations.items} />
            </div>
          ) : null}
        </Section>
      )}

      {study.accessibility && (
        <Section
          id="accessibility"
          eyebrow="Accessibility"
          title="Accessibility and inclusive design"
          width="narrow"
        >
          {study.accessibility.contentNeeded ? (
            <p className="rounded-xl border border-dashed border-cs-muted/40 bg-cs-alt/50 px-4 py-3 font-mono text-xs text-cs-soft sm:text-sm">
              {study.accessibility.contentNeeded}
            </p>
          ) : (
            <ul className="space-y-3">
              {(study.accessibility.items || []).map((item) => (
                <li key={item} className="leading-relaxed text-cs-ink/80">
                  {item}
                </li>
              ))}
            </ul>
          )}
        </Section>
      )}

      {/* 23. Final solution */}
      {study.solution && (
        <Section id="solution" eyebrow="16 — Culmination" title="Final solution" tone="ink">
          <div className="space-y-5 text-lg leading-relaxed text-cs-onink/90">
            {(Array.isArray(study.solution.summary)
              ? study.solution.summary
              : [study.solution.summary]
            )
              .filter(Boolean)
              .map((p) => (
                <p key={p}>{p}</p>
              ))}
          </div>
        </Section>
      )}

      {/* 24. Impact */}
      {study.impact && (
        <Section
          id="impact"
          eyebrow="17 — Impact"
          title="Results and impact"
          intro={study.impact.note}
          width="default"
        >
          {study.impact.contentNeeded ? (
            <MediaPlaceholder label={study.impact.contentNeeded} aspect="video" />
          ) : study.impact.cards ? (
            <div className="space-y-8">
              {study.impact.intro && (
                <p className="max-w-3xl text-lg leading-relaxed text-cs-ink/80">
                  {study.impact.intro}
                </p>
              )}
              <div className="grid gap-4 sm:grid-cols-2 lg:gap-5">
                {study.impact.cards.map((card) => (
                  <div
                    key={card.title}
                    className="rounded-2xl border border-cs-border/45 border-l-2 border-l-cs-accent bg-cs-card/70 p-5 sm:p-6"
                  >
                    <h3 className="mb-2 font-display text-lg font-semibold text-cs-ink">
                      {card.title}
                    </h3>
                    <p className="leading-relaxed text-cs-ink/75">{card.text}</p>
                  </div>
                ))}
              </div>
              {study.impact.validation && (
                <div className="rounded-2xl border border-cs-accent/20 bg-cs-accent/[0.05] p-5 sm:p-6">
                  <h3 className="mb-2 font-mono text-[11px] uppercase tracking-[0.16em] text-cs-accent">
                    Validation
                  </h3>
                  <p className="max-w-3xl text-sm leading-relaxed text-cs-ink/75">
                    {study.impact.validation}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <>
              {study.impact.metrics?.length > 0 && (
                <div className="mb-10 grid grid-cols-2 gap-4 md:grid-cols-4">
                  {study.impact.metrics.map((m) => (
                    <div
                      key={m.label}
                      className="rounded-2xl bg-cs-alt px-4 py-6 text-center sm:px-6"
                    >
                      <p className="font-display text-3xl font-semibold text-cs-soft sm:text-4xl">
                        {m.value}
                      </p>
                      <p className="mt-2 text-sm leading-snug text-cs-ink/75">{m.label}</p>
                    </div>
                  ))}
                </div>
              )}
              {study.impact.qualitative?.length > 0 && (
                <div className="space-y-4">
                  {study.impact.qualitative.map((p) => (
                    <p key={p} className="leading-relaxed text-cs-ink/80">
                      {p}
                    </p>
                  ))}
                </div>
              )}
            </>
          )}
        </Section>
      )}

      {/* 25. Reflection */}
      {study.reflection && (
        <Section
          id="reflection"
          eyebrow="18 — Reflection"
          title="Lessons learned"
          tone="cream"
          width="narrow"
        >
          {study.reflection.learned?.length > 0 && (
            <div className="mb-10 space-y-6">
              {study.reflection.learned.map((item) =>
                typeof item === "string" ? (
                  <p key={item} className="text-lg leading-relaxed text-cs-ink/85">
                    {item}
                  </p>
                ) : (
                  <div key={item.title}>
                    <h3 className="mb-2 font-display text-xl font-semibold text-cs-soft">
                      {item.title}
                    </h3>
                    <p className="leading-relaxed text-cs-ink/80">{item.body}</p>
                  </div>
                )
              )}
            </div>
          )}
          {study.reflection.differently?.length > 0 && (
            <div>
              <h3 className="mb-4 font-display text-xl font-semibold text-cs-soft">
                What I&apos;d do differently
              </h3>
              <ul className="space-y-3">
                {study.reflection.differently.map((item) => (
                  <li key={item} className="flex gap-3 text-cs-ink/80">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cs-muted" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Section>
      )}

      {/* 26. Next steps */}
      {study.nextSteps && (
        <section
          id="next"
          className="cs-section bg-cs-bg"
          style={{
            position: "relative",
            paddingTop: "clamp(56px, 7vh, 96px)",
            paddingBottom: "clamp(110px, 10vw, 160px)",
            overflow: "visible",
          }}
        >
          <motion.div
            className={`${csShellClass} flex flex-col`}
            style={{
              ...csShellStyle,
              gap: "clamp(36px, 5vh, 56px)",
              overflow: "visible",
            }}
            {...fadeUp}
          >
            <header
              className="section-heading-group min-w-0"
              style={{ width: "min(100%, 760px)" }}
            >
              <p className="mb-2 font-mono text-xs uppercase tracking-[0.18em] text-cs-muted">
                19 — Next
              </p>
              <h2 className="font-display text-3xl font-semibold tracking-tight text-cs-ink sm:text-4xl md:text-[2.75rem]">
                Next steps
              </h2>
              {study.nextSteps.intro && (
                <p className="mt-3 text-base leading-relaxed text-cs-ink/70 sm:text-lg">
                  {study.nextSteps.intro}
                </p>
              )}
            </header>

            <div
              className="min-w-0 w-full"
              style={{ width: "min(100%, 1180px)", overflow: "visible" }}
            >
              {Array.isArray(study.nextSteps.steps) ? (
                <NextStepsRoadmap steps={study.nextSteps.steps} />
              ) : (
                <>
                  {study.nextSteps.media && (
                    <div className="mb-10">
                      <MediaBlock {...study.nextSteps.media} />
                    </div>
                  )}
                  {study.nextSteps.phases?.length > 0 && (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {study.nextSteps.phases.map((phase) => (
                        <div
                          key={phase.phase}
                          className="rounded-2xl border border-cs-border/40 bg-cs-alt/40 p-6"
                        >
                          <h3 className="mb-3 font-display text-lg font-semibold text-cs-soft">
                            {phase.phase}
                          </h3>
                          <ul className="space-y-2">
                            {phase.items.map((item) => (
                              <li key={item} className="text-sm text-cs-ink/80">
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                  {study.nextSteps.items?.length > 0 && (
                    <div className="space-y-4">
                      {study.nextSteps.items.map((item) => (
                        <div
                          key={item.title}
                          className="rounded-xl border-l-4 border-cs-soft bg-cs-alt/50 px-5 py-4"
                        >
                          <h3 className="font-semibold text-cs-ink">{item.title}</h3>
                          {item.description && (
                            <p className="mt-1 text-sm leading-relaxed text-cs-ink/75">
                              {item.description}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </motion.div>
        </section>
      )}

      {/* 27. Closing navigation */}
      <section
        className="border-t border-cs-border/40 bg-cs-alt"
        style={{ paddingBlock: "clamp(48px, 7vh, 88px)" }}
      >
        <div className={csShellClass} style={csShellStyle}>
          {study.closing?.visual && (
            <div className="mb-12">
              <MediaBlock {...study.closing.visual} />
            </div>
          )}
          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-cs-muted">
                Continue exploring
              </p>
              <p className="mt-3 max-w-md text-cs-ink/75">
                {study.closing?.contactPrompt ||
                  "Want to talk through the decisions behind this project?"}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to={createPageUrl("Work")}
                className="inline-flex items-center gap-2 rounded-full border border-cs-soft px-5 py-2.5 text-sm font-medium text-cs-soft transition-colors hover:bg-cs-soft hover:text-white"
              >
                <ArrowLeft size={16} />
                All work
              </Link>
              {next && (
                <Link
                  to={createPageUrl(next.slug)}
                  className="inline-flex items-center gap-2 rounded-full bg-cs-soft px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-cs-ink"
                >
                  Next: {next.shortName || next.name}
                  <ArrowRight size={16} />
                </Link>
              )}
              <Link
                to={createPageUrl("Contact")}
                className="inline-flex items-center gap-2 rounded-full bg-cs-inkbg px-5 py-2.5 text-sm font-medium text-cs-onink transition-opacity hover:opacity-90"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
