// Post-build content check: the prerendered home page must contain the real CV content.
import { readFileSync } from "node:fs";

const read = (path) => readFileSync(new URL(`../.next/server/app/${path}`, import.meta.url), "utf8");
const html = read("index.html");

const mustContain = [
  "Ong",
  "Mantiq Launch",
  "Signsbeat",
  "HotelX",
  "Giv AI Labs",
  "Arkmind",
  "Vitalz",
  "CelcomDigi",
  "Syntrino Solution",
  "IFCA",
  "FirebiredIt",
  "TechDevX",
  "PeopleX",
  "chengyang9966@gmail.com",
  "linkedin.com/in/chengyangong",
  "github.com/chengyang9966",
];
const mustNotContain = ["Lorem", "Create Next App"];

const caseStudies = {
  "mantiq-launch": "Mantiq Launch",
  leadflow: "LeadFlow",
  "techdevx-identity": "TechDevX Identity",
  signsbeat: "Signsbeat",
  hotelx: "HotelX",
};

const cvHtml = read("cv.html");
const cvChecks = ["Ong Cheng Yang", "Giv AI Labs", "TechDevX", "CelcomDigi", "IFCA"].filter((text) => !cvHtml.includes(text));

const failures = [
  ...cvChecks.map((text) => `cv missing: ${text}`),
  ...Object.entries(caseStudies).flatMap(([slug, title]) => {
    try {
      return read(`work/${slug}.html`).includes(title) ? [] : [`case study /work/${slug} missing title`];
    } catch {
      return [`case study /work/${slug} not prerendered`];
    }
  }),
  ...mustContain.filter((text) => !html.includes(text)).map((text) => `missing: ${text}`),
  ...mustNotContain.filter((text) => html.includes(text)).map((text) => `unexpected: ${text}`),
];

if (failures.length) {
  console.error(`smoke: ${failures.length} check(s) failed\n  ${failures.join("\n  ")}`);
  process.exit(1);
}
console.log(`smoke: all ${mustContain.length + mustNotContain.length + Object.keys(caseStudies).length} checks passed`);
