import Link from 'next/link';
import { ThemedLogo, buttonStyle } from '@/components/ds';

/** Mirrors the design system's SiteFooter, including the admin link beneath the logo. */
const columns = [
  { title: 'About', links: [['Mission & Vision', '/mission'], ['How We Work', '/how-we-work'], ['Eric & Michele', '/about']] },
  { title: 'Changemakers', links: [['Partners', '/changemakers'], ['Portfolio', '/changemakers']] },
  { title: 'Connect', links: [['Grantees', '/apply/grants'], ['Investors', '/apply/investment'], ['Gatherings', '/gather']] }
] as const;

export function SiteFooter() {
  return (
    <footer style={{ borderTop: 'var(--border-1)', background: 'var(--surface-sunken)' }}>
      <div style={{
        padding: '36px 28px', display: 'grid', gap: 28,
        gridTemplateColumns: 'minmax(220px,1fr) repeat(auto-fit,minmax(140px,max-content))'
      }}>
        <div>
          {/* The lockup artwork carries its own white ground, which showed as a
              hard rectangle against the mist footer. Sitting it in a white card
              makes that ground read as intentional. */}
          <span style={{
            display: 'inline-block', background: '#FFFFFF',
            borderRadius: 'var(--radius-tile)', padding: '10px 14px',
            border: '1px solid var(--border-hairline)'
          }}>
            <ThemedLogo kind="lockup" height={30} />
          </span>
          <p style={{ margin: '14px 0 0', fontSize: 13.5, color: 'var(--text-muted)', maxWidth: '40ch' }}>
            Expanding leadership pathways toward the restoration of shalom.
          </p>
          <span style={{ display: 'block', marginTop: 16 }}>
            <Link href="/admin/login" style={buttonStyle('outline', 'md')}>Admin sign in</Link>
          </span>
        </div>

        {columns.map((c) => (
          <nav key={c.title} aria-label={c.title} style={{ display: 'grid', gap: 8, alignContent: 'start' }}>
            <h2 style={{
              fontSize: 'var(--fs-micro)', fontWeight: 'var(--fw-medium)', letterSpacing: 'var(--ls-label)',
              textTransform: 'uppercase', color: 'var(--text-muted)', margin: 0
            }}>{c.title}</h2>
            {c.links.map(([label, href]) => (
              <Link key={href} href={href} style={{ fontSize: 'var(--fs-nav)', color: 'var(--text-body)', textDecoration: 'none' }}>
                {label}
              </Link>
            ))}
          </nav>
        ))}
      </div>
    </footer>
  );
}
