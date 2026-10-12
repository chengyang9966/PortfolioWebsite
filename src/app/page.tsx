import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Experience } from "@/components/experience";
import { Hero } from "@/components/hero";
import { ArrowUpRight } from "@/components/icons";
import { FadeIn } from "@/components/motion/fade-in";
import { Marquee } from "@/components/motion/marquee";
import { PageTransition } from "@/components/page-transition";
import { RollText } from "@/components/roll-text";
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
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded focus:bg-accent focus:px-3 focus:py-2 focus:text-ink"
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
              Products I’ve built and shipped, from hotel operations and wearable health to AI and my own studio’s
              platform.
            </SectionHeading>
            <div className="mt-12 md:mt-8">
              <WorkShowcase />
            </div>

            <FadeIn stagger={0.1} className="mt-24 border-t border-line pt-10 md:mt-32">
              <h3 data-reveal className="font-serif text-3xl font-[380] tracking-[-0.02em]">
                Also built
              </h3>
              <div className="mt-8 grid gap-x-10 gap-y-14 md:grid-cols-2">
                {smallProjects.map((project) => (
                  <div key={project.title} data-reveal className="max-w-[34rem]">
                    {project.metric && (
                      <p className="mb-4 flex items-baseline gap-3 border-b border-line pb-4">
                        <span className="font-serif text-[clamp(2.75rem,5vw,4rem)] leading-none font-[340] tracking-[-0.03em] text-accent">
                          {project.metric.value}
                        </span>
                        <span className="text-fog">{project.metric.label}</span>
                      </p>
                    )}
                    <h4 className="text-lg font-medium text-paper">{project.title}</h4>
                    <p className="text-fog">
                      {project.org}
                      {project.period && (
                        <>
                          , <span className="tnum">{project.period}</span>
                        </>
                      )}
                    </p>
                    <p className="mt-3 text-paper/85">{project.summary}</p>
                    <p className="mt-3 text-[0.9375rem] text-fog">Built with {list.format(project.stack)}.</p>
                    {project.link && (
                      <a
                        href={project.link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="group mt-4 inline-flex items-center gap-1 border-b border-accent/60 pb-0.5 text-paper transition-colors hover:border-accent hover:text-accent"
                      >
                        <RollText>{project.link.label}</RollText>
                        <ArrowUpRight className="size-3.5" />
                      </a>
                    )}
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
