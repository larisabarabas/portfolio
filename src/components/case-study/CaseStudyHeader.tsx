import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { CASE_STUDY } from "@/lib/constants";

export function CaseStudyHeader() {
  return (
    <SiteHeader
      logoHref="/"
      actions={
        // Back to the Work section, not the top of the page, so the reader
        // lands where they left off. Icon-only on phones, where the full
        // label wouldn't fit beside the logo and theme toggle.
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
      }
    />
  );
}
