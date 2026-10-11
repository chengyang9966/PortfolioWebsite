"use client";

import { Fragment, useRef } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";
import { profile } from "@/content/profile";
import { GitHub, LinkedIn } from "./icons";
import { LocalTime } from "./local-time";
import { Magnetic } from "./motion/magnetic";
import { RollText } from "./roll-text";

const headline = "Let’s build something.".split(" ");

const iconLink =
  "grid size-12 place-items-center rounded-full border border-line text-fog transition-colors hover:border-paper hover:text-paper";

export function Contact() {
  const root = useRef<HTMLElement>(null);

  // The headline assembles itself, letter by letter, as the footer scrolls into view.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from(".contact-char", {
          yPercent: 115,
          ease: "none",
          stagger: 0.04,
          scrollTrigger: { trigger: root.current, start: "top 85%", end: "top 25%", scrub: 0.8 },
        });
      });
    },
    { scope: root },
  );

  return (
    <footer
      ref={root}
      id="contact"
      aria-labelledby="contact-title"
      className="bg-raised px-5 pt-24 pb-10 sm:px-10 md:pt-36"
    >
      <div className="mx-auto max-w-[90rem]">
        <h2
          id="contact-title"
          aria-label={headline.join(" ")}
          className="font-serif text-[clamp(3.25rem,10vw,9.5rem)] leading-[0.92] font-[340] tracking-[-0.035em]"
        >
          {headline.map((word, i) => (
            <Fragment key={word}>
              <span
                aria-hidden
                className="inline-block overflow-x-visible overflow-y-clip pt-[0.05em] pb-[0.18em] align-bottom"
              >
                {[...word].map((char, j) => (
                  <span key={j} className="contact-char inline-block">
                    {char}
                  </span>
                ))}
              </span>
              {i === 1 ? <br /> : " "}
            </Fragment>
          ))}
        </h2>

        <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="max-w-[30rem] text-lg text-paper/85">
              Open to team lead and senior full-stack roles, and to talking through product ideas. Email is the fastest
              way to reach me.
            </p>
            <Magnetic strength={0.15}>
              <a
                href={`mailto:${profile.email}`}
                data-cursor="Write"
                className="mt-6 inline-block border-b-2 border-sodium pb-1 font-serif text-[clamp(1.5rem,3.2vw,2.75rem)] break-all transition-colors hover:text-sodium"
              >
                {profile.email}
              </a>
            </Magnetic>
          </div>
          <div className="flex flex-col justify-end gap-5 md:col-span-5 md:items-end">
            <p className="text-fog">
              <LocalTime timeZone={profile.timeZone} place="Kuala Lumpur" />
            </p>
            <div className="flex gap-3">
              <Magnetic>
                <a
                  href={profile.links.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className={iconLink}
                >
                  <GitHub />
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href={profile.links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className={iconLink}
                >
                  <LinkedIn />
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href={profile.links.resume}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex h-12 items-center rounded-full border border-line px-5 text-fog transition-colors hover:border-paper hover:text-paper"
                >
                  <RollText>Résumé</RollText>
                </a>
              </Magnetic>
            </div>
          </div>
        </div>

        <div className="mt-24 flex flex-col gap-2 border-t border-line pt-6 text-sm text-fog sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {profile.name}
          </p>
          <p>Product names and imagery belong to their respective companies.</p>
        </div>
      </div>
    </footer>
  );
}
