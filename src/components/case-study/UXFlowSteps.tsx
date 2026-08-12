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

export function UXFlowSteps({ steps, accentColor }: UXFlowStepsProps) {
  return (
    <div className="mt-7 grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-5">
      {steps.map((step) => (
        <div
          key={step._key}
          className="rounded-card border border-line bg-paper p-5.5"
        >
          <p
            className={`mb-2 text-[13px] font-bold ${ACCENT_CLASSES[accentColor]}`}
          >
            {step.stepNumber} · {step.label}
          </p>
          <p className="text-[14.5px] leading-[1.6] opacity-85">
            {step.description}
          </p>
        </div>
      ))}
    </div>
  );
}
