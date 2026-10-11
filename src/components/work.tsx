import { projects, smallProjects } from "@/content/projects";
import type { Project } from "@/content/types";
import { ArrowUpRight } from "./icons";
import { ProjectVisual } from "./project-visual";
import { SectionHeading } from "./section-heading";

const list = new Intl.ListFormat("en", { type: "conjunction" });

function ProjectText({ project, featured }: { project: Project; featured?: boolean }) {
  return (
    <div className={featured ? "grid gap-8 md:grid-cols-12" : "grid gap-6"}>
      <div className={featured ? "md:col-span-5" : ""}>
        <h3 className="font-serif text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] font-[380] tracking-[-0.02em]">
          {project.title}
        </h3>
        <p className="mt-2 text-fog">
          {project.org}, <span className="tnum">{project.period}</span>
        </p>
        <p className="mt-1 text-paper">{project.role}</p>
      </div>
      <div className={`max-w-[38rem] ${featured ? "md:col-span-7" : ""}`}>
        <p className="text-lg leading-relaxed text-paper/90">{project.summary}</p>
        <ul className="mt-5 space-y-2">
          {project.points.map((point) => (
            <li key={point} className="grid grid-cols-[1.25rem_1fr] text-paper/80">
              <span aria-hidden className="mt-[0.8em] h-px w-2.5 bg-sodium" />
              {point}
            </li>
          ))}
        </ul>
        <p className="mt-5 text-[0.9375rem] text-fog">Built with {list.format(project.stack)}.</p>
        <a
          href={project.link.href}
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex items-center gap-1 border-b border-sodium/60 pb-0.5 text-paper transition-colors hover:border-sodium hover:text-sodium"
        >
          {project.link.label}
          <ArrowUpRight className="size-3.5" />
        </a>
      </div>
    </div>
  );
}

export function Work() {
  const [featured, ...rest] = projects;

  return (
    <section id="work" aria-labelledby="work-title" className="px-5 py-24 sm:px-10 md:py-28">
      <div className="mx-auto max-w-[90rem]">
        <SectionHeading id="work" title="Selected work">
          Products I’ve helped build and ship, from hotel operations to wearable health and AI.
        </SectionHeading>

        <article className="mt-16 md:mt-24">
          <ProjectText project={featured} featured />
          <div className="mt-12 md:mt-16">
            <ProjectVisual visual={featured.visual} layout="featured" />
          </div>
        </article>

        {rest.map((project, i) => (
          <article
            key={project.slug}
            className="mt-24 grid items-center gap-12 border-t border-line pt-16 md:mt-28 md:grid-cols-12 md:gap-10 md:pt-24"
          >
            <div className={`md:col-span-5 ${i % 2 === 1 ? "md:order-2 md:col-start-8" : ""}`}>
              <ProjectText project={project} />
            </div>
            <div
              className={`md:col-span-6 ${i % 2 === 1 ? "md:order-1 md:col-span-6 md:col-start-1" : "md:col-start-7"}`}
            >
              <ProjectVisual visual={project.visual} layout="side" />
            </div>
          </article>
        ))}

        <div className="mt-24 border-t border-line pt-10 md:mt-28">
          <h3 className="font-serif text-3xl font-[380] tracking-[-0.02em]">Also built</h3>
          <div className="mt-8 grid gap-10 md:grid-cols-2">
            {smallProjects.map((project) => (
              <div key={project.title} className="max-w-[34rem]">
                <h4 className="text-lg font-medium text-paper">{project.title}</h4>
                <p className="text-fog">
                  {project.org}, <span className="tnum">{project.period}</span>
                </p>
                <p className="mt-3 text-paper/85">{project.summary}</p>
                <p className="mt-3 text-[0.9375rem] text-fog">Built with {list.format(project.stack)}.</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
