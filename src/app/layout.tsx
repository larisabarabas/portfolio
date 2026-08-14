import type { Metadata } from "next";
import { Instrument_Serif, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

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

const title = "stefania. Engineering and Product, with a touch of Design";
const description =
  "Senior frontend engineer building at the intersection of product, design, and AI.";

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
