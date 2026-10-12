// Exports /cv to PDF with the local Chrome. Run after `pnpm build`:
//   pnpm cv                          -> public/ong-cheng-yang-cv.pdf (no phone; linked from the site)
//   CV_PHONE="+60 ..." pnpm cv       -> also cv-private/ong-cheng-yang-cv.pdf (git-ignored, for emailing)
import { spawn } from "node:child_process";
import { mkdirSync } from "node:fs";
import puppeteer from "puppeteer-core";

const PORT = 4319;
const CHROME = process.env.CHROME_PATH ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const server = spawn("pnpm", ["exec", "next", "start", "-p", String(PORT)], { stdio: "ignore" });

async function waitForServer() {
  for (let i = 0; i < 60; i++) {
    try {
      if ((await fetch(`http://localhost:${PORT}/cv`)).ok) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error("Server did not start; run `pnpm build` first.");
}

async function exportPdf(browser, path, phone) {
  const page = await browser.newPage();
  await page.goto(`http://localhost:${PORT}/cv`, { waitUntil: "networkidle0" });
  await page.evaluate(() => document.fonts.ready);
  if (phone) {
    await page.evaluate((phone) => {
      const slot = document.querySelector("[data-phone]");
      slot.textContent = phone;
      slot.hidden = false;
    }, phone);
  }
  await page.pdf({ path, format: "A4", printBackground: true, preferCSSPageSize: true });
  await page.close();
  console.log(`cv: wrote ${path}`);
}

try {
  await waitForServer();
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: true });
  await exportPdf(browser, "public/ong-cheng-yang-cv.pdf");
  if (process.env.CV_PHONE) {
    mkdirSync("cv-private", { recursive: true });
    await exportPdf(browser, "cv-private/ong-cheng-yang-cv.pdf", process.env.CV_PHONE);
  }
  await browser.close();
} finally {
  server.kill();
}
