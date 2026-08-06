import { articleLink } from "./articleLink";
import { experienceEntry } from "./experienceEntry";
import { decisionCard } from "./objects/decisionCard";
import { metaLink } from "./objects/metaLink";
import { summaryPoint } from "./objects/summaryPoint";
import { uxFlowStep } from "./objects/uxFlowStep";
import { project } from "./project";
import { siteSettings } from "./siteSettings";

export const schemaTypes = [
  // documents
  project,
  experienceEntry,
  articleLink,
  siteSettings,
  // objects
  summaryPoint,
  metaLink,
  uxFlowStep,
  decisionCard,
];
