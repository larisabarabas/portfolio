import { ArrowUpRight } from "lucide-react";

// Appended to links that open in a new tab: a visible ↗ icon for sighted users
// and a spoken hint for screen readers, so the new tab isn't a surprise.
// Expects an inline-flex parent with a gap for spacing.
export function ExternalMark() {
  return (
    <>
      <ArrowUpRight size={16} strokeWidth={2.25} className="shrink-0" />
      <span className="sr-only">(opens in a new tab)</span>
    </>
  );
}
