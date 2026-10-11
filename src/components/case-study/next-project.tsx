import Link from "next/link";
import type { Project } from "@/content/types";
import { ArrowUpRight } from "../icons";

export function NextProject({ project }: { project: Project }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      transitionTypes={["nav-forward"]}
      data-cursor="Next"
      className="group block border-t border-line px-5 py-24 sm:px-10 md:py-36"
    >
      <div className="mx-auto max-w-[90rem]">
        <p className="text-fog">Next project</p>
        <p className="mt-4 flex items-end justify-between gap-6 font-serif text-[clamp(3.5rem,10vw,10rem)] leading-[0.92] font-[340] tracking-[-0.035em]">
          <span className="transition-transform duration-700 ease-out-quint group-hover:translate-x-4">
            {project.title}
          </span>
          <ArrowUpRight className="mb-[0.12em] size-[0.45em] shrink-0 text-sodium transition-transform duration-700 ease-out-quint group-hover:rotate-45" />
        </p>
        <p className="mt-4 text-fog">
          {project.role}, {project.org}
        </p>
      </div>
    </Link>
  );
}
