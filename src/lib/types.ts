import type { SanityImageSource } from "@sanity/image-url";

export type AccentColor = "primary" | "secondary" | "tertiary" | "soft";

export type SummaryPoint = {
  label: string;
  text: string;
};

export type MetaLink = {
  label: string;
  url: string;
};

export type UXFlowStep = {
  stepNumber: string;
  label: string;
  description: string;
};

export type DecisionCard = {
  heading: string;
  decisionText: string;
  tradeoffText: string;
};

export type Project = {
  _id: string;
  title: string;
  slug: string;
  order: number;
  statusLabel: string;
  statusPillColor: AccentColor;
  accentColor: "primary" | "tertiary";
  mainImage: SanityImageSource;
  summaryPoints: SummaryPoint[];
  techTags: string[];
  liveUrl?: string;
  liveUrlLabel?: string;
  githubUrl?: string;
  hasCaseStudy: boolean;
  subtitle?: string;
  role?: string;
  timelineLabel?: string;
  timelineValue?: string;
  stackText?: string;
  metaLinks?: MetaLink[];
  problemBody?: string;
  uxFlowImage?: SanityImageSource;
  uxFlowPlaceholderLabel?: string;
  uxFlowSteps?: UXFlowStep[];
  decisions?: DecisionCard[];
  outcomeHeading?: string;
  outcomeBody?: string;
  outcomeCtaLabel?: string;
  outcomeCtaUrl?: string;
};

export type ExperienceEntry = {
  _id: string;
  dateRange: string;
  location: string;
  role: string;
  description: string;
  dotColor: AccentColor | "magenta";
  order: number;
  compact: boolean;
};

export type ArticleLink = {
  _id: string;
  publicationAndRole: string;
  title: string;
  url: string;
  order: number;
};

export type SiteSettings = {
  showExperiments: boolean;
};
