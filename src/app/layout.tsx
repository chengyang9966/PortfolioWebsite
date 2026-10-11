import type { Metadata, Viewport } from "next";
import { Newsreader, Schibsted_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Header } from "@/components/header";
import { Cursor } from "@/components/motion/cursor";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { Preloader } from "@/components/preloader";
import { profile } from "@/content/profile";
import "lenis/dist/lenis.css";
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

// Runs before first paint: flags JS, and decides whether this visit gets the preloader.
const bootScript = `(function(){var d=document.documentElement;d.classList.add('js');var seen=false;try{seen=!!sessionStorage.getItem('cy-seen')}catch(e){}if(seen||matchMedia('(prefers-reduced-motion: reduce)').matches){d.classList.add('seen')}else{d.classList.add('is-loading');setTimeout(function(){d.classList.remove('is-loading')},6000)}})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${newsreader.variable} ${schibsted.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>
        <SmoothScroll>
          <Preloader />
          <Header />
          {children}
        </SmoothScroll>
        <Cursor />
        <div aria-hidden className="grain" />
        <Analytics />
      </body>
    </html>
  );
}
