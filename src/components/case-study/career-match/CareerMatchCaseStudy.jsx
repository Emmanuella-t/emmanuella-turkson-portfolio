import React from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { createPageUrl } from "@/utils/routes";
import { getNextCaseStudy } from "@/data/caseStudies";
import study from "@/data/caseStudies/careerMatch";

const EASE = [0.22, 1, 0.36, 1];
const CM = {
  ink: "#14181F",
  slate: "#5C6570",
  pale: "#D8DEE6",
  paper: "#F4F1EC",
  white: "#FFFFFF",
  accent: "#BC7821",
  accentSoft: "#E8C48A",
  deep: "#0E1218",
};

const IMG =
  "/case-studies/career_match_case_study/generated_images/career-match-case-study-images";

const APPROACH = [
  "Establish a baseline",
  "Measure it",
  "Find where it breaks",
  "Introduce semantics",
  "Benchmark it",
  "Stress-test it",
  "Translate it into a product",
];

function Reveal({ children, className = "", delay = 0 }) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function Shell({ children, className = "" }) {
  return (
    <div
      className={`mx-auto w-full min-w-0 px-4 sm:px-6 lg:px-8 ${className}`}
      style={{ maxWidth: 1280 }}
    >
      {children}
    </div>
  );
}

function Art({ src, alt, className = "", priority = false }) {
  return (
    <img
      src={src}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      draggable={false}
      className={`block h-auto w-full max-w-full object-contain ${className}`}
    />
  );
}

function SectionHead({ eyebrow, title, intro, light = false }) {
  return (
    <header className="max-w-3xl">
      <p
        className="font-mono text-[11px] uppercase tracking-[0.2em]"
        style={{ color: light ? CM.accentSoft : CM.accent }}
      >
        {eyebrow}
      </p>
      <h2
        className="mt-4 font-display text-[clamp(1.85rem,4vw,3rem)] font-semibold leading-[1.12] tracking-tight"
        style={{ color: light ? CM.paper : CM.ink }}
      >
        {title}
      </h2>
      {intro && (
        <p
          className="mt-5 max-w-2xl text-base leading-relaxed sm:text-lg"
          style={{ color: light ? "rgba(244,241,236,0.72)" : CM.slate }}
        >
          {intro}
        </p>
      )}
    </header>
  );
}

/**
 * Career Match — editorial case study.
 * Facts from career-match repo; transparent PNGs carry the visual story.
 */
export default function CareerMatchCaseStudy() {
  const next = getNextCaseStudy(study.id);

  return (
    <article className="min-w-0 overflow-x-clip" style={{ backgroundColor: CM.paper }}>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ backgroundColor: CM.deep }}>
        <Shell className="grid items-center gap-8 py-[clamp(4rem,9vw,7rem)] lg:grid-cols-12 lg:gap-6">
          <Reveal className="relative z-10 lg:col-span-5">
            <p
              className="font-mono text-[11px] uppercase tracking-[0.22em]"
              style={{ color: CM.accentSoft }}
            >
              Case study · AI + Product
            </p>
            <h1
              className="mt-5 font-display text-[clamp(2.2rem,5vw,3.75rem)] font-semibold leading-[1.05] tracking-tight"
              style={{ color: CM.paper }}
            >
              What if job matching understood experience, not just keywords?
            </h1>
            <p
              className="mt-6 max-w-md text-base leading-relaxed sm:text-lg"
              style={{ color: "rgba(244,241,236,0.72)" }}
            >
              Career Match is an explainable resume-to-job matching system I built
              to test how far keyword overlap can go — and what happens when we
              teach the product to understand meaning instead.
            </p>
            <dl className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                ["Role", study.overview.role],
                ["Focus", "Relevance scoring with explanations"],
                ["Stack", study.overview.tools],
                ["Status", "Development prototype · not a hiring model"],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt
                    className="font-mono text-[10px] uppercase tracking-[0.16em]"
                    style={{ color: CM.accentSoft }}
                  >
                    {k}
                  </dt>
                  <dd className="mt-1 text-sm leading-snug" style={{ color: CM.paper }}>
                    {v}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-7 lg:col-start-6">
            <Art
              priority
              src={`${IMG}/01-career-match-hero-product-ecosystem.png`}
              alt="Career Match across desktop and phone, with resume upload and recommended roles"
              className="w-full"
            />
          </Reveal>
        </Shell>
      </section>

      {/* 02 Problem */}
      <section className="py-[clamp(4rem,9vw,7rem)]" style={{ backgroundColor: CM.paper }}>
        <Shell>
          <Reveal>
            <SectionHead
              eyebrow="02 — The problem"
              title="The right experience can get lost in the wrong words."
              intro="A keyword system rewards shared vocabulary — even when the experience underneath is a better match than the words suggest."
            />
          </Reveal>
          <Reveal delay={0.08} className="mt-10 lg:-mx-6 xl:-mx-10">
            <Art
              src={`${IMG}/05-career-match-keyword-vs-semantic-comparison.png`}
              alt="Keyword matching missing related experience, compared with Career Match recognizing meaning beyond exact words"
            />
          </Reveal>
          <Reveal delay={0.04} className="mt-8 max-w-xl">
            <p
              className="font-display text-2xl font-semibold leading-snug tracking-tight sm:text-[1.75rem]"
              style={{ color: CM.ink }}
            >
              Same words = right candidate?
            </p>
          </Reveal>
        </Shell>
      </section>

      {/* 03 Who */}
      <section className="py-[clamp(3.5rem,8vw,6rem)]" style={{ backgroundColor: CM.white }}>
        <Shell className="grid items-start gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <SectionHead
              eyebrow="03 — Who this affects"
              title="A strong candidate shouldn't disappear because they phrased something differently."
              intro="I did not invent personas or survey quotes for this project. The stakes are still clear: candidates get filtered by vocabulary, and recruiters inherit rankings they cannot easily inspect."
            />
          </Reveal>
          <Reveal delay={0.06} className="lg:col-span-5 lg:pt-16">
            <div className="space-y-8">
              {[
                {
                  t: "Candidates",
                  b: "Real experience can rank lower simply because the language was different.",
                },
                {
                  t: "Recruiters & teams",
                  b: "A score without explanation is hard to trust — especially when keyword tricks inflate rankings.",
                },
              ].map((item) => (
                <div key={item.t} className="border-t pt-5" style={{ borderColor: CM.pale }}>
                  <h3 className="font-display text-lg font-semibold" style={{ color: CM.ink }}>
                    {item.t}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: CM.slate }}>
                    {item.b}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </Shell>
      </section>

      {/* 04 Approach */}
      <section className="py-[clamp(3.5rem,8vw,6rem)]" style={{ backgroundColor: CM.paper }}>
        <Shell>
          <Reveal>
            <SectionHead
              eyebrow="04 — My approach"
              title="I started with the simplest version I could test."
              intro="A transparent baseline first. Then measure it, and let the failures decide what to build next."
            />
          </Reveal>
          <Reveal delay={0.05} className="mt-10">
            <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
              {APPROACH.map((step, i) => (
                <li key={step} className="list-none border-t pt-4" style={{ borderColor: CM.pale }}>
                  <span
                    className="font-mono text-[10px] tabular-nums tracking-[0.16em]"
                    style={{ color: CM.accent }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-2 text-sm font-medium leading-snug" style={{ color: CM.ink }}>
                    {step}
                  </p>
                </li>
              ))}
            </ol>
          </Reveal>
        </Shell>
      </section>

      {/* 05 TF-IDF */}
      <section className="py-[clamp(3.5rem,8vw,6rem)]" style={{ backgroundColor: CM.deep }}>
        <Shell className="max-w-3xl">
          <Reveal>
            <SectionHead
              light
              eyebrow="05 — TF-IDF baseline"
              title="First, I needed to see how far keywords could take me."
              intro="The lexical baseline compares one resume and one job with TF-IDF similarity plus catalog skill overlap. The score is a 0–100 relevance signal — not a hire probability. It was transparent, inspectable, and deliberately simple. That made the next question unavoidable: where does this start to fail?"
            />
          </Reveal>
        </Shell>
      </section>

      {/* 06 Breaks */}
      <section className="py-[clamp(3.5rem,8vw,6.5rem)]" style={{ backgroundColor: CM.white }}>
        <Shell>
          <Reveal>
            <SectionHead
              eyebrow="06 — Where it broke"
              title="Then I found where keyword matching started to fall apart."
              intro="On synthetic development pairs, the lexical matcher often rewarded surface overlap — including resumes that stuffed the skill catalog without showing real outcomes."
            />
          </Reveal>
          <Reveal delay={0.05} className="mt-10 grid gap-8 md:grid-cols-3">
            {[
              {
                t: "Vocabulary mismatch",
                b: "“REST services” and “REST APIs” mean similar things to a person — and little to a keyword counter.",
              },
              {
                t: "Keyword stuffing",
                b: "A resume can list every catalog skill and climb the ranking without shipping anything.",
              },
              {
                t: "Missing context",
                b: "Shallow textual similarity can look confident while ignoring what was actually built.",
              },
            ].map((c) => (
              <div key={c.t} className="border-t pt-5" style={{ borderColor: CM.pale }}>
                <h3 className="font-display text-lg font-semibold" style={{ color: CM.ink }}>
                  {c.t}
                </h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: CM.slate }}>
                  {c.b}
                </p>
              </div>
            ))}
          </Reveal>
        </Shell>
      </section>

      {/* 07 Semantic */}
      <section className="overflow-hidden py-[clamp(4rem,9vw,7rem)]" style={{ backgroundColor: CM.paper }}>
        <Shell className="grid items-center gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <SectionHead
              eyebrow="07 — Semantic matching"
              title="So I taught Career Match to look beyond exact words."
              intro="Semantic Matcher v0.1 encodes the resume and the job with MiniLM, then compares meaning with cosine similarity. Nearby phrasing can match even when the exact tokens differ. It is still a relevance signal — not a hiring decision."
            />
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-8 lg:-mr-8 xl:-mr-16">
            <Art
              src={`${IMG}/06-career-match-semantic-matching-system.png`}
              alt="Resume and job descriptions becoming semantic representations, then a match result"
            />
          </Reveal>
        </Shell>
      </section>

      {/* 08 How it works */}
      <section className="overflow-hidden py-[clamp(3rem,7vw,5.5rem)]" style={{ backgroundColor: CM.white }}>
        <Shell>
          <Reveal>
            <SectionHead
              eyebrow="08 — How it works"
              title="Here’s what happens between a resume and a match."
              intro="Submit a resume and a job. Compare them. Get a score with evidence a person can inspect — not a black-box rank."
            />
          </Reveal>
        </Shell>
        <Reveal delay={0.08} className="mt-6 px-2 sm:px-0">
          <div className="mx-auto w-full lg:w-[min(1440px,108%)] lg:max-w-none lg:-translate-x-[2%]">
            <Art
              src={`${IMG}/04-career-match-resume-to-opportunity-flow.png`}
              alt="Resume moving through extraction, representation, comparison, explanation, and recommended opportunities"
            />
          </div>
        </Reveal>
      </section>

      {/* 09 Product */}
      <section className="overflow-hidden py-[clamp(4rem,9vw,7rem)]" style={{ backgroundColor: CM.paper }}>
        <Shell className="grid items-end gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-4 lg:pb-10">
            <SectionHead
              eyebrow="09 — Product experience"
              title="A match score alone wasn't enough."
              intro="The number has to be inspectable: matching skills, gaps, and why the score appeared. Scores are relevance signals — not hiring probabilities, and not production models."
            />
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-8 lg:-mr-6">
            <Art
              src={`${IMG}/02-career-match-desktop-match-analysis.png`}
              alt="Career Match desktop analysis with resume, role requirements, score, strengths, and gaps"
            />
          </Reveal>
        </Shell>
      </section>

      {/* Mobile / responsive exploration — after desktop, not beside it */}
      <section className="py-[clamp(3rem,7vw,5.5rem)]" style={{ backgroundColor: CM.white }}>
        <Shell className="grid items-center gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-5 md:col-start-1">
            <p
              className="font-mono text-[11px] uppercase tracking-[0.2em]"
              style={{ color: CM.accent }}
            >
              A more focused view
            </p>
            <h2
              className="mt-4 font-display text-[clamp(1.6rem,3vw,2.25rem)] font-semibold leading-snug tracking-tight"
              style={{ color: CM.ink }}
            >
              The same decision, narrowed to what fits on a small screen.
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed" style={{ color: CM.slate }}>
              This is a responsive exploration of the match analysis — score, missing
              requirements, and next steps — not a separate native app.
            </p>
          </Reveal>
          <Reveal delay={0.08} className="md:col-span-5 md:col-start-8">
            <Art
              src={`${IMG}/03-career-match-mobile-match-experience.png`}
              alt="Career Match match detail explored in a phone-sized layout"
            />
          </Reveal>
        </Shell>
      </section>

      {/* 10 Evaluation */}
      <section className="overflow-hidden py-[clamp(4rem,9vw,7rem)]" style={{ backgroundColor: CM.paper }}>
        <Shell>
          <Reveal>
            <SectionHead
              eyebrow="10 — Evaluation"
              title="I needed to know if the new approach was actually better."
              intro="Development benchmark v0.2: 8 roles, 7 resumes judged per role, 56 pairs, 24 unique resumes. Labels are synthetic and not independently validated ground truth. The graphic below is MiniLM on that set — ranking quality, not “90% accurate hiring.”"
            />
          </Reveal>
          <Reveal delay={0.08} className="mt-8 lg:-mx-4 xl:-mx-8">
            <Art
              src={`${IMG}/08-career-match-benchmark-results.png`}
              alt="MiniLM v0.2 synthetic development benchmark: P@1 1.000, P@3 0.792, R@3 0.688, NDCG@3 0.900, pairwise 0.865"
            />
          </Reveal>
        </Shell>
      </section>

      {/* 11 Stress */}
      <section className="overflow-hidden py-[clamp(4rem,9vw,7rem)]" style={{ backgroundColor: CM.deep }}>
        <Shell>
          <Reveal>
            <SectionHead
              light
              eyebrow="11 — Stress testing"
              title="The numbers looked good. So I tried to break it."
              intro="I used adversarial-style pairs from the project benchmarks. Good metrics are not the end of the story — they are a reason to look for misleading confidence."
            />
          </Reveal>
          <Reveal delay={0.08} className="mt-8 lg:-mx-6 xl:-mx-12">
            <Art
              src={`${IMG}/07-career-match-stress-test-stuffing-negation.png`}
              alt="Keyword stuffing inflating a match, and a negation still being counted as experience"
            />
          </Reveal>
          <Reveal delay={0.04} className="mt-6 max-w-2xl">
            <p className="text-base leading-relaxed" style={{ color: "rgba(244,241,236,0.72)" }}>
              MiniLM is not a negation model. A line like “I do not have Kubernetes
              experience” can still sit near related skills. Hybrid heuristics help
              with stuffing and some negation phrases — they do not pretend the
              problem is solved.
            </p>
          </Reveal>
        </Shell>
      </section>

      {/* 12 Iteration */}
      <section className="py-[clamp(3.5rem,8vw,6rem)]" style={{ backgroundColor: CM.paper }}>
        <Shell className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <SectionHead
              eyebrow="12 — Iteration"
              title="Every weakness gave me something new to improve."
              intro="The path was a sequence of measurements, not a template."
            />
          </Reveal>
          <Reveal delay={0.05} className="lg:col-span-6 lg:col-start-7">
            <div className="relative border-l pl-8" style={{ borderColor: CM.pale }}>
              {[
                "TF-IDF baseline — transparent, measurable, limited",
                "Semantic MiniLM — better meaning, new failure modes",
                "Development benchmark — compare matchers on the same pairs",
                "Stress cases — stuffing and negation as design inputs",
                "Hybrid heuristics — evidence-aware mix, frozen weights",
                "Product experience — scores people can inspect",
              ].map((line, i) => (
                <div key={line} className="relative pb-7 last:pb-0">
                  <span
                    className="absolute -left-[1.6rem] top-1.5 h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: CM.accent }}
                    aria-hidden
                  />
                  <p className="text-base leading-relaxed" style={{ color: CM.ink }}>
                    <span className="font-mono text-[11px]" style={{ color: CM.accent }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="ml-3">{line}</span>
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </Shell>
      </section>

      {/* 13 Current */}
      <section className="py-[clamp(3.5rem,8vw,6rem)]" style={{ backgroundColor: CM.white }}>
        <Shell className="max-w-3xl">
          <Reveal>
            <SectionHead
              eyebrow="13 — Current solution"
              title="This is where Career Match is today."
              intro="Three development matchers, an explainable product prototype, and honest limits. Live deployment is in progress. This is an evolving system, not a finished hiring engine."
            />
          </Reveal>
          <Reveal delay={0.05} className="mt-8">
            <ul className="space-y-3">
              {[
                "Lexical, semantic, and hybrid matchers for comparison",
                "Guest match path with clear relevance framing",
                "Skill evidence beside the score",
                "Job discovery and grounded resume tailoring in the product arc",
              ].map((t) => (
                <li
                  key={t}
                  className="border-t pt-3 text-sm leading-relaxed"
                  style={{ borderColor: CM.pale, color: CM.slate }}
                >
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </Shell>
      </section>

      {/* 14 Reflection */}
      <section className="py-[clamp(3.5rem,8vw,6rem)]" style={{ backgroundColor: CM.paper }}>
        <Shell>
          <Reveal>
            <SectionHead
              eyebrow="14 — Reflection"
              title="The biggest lesson wasn't about the model."
            />
          </Reveal>
          <Reveal delay={0.05} className="mt-10 grid gap-10 md:grid-cols-3">
            {[
              {
                t: "Evaluation changes product decisions.",
                b: "Once stuffing and negation showed up in rankings, the interface and hybrid heuristics had to respond — not just the model card.",
              },
              {
                t: "Semantic similarity is not semantic truth.",
                b: "Nearby meaning helps. It does not understand “I do not have this experience” the way a person does.",
              },
              {
                t: "AI output still needs thoughtful UX.",
                b: "A score without explanation invites blind trust. Matched and missing skills make the number discussable.",
              },
            ].map((c) => (
              <div key={c.t}>
                <h3 className="font-display text-xl font-semibold leading-snug" style={{ color: CM.ink }}>
                  {c.t}
                </h3>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: CM.slate }}>
                  {c.b}
                </p>
              </div>
            ))}
          </Reveal>
        </Shell>
      </section>

      {/* 15 Next */}
      <section className="py-[clamp(3.5rem,8vw,6rem)]" style={{ backgroundColor: CM.white }}>
        <Shell>
          <Reveal>
            <SectionHead
              eyebrow="15 — What's next"
              title="There are still a few things I want Career Match to get better at."
              intro="Keep the holdout frozen. Improve negation and stuffing defenses without retuning against it. Keep polishing the live product path."
            />
          </Reveal>
          <Reveal delay={0.05} className="mt-8">
            <ul className="grid gap-4 sm:grid-cols-2">
              {[
                "Stronger negation handling",
                "Harder defenses against keyword stuffing",
                "Broader, better-labeled evaluation sets",
                "Clearer ranking explanations in the UI",
                "Weighting experiments that respect frozen holdout rules",
                "A more polished live demo experience",
              ].map((item) => (
                <li
                  key={item}
                  className="list-none border-t pt-4 text-base"
                  style={{ borderColor: CM.pale, color: CM.ink }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </Shell>
      </section>

      <section className="border-t py-16" style={{ borderColor: CM.pale, backgroundColor: CM.paper }}>
        <Shell className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em]" style={{ color: CM.accent }}>
              Continue exploring
            </p>
            <p className="mt-2 max-w-md text-base" style={{ color: CM.slate }}>
              {study.closing.contactPrompt}
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link
              to={createPageUrl("Work")}
              className="inline-flex items-center gap-2 font-body text-sm font-semibold"
              style={{ color: CM.ink }}
            >
              <ArrowLeft size={16} aria-hidden />
              All work
            </Link>
            {next && (
              <Link
                to={createPageUrl(next.slug)}
                className="inline-flex items-center gap-2 font-body text-sm font-semibold"
                style={{ color: CM.accent }}
              >
                Next: {next.shortName || next.name}
                <ArrowRight size={16} aria-hidden />
              </Link>
            )}
            <Link
              to={createPageUrl("Contact")}
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-body text-sm font-semibold text-white"
              style={{ backgroundColor: CM.ink }}
            >
              Get in touch
            </Link>
          </div>
        </Shell>
      </section>
    </article>
  );
}
