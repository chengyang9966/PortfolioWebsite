import type { Metadata } from "next";
import { cvEducation, cvHeadline, cvProjects, cvRoles, cvSkills, cvSummary } from "@/content/cv";
import { profile } from "@/content/profile";

export const metadata: Metadata = {
  title: `CV — ${profile.name}`,
  description: cvSummary,
  robots: { index: false },
};

const host = (url: string) => url.replace(/^https?:\/\/(www\.|my\.)?/, "");

/**
 * A4 CV, single column so applicant-tracking systems read it in order. Export with `pnpm cv`.
 * The phone number is never in the source: the export script injects it into `[data-phone]`.
 */
export default function CvPage() {
  return (
    <main className="cv-page">
      <article className="cv">
        <header className="cv-header">
          <h1>{profile.name}</h1>
          <p className="cv-headline">{cvHeadline}</p>
          <p className="cv-contact">
            <span>{profile.location}</span>
            <span data-phone hidden />
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
          </p>
          <p className="cv-contact cv-contact-links">
            <a href={profile.site}>{host(profile.site)}</a>
            <a href={profile.links.linkedin}>{host(profile.links.linkedin)}</a>
            <a href={profile.links.github}>{host(profile.links.github)}</a>
          </p>
        </header>

        <section>
          <h2>Summary</h2>
          <p>{cvSummary}</p>
        </section>

        <section>
          <h2>Skills</h2>
          <dl className="cv-skills">
            {cvSkills.map((group) => (
              <div key={group.name}>
                <dt>{group.name}</dt>
                <dd>{group.items}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section>
          <h2>Experience</h2>
          {cvRoles.map((role) => (
            <div key={`${role.company}-${role.period}`} className="cv-role">
              <div className="cv-role-head">
                <h3>
                  {role.title}, <span>{role.company}</span>
                </h3>
                <p className="cv-period">{role.period}</p>
              </div>
              <ul>
                {role.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className="cv-keep">
          <h2>Selected freelance projects</h2>
          {cvProjects.map((project) => (
            <div key={project.name} className="cv-role">
              <div className="cv-role-head">
                <h3>
                  {project.name}, <span>{project.org}</span>
                </h3>
                <p className="cv-period">{project.period}</p>
              </div>
              <p>{project.line}</p>
            </div>
          ))}
        </section>

        <section className="cv-keep">
          <h2>Education</h2>
          {cvEducation.map((item) => (
            <div key={item.title} className="cv-role-head cv-edu">
              <p>
                <strong>{item.title}</strong>, {item.school}
              </p>
              <p className="cv-period">{item.year}</p>
            </div>
          ))}
        </section>
      </article>
    </main>
  );
}
