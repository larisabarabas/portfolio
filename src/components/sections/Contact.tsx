import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TextLink } from "@/components/ui/TextLink";
import { CONTACT, EMAIL, FOOTER } from "@/lib/constants";

export function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden px-[8vw] pt-35 pb-22.5 text-center"
    >
      <div className="pointer-events-none absolute top-0 left-1/2 h-150 w-150 -translate-x-1/2 translate-y-[-40%] rounded-full bg-[radial-gradient(circle,var(--color-primary),transparent_70%)] opacity-25 blur-[20px]" />
      <Reveal className="relative">
        <SectionLabel>{CONTACT.eyebrow}</SectionLabel>
        <h2 className="mb-6 font-serif text-[clamp(40px,6vw,76px)] font-normal">
          {CONTACT.heading}
        </h2>
        <p className="mx-auto mb-10 max-w-130 text-[17px] opacity-85">
          {CONTACT.body}
        </p>
        {/* One primary action; everything else is secondary so it doesn't
            compete with the email. */}
        <Button href={`mailto:${EMAIL}`}>{EMAIL}</Button>
        <div className="mt-8 flex flex-wrap justify-center gap-x-7 gap-y-4">
          <TextLink href={CONTACT.linkedinUrl} color="ink" external>
            {CONTACT.linkedinLabel}
          </TextLink>
          <TextLink href={CONTACT.githubUrl} color="ink" external>
            {CONTACT.githubLabel}
          </TextLink>
          <TextLink href={CONTACT.resumeHref} color="ink" external>
            {CONTACT.resumeCtaLabel}
          </TextLink>
          <TextLink href={CONTACT.devNotesUrl} color="ink" external>
            {CONTACT.devNotesLabel}
          </TextLink>
        </div>
        <p className="mt-17.5 text-[13px] opacity-70">{FOOTER.copyright}</p>
      </Reveal>
    </section>
  );
}
