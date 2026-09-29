import { Logo } from "@/components/layout/Logo";
import { type Slide, SlideDeck } from "@/components/layout/SlideDeck";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { DevNotes } from "@/components/sections/DevNotes";
import { Experience } from "@/components/sections/Experience";
import { Experiments } from "@/components/sections/Experiments";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Skills } from "@/components/sections/Skills";
import { WorkSection } from "@/components/sections/WorkSection";
import { SECTION_LABELS } from "@/lib/constants";
import { sanityFetch } from "@/lib/sanity/fetch";
import {
  articleLinksQuery,
  experienceEntriesQuery,
  projectsQuery,
  siteSettingsQuery,
} from "@/lib/sanity/queries";
import type {
  ArticleLinksQueryResult,
  ExperienceEntriesQueryResult,
  ProjectsQueryResult,
  SiteSettingsQueryResult,
} from "@/lib/sanity/sanity.types";

export default async function Home() {
  const [projects, experienceEntries, articleLinks, siteSettings] =
    await Promise.all([
      sanityFetch<ProjectsQueryResult>({ query: projectsQuery, fallback: [] }),
      sanityFetch<ExperienceEntriesQueryResult>({
        query: experienceEntriesQuery,
        fallback: [],
      }),
      sanityFetch<ArticleLinksQueryResult>({
        query: articleLinksQuery,
        fallback: [],
      }),
      sanityFetch<SiteSettingsQueryResult>({
        query: siteSettingsQuery,
        fallback: null,
      }),
    ]);

  const slides: Slide[] = [
    { id: "hero", label: SECTION_LABELS.hero, content: <Hero /> },
    { id: "services", label: SECTION_LABELS.services, content: <Services /> },
    {
      id: "work",
      label: SECTION_LABELS.work,
      content: <WorkSection projects={projects} />,
    },
    { id: "about", label: SECTION_LABELS.about, content: <About /> },
    { id: "skills", label: SECTION_LABELS.skills, content: <Skills /> },
    {
      id: "experience",
      label: SECTION_LABELS.experience,
      content: <Experience entries={experienceEntries} />,
    },
    ...(siteSettings?.showExperiments
      ? [
          {
            id: "experiments",
            label: SECTION_LABELS.experiments,
            content: <Experiments />,
          },
        ]
      : []),
    {
      id: "devnotes",
      label: SECTION_LABELS.devnotes,
      content: <DevNotes articleLinks={articleLinks} />,
    },
    { id: "contact", label: SECTION_LABELS.contact, content: <Contact /> },
  ];

  return (
    <>
      <a
        href="#main"
        className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4 focus-visible:z-[100] focus-visible:rounded-pill focus-visible:bg-ink focus-visible:px-5 focus-visible:py-3 focus-visible:font-semibold focus-visible:text-paper focus-visible:no-underline"
      >
        Skip to content
      </a>
      <Logo />
      <ThemeToggle />
      <SlideDeck slides={slides} />
    </>
  );
}
