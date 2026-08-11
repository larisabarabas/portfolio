import { Logo } from "@/components/layout/Logo";
import { NavDots } from "@/components/layout/NavDots";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { DevNotes } from "@/components/sections/DevNotes";
import { Experience } from "@/components/sections/Experience";
import { Experiments } from "@/components/sections/Experiments";
import { Hero } from "@/components/sections/Hero";
import { HowIWork } from "@/components/sections/HowIWork";
import { Skills } from "@/components/sections/Skills";
import { WorkSection } from "@/components/sections/WorkSection";
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

  return (
    <>
      <Logo />
      <NavDots />
      <Hero />
      <WorkSection projects={projects} />
      <About />
      <HowIWork />
      <Skills />
      <Experience entries={experienceEntries} />
      {siteSettings?.showExperiments && <Experiments />}
      <DevNotes articleLinks={articleLinks} />
      <Contact />
    </>
  );
}
