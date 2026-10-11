import { about, education, skills } from "@/content/about";
import { FadeIn } from "./motion/fade-in";
import { SplitReveal } from "./motion/split-reveal";
import { SectionHeading } from "./section-heading";

export function About() {
  const [lead, ...body] = about;

  return (
    <section id="about" aria-labelledby="about-title" className="px-5 py-24 sm:px-10 md:py-32">
      <div className="mx-auto max-w-[90rem]">
        <SectionHeading id="about" title="About" />

        <div className="mt-12 grid gap-16 md:mt-16 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-6">
            <SplitReveal
              as="p"
              className="max-w-[36rem] font-serif text-[clamp(1.6rem,2.6vw,2.25rem)] leading-[1.3] font-[360]"
            >
              {lead}
            </SplitReveal>
            <FadeIn>
              {body.map((paragraph) => (
                <p key={paragraph} data-reveal className="mt-6 max-w-[34rem] text-lg leading-relaxed text-paper/85">
                  {paragraph}
                </p>
              ))}
            </FadeIn>
          </div>

          <div className="grid gap-12 md:col-span-5 md:col-start-8">
            <FadeIn stagger={0.06}>
              <h3 data-reveal className="font-serif text-2xl font-[380]">
                Tools I use
              </h3>
              <dl className="mt-5 border-b border-line">
                {skills.map((group) => (
                  <div
                    key={group.name}
                    data-reveal
                    className="grid grid-cols-[6.5rem_1fr] gap-4 border-t border-line py-3.5"
                  >
                    <dt className="text-fog">{group.name}</dt>
                    <dd className="text-paper/90">{group.items.join(", ")}</dd>
                  </div>
                ))}
              </dl>
            </FadeIn>

            <FadeIn stagger={0.06}>
              <h3 data-reveal className="font-serif text-2xl font-[380]">
                Education
              </h3>
              <ul className="mt-5 border-b border-line">
                {education.map((item) => (
                  <li
                    key={item.title}
                    data-reveal
                    className="grid grid-cols-[6.5rem_1fr] gap-4 border-t border-line py-3.5"
                  >
                    <span className="text-fog tnum">{item.year}</span>
                    <span>
                      <span className="block text-paper/90">{item.title}</span>
                      <span className="block text-[0.9375rem] text-fog">{item.school}</span>
                      {item.note && <span className="block text-[0.9375rem] text-sodium/90">{item.note}</span>}
                    </span>
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
