import { defineField, defineType } from "sanity";

// One feature in the case study's "How it works" tour. The name stays
// `uxFlowStep` so documents written before the tour keep working.
export const uxFlowStep = defineType({
  name: "uxFlowStep",
  title: "Feature",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      description: 'e.g. "Give a note"',
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      description: "One or two sentences about what this feature does.",
      type: "text",
      rows: 2,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "screenshot",
      title: "Screenshot",
      description:
        "The screen for this feature. Shown in a 16:9 frame that the image fills. If yours has another shape, use the crop and hotspot tools to choose what stays in view. Without screenshots on every feature, the case study shows a plain list instead of the tour.",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "screenshotAlt",
      title: "Screenshot description",
      description: "What the screenshot shows, for people who can't see it.",
      type: "string",
      hidden: ({ parent }) => !parent?.screenshot,
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as { screenshot?: unknown } | undefined;
          return parent?.screenshot && !value
            ? "Describe the screenshot"
            : true;
        }),
    }),
    // Not shown any more: steps are numbered by their position. Kept so old
    // documents still validate and can be cleaned up later.
    defineField({
      name: "stepNumber",
      title: "Step number (unused)",
      type: "string",
      hidden: true,
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "description", media: "screenshot" },
  },
});
