import type { Metadata } from "next";
import { Instrument_Serif, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { ConsentManager } from "@/components/consent/ConsentManager";
import {
  CONSENT_STORAGE_KEY,
  GTM_ID,
  JOB_TITLE,
  SITE_DESCRIPTION,
  THEME_STORAGE_KEY,
} from "@/lib/constants";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-instrument-serif",
});

const spaceGrotesk = Space_Grotesk({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const title = `stefania. ${JOB_TITLE}`;
const description = SITE_DESCRIPTION;

export const metadata: Metadata = {
  metadataBase: new URL("https://www.stefaniabarabas.com"),
  title,
  description,
  openGraph: {
    title,
    description,
    url: "/",
    siteName: "stefania.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

// Sets the theme before first paint so dark-mode visitors don't see a light
// flash. Home page and case studies only (the pages with a ThemeToggle); the
// embedded Sanity Studio keeps its own look. Must agree with readTheme() in
// ThemeToggle.
const THEME_SCRIPT = `(function(){try{var p=location.pathname;if(p!=="/"&&p.indexOf("/work/")!==0)return;var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t!=="dark"&&t!=="light")t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;

// Google Consent Mode defaults, set before GTM can load: nothing is stored
// unless the visitor accepted on an earlier visit. Ads storage stays denied
// for good, since the site runs no ads. Defines window.gtag for lib/consent.ts,
// and must agree with readConsent() there. GA4 itself is a tag inside the GTM
// container, not loaded separately.
const CONSENT_SCRIPT = `(function(){window.dataLayer=window.dataLayer||[];window.gtag=function(){dataLayer.push(arguments)};var a="denied";try{if(localStorage.getItem("${CONSENT_STORAGE_KEY}")==="granted")a="granted"}catch(e){}gtag("consent","default",{ad_storage:"denied",ad_user_data:"denied",ad_personalization:"denied",analytics_storage:a})})()`;

export default function RootLayout(props: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${spaceGrotesk.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: static, first-party script with no interpolated user input */}
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        {GTM_ID ? (
          // biome-ignore lint/security/noDangerouslySetInnerHtml: static, first-party script with no interpolated user input
          <script dangerouslySetInnerHTML={{ __html: CONSENT_SCRIPT }} />
        ) : null}
      </head>
      <body className="bg-bg font-sans text-ink antialiased">
        {props.children}
        <Analytics />
        {GTM_ID ? <ConsentManager gtmId={GTM_ID} /> : null}
      </body>
    </html>
  );
}
