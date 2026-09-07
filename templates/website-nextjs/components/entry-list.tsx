import Link from 'next/link';

export type Entry = {
  key: string;
  /** The hanging term, set in the display serif. */
  term: string;
  /** Small line under the term: a place, a vehicle, a date. */
  termNote?: string | null;
  body: string;
  href?: string | null;
  linkLabel?: string;
  /** Optional partner-supplied logo. Omitted entirely when absent. */
  logoUrl?: string | null;
  logoAlt?: string;
};

/**
 * The same hairline definition list as ValuesList, with room for a small note
 * under the term, an optional outbound link, and an optional supplied logo.
 * Used for organizations, portfolio holdings, events and resources so every
 * content page on the site reads as one document.
 */
export function EntryList({ items }: { items: Entry[] }) {
  return (
    <dl className="border-t border-rule">
      {items.map((e) => (
        <div key={e.key} className="grid gap-1 border-b border-rule py-7 sm:grid-cols-[16rem_1fr] sm:gap-10">
          <dt>
            <span className="block font-display text-[1.4rem] leading-tight">{e.term}</span>
            {e.termNote ? <span className="mt-1 block text-[0.9rem] text-ink/65">{e.termNote}</span> : null}
          </dt>
          <dd className="max-w-measure">
            {e.logoUrl ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img src={e.logoUrl} alt={e.logoAlt ?? ''} className="mb-3 h-8 w-auto" />
            ) : null}
            <p className="m-0">{e.body}</p>
            {e.href ? (
              <p className="mt-3">
                <Link href={e.href} className="text-teal-ink underline decoration-rule hover:decoration-teal-ink">
                  {e.linkLabel ?? 'Visit ' + e.term}
                </Link>
              </p>
            ) : null}
          </dd>
        </div>
      ))}
    </dl>
  );
}
