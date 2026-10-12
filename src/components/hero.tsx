"use client";

import { Fragment, useRef } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";
import { onIntroDone } from "@/lib/intro";
import { profile, yearsShipping } from "@/content/profile";
import { ArrowUpRight } from "./icons";
import { Magnetic } from "./motion/magnetic";
import { RollText } from "./roll-text";

const nameWords = profile.name.split(" ");

const links = [
  { label: "Résumé", href: profile.links.resume },
  { label: "GitHub", href: profile.links.github },
  { label: "LinkedIn", href: profile.links.linkedin },
];

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add({ motion: MOTION_OK, reduce: "(prefers-reduced-motion: reduce)" }, (context) => {
        if (context.conditions?.reduce) {
          gsap.set("[data-intro]", { autoAlpha: 1 });
          return;
        }

        const intro = gsap
          .timeline({ paused: true })
          .set("[data-intro]", { autoAlpha: 1 })
          .from(".hero-char", { yPercent: 118, duration: 1.5, ease: "expo.out", stagger: 0.035 })
          .from(".hero-rule", { scaleX: 0, transformOrigin: "0% 50%", duration: 1.6, ease: "expo.inOut" }, 0.15)
          .from("[data-intro-fade]", { y: 28, autoAlpha: 0, duration: 1.2, ease: "expo.out", stagger: 0.08 }, 0.55);
        const stop = onIntroDone(() => intro.play());

        // As the page scrolls away, the name drifts slower than the content and the intro fades.
        gsap.to(".hero-name", {
          yPercent: -22,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to(".hero-intro", {
          autoAlpha: 0,
          y: -48,
          ease: "none",
          scrollTrigger: { trigger: ".hero-intro", start: "top 55%", end: "top 10%", scrub: true },
        });

        return stop;
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="top" className="px-5 pt-32 sm:px-10 md:pt-[22vh]">
      <div className="mx-auto w-full max-w-[90rem]">
        <p data-intro className="text-fog">
          <span data-intro-fade className="flex items-center gap-2.5">
            <span aria-hidden className="relative flex size-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-sodium/60 [animation-duration:2.4s]" />
              <span className="relative size-2 rounded-full bg-sodium" />
            </span>
            {profile.current.title} at {profile.current.company}, {profile.location.split(",")[0]}
          </span>
        </p>

        {/* Width-fitted: the full name is ~6.9em wide and "Cheng Yang" ~4.9em, so it fills the content box at any viewport. */}
        <h1
          data-intro
          aria-label={profile.name}
          className="hero-name mt-4 font-serif text-[calc((100vw-2.5rem)/5.1)] leading-[0.92] font-[340] tracking-[-0.035em] sm:text-[min(calc((100vw-5rem)/7.05),12rem)] sm:leading-none sm:whitespace-nowrap"
        >
          {nameWords.map((word, i) => (
            <Fragment key={word}>
              <span
                aria-hidden
                className="inline-block overflow-x-visible overflow-y-clip pt-[0.06em] pb-[0.2em] align-bottom"
              >
                {[...word].map((char, j) => (
                  <span key={j} className="hero-char inline-block">
                    {char}
                  </span>
                ))}
                {i < nameWords.length - 1 && " "}
              </span>
              {i === 0 && <br className="sm:hidden" />}
            </Fragment>
          ))}
        </h1>

        <div data-intro className="hero-intro mt-6">
          <div className="hero-rule h-px bg-line" />
          <div className="grid gap-8 pt-8 md:grid-cols-12">
            <p data-intro-fade className="max-w-[34rem] text-lg leading-relaxed text-paper/90 md:col-span-7 md:text-xl">
              I’m a full-stack engineer and team lead. For {yearsShipping} years I’ve shipped web, mobile and cloud
              products. Now I lead the team building{" "}
              <a
                href="#work"
                className="text-paper underline decoration-sodium decoration-1 underline-offset-4 hover:decoration-2"
              >
                Mantiq Launch
              </a>
              , an AI toolkit that takes a business from idea to launch, and run my own studio, TechDevX.
            </p>
            <ul
              data-intro-fade
              className="flex flex-wrap items-center gap-x-6 gap-y-3 self-start text-[0.9375rem] md:col-span-5 md:justify-end"
            >
              <li>
                <Magnetic>
                  <a
                    href={`mailto:${profile.email}`}
                    className="group block rounded-full bg-sodium px-5 py-2.5 font-medium text-harbour"
                  >
                    <RollText>Email me</RollText>
                  </a>
                </Magnetic>
              </li>
              {links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-1 py-2 text-fog transition-colors hover:text-paper"
                  >
                    <RollText>{link.label}</RollText>
                    <ArrowUpRight className="size-3.5 transition-transform duration-500 ease-out-quint group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
