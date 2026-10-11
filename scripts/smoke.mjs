// Post-build content check: the prerendered home page must contain the real CV content.
import { readFileSync } from "node:fs";

const html = readFileSync(new URL("../.next/server/app/index.html", import.meta.url), "utf8");

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
  "chengyang9966@gmail.com",
  "linkedin.com/in/chengyangong",
  "github.com/chengyang9966",
];
const mustNotContain = ["Lorem", "Create Next App"];

const failures = [
  ...mustContain.filter((text) => !html.includes(text)).map((text) => `missing: ${text}`),
  ...mustNotContain.filter((text) => html.includes(text)).map((text) => `unexpected: ${text}`),
];

if (failures.length) {
  console.error(`smoke: ${failures.length} check(s) failed\n  ${failures.join("\n  ")}`);
  process.exit(1);
}
console.log(`smoke: all ${mustContain.length + mustNotContain.length} checks passed`);
