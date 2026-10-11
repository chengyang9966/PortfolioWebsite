import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Experience } from "@/components/experience";
import { Hero } from "@/components/hero";
import { Nav } from "@/components/nav";
import { Work } from "@/components/work";

export default function Home() {
  return (
    <>
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded focus:bg-sodium focus:px-3 focus:py-2 focus:text-harbour"
      >
        Skip to work
      </a>
      <Nav />
      <main>
        <Hero />
        <Work />
        <Experience />
        <About />
      </main>
      <Contact />
    </>
  );
}
