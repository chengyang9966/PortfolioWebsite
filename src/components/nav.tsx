"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { profile } from "@/content/profile";

const sections = [
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export function Nav() {
  const [active, setActive] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const { id } of sections) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      setPastHero(window.scrollY > window.innerHeight * 0.6);
      if (window.scrollY < window.innerHeight * 0.5) setActive(null);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "border-b border-line/70 bg-harbour/85 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-[90rem] items-center justify-between px-5 sm:px-10" aria-label="Main">
        <a
          href="#top"
          tabIndex={pastHero ? 0 : -1}
          className={`font-serif text-xl tracking-tight transition-opacity duration-300 ${pastHero ? "opacity-100" : "opacity-0"}`}
        >
          {profile.name}
        </a>
        <ul className="flex items-center gap-1 text-[0.9375rem]">
          {sections.map(({ id, label }) => (
            <li key={id} className={id === "contact" ? "" : "hidden md:block"}>
              <a
                href={`#${id}`}
                aria-current={active === id ? "location" : undefined}
                className={`relative block px-3 py-1.5 transition-colors ${
                  active === id ? "text-paper" : "text-fog hover:text-paper"
                }`}
              >
                {active === id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-3 -bottom-px h-px bg-sodium"
                    transition={{ type: "spring", stiffness: 400, damping: 36 }}
                  />
                )}
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
