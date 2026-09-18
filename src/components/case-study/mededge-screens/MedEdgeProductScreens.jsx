import React from "react";
import { ME } from "./screenData";
import LowFiJourney from "./LowFiJourney";
import EvolutionCompare from "./EvolutionCompare";
import ProductSpotlight from "./ProductSpotlight";
import ScreenGallery from "./ScreenGallery";

/**
 * MedEdge wireframes + high-fi product presentation.
 * Desktop-optimized editorial UX story.
 */
export default function MedEdgeProductScreens() {
  return (
    <div
      className="w-full min-w-0 max-w-full overflow-x-clip"
      style={{ backgroundColor: ME.bg }}
    >
      <div className="w-full" style={{ paddingBlock: "clamp(2rem, 4vw, 3rem)" }}>
        <LowFiJourney />
      </div>

      <div
        className="w-full"
        style={{
          backgroundColor: ME.white,
          paddingBlock: "clamp(4rem, 8vw, 6.5rem)",
        }}
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <EvolutionCompare />
        </div>
      </div>

      <div
        className="w-full"
        style={{
          backgroundColor: ME.bg,
          paddingBlock: "clamp(2rem, 4vw, 3rem)",
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            id="spotlight-heading"
            className="mb-2 font-body text-[clamp(1.85rem,3.4vw,2.75rem)] font-semibold tracking-tight"
            style={{ color: ME.navy }}
          >
            A connected clinical workspace
          </h2>
          <p className="mb-10 max-w-2xl text-base leading-relaxed" style={{ color: ME.slate }}>
            Step through the core high-fidelity screens: patient context, safety,
            recommendations, and treatment planning.
          </p>
        </div>
        <ProductSpotlight />
      </div>

      <div
        className="w-full"
        style={{
          backgroundColor: ME.white,
          paddingBlock: "clamp(4rem, 8vw, 6.5rem)",
        }}
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScreenGallery />
        </div>
      </div>
    </div>
  );
}
