"use client";

import { useEffect, useRef, useState, ViewTransition } from "react";
import Link from "next/link";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { projects } from "@/content/projects";
import { ProjectMedia } from "./project-media";

const DESKTOP = "(min-width: 1024px)";
const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Desktop: a list of projects beside a sticky preview that swaps (clip-path wipe) as each row
 * reaches the middle of the screen or is hovered. Mobile: stacked cards whose videos play in view.
 * Clicking a project morphs its preview into the case-study hero via a shared ViewTransition name.
 */
export function WorkShowcase() {
  const root = useRef<HTMLDivElement>(null);
  const desktopVideos = useRef<(HTMLVideoElement | null)[]>([]);
  const mobileVideos = useRef<(HTMLVideoElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(DESKTOP, () => {
        gsap.utils.toArray<HTMLElement>("[data-work-row]").forEach((row, index) => {
          ScrollTrigger.create({
            trigger: row,
            start: "top 60%",
            end: "bottom 60%",
            onToggle: (self) => self.isActive && setActive(index),
          });
        });
        gsap.fromTo(
          "[data-work-progress]",
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: { trigger: "[data-work-list]", start: "top 60%", end: "bottom 60%", scrub: true },
          },
        );
      });
    },
    { scope: root },
  );

  // Only the active desktop preview plays.
  useEffect(() => {
    if (!matchMedia(DESKTOP).matches) return;
    desktopVideos.current.forEach((video, index) => {
      if (!video) return;
      if (index === active) video.play().catch(() => {});
      else video.pause();
    });
  }, [active]);

  // Mobile cards play while at least half visible.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) video.play().catch(() => {});
          else video.pause();
        }
      },
      { threshold: 0.5 },
    );
    mobileVideos.current.forEach((video) => video && observer.observe(video));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={root}>
      <div className="hidden lg:grid lg:grid-cols-12 lg:gap-10">
        <ol data-work-list className="col-span-5">
          {projects.map((project, index) => (
            <li key={project.slug} data-work-row className="flex min-h-[64vh] items-center">
              <Link
                href={`/work/${project.slug}`}
                transitionTypes={["nav-forward"]}
                data-cursor="View"
                onPointerEnter={() => setActive(index)}
                className={`block w-full py-10 transition-colors duration-700 ease-out-quint ${
                  active === index ? "text-paper" : "text-paper/45"
                }`}
              >
                <span className="text-sm text-fog tnum">{pad(index + 1)}</span>
                <h3 className="mt-3 font-serif text-[clamp(3rem,5.4vw,5.75rem)] leading-[0.95] font-[360] tracking-[-0.03em]">
                  {project.title}
                </h3>
                <p className="mt-5 flex justify-between gap-6 text-[0.9375rem]">
                  <span>
                    {project.role}, {project.org}
                  </span>
                  <span className="tnum">{project.year}</span>
                </p>
              </Link>
            </li>
          ))}
        </ol>

        <div className="col-span-7">
          <div className="sticky top-[max(6rem,calc(50vh-16rem))]">
            <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-line bg-raised">
              {projects.map((project, index) => (
                <ViewTransition key={project.slug} name={`media-${project.slug}`} share="morph" default="none">
                  <div data-active={index === active} className="work-layer absolute inset-0">
                    <div className="work-layer-inner size-full">
                      <ProjectMedia
                        media={project.media}
                        videoRef={(el) => {
                          desktopVideos.current[index] = el;
                        }}
                      />
                    </div>
                  </div>
                </ViewTransition>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-4 text-sm text-fog">
              <span className="tnum">
                ({pad(active + 1)} / {pad(projects.length)})
              </span>
              <span className="relative h-px flex-1 bg-line">
                <span data-work-progress className="absolute inset-0 origin-left bg-sodium" />
              </span>
              <span className="text-paper">{projects[active].title}</span>
            </div>
          </div>
        </div>
      </div>

      <ul className="grid gap-16 lg:hidden">
        {projects.map((project, index) => (
          <li key={project.slug}>
            <Link href={`/work/${project.slug}`} transitionTypes={["nav-forward"]} className="block">
              <div className="aspect-[16/10] overflow-hidden rounded-xl border border-line bg-raised">
                <ProjectMedia
                  media={project.media}
                  videoRef={(el) => {
                    mobileVideos.current[index] = el;
                  }}
                />
              </div>
              <div className="mt-5 flex items-baseline justify-between gap-4">
                <h3 className="font-serif text-4xl font-[380] tracking-[-0.02em]">{project.title}</h3>
                <span className="text-fog tnum">{project.year}</span>
              </div>
              <p className="mt-1 text-fog">
                {project.role}, {project.org}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
