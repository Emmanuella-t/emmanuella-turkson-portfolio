import CaseStudyPage from "@/components/case-study/CaseStudyPage";
import { caseStudyById } from "@/data/caseStudies";

export default function ZoomRedesign() {
  return <CaseStudyPage study={caseStudyById.zoom} />;
}
