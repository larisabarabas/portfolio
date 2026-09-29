import { BackLink } from "@/components/layout/BackLink";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { CASE_STUDY } from "@/lib/constants";

export function CaseStudyHeader() {
  return (
    <SiteHeader
      logoHref="/"
      // Back to the Work section, not the top of the page, so the reader
      // lands where they left off.
      actions={<BackLink href="/#work" label={CASE_STUDY.backLinkLabel} />}
    />
  );
}
