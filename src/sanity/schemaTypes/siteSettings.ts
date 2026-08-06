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
      initialValue: true,
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site Settings" }),
  },
});
