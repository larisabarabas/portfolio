import type { Metadata } from "next";
import { Instrument_Serif, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { JOB_TITLE, SITE_DESCRIPTION } from "@/lib/constants";

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

export default function RootLayout(props: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${spaceGrotesk.variable}`}
    >
      <body className="bg-bg font-sans text-ink antialiased">
        {props.children}
        <Analytics />
      </body>
    </html>
  );
}
