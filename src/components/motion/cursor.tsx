"use client";

import { useRef, useState } from "react";
import { FINE_POINTER, gsap, useGSAP } from "@/lib/gsap";

type Mode = "dot" | "link" | "label";

const modeClass: Record<Mode, string> = {
  dot: "size-2.5 bg-paper mix-blend-difference",
  link: "size-11 border border-paper/60 bg-transparent",
  label: "size-24 bg-sodium text-harbour",
};

/**
 * Pointer follower for fine pointers. Hovering `[data-cursor="Label"]` turns it into a labelled disc;
 * hovering any other link turns it into a ring.
 */
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode>("dot");
  const [label, setLabel] = useState("");

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(FINE_POINTER, () => {
      const el = ref.current!;
      const html = document.documentElement;
      html.classList.add("has-cursor");
      gsap.set(el, { xPercent: -50, yPercent: -50 });
      const xTo = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3" });

      const move = (event: PointerEvent) => {
        xTo(event.clientX);
        yTo(event.clientY);
        el.style.opacity = "1";
      };
      const over = (event: PointerEvent) => {
        const target = event.target as Element;
        const labelled = target.closest("[data-cursor]");
        if (labelled) {
          setMode("label");
          setLabel(labelled.getAttribute("data-cursor") ?? "");
        } else {
          setMode(target.closest("a, button") ? "link" : "dot");
        }
      };
      const hide = () => (el.style.opacity = "0");

      window.addEventListener("pointermove", move);
      document.addEventListener("pointerover", over);
      html.addEventListener("pointerleave", hide);
      return () => {
        html.classList.remove("has-cursor");
        window.removeEventListener("pointermove", move);
        document.removeEventListener("pointerover", over);
        html.removeEventListener("pointerleave", hide);
      };
    });
  });

  return (
    <div ref={ref} aria-hidden className="pointer-events-none fixed top-0 left-0 z-[90] opacity-0">
      <div
        className={`grid place-items-center rounded-full text-sm font-medium transition-[width,height,background-color,border-color] duration-500 ease-[var(--ease-out-quint)] ${modeClass[mode]}`}
      >
        <span className={`transition-opacity duration-300 ${mode === "label" ? "opacity-100" : "opacity-0"}`}>
          {mode === "label" && label}
        </span>
      </div>
    </div>
  );
}
