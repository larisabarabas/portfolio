import type { ProjectBySlugQueryResult } from "@/lib/sanity/sanity.types";

type Project = NonNullable<ProjectBySlugQueryResult>;

type MetaRowProps = {
  role?: Project["role"];
  timelineLabel?: Project["timelineLabel"];
  timelineValue?: Project["timelineValue"];
  stackText?: Project["stackText"];
  metaLinks?: Project["metaLinks"];
};

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
    <div className="flex flex-wrap gap-8 border-t border-b border-line py-6">
      {items.map((item) => (
        <div key={item.label}>
          <p className="mb-1.5 text-xs tracking-[0.08em] uppercase opacity-60">
            {item.label}
          </p>
          <p className="text-[15px] font-semibold">{item.value}</p>
        </div>
      ))}
      {metaLinks && metaLinks.length > 0 && (
        <div>
          <p className="mb-1.5 text-xs tracking-[0.08em] uppercase opacity-60">
            Links
          </p>
          <p className="flex flex-wrap gap-x-2 text-[15px] font-semibold">
            {metaLinks.map((link, index) => (
              <span key={link._key}>
                {index > 0 && <span className="mr-2 opacity-60">·</span>}
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary-hover"
                >
                  {link.label} ↗
                </a>
              </span>
            ))}
          </p>
        </div>
      )}
    </div>
  );
}
