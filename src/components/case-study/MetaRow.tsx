import type { ProjectBySlugQueryResult } from "@/lib/sanity/sanity.types";

type Project = NonNullable<ProjectBySlugQueryResult>;

type MetaRowProps = {
  role?: Project["role"];
  timelineLabel?: Project["timelineLabel"];
  timelineValue?: Project["timelineValue"];
  stackText?: Project["stackText"];
};

// The facts that frame a project: one inset strip across the content column.
// Items share the row (the stack gets the most room), so the strip has no
// empty end however few of them are filled in.
export function MetaRow({
  role,
  timelineLabel,
  timelineValue,
  stackText,
}: MetaRowProps) {
  const items = [
    role ? { label: "Role", value: role, grow: "flex-[1_1_220px]" } : null,
    timelineValue
      ? {
          label: timelineLabel ?? "Timeline",
          value: timelineValue,
          grow: "flex-[1_1_160px]",
        }
      : null,
    stackText
      ? { label: "Stack", value: stackText, grow: "flex-[2_1_320px]" }
      : null,
  ].filter((item) => item !== null);

  if (items.length === 0) return null;

  return (
    <dl className="flex flex-wrap gap-x-10 gap-y-4 rounded-card-lg px-6 py-5 shadow-neu-in lg:px-8">
      {items.map((item) => (
        <div key={item.label} className={item.grow}>
          <dt className="mb-1.5 text-[13px] font-semibold text-tertiary">
            {item.label}
          </dt>
          <dd className="text-[15.5px] font-medium">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
