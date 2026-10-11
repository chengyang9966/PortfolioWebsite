import { profile } from "@/content/profile";
import { GitHub, LinkedIn } from "./icons";
import { LocalTime } from "./local-time";

export function Contact() {
  return (
    <footer id="contact" aria-labelledby="contact-title" className="bg-raised px-5 pt-24 pb-10 sm:px-10 md:pt-36">
      <div className="mx-auto max-w-[90rem]">
        <h2
          id="contact-title"
          className="max-w-[12ch] font-serif text-[clamp(3rem,9vw,8.5rem)] leading-[0.95] font-[340] tracking-[-0.035em]"
        >
          Let’s build something.
        </h2>
        <div className="mt-10 grid gap-8 md:mt-14 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="max-w-[30rem] text-lg text-paper/85">
              Open to team lead and senior full-stack roles, and to talking through product ideas. Email is the fastest
              way to reach me.
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="mt-6 inline-block border-b-2 border-sodium pb-1 font-serif text-[clamp(1.5rem,3vw,2.5rem)] break-all transition-colors hover:text-sodium"
            >
              {profile.email}
            </a>
          </div>
          <div className="flex flex-col justify-end gap-5 md:col-span-5 md:items-end">
            <p className="text-fog">
              <LocalTime timeZone={profile.timeZone} place="Kuala Lumpur" />
            </p>
            <div className="flex gap-3">
              <a
                href={profile.links.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="grid size-11 place-items-center rounded-full border border-line text-fog transition-colors hover:border-paper hover:text-paper"
              >
                <GitHub />
              </a>
              <a
                href={profile.links.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="grid size-11 place-items-center rounded-full border border-line text-fog transition-colors hover:border-paper hover:text-paper"
              >
                <LinkedIn />
              </a>
              <a
                href={profile.links.resume}
                target="_blank"
                rel="noreferrer"
                className="flex h-11 items-center rounded-full border border-line px-5 text-fog transition-colors hover:border-paper hover:text-paper"
              >
                Résumé
              </a>
            </div>
          </div>
        </div>
        <p className="mt-24 border-t border-line pt-6 text-sm text-fog">
          © {new Date().getFullYear()} {profile.name}
        </p>
      </div>
    </footer>
  );
}
