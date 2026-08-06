import { defineField, defineType } from "sanity";

export const metaLink = defineType({
  name: "metaLink",
  title: "Meta link",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      description: 'e.g. "Live site", "GitHub"',
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "url",
      title: "URL",
      type: "url",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "url" },
  },
});
