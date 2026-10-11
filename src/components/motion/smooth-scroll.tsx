"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { ReactLenis, type LenisRef } from "lenis/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const reducedQuery = "(prefers-reduced-motion: reduce)";

function useReducedMotion() {
  return useSyncExternalStore(
    (onChange) => {
      const media = matchMedia(reducedQuery);
      media.addEventListener("change", onChange);
      return () => media.removeEventListener("change", onChange);
    },
    () => matchMedia(reducedQuery).matches,
    () => false,
  );
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);
  const reduced = useReducedMotion();
  const pathname = usePathname();

  // Drive Lenis from GSAP's ticker so ScrollTrigger and smooth scroll share one clock.
  useEffect(() => {
    if (reduced) return;
    const lenis = lenisRef.current?.lenis;
    const update = (time: number) => lenisRef.current?.lenis?.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    lenis?.on("scroll", ScrollTrigger.update);
    return () => {
      gsap.ticker.remove(update);
      lenis?.off("scroll", ScrollTrigger.update);
    };
  }, [reduced]);

  // New route: jump to the hash target (e.g. /#work) or the top, without smoothing.
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const lenis = lenisRef.current?.lenis;
      const target = window.location.hash ? document.querySelector(window.location.hash) : null;
      if (lenis) lenis.scrollTo(target instanceof HTMLElement ? target : 0, { immediate: true, force: true });
      else if (target) target.scrollIntoView();
      ScrollTrigger.refresh();
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  if (reduced) return children;
  return (
    <ReactLenis root ref={lenisRef} options={{ autoRaf: false, lerp: 0.09, anchors: { offset: -64 } }}>
      {children}
    </ReactLenis>
  );
}
