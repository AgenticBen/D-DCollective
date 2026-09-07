import Link from 'next/link';

export type Pathway = { verb: string; href: string; cta: string; body: string };

/**
 * Three ways in, set as a list with hairlines rather than three cards.
 * The rule is the only structural device on the page.
 */
export function Pathways({ items }: { items: Pathway[] }) {
  return (
    <ul className="border-t border-rule">
      {items.map((p) => (
        <li key={p.verb} className="border-b border-rule">
          <div className="mx-auto grid max-w-6xl gap-3 px-6 py-9 sm:grid-cols-[14rem_1fr] sm:gap-10 sm:py-11">
            <h3 className="font-display text-[1.6rem] leading-tight">{p.verb}</h3>
            <div>
              <p className="max-w-measure">{p.body}</p>
              <p className="mt-4">
                <Link href={p.href} className="text-teal-ink underline decoration-rule hover:decoration-teal-ink">
                  {p.cta}
                </Link>
              </p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
