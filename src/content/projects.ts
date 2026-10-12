import type { Project, SmallProject } from "./types";

import mantiq from "@/assets/work/mantiq.webp";
import mantiqPoster from "@/assets/work/mantiq-poster.webp";
import mantiqDay from "@/assets/work/mantiq-day.webp";
import mantiqTools from "@/assets/work/mantiq-tools.webp";
import signsbeat1 from "@/assets/work/signsbeat-1.webp";
import signsbeat2 from "@/assets/work/signsbeat-2.webp";
import signsbeat3 from "@/assets/work/signsbeat-3.webp";
import signsbeat4 from "@/assets/work/signsbeat-4.webp";
import hotelx from "@/assets/work/hotelx.webp";
import hotelxPoster from "@/assets/work/hotelx-poster.webp";
import hotelxTypes from "@/assets/work/hotelx-types.webp";
import identityLogin from "@/assets/work/identity-login.webp";
import identityRegister from "@/assets/work/identity-register.webp";

const signsbeatShots = {
  trend: { src: signsbeat2, alt: "Signsbeat weekly recovery trend chart." },
  index: { src: signsbeat1, alt: "Signsbeat longevity index showing a score of 95 with heart rate and sleep metrics." },
  assistant: { src: signsbeat3, alt: "Signsbeat AI health assistant greeting the user." },
  coaching: { src: signsbeat4, alt: "Signsbeat list of wellness coaches to book." },
};

export const projects: Project[] = [
  {
    slug: "mantiq-launch",
    title: "Mantiq Launch",
    org: "Giv AI Labs",
    period: "2025 – now",
    year: "2025",
    summary:
      "Describe a business idea once, and Mantiq Launch checks it against the real market, builds the brand and puts a live website behind it.",
    role: "Team lead",
    points: [
      "Lead the engineering team building the product, from planning through release",
      "Build the product app: the AI tools founders use to validate, brand, build and run",
      "Moved authentication to AWS Cognito and services onto ECS",
      "Work with the business side on what to build next as the company grows",
    ],
    stack: ["Next.js", "TypeScript", "Node.js", "AWS ECS", "AWS Cognito"],
    media: {
      kind: "video",
      webm: "/work/mantiq.webm",
      mp4: "/work/mantiq.mp4",
      poster: mantiqPoster,
      alt: "Scrolling through the Mantiq Launch website.",
    },
    link: { label: "Visit mantiq-launch.com", href: "https://mantiq-launch.com/" },
    caseStudy: {
      overview:
        "Mantiq Launch takes a founder from an idea to a live business. They describe the idea once; the product validates it against the market, builds the brand and puts a website behind it. I lead the engineering team and work hands-on in the product app and the backend that powers it. Alongside it, the team builds AI tools for teachers.",
      sections: [
        {
          heading: "One brief behind 21 tools",
          body: "Every tool, from the validation report and brand studio to market research and the website builder, reads from the same business brief. Most of my product work happens here: building tools on top of that shared brief so a founder never has to explain their business twice.",
        },
        {
          heading: "Infrastructure that keeps up",
          body: "I moved authentication to AWS Cognito and the services onto ECS. That gave the team managed sign-in and containerised deployments we can scale as more founders use the product.",
        },
        {
          heading: "Leading the team",
          body: "I run planning and code review for the engineering team, and work with the business side on what to build next, so the roadmap follows what founders actually need.",
        },
      ],
      gallery: [
        { src: mantiq, alt: "Mantiq Launch home page: Every tool it takes to launch a business, in one place." },
        { src: mantiqTools, alt: "Mantiq Launch toolkit: 21 tools grouped into Validate, Brand, Build and Run." },
        { src: mantiqDay, alt: "Mantiq Launch walks a founder through a single launch day, starting at 9:00 am." },
      ],
    },
  },
  {
    slug: "techdevx-identity",
    title: "TechDevX Identity",
    org: "TechDevX",
    period: "2026",
    year: "2026",
    summary:
      "The single sign-in service behind TechDevX’s apps: a standards-based OpenID Connect provider with branded logins for many organisations on one install.",
    role: "Founder and engineer",
    points: [
      "Designed and built the identity provider end to end, from spec to production",
      "Implemented OpenID Connect with PKCE, RS256-signed tokens and a public JWKS",
      "Built organisations, per-app branding and an admin console for apps, users and billing",
      "Turned Stripe plans into token entitlements and signed webhooks for client apps",
      "Hardened production: audit log, rate limits, locked-down containers, secret scanning",
    ],
    stack: [
      "TypeScript",
      "Next.js",
      "Hono",
      "Better Auth",
      "OpenID Connect",
      "PostgreSQL",
      "Prisma",
      "Stripe",
      "Docker",
    ],
    media: { kind: "diagram" },
    link: { label: "Visit auth.techdevx.com", href: "https://auth.techdevx.com/login" },
    caseStudy: {
      overview:
        "Every TechDevX app needs accounts, so instead of rebuilding sign-in each time I built one identity service they all share. TaxHacker on the web and the Vault Finance mobile app send users to it and get back signed tokens. One install serves many organisations, each with its own subdomain, branding and users, and it’s also where each user’s paid plan lives.",
      sections: [
        {
          heading: "Standards, not a homemade token",
          body: "It’s a real OpenID Connect provider, built on Better Auth and the panva OIDC library rather than custom crypto. Apps use the authorization-code flow with PKCE, ID tokens are signed RS256 and verified against a public JWKS, and mobile apps can use bearer tokens with native Apple and Google sign-in.",
        },
        {
          heading: "Every way people expect to sign in",
          body: "Email and password with required verification, magic links that also hand off to native apps, password reset, and Google, GitHub and Apple, with account linking only between verified emails. Apps the platform doesn’t trust get a consent screen; anything short of an explicit allow is a deny.",
        },
        {
          heading: "Many organisations, one install",
          body: "Each organisation is resolved from its subdomain and gets its own branding and user base. Every database query is scoped to the organisation, and an isolation test suite checks that one tenant can never read another’s data. Admins manage apps, users and billing from one console.",
        },
        {
          heading: "Secure by default",
          body: "Sign-in and reset endpoints are rate limited, every auth event goes to an append-only audit log, and responses never reveal whether an email exists. In production the containers drop all privileges, the web container is read-only with no internet access, and around 400 automated tests cover the flows, including Playwright runs of the full OIDC login.",
        },
      ],
      gallery: [
        {
          src: identityLogin,
          alt: "TechDevX Identity sign-in page with email, magic link, Google, GitHub and Apple options.",
        },
        { src: identityRegister, alt: "TechDevX Identity account creation page: one account for every app." },
      ],
    },
  },
  {
    slug: "signsbeat",
    title: "Signsbeat",
    org: "Vitalz",
    period: "2024",
    year: "2024",
    summary:
      "An AI wellness companion that reads data from wearables and turns it into a longevity index, recovery trends and personal recommendations.",
    role: "Senior full-stack developer",
    points: [
      "Built the web and mobile apps from scratch",
      "Connected wearable devices to the app over Bluetooth",
      "Shipped the AI health assistant and lifestyle insights",
    ],
    stack: ["React Native", "React", "Node.js", "Bluetooth LE", "AWS"],
    media: { kind: "phones", shots: [signsbeatShots.trend, signsbeatShots.index, signsbeatShots.assistant] },
    link: { label: "View on the App Store", href: "https://apps.apple.com/my/app/signsbeat/id6499316817" },
    caseStudy: {
      overview:
        "Signsbeat is an AI wellness companion. It reads biometric data from wearables and turns it into a longevity index, recovery trends and personal recommendations. At Vitalz I built it from scratch as the senior full-stack developer, on web and mobile.",
      sections: [
        {
          heading: "From a blank repo to the App Store",
          body: "I built the web and mobile apps from the ground up: the app structure, the screens and the services behind them, through to release on the App Store.",
        },
        {
          heading: "Talking to wearables",
          body: "The app connects to wearable devices over Bluetooth and syncs their readings. Those readings feed the longevity index, sleep and stress metrics, and recovery trends.",
        },
        {
          heading: "AI on top of the data",
          body: "On top of the synced data, I shipped the AI health assistant and lifestyle insights that turn raw numbers into guidance a person can act on.",
        },
      ],
      gallery: [signsbeatShots.index, signsbeatShots.trend, signsbeatShots.assistant, signsbeatShots.coaching],
    },
  },
  {
    slug: "hotelx",
    title: "HotelX",
    org: "IFCA",
    period: "2020 – 2021",
    year: "2020",
    summary:
      "A cloud hotel management system for front office, reservations, billing and guest self-service, used by more than 1,000 hotels, resorts and hostels.",
    role: "Software engineer",
    points: [
      "Built features across the React and GraphQL front end and the Node.js services behind it",
      "Integrated Revenue Monster payments, WhatsApp and Telegram messaging, and email",
    ],
    stack: ["React", "TypeScript", "Node.js", "GraphQL"],
    media: {
      kind: "video",
      webm: "/work/hotelx.webm",
      mp4: "/work/hotelx.mp4",
      poster: hotelxPoster,
      alt: "Scrolling through the HotelX product website.",
    },
    link: { label: "Visit HotelX", href: "https://ifca.asia/hotelx/" },
    caseStudy: {
      overview:
        "HotelX is IFCA’s cloud hotel management system. It covers front office, reservations, billing and guest self-service for more than 1,000 hotels, resorts and hostels. It was my first engineering role, working across the React and GraphQL front end and the Node.js services behind it.",
      sections: [
        {
          heading: "Features in a long-lived product",
          body: "I built features across the front end and services with React, TypeScript, GraphQL and Node.js, inside a large product hotel staff rely on every day.",
        },
        {
          heading: "Payments and messaging",
          body: "I integrated Revenue Monster for payments, WhatsApp and Telegram for guest and staff messaging, and NodeMailer for transactional email.",
        },
      ],
      gallery: [
        { src: hotelx, alt: "HotelX product page showing dashboards on desktop, laptop and phone." },
        { src: hotelxTypes, alt: "HotelX serves hotels, small hotels, resorts, serviced apartments and hostels." },
      ],
    },
  },
];

export function getProject(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1) return null;
  return { project: projects[index], index, next: projects[(index + 1) % projects.length] };
}

export const smallProjects: SmallProject[] = [
  {
    title: "Agent commission and settlement system",
    org: "TechDevX client, confidential",
    summary:
      "A self-serve portal where 300+ agents see real-time commission earnings and request payouts, with a finance review queue and an audit trail, replacing weekly Excel reconciliations.",
    stack: ["Next.js", "PostgreSQL", "Stripe"],
    metric: { value: "−85%", label: "reconciliation time" },
  },
  {
    title: "Headless marketing site and lead routing",
    org: "TechDevX client, confidential",
    summary:
      "A fast, editor-friendly site on Next.js and Payload that the marketing team runs without developers, with inbound forms scored and routed to Slack.",
    stack: ["Next.js", "Payload CMS", "Vercel"],
    metric: { value: "3.2×", label: "inbound leads a month" },
  },
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
