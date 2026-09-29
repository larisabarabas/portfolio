import type { Metadata } from "next";
import type { ReactNode } from "react";
import { CookieSettingsButton } from "@/components/consent/CookieSettingsButton";
import { BackLink } from "@/components/layout/BackLink";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { BOOK_CALL_LABEL, CALENDLY_URL, EMAIL, PRIVACY } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Privacy · stefania.`,
  description: "What data stefaniabarabas.com collects, why, and your rights.",
  alternates: { canonical: PRIVACY.path },
};

// The copy lives here rather than in constants.ts: it's long-form prose with
// inline links, which reads and edits far more easily as JSX. Update
// PRIVACY.lastUpdated whenever it changes.

const H2_CLASSES =
  "mb-4 font-serif text-[clamp(26px,3vw,34px)] leading-[1.15] font-normal";

function Section({
  id,
  heading,
  children,
}: {
  id: string;
  heading: string;
  children: ReactNode;
}) {
  return (
    <section
      aria-labelledby={id}
      className="mt-14 flex scroll-mt-24 flex-col gap-4 text-[17px] leading-[1.75]"
    >
      <h2 id={id} className={H2_CLASSES}>
        {heading}
      </h2>
      {children}
    </section>
  );
}

function P({ children }: { children: ReactNode }) {
  return <p className="opacity-85">{children}</p>;
}

function List({ children }: { children: ReactNode }) {
  return (
    <ul className="flex list-disc flex-col gap-2 pl-5.5 opacity-85 marker:text-primary">
      {children}
    </ul>
  );
}

function A({
  href,
  external = false,
  children,
}: {
  href: string;
  external?: boolean;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="border-b-2 border-primary font-semibold transition-colors hover:text-primary"
    >
      {children}
      {external && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  );
}

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader
        logoHref="/"
        actions={<BackLink href="/" label={PRIVACY.backLinkLabel} />}
      />

      <main
        id="main"
        className="animate-fade-up px-[8vw] pt-32 pb-28 nav:pt-36"
      >
        {/* Same 1240px column as the header and case studies. */}
        <article className="mx-auto max-w-310">
          <p className="mb-5 text-[13px] font-semibold uppercase tracking-[0.16em] text-primary">
            {PRIVACY.eyebrow}
          </p>
          <h1 className="mb-6 font-serif text-[clamp(40px,6vw,68px)] leading-[1.05] font-normal text-balance">
            {PRIVACY.title}
          </h1>
          <p className="mb-4 text-[19px] leading-[1.6] opacity-85">
            This is a personal site. There are no accounts, no forms and nothing for
            sale here, so it collects very little. This page explains what that
            little is, why, and what you can do about it.
          </p>
          <p className="text-[13px] opacity-60">
            Last updated {PRIVACY.lastUpdated}
          </p>

          <Section id="controller" heading="Who's responsible">
            <P>
              I'm Stefania Larisa Barabas. I run this site and I'm responsible
              for the data it collects (the "controller", in GDPR terms). For
              any question or request about your data, email me at{" "}
              <A href={`mailto:${EMAIL}`}>{EMAIL}</A>.
            </P>
          </Section>

          <Section
            id="google-analytics"
            heading="Google Analytics, only if you say yes"
          >
            <P>
              When you first visit, a banner asks whether I can use Google
              Analytics. Until you click Accept, nothing from Google loads and
              no analytics cookies are set. If you accept, Google Analytics
              (loaded through Google Tag Manager) records:
            </P>
            <List>
              <li>the pages you view and how long you stay</li>
              <li>the site that sent you here, if any</li>
              <li>
                your approximate location (city, region and country), worked out
                from your IP address. For visitors in the EU, UK and
                Switzerland, Google uses the IP address only for this and
                discards it straight away, without storing it
              </li>
              <li>
                your device type, browser, operating system and screen size
              </li>
              <li>
                a random ID stored in the <code>_ga</code> and{" "}
                <code>_ga_…</code> cookies, so a repeat visit counts as the same
                visitor. These cookies last up to 2 years
              </li>
            </List>
            <P>
              <strong>Why:</strong> to see which pages people actually read and
              where they leave, so I know what to improve.{" "}
              <strong>Legal basis:</strong> your consent (GDPR Art. 6(1)(a)).
            </P>
            <P>
              <strong>Who receives it:</strong> Google LLC, which provides
              Google Analytics. Data may be transferred to the United States;
              Google relies on the EU–US Data Privacy Framework for that. How
              Google handles it is covered by{" "}
              <A href="https://policies.google.com/privacy" external>
                Google's privacy policy
              </A>{" "}
              and{" "}
              <A
                href="https://policies.google.com/technologies/partner-sites"
                external
              >
                how Google uses data from sites that use its services
              </A>
              .
            </P>
            <P>
              <strong>How long:</strong> Google deletes the detailed visit data
              after 2 months. What stays after that are totals, such as page
              views per month, that don't identify anyone. Google's advertising
              features are turned off, so nothing is used for ads.
            </P>
            <P>
              <strong>Changing your mind:</strong> you can withdraw consent at
              any time. Declining also deletes the Google Analytics cookies from
              your browser.{" "}
              <CookieSettingsButton className="cursor-pointer border-b-2 border-primary font-semibold transition-colors hover:text-primary" />
            </P>
          </Section>

          <Section id="hosting" heading="Hosting, security and visit counts">
            <P>
              Every request to this site passes through Cloudflare, Inc., which
              protects it from attacks and speeds it up, and is then served by
              Vercel Inc., which hosts it. Both process your IP address and
              basic request details, such as your browser and the page you asked
              for, to deliver the page and keep the site secure. They do this on
              my behalf, keep the data only as long as they need to run their
              services, and are certified under the EU–US Data Privacy
              Framework.
            </P>
            <P>
              For simple visit counts, I also use Vercel Web Analytics and
              Cloudflare Web Analytics. Neither sets cookies, saves anything in
              your browser, or follows you to other sites. Vercel tells visits
              apart with a hash of the request that's discarded after 24 hours;
              Cloudflare doesn't tell visitors apart at all. I only see totals:
              page views, referring sites, approximate location, and browser,
              operating system and device type.
            </P>
            <P>
              <strong>Legal basis:</strong> my legitimate interest in running a
              working, secure site and knowing whether anyone visits it (GDPR
              Art. 6(1)(f)). See{" "}
              <A href="https://www.cloudflare.com/privacypolicy/" external>
                Cloudflare's privacy policy
              </A>{" "}
              and{" "}
              <A href="https://vercel.com/legal/privacy-policy" external>
                Vercel's privacy policy
              </A>
              .
            </P>
          </Section>

          <Section id="device" heading="Saved in your browser">
            <P>
              Two small settings are saved in your browser's local storage, not
              in cookies: your light or dark theme (<code>stef-theme</code>) and
              your answer to the cookie banner (<code>stef-consent</code>). They
              never leave your device, and clearing your browser's site data
              removes them.
            </P>
          </Section>

          <Section id="contact" heading="When you contact me">
            <P>
              If you email me, I receive whatever you include in the message. I
              use it only to reply, and keep it for as long as our conversation
              is relevant.
            </P>
            <P>
              The "{BOOK_CALL_LABEL}" button opens{" "}
              <A href={CALENDLY_URL} external>
                Calendly
              </A>
              , which handles the booking for me: your name, your email and
              anything you add to the booking form. I'm responsible for that
              data and use it only for the call. Calendly's part is described in{" "}
              <A href="https://calendly.com/privacy" external>
                Calendly's privacy notice
              </A>
              .
            </P>
            <P>
              <strong>Legal basis:</strong> taking steps you asked for before we
              work together, or my legitimate interest in answering you (GDPR
              Art. 6(1)(b) and (f)). Links to LinkedIn, GitHub and Substack take
              you to those sites, where their own policies apply.
            </P>
          </Section>

          <Section id="rights" heading="Your rights">
            <P>Under the GDPR you can ask me to:</P>
            <List>
              <li>tell you what data I have about you, and give you a copy</li>
              <li>correct it, or delete it</li>
              <li>restrict how I use it, or object to it being used at all</li>
              <li>
                withdraw your consent at any time, without affecting what was
                done before
              </li>
            </List>
            <P>
              Email <A href={`mailto:${EMAIL}`}>{EMAIL}</A> and I'll reply
              within a month. Google Analytics data isn't linked to your name,
              so I usually can't find a single visitor's data in it; declining
              the cookies is the most direct way to stop it being collected. If
              you think I've handled your data wrongly, you can also complain to
              the data protection authority in the country where you live or
              work.
            </P>
          </Section>

          <Section id="changes" heading="Changes">
            <P>
              If what the site collects changes, I'll update this page and the
              date at the top. I don't sell data, share it for advertising or
              use it for automated decisions about anyone.
            </P>
          </Section>
        </article>
      </main>
    </>
  );
}
