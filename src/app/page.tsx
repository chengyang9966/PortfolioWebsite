import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Experience } from "@/components/experience";
import { Hero } from "@/components/hero";
import { FadeIn } from "@/components/motion/fade-in";
import { Marquee } from "@/components/motion/marquee";
import { PageTransition } from "@/components/page-transition";
import { SectionHeading } from "@/components/section-heading";
import { WorkShowcase } from "@/components/work-showcase";
import { smallProjects } from "@/content/projects";

const list = new Intl.ListFormat("en", { type: "conjunction" });

const stack = ["React", "Next.js", "Node.js", "TypeScript", "AWS", "React Native", "GraphQL", "AI products"];

export default function Home() {
  return (
    <PageTransition>
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded focus:bg-sodium focus:px-3 focus:py-2 focus:text-harbour"
      >
        Skip to work
      </a>
      <main>
        <Hero />
        <div className="mt-20 md:mt-28">
          <Marquee items={stack} />
        </div>

        <section id="work" aria-labelledby="work-title" className="px-5 py-24 sm:px-10 md:py-32">
          <div className="mx-auto max-w-[90rem]">
            <SectionHeading id="work" title="Selected work">
              Products I’ve helped build and ship, from hotel operations to wearable health and AI.
            </SectionHeading>
            <div className="mt-12 md:mt-8">
              <WorkShowcase />
            </div>

            <FadeIn stagger={0.1} className="mt-24 border-t border-line pt-10 md:mt-32">
              <h3 data-reveal className="font-serif text-3xl font-[380] tracking-[-0.02em]">
                Also built
              </h3>
              <div className="mt-8 grid gap-10 md:grid-cols-2">
                {smallProjects.map((project) => (
                  <div key={project.title} data-reveal className="max-w-[34rem]">
                    <h4 className="text-lg font-medium text-paper">{project.title}</h4>
                    <p className="text-fog">
                      {project.org}, <span className="tnum">{project.period}</span>
                    </p>
                    <p className="mt-3 text-paper/85">{project.summary}</p>
                    <p className="mt-3 text-[0.9375rem] text-fog">Built with {list.format(project.stack)}.</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        <Experience />
        <About />
      </main>
      <Contact />
    </PageTransition>
  );
}
