import type { ProjectBySlugQueryResult } from "@/lib/sanity/sanity.types";

type Project = NonNullable<ProjectBySlugQueryResult>;

type UXFlowStepsProps = {
  steps: NonNullable<Project["uxFlowSteps"]>;
  accentColor: Project["accentColor"];
};

const ACCENT_CLASSES: Record<Project["accentColor"], string> = {
  primary: "text-primary",
  tertiary: "text-tertiary",
};

// Numbered from the steps' order (01, 02…); the list itself carries the
// sequence for screen readers.
export function UXFlowSteps({ steps, accentColor }: UXFlowStepsProps) {
  return (
    <ol className="mt-8 grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-6">
      {steps.map((step, index) => (
        <li
          key={step._key}
          className="rounded-[28px] bg-bg px-6 py-5.5 shadow-neu-out"
        >
          <p
            className={`mb-3 flex items-center gap-2.5 text-[13px] font-bold ${ACCENT_CLASSES[accentColor]}`}
          >
            <span
              aria-hidden="true"
              className="flex size-8 flex-none items-center justify-center rounded-full text-xs shadow-neu-in-sm"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            {step.label}
          </p>
          <p className="text-[14.5px] leading-[1.6] opacity-85">
            {step.description.trim()}
          </p>
        </li>
      ))}
    </ol>
  );
}
