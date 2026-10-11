import { Fragment } from "react";
import { profile, yearsShipping } from "@/content/profile";
import { ArrowUpRight } from "./icons";

const nameWords = profile.name.split(" ");

export function Hero() {
  return (
    <section id="top" className="px-5 pt-32 sm:px-10 md:pt-[22vh]">
      <div className="mx-auto w-full max-w-[90rem]">
        <p className="flex settle items-center gap-2.5 text-fog [animation-delay:500ms]">
          <span aria-hidden className="relative flex size-2">
            <span className="absolute inset-0 animate-ping rounded-full bg-sodium/60 [animation-duration:2.4s]" />
            <span className="relative size-2 rounded-full bg-sodium" />
          </span>
          {profile.current.title} at {profile.current.company}, {profile.location.split(",")[0]}
        </p>

        {/* Width-fitted: the full name is ~6.9em wide and "Cheng Yang" ~4.9em, so it fills the content box at any viewport. */}
        <h1
          aria-label={profile.name}
          className="mt-4 font-serif text-[calc((100vw-2.5rem)/5.1)] leading-[0.92] font-[340] tracking-[-0.035em] sm:text-[min(calc((100vw-5rem)/6.95),12.2rem)] sm:leading-none sm:whitespace-nowrap"
        >
          {nameWords.map((word, i) => (
            <Fragment key={word}>
              <span
                aria-hidden
                className="inline-block overflow-x-visible overflow-y-clip pt-[0.06em] pb-[0.2em] align-bottom"
              >
                <span className="rise" style={{ animationDelay: `${100 + i * 110}ms` }}>
                  {word}
                </span>
                {i < nameWords.length - 1 && " "}
              </span>
              {i === 0 && <br className="sm:hidden" />}
            </Fragment>
          ))}
        </h1>

        <div className="mt-6 grid settle gap-8 border-t border-line pt-8 [animation-delay:700ms] md:grid-cols-12">
          <p className="max-w-[34rem] text-lg leading-relaxed text-paper/90 md:col-span-7 md:text-xl">
            I’m a full-stack engineer and team lead. For {yearsShipping} years I’ve shipped web, mobile and cloud
            products. Now I lead the team building{" "}
            <a
              href="#work"
              className="text-paper underline decoration-sodium decoration-1 underline-offset-4 hover:decoration-2"
            >
              Mantiq Launch
            </a>
            , an AI toolkit that takes a business from idea to launch.
          </p>
          <ul className="flex flex-wrap items-start gap-x-6 gap-y-3 text-[0.9375rem] md:col-span-5 md:justify-end">
            <li>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center rounded-full bg-sodium px-4 py-2 font-medium text-harbour transition-transform hover:-translate-y-0.5"
              >
                Email me
              </a>
            </li>
            {[
              { label: "Résumé", href: profile.links.resume },
              { label: "GitHub", href: profile.links.github },
              { label: "LinkedIn", href: profile.links.linkedin },
            ].map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 py-2 text-fog transition-colors hover:text-paper"
                >
                  {link.label}
                  <ArrowUpRight className="size-3.5" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
