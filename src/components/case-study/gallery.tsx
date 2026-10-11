"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";
import type { Shot } from "@/content/types";

/** Screenshots that unclip as they enter and drift slightly against the scroll. */
export function Gallery({ shots }: { shots: Shot[] }) {
  const root = useRef<HTMLDivElement>(null);
  const portrait = shots[0].src.height > shots[0].src.width;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.utils.toArray<HTMLElement>("[data-gallery-item]").forEach((item) => {
          gsap.fromTo(
            item,
            { clipPath: "inset(14% 6% 14% 6% round 12px)" },
            {
              clipPath: "inset(0% 0% 0% 0% round 12px)",
              ease: "none",
              scrollTrigger: { trigger: item, start: "top 95%", end: "top 45%", scrub: true },
            },
          );
          gsap.fromTo(
            item.querySelector("img"),
            { yPercent: -3, scale: 1.06 },
            {
              yPercent: 3,
              scale: 1.06,
              ease: "none",
              scrollTrigger: { trigger: item, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        });
      });
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      className={portrait ? "grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4" : "grid gap-4 md:grid-cols-2 md:gap-6"}
    >
      {shots.map((shot, index) => (
        <figure
          key={shot.alt}
          data-gallery-item
          className={`overflow-hidden rounded-xl border border-line bg-raised ${!portrait && index === 0 ? "md:col-span-2" : ""}`}
        >
          <Image
            src={shot.src}
            alt={shot.alt}
            placeholder="blur"
            sizes={
              portrait ? "(min-width: 1024px) 25vw, 50vw" : index === 0 ? "100vw" : "(min-width: 768px) 50vw, 100vw"
            }
            className="block h-auto w-full"
          />
        </figure>
      ))}
    </div>
  );
}
