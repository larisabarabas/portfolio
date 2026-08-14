import { defineQuery } from "next-sanity";

export const projectsQuery = defineQuery(
  `*[_type == "project"] | order(order asc)`,
);

export const projectBySlugQuery = defineQuery(
  `*[_type == "project" && slug.current == $slug][0]{
    ...,
    uxFlowImage{
      ...,
      "aspectRatio": asset->metadata.dimensions.aspectRatio
    }
  }`,
);

export const projectSlugsQuery = defineQuery(
  `*[_type == "project" && hasCaseStudy == true]{ "slug": slug.current, _updatedAt }`,
);

export const experienceEntriesQuery = defineQuery(
  `*[_type == "experienceEntry"] | order(order asc)`,
);

export const articleLinksQuery = defineQuery(
  `*[_type == "articleLink"] | order(order asc)`,
);

export const openSourceProjectQuery = defineQuery(
  `*[_type == "openSourceProject"] | order(order asc)`,
);

export const siteSettingsQuery = defineQuery(`*[_type == "siteSettings"][0]`);
