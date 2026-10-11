import type { Education, SkillGroup } from "./types";

export const about = [
  "I started out in business, not code. A management degree in Ireland and a semester in Berlin led to a FinTech diploma, and that’s where I started building software.",
  "Since 2020 I’ve worked on hotel software, telco backends, a health app and now AI products. The business background stuck: before I ask how to build something, I ask who it’s for and what it should change.",
];

export const skills: SkillGroup[] = [
  { name: "Front end", items: ["React", "Next.js", "TypeScript", "Angular", "Redux Toolkit", "HTML & CSS"] },
  { name: "Back end", items: ["Node.js", "Express", "GraphQL", "Prisma", "PostgreSQL", ".NET Core"] },
  { name: "Cloud", items: ["AWS ECS", "Lambda", "Cognito", "EC2", "S3", "RDS", "CloudFront", "CloudWatch", "Docker"] },
  { name: "Mobile", items: ["React Native", "Bluetooth LE"] },
];

export const education: Education[] = [
  {
    year: "2019",
    title: "Higher Diploma in Financial Technology",
    school: "Letterkenny Institute of Technology, Ireland",
  },
  {
    year: "2018",
    title: "BA (Hons) Business Management",
    school: "Letterkenny Institute of Technology, Ireland",
    note: "Enterprise Development Award",
  },
  { year: "2017", title: "European Business and Economics Programme", school: "Berlin School of Economics and Law" },
];
