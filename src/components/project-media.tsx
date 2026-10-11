import Image from "next/image";
import type { Media, Shot } from "@/content/types";

type Props = {
  media: Media;
  autoPlay?: boolean;
  videoRef?: React.Ref<HTMLVideoElement>;
};

/** A project's preview: a silent looping video of its public site, or a fan of phone screens. Fills its parent. */
export function ProjectMedia({ media, autoPlay = false, videoRef }: Props) {
  if (media.kind === "video") {
    return (
      <video
        ref={videoRef}
        className="size-full object-cover object-top"
        muted
        loop
        playsInline
        autoPlay={autoPlay}
        preload={autoPlay ? "auto" : "metadata"}
        poster={media.poster.src}
        aria-label={media.alt}
      >
        <source src={media.webm} type="video/webm" />
        <source src={media.mp4} type="video/mp4" />
      </video>
    );
  }

  const [left, middle, right] = media.shots;
  return (
    <div className="flex size-full items-center justify-center bg-[radial-gradient(ellipse_at_50%_115%,#24414a_0%,#152a30_62%)]">
      <Phone shot={left} className="-mr-[5%] h-[66%] translate-y-[5%] -rotate-[7deg]" />
      <Phone shot={middle} className="relative z-10 h-[78%]" />
      <Phone shot={right} className="-ml-[5%] h-[66%] translate-y-[5%] rotate-[7deg]" />
    </div>
  );
}

function Phone({ shot, className }: { shot: Shot; className: string }) {
  return (
    <div
      className={`relative aspect-[600/1067] overflow-hidden rounded-[1.1rem] border border-line shadow-[0_30px_60px_-20px_rgb(0_0_0/0.7)] ${className}`}
    >
      <Image src={shot.src} alt={shot.alt} fill sizes="(min-width: 1024px) 260px, 30vw" placeholder="blur" />
    </div>
  );
}
