/** Label that rolls up to a duplicate of itself when its `group` ancestor is hovered. */
export function RollText({ children }: { children: string }) {
  return (
    <span className="relative -my-[0.12em] inline-flex overflow-hidden">
      <span className="block py-[0.12em] transition-transform duration-500 ease-out-quint group-hover:-translate-y-full">
        {children}
      </span>
      <span
        aria-hidden
        className="absolute inset-0 block translate-y-full py-[0.12em] transition-transform duration-500 ease-out-quint group-hover:translate-y-0"
      >
        {children}
      </span>
    </span>
  );
}
