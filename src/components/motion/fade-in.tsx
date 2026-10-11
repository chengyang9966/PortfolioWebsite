"use client";

import { useRef } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

type Props = {
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  stagger?: number;
};

/** Fades its `[data-reveal]` descendants (or itself) up into place when scrolled into view. */
export function FadeIn({ as: Tag = "div", children, className, stagger = 0.08 }: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const items = ref.current!.querySelectorAll("[data-reveal]");
        gsap.from(items.length ? items : ref.current, {
          y: 32,
          autoAlpha: 0,
          duration: 1.1,
          ease: "expo.out",
          stagger,
          scrollTrigger: { trigger: ref.current, start: "top 88%", once: true },
        });
      });
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
