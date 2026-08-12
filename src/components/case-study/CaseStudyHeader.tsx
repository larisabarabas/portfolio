import Link from "next/link";
import { CASE_STUDY, LOGO_TEXT } from "@/lib/constants";

export function CaseStudyHeader() {
  return (
    <div className="sticky top-0 z-50 flex items-center justify-between border-b border-line bg-bg px-[8vw] py-5">
      <Link
        href="/"
        className="text-sm font-semibold text-ink hover:text-primary"
      >
        {CASE_STUDY.backLinkLabel}
      </Link>
      <span className="font-serif text-xl italic font-bold text-tertiary">
        {LOGO_TEXT}
        <span className="text-primary">.</span>
      </span>
    </div>
  );
}
