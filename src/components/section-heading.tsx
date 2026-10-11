type Props = { id: string; title: string; children?: React.ReactNode };

export function SectionHeading({ id, title, children }: Props) {
  return (
    <div className="grid gap-4 border-t border-line pt-6 md:grid-cols-12">
      <h2
        id={`${id}-title`}
        className="font-serif text-[clamp(2.5rem,6vw,5rem)] leading-none font-[360] tracking-[-0.03em] md:col-span-7"
      >
        {title}
      </h2>
      {children && <p className="max-w-[28rem] self-end text-fog md:col-span-5 md:justify-self-end">{children}</p>}
    </div>
  );
}
