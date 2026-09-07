import Link from 'next/link';

const links = [
  { href: '/mission', label: 'Mission' },
  { href: '/how-we-work', label: 'How we work' },
  { href: '/changemakers', label: 'Changemakers' },
  { href: '/gather', label: 'Gather' },
  { href: '/about', label: 'About' }
];

export function SiteNav() {
  return (
    <header className="border-b border-rule">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
        <Link href="/" className="no-underline">
          <span className="font-display text-[1.35rem] leading-none">D+D Collective</span>
        </Link>
        <nav aria-label="Primary">
          <ul className="flex flex-wrap gap-x-6 gap-y-1 text-[0.95rem]">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="no-underline hover:underline">{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
