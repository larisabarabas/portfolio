import { defineField, defineType } from "sanity";

export const outcomeStat = defineType({
  name: "outcomeStat",
  title: "Outcome number",
  type: "object",
  fields: [
    defineField({
      name: "value",
      title: "Number",
      description: 'Short, e.g. "199", "31%".',
      type: "string",
      validation: (rule) => rule.required().max(8),
    }),
    defineField({
      name: "label",
      title: "Label",
      description:
        'What it counts, e.g. "visitors, up 184% period-over-period".',
      type: "string",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "value", subtitle: "label" },
  },
});
