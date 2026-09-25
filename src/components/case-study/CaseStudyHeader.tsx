import Link from "next/link";
import { CASE_STUDY, LOGO_TEXT } from "@/lib/constants";

export function CaseStudyHeader() {
  return (
    <div className="sticky top-0 z-50 flex items-center justify-between border-b border-line bg-bg px-[8vw] py-5">
      {/* Back to the Work section, not the top of the page, so the reader
          lands where they left off. */}
      <Link
        href="/#work"
        className="text-sm font-semibold text-ink hover:text-primary"
      >
        {CASE_STUDY.backLinkLabel}
      </Link>
      <Link
        href="/"
        aria-label={`${LOGO_TEXT} — home`}
        className="font-serif text-xl italic font-bold text-tertiary no-underline transition-colors hover:text-primary"
      >
        {LOGO_TEXT}
        <span className="text-primary">.</span>
      </Link>
    </div>
  );
}
