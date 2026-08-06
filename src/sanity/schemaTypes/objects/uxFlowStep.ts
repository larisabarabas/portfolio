import { defineField, defineType } from "sanity";

export const uxFlowStep = defineType({
  name: "uxFlowStep",
  title: "UX flow step",
  type: "object",
  fields: [
    defineField({
      name: "stepNumber",
      title: "Step number",
      description: 'e.g. "01"',
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "label",
      title: "Label",
      description: 'e.g. "Browse"',
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "stepNumber" },
  },
});
