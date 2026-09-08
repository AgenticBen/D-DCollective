import Link from 'next/link';

/**
 * The "learn more" banner that closes a page. The whole band is the link, with
 * the destination on the left and a bare arrow on the right edge.
 *
 * The ground is --surface-cta rather than an interface teal: it carries white
 * text on the white page and in the dark theme, and the teals fail contrast
 * against one or the other.
 */
export function NextPage({ href, label, hint }: { href: string; label: string; hint?: string }) {
  return (
    <Link
      href={href}
      className="next-page mt-[var(--section-gap)] flex w-full items-center justify-between gap-6 no-underline"
      style={{
        background: 'var(--surface-cta)', color: '#FFFFFF',
        borderRadius: 'var(--radius-card)', padding: '22px 26px',
        transition: 'background-color var(--dur-base) var(--ease-standard)'
      }}
    >
      <span>
        <span style={{
          display: 'block', fontSize: 'var(--fs-eyebrow)', fontWeight: 'var(--fw-medium)',
          letterSpacing: 'var(--ls-eyebrow)', textTransform: 'uppercase', color: 'rgba(255,255,255,.75)'
        }}>
          {hint ?? 'Learn more'}
        </span>
        <span style={{
          display: 'block', marginTop: 5, fontSize: 'var(--fs-h2)', fontWeight: 'var(--fw-semibold)',
          letterSpacing: 'var(--ls-h2)', lineHeight: 1.15
        }}>
          {label}
        </span>
      </span>

      <span
        aria-hidden="true"
        className="next-page-arrow shrink-0"
        style={{ fontSize: 30, lineHeight: 1, transition: 'transform var(--dur-base) var(--ease-standard)' }}
      >
        &#8594;
      </span>
    </Link>
  );
}
