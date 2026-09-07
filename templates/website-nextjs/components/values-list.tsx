export type Value = { term: string; gloss: string };

/**
 * Six values as a definition list with hanging terms. Not a grid: the values
 * are read in order, and a screen reader announces term/definition pairs.
 */
export function ValuesList({ items }: { items: Value[] }) {
  return (
    <dl className="border-t border-rule">
      {items.map((v) => (
        <div key={v.term} className="grid gap-1 border-b border-rule py-7 sm:grid-cols-[16rem_1fr] sm:gap-10">
          <dt className="font-display text-[1.4rem] leading-tight">{v.term}</dt>
          <dd className="max-w-measure">{v.gloss}</dd>
        </div>
      ))}
    </dl>
  );
}
