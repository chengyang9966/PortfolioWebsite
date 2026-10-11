import { about, education, skills } from "@/content/about";
import { SectionHeading } from "./section-heading";

export function About() {
  const [lead, ...body] = about;

  return (
    <section id="about" aria-labelledby="about-title" className="px-5 py-24 sm:px-10 md:py-28">
      <div className="mx-auto max-w-[90rem]">
        <SectionHeading id="about" title="About" />

        <div className="mt-12 grid gap-16 md:mt-16 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-6">
            <p className="max-w-[36rem] font-serif text-[clamp(1.5rem,2.4vw,2rem)] leading-[1.35] font-[380]">{lead}</p>
            {body.map((paragraph) => (
              <p key={paragraph} className="mt-6 max-w-[34rem] text-lg leading-relaxed text-paper/85">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="grid gap-12 md:col-span-5 md:col-start-8">
            <div>
              <h3 className="font-serif text-2xl font-[380]">Tools I use</h3>
              <dl className="mt-5 divide-y divide-line border-y border-line">
                {skills.map((group) => (
                  <div key={group.name} className="grid grid-cols-[6.5rem_1fr] gap-4 py-3.5">
                    <dt className="text-fog">{group.name}</dt>
                    <dd className="text-paper/90">{group.items.join(", ")}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div>
              <h3 className="font-serif text-2xl font-[380]">Education</h3>
              <ul className="mt-5 divide-y divide-line border-y border-line">
                {education.map((item) => (
                  <li key={item.title} className="grid grid-cols-[6.5rem_1fr] gap-4 py-3.5">
                    <span className="text-fog tnum">{item.year}</span>
                    <span>
                      <span className="block text-paper/90">{item.title}</span>
                      <span className="block text-[0.9375rem] text-fog">{item.school}</span>
                      {item.note && <span className="block text-[0.9375rem] text-sodium/90">{item.note}</span>}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
