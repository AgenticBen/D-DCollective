'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemedLogo, buttonStyle } from '@/components/ds';
import { ThemeToggle } from '@/components/theme-toggle';

/** Mirrors the design system's SiteHeader: full-bleed, 18px/28px, gap 24. */
const links = [
  { href: '/', label: 'Home' },
  { href: '/mission', label: 'Mission & Vision' },
  { href: '/how-we-work', label: 'How We Work' },
  { href: '/changemakers', label: 'Changemakers' },
  { href: '/gather', label: 'Events' },
  { href: '/about', label: 'Eric & Michele' }
];

export function SiteNav() {
  const pathname = usePathname();

  return (
    <header style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24,
      padding: '18px 28px', borderBottom: 'var(--border-1)', background: 'var(--surface-page)',
      flexWrap: 'wrap'
    }}>
      <Link href="/" aria-label="D+D Collective — home" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
        <ThemedLogo kind="lockup" height={34} />
      </Link>

      <nav aria-label="Primary" style={{ display: 'flex', alignItems: 'center', gap: 22, flexWrap: 'wrap' }}>
        {links.map((l) => {
          const active = l.href === '/' ? pathname === '/' : pathname.startsWith(l.href);
          return (
            <Link key={l.href} href={l.href} aria-current={active ? 'page' : undefined} style={{
              fontSize: 'var(--fs-nav)', textDecoration: 'none',
              color: active ? 'var(--text-accent)' : 'var(--text-body)',
              borderBottom: `1px solid ${active ? 'var(--teal-deep)' : 'transparent'}`,
              paddingBottom: 2, transition: 'var(--transition-color)'
            }}>{l.label}</Link>
          );
        })}
        <ThemeToggle />
        <Link href="/apply" style={buttonStyle('primary', 'sm')}>Connect</Link>
      </nav>
    </header>
  );
}
