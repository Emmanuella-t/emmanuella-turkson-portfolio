import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE, ME } from "./palette";
import PriorityOpportunity from "./PriorityOpportunity";
import ExplainabilityOpportunity from "./ExplainabilityOpportunity";
import ClinicalControlOpportunity from "./ClinicalControlOpportunity";
import OpportunitySynthesis from "./OpportunitySynthesis";
import DesignPrinciples from "./DesignPrinciples";

/**
 * Opportunity Areas → Synthesis → Design Principles
 * Begins at Opportunity Areas; does not duplicate Design Direction header.
 */
export default function OpportunityAreasStory({
  opportunities = [],
  principles = [],
}) {
  const reduceMotion = useReducedMotion();
  const [opp1, opp2, opp3] = opportunities;

  return (
    <div
      className="w-full min-w-0 max-w-full overflow-x-clip"
      style={{ backgroundColor: ME.bg }}
    >
      <div className="mx-auto w-full max-w-6xl px-0">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45, ease: EASE }}
        >
          <p
            className="font-mono text-[12px] uppercase tracking-[0.18em] sm:text-[13px]"
            style={{ color: ME.navy }}
          >
            Research understanding / Three product opportunities
          </p>
        </motion.div>

        {/* Mobile/tablet: stack · Desktop: asymmetric staggered trio */}
        <div
          className="mt-10 flex flex-col gap-8 md:gap-10 lg:mt-14 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-6 xl:gap-x-8"
        >
          <div className="min-w-0 lg:col-span-4 lg:col-start-1 lg:mt-14">
            {opp1 ? (
              <PriorityOpportunity
                title={opp1.title}
                description={opp1.description}
              />
            ) : null}
          </div>

          <div className="min-w-0 lg:col-span-4 lg:col-start-5 lg:mt-0 lg:z-[1]">
            {opp2 ? (
              <ExplainabilityOpportunity
                title={opp2.title}
                description={opp2.description}
              />
            ) : null}
          </div>

          <div className="min-w-0 lg:col-span-4 lg:col-start-9 lg:mt-8">
            {opp3 ? (
              <ClinicalControlOpportunity
                title={opp3.title}
                description={opp3.description}
              />
            ) : null}
          </div>
        </div>
      </div>

      <div
        className="mx-auto w-full max-w-6xl"
        style={{
          paddingTop: "clamp(4.5rem, 8vw, 6.5rem)",
          paddingBottom: "clamp(3.5rem, 6vw, 5rem)",
        }}
      >
        <OpportunitySynthesis />
      </div>

      {/* Principles: near-full-width navy field within section */}
      <div className="-mx-4 overflow-hidden sm:mx-0 sm:rounded-2xl">
        <DesignPrinciples principles={principles} />
      </div>
    </div>
  );
}
