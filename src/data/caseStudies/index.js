import zoom from './zoom';
import mededge from './mededge';
import rise from './rise';
import careerMatch from './careerMatch';

export const caseStudies = [zoom, mededge, rise, careerMatch];

export const caseStudyById = {
  zoom,
  mededge,
  rise,
  'career-match': careerMatch,
  careerMatch,
};

export function getNextCaseStudy(id) {
  const index = caseStudies.findIndex((study) => study.id === id);
  if (index === -1) return null;
  return caseStudies[(index + 1) % caseStudies.length];
}

export function getPrevCaseStudy(id) {
  const index = caseStudies.findIndex((study) => study.id === id);
  if (index === -1) return null;
  return caseStudies[(index - 1 + caseStudies.length) % caseStudies.length];
}

export default caseStudies;
