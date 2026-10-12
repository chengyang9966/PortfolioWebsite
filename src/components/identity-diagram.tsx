"use client";

import { useRef, useState } from "react";
import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { identitySteps } from "@/content/identity";

type Node = { id: string; x: number; y: number; w: number; h: number; title: string; sub: string; dashed?: boolean };

// Layout in a 1600×1000 viewBox (16:10, same as the other previews).
const nodes: Node[] = [
  { id: "taxhacker", x: 60, y: 190, w: 340, h: 120, title: "TaxHacker", sub: "Web app" },
  { id: "vault", x: 60, y: 360, w: 340, h: 120, title: "Vault Finance", sub: "iOS and Android" },
  { id: "next", x: 60, y: 530, w: 340, h: 120, title: "Next client app", sub: "Registered in admin", dashed: true },
  { id: "login", x: 570, y: 230, w: 460, h: 130, title: "Hosted login and admin", sub: "Next.js, branded per org" },
  { id: "server", x: 570, y: 470, w: 460, h: 160, title: "Auth server", sub: "Hono, Better Auth, OIDC provider" },
  { id: "social", x: 1180, y: 150, w: 380, h: 120, title: "Google, GitHub, Apple", sub: "Social sign-in" },
  { id: "db", x: 1180, y: 310, w: 380, h: 120, title: "PostgreSQL", sub: "Org-scoped, audit log" },
  { id: "email", x: 1180, y: 470, w: 380, h: 120, title: "Resend", sub: "Magic links, verification" },
  { id: "stripe", x: 1180, y: 630, w: 380, h: 120, title: "Stripe", sub: "Plans become entitlements" },
];

const edges: Record<string, string> = {
  authorize: "M400 245 C 490 245, 480 530, 570 530",
  toLogin: "M800 470 L 800 360",
  toSocial: "M1030 280 C 1110 280, 1100 210, 1180 210",
  toDb: "M1030 520 C 1110 520, 1100 370, 1180 370",
  toEmail: "M1030 550 C 1100 550, 1110 530, 1180 530",
  tokens: "M570 590 C 470 590, 490 275, 400 275",
  toVault: "M570 610 C 480 610, 490 420, 400 420",
  fromStripe: "M1180 690 C 1100 690, 1110 610, 1030 610",
};

/** Animated map of a sign-in through TechDevX Identity. Fills its parent (16:10). */
export function IdentityDiagram() {
  const root = useRef<HTMLDivElement>(null);
  const paths = useRef<Record<string, SVGPathElement | null>>({});
  const packets = useRef<Record<string, SVGCircleElement | null>>({});
  const [step, setStep] = useState(0);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const timeline = gsap.timeline({ repeat: -1, paused: true });
        identitySteps.forEach((current, index) => {
          const label = `step-${index}`;
          timeline.addLabel(label).call(() => setStep(index), [], label);
          current.edges.forEach((edge) => {
            const path = paths.current[edge];
            const packet = packets.current[edge];
            if (!path || !packet) return;
            timeline
              .set(packet, { autoAlpha: 1 }, label)
              .to(
                packet,
                {
                  motionPath: { path, align: path, alignOrigin: [0.5, 0.5] },
                  duration: 1.5,
                  ease: "power2.inOut",
                  immediateRender: false,
                },
                label,
              )
              .set(packet, { autoAlpha: 0 }, `${label}+=1.5`);
          });
          timeline.to({}, { duration: 1.1 });
        });

        // Only run while on screen.
        ScrollTrigger.create({
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) => (self.isActive ? timeline.play() : timeline.pause()),
        });
      });
    },
    { scope: root },
  );

  const active = new Set(identitySteps[step].edges);

  return (
    <div
      ref={root}
      className="relative size-full bg-[radial-gradient(ellipse_at_50%_40%,var(--color-raised)_0%,var(--color-ink)_70%)]"
    >
      <svg
        viewBox="0 0 1600 1000"
        role="img"
        aria-label="Diagram: client apps sign users in through the TechDevX Identity auth server, which uses a hosted login, social providers, PostgreSQL, Resend and Stripe."
        className="size-full"
        style={{ fontFamily: "var(--font-schibsted)" }}
      >
        {/* The auth.techdevx.com edge, terminated by Caddy with per-org TLS. */}
        <rect
          x="530"
          y="150"
          width="540"
          height="520"
          rx="24"
          strokeDasharray="6 8"
          className="fill-none stroke-accent/35"
        />
        <text x="558" y="195" fontSize="24" className="fill-accent">
          auth.techdevx.com
        </text>
        <text x="1042" y="195" fontSize="20" textAnchor="end" className="fill-fog">
          Caddy, TLS per org
        </text>

        {Object.entries(edges).map(([id, d]) => (
          <path
            key={id}
            ref={(el) => {
              paths.current[id] = el;
            }}
            d={d}
            strokeWidth={active.has(id) ? 3 : 2}
            strokeDasharray={active.has(id) ? "10 8" : undefined}
            className={`fill-none ${active.has(id) ? "diagram-flow stroke-accent" : "stroke-fog/30"}`}
            style={{ transition: "stroke 400ms ease" }}
          />
        ))}

        {nodes.map((node) => (
          <g key={node.id}>
            <rect
              x={node.x}
              y={node.y}
              width={node.w}
              height={node.h}
              rx="18"
              strokeWidth="2"
              strokeDasharray={node.dashed ? "6 8" : undefined}
              className={`fill-ink ${node.id === "server" ? "stroke-accent/80" : "stroke-fog/30"}`}
            />
            <text x={node.x + 28} y={node.y + node.h / 2 - 6} fontSize="30" className="fill-paper">
              {node.title}
            </text>
            <text x={node.x + 28} y={node.y + node.h / 2 + 30} fontSize="22" className="fill-fog">
              {node.sub}
            </text>
          </g>
        ))}

        {Object.keys(edges).map((id) => (
          <circle
            key={id}
            ref={(el) => {
              packets.current[id] = el;
            }}
            r="9"
            opacity="0"
            className="fill-accent"
            style={{ filter: "drop-shadow(0 0 8px color-mix(in srgb, var(--color-accent) 80%, transparent))" }}
          />
        ))}
      </svg>

      <div className="absolute inset-x-0 bottom-0 flex items-center gap-4 px-[4%] pb-[3.5%] text-[clamp(0.7rem,1.1vw,1rem)]">
        <span className="shrink-0 text-accent tnum">
          {step + 1} / {identitySteps.length}
        </span>
        <p key={step} className="diagram-caption text-paper/90">
          {identitySteps[step].text}
        </p>
      </div>
    </div>
  );
}
