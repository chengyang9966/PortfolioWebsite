"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { markIntroDone } from "@/lib/intro";
import { profile } from "@/content/profile";

/**
 * First visit per session: the name rises in over a filling line, then the panel lifts while the
 * hero's name rises underneath it. The inline script in the layout adds `html.seen` on repeat
 * visits (or reduced motion) so CSS hides this before first paint.
 */
export function Preloader() {
  const root = useRef<HTMLDivElement>(null);
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

      const timeline = gsap
        .timeline({ paused: true, onComplete: finish })
        .from(".preloader-char", { yPercent: 110, duration: 0.9, ease: "expo.out", stagger: 0.03 })
        .fromTo(
          ".preloader-fill",
          { scaleX: 0 },
          { scaleX: 1, duration: 1, ease: "power2.inOut", transformOrigin: "0% 50%" },
          0.2,
        )
        .to(".preloader-content", { yPercent: -40, autoAlpha: 0, duration: 0.5, ease: "power2.in" }, "+=0.1")
        .add("lift", "-=0.15")
        .to(root.current, { clipPath: "inset(0% 0% 100% 0%)", duration: 1, ease: "expo.inOut" }, "lift")
        // The hero starts rising as the curtain lifts, so the page is never empty.
        .call(markIntroDone, [], "lift");

      // Start once the serif has loaded (or after 700ms), so the name never flashes in a fallback font.
      const start = () => timeline.play();
      const timer = setTimeout(start, 700);
      document.fonts?.ready.then(() => {
        clearTimeout(timer);
        start();
      });
      return () => clearTimeout(timer);
    },
    { scope: root },
  );

  if (done) return null;

  return (
    <div
      ref={root}
      aria-hidden
      className="preloader fixed inset-0 z-[80] grid place-items-center bg-raised"
      style={{ clipPath: "inset(0% 0% 0% 0%)" }}
    >
      <div className="preloader-content flex flex-col items-center gap-6">
        <p className="font-serif text-[clamp(2.25rem,5vw,4rem)] leading-none font-[340] tracking-[-0.03em]">
          <span className="inline-block overflow-y-clip pt-[0.05em] pb-[0.18em]">
            {[...profile.name].map((char, i) => (
              <span key={i} className="preloader-char inline-block whitespace-pre">
                {char}
              </span>
            ))}
          </span>
        </p>
        <span className="relative block h-px w-40 overflow-hidden bg-line">
          <span className="preloader-fill absolute inset-0 origin-left bg-accent" />
        </span>
      </div>
    </div>
  );
}
