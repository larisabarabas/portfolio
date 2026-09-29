import { PillLink } from "@/components/ui/PillLink";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TextLink } from "@/components/ui/TextLink";
import {
  BOOK_CALL_LABEL,
  CALENDLY_URL,
  CONTACT,
  EMAIL,
  FOOTER,
} from "@/lib/constants";

const SECONDARY_LINKS = [
  { href: CONTACT.linkedinUrl, label: CONTACT.linkedinLabel },
  { href: CONTACT.githubUrl, label: CONTACT.githubLabel },
  { href: CONTACT.resumeHref, label: CONTACT.resumeCtaLabel },
  { href: CONTACT.devNotesUrl, label: CONTACT.devNotesLabel },
];

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="mx-auto w-full max-w-275"
    >
      <div className="rounded-[44px] bg-bg px-[clamp(22px,5vw,64px)] py-[clamp(40px,6vw,88px)] text-center shadow-neu-out">
        <SectionLabel variant="inset" className="mb-6">
          {CONTACT.eyebrow}
        </SectionLabel>
        <h2
          id="contact-title"
          className="mx-auto mb-6 max-w-225 font-serif text-[clamp(40px,6vw,76px)] leading-[1.05] font-normal text-balance"
        >
          {CONTACT.heading}
        </h2>
        <p className="mx-auto mb-11 max-w-135 text-[17px] leading-[1.6] opacity-85">
          {CONTACT.body}
        </p>
        {/* Two ways to start: booking a call (the one coloured action) or
            email, with the address visible for people who'd rather copy it.
            The other links sit below as plain text so they don't compete. */}
        <div className="flex flex-wrap justify-center gap-5">
          <PillLink href={CALENDLY_URL} variant="cta" external>
            {BOOK_CALL_LABEL}
          </PillLink>
          <PillLink href={`mailto:${EMAIL}`}>{EMAIL}</PillLink>
        </div>
        <ul className="mt-9 flex flex-wrap justify-center gap-x-7 gap-y-4">
          {SECONDARY_LINKS.map((link) => (
            <li key={link.label}>
              <TextLink href={link.href} color="ink" size="sm" external>
                {link.label}
              </TextLink>
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-8 text-center text-[13px] opacity-70">
        {FOOTER.copyright}
      </p>
    </section>
  );
}
