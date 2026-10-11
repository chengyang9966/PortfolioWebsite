import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { Gallery } from "@/components/case-study/gallery";
import { NextProject } from "@/components/case-study/next-project";
import { Contact } from "@/components/contact";
import { ArrowLeft, ArrowUpRight } from "@/components/icons";
import { FadeIn } from "@/components/motion/fade-in";
import { SplitReveal } from "@/components/motion/split-reveal";
import { PageTransition } from "@/components/page-transition";
import { ProjectMedia } from "@/components/project-media";
import { RollText } from "@/components/roll-text";
import { profile } from "@/content/profile";
import { getProject, projects } from "@/content/projects";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const found = getProject((await params).slug);
  if (!found) return {};
  return { title: `${found.project.title} — ${profile.name}`, description: found.project.summary };
}

const pad = (n: number) => String(n).padStart(2, "0");
const list = new Intl.ListFormat("en", { type: "conjunction" });

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const found = getProject((await params).slug);
  if (!found) notFound();
  const { project, index, next } = found;

  const facts = [
    ["Role", project.role],
    ["Company", project.org],
    ["Year", project.period],
    ["Built with", list.format(project.stack)],
  ];

  return (
    <PageTransition>
      <main>
        <article className="px-5 pt-32 sm:px-10 md:pt-40">
          <header className="mx-auto max-w-[90rem]">
            <Link
              href="/#work"
              transitionTypes={["nav-back"]}
              className="group inline-flex items-center gap-2 text-fog transition-colors hover:text-paper"
            >
              <ArrowLeft className="size-4 transition-transform duration-500 ease-out-quint group-hover:-translate-x-1" />
              <RollText>All work</RollText>
            </Link>
            <p className="mt-12 text-fog tnum">
              {pad(index + 1)} / {pad(projects.length)}
            </p>
            <SplitReveal
              as="h1"
              className="mt-2 font-serif text-[clamp(3.5rem,11vw,10.5rem)] leading-[0.92] font-[340] tracking-[-0.035em]"
            >
              {project.title}
            </SplitReveal>
            <FadeIn
              as="dl"
              stagger={0.06}
              className="mt-12 grid gap-6 border-t border-line pt-6 sm:grid-cols-2 lg:grid-cols-4"
            >
              {facts.map(([term, value]) => (
                <div key={term} data-reveal>
                  <dt className="text-sm text-fog">{term}</dt>
                  <dd className="mt-1 text-paper/90">{value}</dd>
                </div>
              ))}
            </FadeIn>
          </header>

          <div className="mx-auto mt-12 max-w-[90rem] md:mt-16">
            <ViewTransition name={`media-${project.slug}`} share="morph" default="none">
              <div className="aspect-[16/10] overflow-hidden rounded-xl border border-line bg-raised">
                <ProjectMedia media={project.media} autoPlay />
              </div>
            </ViewTransition>
          </div>

          <section className="mx-auto mt-24 grid max-w-[90rem] gap-6 md:mt-36 md:grid-cols-12">
            <h2 className="text-fog md:col-span-3">Overview</h2>
            <SplitReveal
              as="p"
              className="max-w-[54rem] font-serif text-[clamp(1.6rem,2.8vw,2.6rem)] leading-[1.25] font-[360] md:col-span-9"
            >
              {project.caseStudy.overview}
            </SplitReveal>
          </section>

          <section className="mx-auto mt-24 grid max-w-[90rem] gap-6 md:mt-32 md:grid-cols-12">
            <h2 className="text-fog md:col-span-3">What I did</h2>
            <FadeIn as="ul" stagger={0.07} className="md:col-span-9">
              {project.points.map((point, i) => (
                <li
                  key={point}
                  data-reveal
                  className="grid grid-cols-[3rem_1fr] border-t border-line py-5 text-lg text-paper/90 last:border-b md:text-xl"
                >
                  <span className="text-sm text-fog tnum">{pad(i + 1)}</span>
                  {point}
                </li>
              ))}
            </FadeIn>
          </section>

          <div className="mx-auto mt-24 max-w-[90rem] md:mt-32">
            {project.caseStudy.sections.map((section) => (
              <section key={section.heading} className="grid gap-6 border-t border-line py-12 md:grid-cols-12 md:py-16">
                <SplitReveal
                  as="h3"
                  className="font-serif text-[clamp(1.85rem,3vw,2.75rem)] leading-[1.1] font-[360] tracking-[-0.02em] md:col-span-5"
                >
                  {section.heading}
                </SplitReveal>
                <FadeIn className="md:col-span-6 md:col-start-7">
                  <p className="max-w-[36rem] text-lg leading-relaxed text-paper/85">{section.body}</p>
                </FadeIn>
              </section>
            ))}
          </div>

          <div className="mx-auto mt-8 max-w-[90rem]">
            <Gallery shots={project.caseStudy.gallery} />
          </div>

          <div className="mx-auto mt-12 flex max-w-[90rem] flex-wrap items-center justify-between gap-6 pb-24 md:pb-32">
            <a
              href={project.link.href}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-1.5 border-b border-sodium/60 pb-0.5 text-lg transition-colors hover:border-sodium hover:text-sodium"
            >
              <RollText>{project.link.label}</RollText>
              <ArrowUpRight className="size-4" />
            </a>
            <p className="text-sm text-fog">Product names and imagery belong to {project.org}.</p>
          </div>
        </article>

        <NextProject project={next} />
      </main>
      <Contact />
    </PageTransition>
  );
}
