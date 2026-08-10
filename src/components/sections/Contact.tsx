import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { CONTACT, FOOTER } from "@/lib/constants";

export function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden px-[8vw] pt-[140px] pb-[90px] text-center"
    >
      <div className="pointer-events-none absolute top-0 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-[40%] rounded-full bg-[radial-gradient(circle,var(--color-primary),transparent_70%)] opacity-25 blur-[20px]" />
      <Reveal className="relative">
        <SectionEyebrow>{CONTACT.eyebrow}</SectionEyebrow>
        <h2 className="mb-6 font-serif text-[clamp(40px,6vw,76px)] font-normal">
          {CONTACT.heading}
        </h2>
        <p className="mx-auto mb-10 max-w-[520px] text-[17px] opacity-85">
          {CONTACT.body}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button href={`mailto:${CONTACT.email}`}>{CONTACT.email}</Button>
          <Button href={CONTACT.linkedinUrl} variant="outline" external>
            {CONTACT.linkedinLabel}
          </Button>
          <Button href={CONTACT.githubUrl} variant="outline" external>
            {CONTACT.githubLabel}
          </Button>
          <Button href={CONTACT.devNotesUrl} variant="outline" external>
            {CONTACT.devNotesLabel}
          </Button>
        </div>
        <p className="mt-[70px] text-[13px] opacity-50">{FOOTER.copyright}</p>
      </Reveal>
    </section>
  );
}
