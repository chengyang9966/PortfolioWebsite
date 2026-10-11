import type { StaticImageData } from "next/image";

export type Link = { label: string; href: string };

export type Shot = { src: StaticImageData; alt: string };

export type Media =
  | { kind: "video"; webm: string; mp4: string; poster: StaticImageData; alt: string }
  | { kind: "phones"; shots: Shot[] };

export type CaseSection = { heading: string; body: string };

export type Project = {
  slug: string;
  title: string;
  org: string;
  period: string;
  year: string;
  summary: string;
  role: string;
  points: string[];
  stack: string[];
  media: Media;
  link: Link;
  caseStudy: {
    overview: string;
    sections: CaseSection[];
    gallery: Shot[];
  };
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
