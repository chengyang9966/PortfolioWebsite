import type { Project, SmallProject } from "./types";

import mantiq from "@/assets/work/mantiq.webp";
import mantiqDay from "@/assets/work/mantiq-day.webp";
import mantiqTools from "@/assets/work/mantiq-tools.webp";
import signsbeat1 from "@/assets/work/signsbeat-1.webp";
import signsbeat2 from "@/assets/work/signsbeat-2.webp";
import signsbeat3 from "@/assets/work/signsbeat-3.webp";
import hotelx from "@/assets/work/hotelx.webp";
import hotelxLogin from "@/assets/work/hotelx-login.webp";

export const projects: Project[] = [
  {
    slug: "mantiq",
    title: "Mantiq Launch",
    org: "Giv AI Labs",
    period: "2025 – now",
    summary:
      "Describe a business idea once, and Mantiq Launch checks it against the real market, builds the brand and puts a live website behind it. Its 21 tools share one brief, so the website, ads and content all tell the same story.",
    role: "Team lead",
    points: [
      "Lead the engineering team building the product, from planning through release",
      "Build the AI tools businesses use to validate, brand, build and run, plus tools for teachers",
      "Moved authentication to AWS Cognito and services onto ECS",
      "Work with the business side on what to build next as the company grows",
    ],
    stack: ["Next.js", "TypeScript", "Node.js", "AWS ECS", "AWS Cognito"],
    visual: {
      kind: "browser",
      url: "mantiq-launch.com",
      main: { src: mantiq, alt: "Mantiq Launch home page: Every tool it takes to launch a business, in one place." },
      extra: [
        { src: mantiqDay, alt: "Mantiq Launch walks a founder through a single launch day, starting at 9:00 am." },
        { src: mantiqTools, alt: "Mantiq Launch toolkit: 21 tools grouped into Validate, Brand, Build and Run." },
      ],
    },
    link: { label: "Visit mantiq-launch.com", href: "https://mantiq-launch.com/" },
  },
  {
    slug: "signsbeat",
    title: "Signsbeat",
    org: "Vitalz",
    period: "2024",
    summary:
      "An AI wellness companion that reads data from wearables and turns it into a longevity index, recovery trends and personal recommendations.",
    role: "Senior full-stack developer",
    points: [
      "Built the web and mobile apps from scratch",
      "Connected wearable devices to the app over Bluetooth",
      "Shipped the AI health assistant and lifestyle insights",
    ],
    stack: ["React Native", "React", "Node.js", "Bluetooth LE", "AWS"],
    visual: {
      kind: "phones",
      shots: [
        { src: signsbeat2, alt: "Signsbeat weekly recovery trend chart." },
        { src: signsbeat1, alt: "Signsbeat longevity index showing a score of 95 with heart rate and sleep metrics." },
        { src: signsbeat3, alt: "Signsbeat AI health assistant greeting the user." },
      ],
    },
    link: { label: "View on the App Store", href: "https://apps.apple.com/my/app/signsbeat/id6499316817" },
  },
  {
    slug: "hotelx",
    title: "HotelX",
    org: "IFCA",
    period: "2020 – 2021",
    summary:
      "A cloud hotel management system for front office, reservations, billing and guest self-service, used by more than 1,000 hotels, resorts and hostels.",
    role: "Software engineer",
    points: [
      "Built features across the React and GraphQL front end and the Node.js services behind it",
      "Integrated Revenue Monster payments, WhatsApp and Telegram messaging, and email",
    ],
    stack: ["React", "TypeScript", "Node.js", "GraphQL"],
    visual: {
      kind: "browser",
      url: "ifca.asia/hotelx",
      main: { src: hotelx, alt: "HotelX product page showing dashboards on desktop, laptop and phone." },
      extra: [{ src: hotelxLogin, alt: "HotelX staff sign-in screen." }],
    },
    link: { label: "Visit HotelX", href: "https://ifca.asia/hotelx/" },
  },
];

export const smallProjects: SmallProject[] = [
  {
    title: "Loan application system",
    org: "Arkmind",
    period: "2022 – 2023",
    summary: "Built and maintained the system a finance company uses to take in and process loan applications.",
    stack: ["React", "Redux Toolkit", "Node.js", "Express", "Prisma"],
  },
  {
    title: "Cashier admin system",
    org: "FirebiredIt",
    period: "2022 – 2023",
    summary: "Built a new cashier and back-office admin system from the ground up.",
    stack: ["React", "Redux Toolkit", "Node.js", "Express", "Prisma"],
  },
];
