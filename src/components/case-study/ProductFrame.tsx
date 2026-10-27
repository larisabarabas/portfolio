import type { ReactNode } from "react";

// Raised frame → inset well → the product screenshot, the same nesting as the
// home hero photo. Radii step down on phones.
export function ProductFrame({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-[28px] p-2.5 shadow-neu-out lg:rounded-[40px] lg:p-4">
      <div className="rounded-[20px] p-2 shadow-neu-in lg:rounded-[28px] lg:p-3.5">
        {children}
      </div>
    </div>
  );
}

export const FRAME_IMAGE_CLASSES =
  "block h-auto w-full rounded-[12px] lg:rounded-[18px]";
