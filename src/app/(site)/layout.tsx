import { Header } from "@/components/header";
import { Cursor } from "@/components/motion/cursor";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { Preloader } from "@/components/preloader";

/** The portfolio's chrome: smooth scroll, first-visit loader, header, cursor and grain. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SmoothScroll>
        <Preloader />
        <Header />
        {children}
      </SmoothScroll>
      <Cursor />
      <div aria-hidden className="grain" />
    </>
  );
}
