import { defineField, defineType } from "sanity";

export const articleLink = defineType({
  name: "articleLink",
  title: "Article link",
  type: "document",
  fields: [
    defineField({
      name: "publicationAndRole",
      title: "Publication · role",
      description: 'e.g. "Thriving in Engineering · Co-author"',
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      title: "Article title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "url",
      title: "URL",
      type: "url",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "publicationAndRole" },
  },
});
