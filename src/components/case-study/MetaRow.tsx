import type { ProjectBySlugQueryResult } from "@/lib/sanity/sanity.types";

type Project = NonNullable<ProjectBySlugQueryResult>;

type MetaRowProps = {
  role?: Project["role"];
  timelineLabel?: Project["timelineLabel"];
  timelineValue?: Project["timelineValue"];
  stackText?: Project["stackText"];
  metaLinks?: Project["metaLinks"];
};

const LABEL_CLASSES =
  "mb-1 text-[11.5px] tracking-[0.08em] uppercase opacity-70";

export function MetaRow({
  role,
  timelineLabel,
  timelineValue,
  stackText,
  metaLinks,
}: MetaRowProps) {
  const items = [
    role ? { label: "Role", value: role } : null,
    timelineValue
      ? { label: timelineLabel ?? "Timeline", value: timelineValue }
      : null,
    stackText ? { label: "Stack", value: stackText } : null,
  ].filter((item) => item !== null);

  if (items.length === 0 && (!metaLinks || metaLinks.length === 0)) {
    return null;
  }

  return (
    <dl className="flex flex-wrap gap-x-9 gap-y-3.5 rounded-card-lg px-6 py-4 shadow-neu-in-sm">
      {items.map((item) => (
        <div key={item.label}>
          <dt className={LABEL_CLASSES}>{item.label}</dt>
          <dd className="text-[14.5px] font-semibold">{item.value}</dd>
        </div>
      ))}
      {metaLinks && metaLinks.length > 0 && (
        <div>
          <dt className={LABEL_CLASSES}>Links</dt>
          <dd className="flex flex-wrap gap-x-2 text-[14.5px] font-semibold">
            {metaLinks.map((link, index) => (
              <span key={link._key}>
                {index > 0 && (
                  <span aria-hidden="true" className="mr-2 opacity-60">
                    ·
                  </span>
                )}
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary-hover"
                >
                  {link.label.trim()}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </span>
            ))}
          </dd>
        </div>
      )}
    </dl>
  );
}
