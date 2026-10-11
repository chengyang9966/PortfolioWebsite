"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { markIntroDone } from "@/lib/intro";
import { profile } from "@/content/profile";

/**
 * First visit per session: a counter runs to 100, then the panel wipes up and the hero plays.
 * The inline script in the layout adds `html.seen` on repeat visits (or reduced motion) so CSS hides
 * this before first paint.
 */
export function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);
  const [done, setDone] = useState(false);

  useGSAP(
    () => {
      const html = document.documentElement;
      const finish = () => {
        try {
          sessionStorage.setItem("cy-seen", "1");
        } catch {}
        html.classList.add("seen");
        html.classList.remove("is-loading");
        setDone(true);
      };

      if (html.classList.contains("seen")) {
        markIntroDone();
        finish();
        return;
      }

      const counter = { value: 0 };
      gsap
        .timeline({ onComplete: finish })
        .to(counter, {
          value: 100,
          duration: 1.6,
          ease: "power2.inOut",
          onUpdate: () => {
            count.current!.textContent = String(Math.round(counter.value)).padStart(3, "0");
          },
        })
        .to("[data-preloader-text]", { yPercent: -110, duration: 0.7, ease: "expo.in", stagger: 0.05 }, "+=0.15")
        .to(root.current, { clipPath: "inset(0% 0% 100% 0%)", duration: 1.1, ease: "expo.inOut" }, "-=0.25")
        .call(markIntroDone, [], "-=0.6");
    },
    { scope: root },
  );

  if (done) return null;

  return (
    <div
      ref={root}
      aria-hidden
      className="preloader fixed inset-0 z-[80] flex items-end justify-between bg-raised px-5 pb-8 sm:px-10 sm:pb-12"
      style={{ clipPath: "inset(0% 0% 0% 0%)" }}
    >
      <span className="block overflow-hidden">
        <span data-preloader-text className="block text-fog">
          {profile.name}, portfolio
        </span>
      </span>
      <span className="block overflow-hidden pt-[0.1em] pb-[0.06em]">
        <span
          data-preloader-text
          ref={count}
          className="block font-serif text-[clamp(5rem,18vw,15rem)] leading-[0.85] font-[340] tracking-[-0.04em] tnum"
        >
          000
        </span>
      </span>
    </div>
  );
}
