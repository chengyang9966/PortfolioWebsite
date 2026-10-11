"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { profile } from "@/content/profile";
import { Clock } from "./local-time";
import { Magnetic } from "./motion/magnetic";
import { RollText } from "./roll-text";

const sections = [
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "about", label: "About" },
];

export function Header() {
  const home = usePathname() === "/";
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  // Hide while scrolling down, reveal on any upward scroll.
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      if (Math.abs(y - last) > 6) setHidden(y > last && y > 320);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const href = (id: string) => (home ? `#${id}` : `/#${id}`);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[transform,background-color,border-color] duration-500 ease-out-quint ${
        hidden ? "-translate-y-full" : "translate-y-0"
      } ${scrolled ? "border-b border-line/70 bg-harbour/80 backdrop-blur-md" : "border-b border-transparent"}`}
    >
      <nav
        aria-label="Main"
        className="mx-auto grid h-16 max-w-[90rem] grid-cols-[1fr_auto] items-center px-5 sm:px-10 lg:grid-cols-3"
      >
        <Link href="/" className="group justify-self-start font-serif text-xl tracking-tight">
          <RollText>{profile.name}</RollText>
        </Link>

        <p className="hidden justify-self-center text-sm text-fog lg:block">
          Kuala Lumpur <span className="mx-1.5 text-line">/</span>
          <Clock timeZone={profile.timeZone} />
        </p>

        <div className="flex items-center gap-1 justify-self-end text-[0.9375rem]">
          <ul className="mr-3 hidden items-center gap-1 md:flex">
            {sections.map(({ id, label }) => (
              <li key={id}>
                <Link href={href(id)} className="group block px-3 py-1.5 text-fog transition-colors hover:text-paper">
                  <RollText>{label}</RollText>
                </Link>
              </li>
            ))}
          </ul>
          <Magnetic>
            <Link
              href={href("contact")}
              className="group block rounded-full bg-sodium px-4 py-2 font-medium text-harbour"
            >
              <RollText>Contact</RollText>
            </Link>
          </Magnetic>
        </div>
      </nav>
    </header>
  );
}
