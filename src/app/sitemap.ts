import type { MetadataRoute } from "next";
import { sanityFetch } from "@/lib/sanity/fetch";
import { projectSlugsQuery } from "@/lib/sanity/queries";
import type { ProjectSlugsQueryResult } from "@/lib/sanity/sanity.types";

const BASE_URL = "https://www.stefaniabarabas.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await sanityFetch<ProjectSlugsQueryResult>({
    query: projectSlugsQuery,
    fallback: [],
  });

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...projects.map(({ slug }) => ({
      url: `${BASE_URL}/work/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
