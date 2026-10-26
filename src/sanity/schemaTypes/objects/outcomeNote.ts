import { defineField, defineType } from "sanity";

export const outcomeNote = defineType({
  name: "outcomeNote",
  title: "Outcome note",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      description: 'e.g. "What worked", "What it cost".',
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "Text",
      description: "Separate paragraphs with a blank line.",
      type: "text",
      rows: 8,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "heading", subtitle: "body" },
  },
});
