import type { Metadata, Viewport } from "next";
import { Newsreader, Schibsted_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { profile } from "@/content/profile";
import "./globals.css";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
});

const schibsted = Schibsted_Grotesk({
  variable: "--font-schibsted",
  subsets: ["latin"],
});

const description =
  "Full-stack engineer and team lead in Kuala Lumpur. Building AI products at Giv AI Labs; previously Vitalz, CelcomDigi and IFCA.";

export const metadata: Metadata = {
  title: `${profile.name} — ${profile.role}`,
  description,
  openGraph: {
    title: profile.name,
    description,
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#0f1d21",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${newsreader.variable} ${schibsted.variable}`}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
