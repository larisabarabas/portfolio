import { Logo } from "@/components/layout/Logo";
import { NavDots } from "@/components/layout/NavDots";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { DevNotes } from "@/components/sections/DevNotes";
import { Experience } from "@/components/sections/Experience";
import { Experiments } from "@/components/sections/Experiments";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
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
      <a
        href="#main"
        className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4 focus-visible:z-[100] focus-visible:rounded-pill focus-visible:bg-ink focus-visible:px-5 focus-visible:py-3 focus-visible:font-semibold focus-visible:text-paper focus-visible:no-underline"
      >
        Skip to content
      </a>
      <Logo />
      <NavDots />
      <main id="main">
        <Hero />
        <Services />
        <WorkSection projects={projects} />
        <About />
        <Experience entries={experienceEntries} />
        <Skills />
        {siteSettings?.showExperiments && <Experiments />}
        <DevNotes articleLinks={articleLinks} />
        <Contact />
      </main>
    </>
  );
}
