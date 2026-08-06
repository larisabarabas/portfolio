import { defineField, defineType } from "sanity";

export const summaryPoint = defineType({
  name: "summaryPoint",
  title: "Summary point",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      description:
        'Bold inline lead-in, e.g. "Problem", "What I built", "Result".',
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "text",
      title: "Text",
      type: "text",
      rows: 2,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "text" },
  },
});
