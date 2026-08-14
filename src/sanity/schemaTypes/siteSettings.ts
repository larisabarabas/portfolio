import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "showExperiments",
      title: "Show Experiments section",
      description:
        "Toggles whether the still-evolving Experiments section renders on the homepage.",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "showOpenSourceProjects",
      title: "Show Open Source Projects section",
      description:
        "Toggles whether the still-evolving Open Source Projects section renders on the homepage.",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "showHowIWork",
      title: "Show How I work section",
      description:
        "Toggles whether the 'How I Work' section renders on the homepage.",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site Settings" }),
  },
});
