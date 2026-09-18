import CaseStudyPage from "@/components/case-study/CaseStudyPage";
import { caseStudyById } from "@/data/caseStudies";

export default function MEDEdge() {
  return <CaseStudyPage study={caseStudyById.mededge} />;
}
