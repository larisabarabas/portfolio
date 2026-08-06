import { defineField, defineType } from "sanity";

export const decisionCard = defineType({
  name: "decisionCard",
  title: "Decision card",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "decisionText",
      title: "Decision",
      type: "text",
      rows: 2,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tradeoffText",
      title: "Tradeoff",
      type: "text",
      rows: 2,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "heading", subtitle: "decisionText" },
  },
});
