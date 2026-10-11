import Image from "next/image";
import type { Shot, Visual } from "@/content/types";

function BrowserFrame({
  url,
  shot,
  sizes,
  className = "",
}: {
  url: string;
  shot: Shot;
  sizes: string;
  className?: string;
}) {
  return (
    <figure
      className={`overflow-hidden rounded-xl border border-line bg-raised shadow-[0_30px_80px_-30px_rgb(0_0_0/0.6)] ${className}`}
    >
      <div className="flex items-center gap-3 border-b border-line px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-line" />
          <span className="size-2.5 rounded-full bg-line" />
          <span className="size-2.5 rounded-full bg-line" />
        </span>
        <span className="truncate text-xs text-fog">{url}</span>
      </div>
      <Image src={shot.src} alt={shot.alt} sizes={sizes} placeholder="blur" className="block h-auto w-full" />
    </figure>
  );
}

export function ProjectVisual({ visual, layout }: { visual: Visual; layout: "featured" | "side" }) {
  if (visual.kind === "phones") {
    const [left, middle, right] = visual.shots;
    return (
      <div className="relative mx-auto flex max-w-[34rem] items-center justify-center py-6">
        <Phone shot={left} className="-mr-[12%] w-[34%] translate-y-6 -rotate-6" />
        <Phone shot={middle} className="relative z-10 w-[38%]" />
        <Phone shot={right} className="-ml-[12%] w-[34%] translate-y-6 rotate-6" />
      </div>
    );
  }

  if (layout === "featured") {
    return (
      <div className="grid gap-4 md:gap-6">
        <BrowserFrame url={visual.url} shot={visual.main} sizes="(min-width: 1440px) 1360px, 100vw" />
        {visual.extra && (
          <div className="grid gap-4 sm:grid-cols-2 md:gap-6">
            {visual.extra.map((shot) => (
              <BrowserFrame key={shot.alt} url={visual.url} shot={shot} sizes="(min-width: 640px) 50vw, 100vw" />
            ))}
          </div>
        )}
      </div>
    );
  }

  const [extra] = visual.extra ?? [];
  return (
    <div className="relative pb-[18%]">
      <BrowserFrame url={visual.url} shot={visual.main} sizes="(min-width: 768px) 55vw, 100vw" className="w-[92%]" />
      {extra && (
        <BrowserFrame
          url={visual.url}
          shot={extra}
          sizes="(min-width: 768px) 25vw, 45vw"
          className="absolute right-0 bottom-0 w-[46%]"
        />
      )}
    </div>
  );
}

function Phone({ shot, className }: { shot: Shot; className: string }) {
  return (
    <div
      className={`overflow-hidden rounded-[1.4rem] border border-line shadow-[0_24px_60px_-20px_rgb(0_0_0/0.7)] ${className}`}
    >
      <Image
        src={shot.src}
        alt={shot.alt}
        sizes="(min-width: 768px) 200px, 34vw"
        placeholder="blur"
        className="block h-auto w-full"
      />
    </div>
  );
}
