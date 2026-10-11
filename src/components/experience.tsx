import { experience } from "@/content/experience";
import { SectionHeading } from "./section-heading";

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="px-5 py-24 sm:px-10 md:py-28">
      <div className="mx-auto max-w-[90rem]">
        <SectionHeading id="experience" title="Experience">
          Six roles since 2020, across hospitality, telco, health tech and AI.
        </SectionHeading>

        <ol className="mt-12 md:mt-16">
          {experience.map((role) => (
            <li
              key={`${role.company}-${role.start}`}
              className="group grid gap-x-10 gap-y-2 border-b border-line py-7 first:border-t md:grid-cols-12 md:py-9"
            >
              <p className="text-[0.9375rem] text-fog tnum md:col-span-3">
                {role.start} – {role.end === "Now" ? <span className="text-sodium">Now</span> : role.end}
              </p>
              <div className="md:col-span-4">
                <h3 className="font-serif text-[1.75rem] leading-tight font-[380] tracking-[-0.015em]">
                  {role.company}
                </h3>
                <p className="text-paper/80">{role.title}</p>
              </div>
              <p className="max-w-[34rem] text-fog transition-colors duration-300 group-hover:text-paper/90 md:col-span-5">
                {role.line}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
