import type { StaticImageData } from "next/image";

export type Link = { label: string; href: string };

export type Shot = { src: StaticImageData; alt: string };

export type Visual = { kind: "browser"; url: string; main: Shot; extra?: Shot[] } | { kind: "phones"; shots: Shot[] };

export type Project = {
  slug: string;
  title: string;
  org: string;
  period: string;
  summary: string;
  role: string;
  points: string[];
  stack: string[];
  visual: Visual;
  link: Link;
};

export type SmallProject = {
  title: string;
  org: string;
  period: string;
  summary: string;
  stack: string[];
};

export type Role = {
  start: string;
  end: string;
  title: string;
  company: string;
  line: string;
};

export type SkillGroup = { name: string; items: string[] };

export type Education = { year: string; title: string; school: string; note?: string };
