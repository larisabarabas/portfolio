import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { CASE_STUDY, LOGO_TEXT } from "@/lib/constants";

export function CaseStudyHeader() {
  return (
    <header className="sticky top-0 z-50 bg-bg px-[8vw] py-3.5 print:static">
      <div className="mx-auto flex max-w-310 items-center justify-between gap-4">
        <Link
          href="/"
          aria-label={`${LOGO_TEXT} — home`}
          className="font-serif text-[28px] leading-none font-bold text-tertiary italic no-underline transition-colors hover:text-primary"
        >
          {LOGO_TEXT}
          <span className="text-primary">.</span>
        </Link>
        <div className="flex items-center gap-4.5 print:hidden">
          {/* Back to the Work section, not the top of the page, so the reader
              lands where they left off. Icon-only on phones, where the full
              label wouldn't fit beside the logo and theme toggle. */}
          <Link
            href="/#work"
            aria-label={CASE_STUDY.backLinkLabel}
            className="flex h-11 min-w-11 items-center justify-center gap-2 rounded-pill bg-bg text-[13.5px] font-semibold text-ink shadow-neu-out-sm transition-[box-shadow,color] duration-300 hover:text-primary hover:shadow-neu-in-sm nav:px-4.5"
          >
            <ArrowLeft size={16} strokeWidth={2.25} className="shrink-0" />
            <span aria-hidden="true" className="hidden nav:inline">
              {CASE_STUDY.backLinkLabel}
            </span>
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
