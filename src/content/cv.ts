// CV content. Rendered at /cv and exported to public/ong-cheng-yang-cv.pdf (`pnpm cv`).
// Keep facts in step with projects.ts / experience.ts; this file adds the detail a CV needs.

export const cvHeadline = "Senior full-stack engineer, backend-focused · Team lead";

export const cvSummary =
  "Engineer with six years of shipping production software, most of it on the backend: Node.js services, REST and GraphQL APIs, event-driven workflows on queues and webhooks, PostgreSQL and AWS. Team lead at Giv AI Labs, and founder of TechDevX, where I built an OpenID Connect identity provider and a multi-tenant CRM with a WhatsApp AI agent.";

export const cvSkills = [
  { name: "Backend", items: "Node.js, TypeScript, Express, Fastify, Hono, REST, GraphQL, .NET Core" },
  {
    name: "Event-driven",
    items: "Redis + BullMQ job queues, webhooks (Stripe, WhatsApp Cloud API), AWS Lambda, scheduled workers",
  },
  { name: "Data", items: "PostgreSQL, Prisma, multi-tenant data scoping, Redis" },
  {
    name: "Cloud & DevOps",
    items: "AWS (ECS, Lambda, Cognito, EC2, S3, RDS, CloudFront, CloudWatch), Docker, GitHub Actions CI/CD",
  },
  { name: "Auth & security", items: "OpenID Connect, OAuth (Google, GitHub, Apple), PKCE, JWT/JWKS, audit logging" },
  { name: "Frontend & mobile", items: "React, Next.js, React Native, Redux Toolkit, Angular" },
  { name: "AI", items: "Claude and OpenAI APIs, structured outputs, AI agents with guardrails" },
];

export type CvRole = {
  title: string;
  company: string;
  place?: string;
  period: string;
  bullets: string[];
};

export const cvRoles: CvRole[] = [
  {
    title: "Team Lead",
    company: "Giv AI Labs Sdn Bhd",
    place: "Kuala Lumpur",
    period: "Aug 2025 – Present",
    bullets: [
      "Lead the engineering team building Mantiq Launch, an AI platform whose 21 tools take founders from an idea to a launched business, and AI tools for teachers.",
      "Build product features and the services behind them in Next.js, TypeScript and Node.js.",
      "Migrated authentication to AWS Cognito and moved services onto AWS ECS.",
      "Run planning and code review, and work with the business on what to build next.",
    ],
  },
  {
    title: "Founder",
    company: "TechDevX",
    place: "Kuala Lumpur",
    period: "2024 – Present",
    bullets: [
      "LeadFlow (own product): multi-tenant CRM. Fastify API and Next.js apps on PostgreSQL, with every query scoped to its business; Redis/BullMQ workers for background jobs; WhatsApp Cloud API webhooks turn messages into leads.",
      "Built LeadFlow’s WhatsApp AI agent (Claude, OpenAI switchable): replies follow business playbooks, within a daily cost cap, and any reply that fails validation is dropped instead of sent.",
      "TechDevX Identity: OpenID Connect provider (authorization code + PKCE, RS256 tokens, JWKS) on Hono, Better Auth and PostgreSQL, serving multiple organisations; Stripe plans become token entitlements and signed webhooks to client apps.",
      "Security and quality: append-only audit log, rate limiting, hardened read-only containers, secret scanning; about 400 automated tests including Playwright end-to-end OIDC flows.",
      "Client work: an agent commission and settlement portal for 300+ agents that cut reconciliation time by 85% (Next.js, PostgreSQL, Stripe); a headless marketing site with lead routing that grew inbound leads 3.2×.",
    ],
  },
  {
    title: "Freelance Full-stack Developer",
    company: "Arkmind",
    period: "Oct 2024 – Jul 2025",
    bullets: ["Full-stack development on Arkmind’s web systems, across front end and Node.js services."],
  },
  {
    title: "Senior Full-stack Developer",
    company: "Vitalz Sdn Bhd",
    place: "Kuala Lumpur",
    period: "Jan 2024 – Oct 2024",
    bullets: [
      "Built the Signsbeat web and mobile apps from scratch, an AI wellness companion released on the App Store.",
      "Connected wearable devices over Bluetooth and synced their readings into a longevity index and recovery trends.",
      "Shipped the AI health assistant and lifestyle insights on top of the synced data.",
    ],
  },
  {
    title: "Node.js Developer",
    company: "CelcomDigi Berhad",
    place: "Kuala Lumpur",
    period: "Jan 2022 – Dec 2023",
    bullets: [
      "Debugged and fixed production issues in backend services.",
      "Introduced AWS Lambda to the backend.",
      "Built reusable components and improved the user experience of internal products.",
    ],
  },
  {
    title: "Software Engineer",
    company: "Syntrino Solutions",
    place: "Kuala Lumpur",
    period: "May 2021 – Dec 2021",
    bullets: [
      "Worked on PeopleX, an HR platform for leave, claims, payslips and attendance: built its virtual business card, the Thrive web app redesign and new system email templates (React, Next.js, .NET Core).",
    ],
  },
  {
    title: "Software Engineer",
    company: "IFCA Sdn Bhd",
    place: "Kuala Lumpur",
    period: "Sep 2020 – May 2021",
    bullets: [
      "Built features for HotelX, a cloud hotel management system used by 1,000+ properties, in React, TypeScript, Node.js and GraphQL.",
      "Integrated Revenue Monster payments, WhatsApp and Telegram messaging, and NodeMailer email.",
    ],
  },
];

export const cvProjects = [
  {
    name: "Loan application system",
    org: "Arkmind",
    period: "2022 – 2023",
    line: "Built and maintained the system a finance company uses to take in and process loan applications (React, Redux Toolkit, Node.js, Express, Prisma).",
  },
  {
    name: "Cashier admin system",
    org: "FirebiredIt",
    period: "2022 – 2023",
    line: "Built a new cashier and back-office admin system from the ground up (React, Redux Toolkit, Node.js, Express, Prisma).",
  },
];

export const cvEducation = [
  {
    title: "Higher Diploma in Financial Technology",
    school: "Letterkenny Institute of Technology, Ireland",
    year: "2019",
  },
  {
    title: "BA (Hons) Business Management, Enterprise Development Award",
    school: "Letterkenny Institute of Technology, Ireland",
    year: "2018",
  },
  {
    title: "European Business and Economics Programme",
    school: "Berlin School of Economics and Law, Germany",
    year: "2017",
  },
  { title: "Diploma in Business Management", school: "University of Malaya, Malaysia", year: "2016" },
];
