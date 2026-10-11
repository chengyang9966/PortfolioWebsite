"use client";

import { useRef } from "react";
import { useLenis } from "lenis/react";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

/** An endless row of words whose speed and direction follow the scroll. */
export function Marquee({ items }: { items: string[] }) {
  const track = useRef<HTMLDivElement>(null);
  const scroll = useRef({ boost: 0, direction: 1 });

  useLenis(({ velocity }) => {
    if (!velocity) return;
    scroll.current.direction = Math.sign(velocity);
    scroll.current.boost = Math.min(Math.abs(velocity) / 5, 6);
  });

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const loop = gsap.to(track.current, { xPercent: -50, ease: "none", duration: 36, repeat: -1 });
        // Start far into the repeat so the loop can also run backwards.
        loop.totalTime(loop.duration() * 1000);
        const tick = () => {
          const state = scroll.current;
          state.boost *= 0.93;
          loop.timeScale(state.direction * (1 + state.boost));
        };
        gsap.ticker.add(tick);
        return () => gsap.ticker.remove(tick);
      });
    },
    { scope: track },
  );

  const row = (copy: number) =>
    items.map((item) => (
      <span key={`${copy}-${item}`} aria-hidden={copy > 0} className="flex items-center">
        <span className="px-[0.35em]">{item}</span>
        <svg viewBox="0 0 10 10" aria-hidden className="size-[0.22em] shrink-0 fill-sodium">
          <path d="M5 0 10 5 5 10 0 5Z" />
        </svg>
      </span>
    ));

  return (
    <div className="overflow-hidden border-y border-line py-6 md:py-8">
      <div
        ref={track}
        className="flex w-max font-serif text-[clamp(3rem,8vw,7.5rem)] leading-none font-[340] tracking-[-0.03em] whitespace-nowrap italic"
      >
        {row(0)}
        {row(1)}
      </div>
    </div>
  );
}
