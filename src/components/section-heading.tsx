import { SplitReveal } from "./motion/split-reveal";

type Props = { id: string; title: string; children?: React.ReactNode };

export function SectionHeading({ id, title, children }: Props) {
  return (
    <div className="grid gap-4 border-t border-line pt-6 md:grid-cols-12">
      <SplitReveal
        as="h2"
        id={`${id}-title`}
        className="font-serif text-[clamp(2.75rem,7vw,6rem)] leading-[0.95] font-[340] tracking-[-0.035em] md:col-span-7"
      >
        {title}
      </SplitReveal>
      {children && (
        <SplitReveal as="p" delay={0.15} className="max-w-[28rem] self-end text-fog md:col-span-5 md:justify-self-end">
          {children}
        </SplitReveal>
      )}
    </div>
  );
}
