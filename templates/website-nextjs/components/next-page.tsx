import Link from 'next/link';

/**
 * The "keep reading" banner that closes a page. Replaces the underlined text
 * link these pages used to end on, which was easy to miss at the foot of a long
 * column.
 *
 * The ground is --surface-cta rather than the interface teal: it has to carry
 * white text on both the white page and the dark theme, and the lighter teals
 * do not.
 */
export function NextPage({ href, label, hint }: { href: string; label: string; hint?: string }) {
  return (
    <Link
      href={href}
      className="next-page group mt-[var(--section-gap)] flex items-center gap-5 no-underline"
      style={{
        background: 'var(--surface-cta)', color: '#FFFFFF',
        borderRadius: 'var(--radius-card)', padding: '20px 24px',
        transition: 'background-color var(--dur-base) var(--ease-standard)'
      }}
    >
      <span
        aria-hidden="true"
        className="grid shrink-0 place-items-center rounded-pill"
        style={{
          width: 42, height: 42, border: '1px solid rgba(255,255,255,.45)',
          fontSize: 19, lineHeight: 1
        }}
      >
        &#8592;
      </span>
      <span>
        <span style={{
          display: 'block', fontSize: 'var(--fs-eyebrow)', fontWeight: 'var(--fw-medium)',
          letterSpacing: 'var(--ls-eyebrow)', textTransform: 'uppercase', color: 'rgba(255,255,255,.72)'
        }}>
          {hint ?? 'Keep reading'}
        </span>
        <span style={{
          display: 'block', marginTop: 4, fontSize: 'var(--fs-h3)', fontWeight: 'var(--fw-semibold)'
        }}>
          {label}
        </span>
      </span>
    </Link>
  );
}
