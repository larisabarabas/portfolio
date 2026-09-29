import { LOGO_TEXT } from "@/lib/constants";

export function Logo() {
  return (
    // Plain fragment anchor, not next/link: the slide deck intercepts same-page
    // #links and switches to that slide.
    <a
      href="#hero"
      aria-label={`${LOGO_TEXT} — back to the start`}
      className="fixed top-5.5 left-7 z-50 flex items-baseline gap-0.5 font-serif text-2xl font-bold text-tertiary italic no-underline transition-colors hover:text-primary"
    >
      {LOGO_TEXT}
      <span className="text-primary">.</span>
    </a>
  );
}
