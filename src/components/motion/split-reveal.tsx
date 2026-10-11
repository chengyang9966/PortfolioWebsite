"use client";

import { useRef } from "react";
import { gsap, MOTION_OK, SplitText, useGSAP } from "@/lib/gsap";

type Props = {
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  id?: string;
  delay?: number;
};

/** Text that rises into view line by line, each line clipped by its own mask. */
export function SplitReveal({ as: Tag = "div", children, className, id, delay = 0 }: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const split = SplitText.create(ref.current!, {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit: (self) => {
            // Give descenders room inside the clipping masks without shifting layout.
            self.masks.forEach((mask) => {
              (mask as HTMLElement).style.paddingBottom = "0.14em";
              (mask as HTMLElement).style.marginBottom = "-0.14em";
            });
            return gsap.from(self.lines, {
              yPercent: 115,
              duration: 1.2,
              ease: "expo.out",
              stagger: 0.09,
              delay,
              scrollTrigger: { trigger: ref.current, start: "top 88%", once: true },
            });
          },
        });
        return () => split.revert();
      });
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} id={id} className={className}>
      {children}
    </Tag>
  );
}
