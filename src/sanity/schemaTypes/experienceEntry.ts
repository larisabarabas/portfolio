import { defineField, defineType } from "sanity";

export const experienceEntry = defineType({
  name: "experienceEntry",
  title: "Experience entry",
  type: "document",
  fields: [
    defineField({
      name: "dateRange",
      title: "Date range",
      description: 'e.g. "05/2025 — 04/2026 · Stockholm, Sweden · Remote"',
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
    }),
    defineField({
      name: "role",
      title: "Role / heading",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      description: "One bullet point per item.",
      type: "array",
      of: [
        {
          type: "string",
          validation: (rule) => rule.required().min(1),
        },
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "dotColor",
      title: "Timeline dot color",
      type: "string",
      options: {
        list: [
          { title: "Primary", value: "primary" },
          { title: "Secondary", value: "secondary" },
          { title: "Tertiary", value: "tertiary" },
          { title: "Soft", value: "soft" },
          { title: "Magenta", value: "magenta" },
        ],
      },
      initialValue: "tertiary",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      title: "Order",
      description:
        "Manual ordering (top of timeline first) — dates alone don't sort correctly for the grouped Earlier entry.",
      type: "number",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "compact",
      title: "Compact",
      description:
        "Smaller heading, reduced opacity — used for the grouped Earlier entry.",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "role", subtitle: "dateRange" },
  },
});
