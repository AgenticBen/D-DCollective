import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-rule">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 sm:grid-cols-[1fr_auto]">
        <div>
          <p className="font-display text-[1.15rem] leading-snug">
            Expanding leadership pathways toward the restoration of shalom.
          </p>
          <p className="mt-3 max-w-[46ch] text-[0.9rem] text-ink/70">
            D+D Collective is the private philanthropy of Eric and Michele Dudley, working in Charlotte,
            North Carolina and East Africa.
          </p>
          <p className="mt-6">
            <Link href="/admin/login" className="text-[0.8rem] text-ink/50 no-underline hover:underline">
              Admin sign in
            </Link>
          </p>
        </div>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-1 text-[0.9rem] sm:flex-col">
            <li><Link href="/mission" className="no-underline hover:underline">Mission</Link></li>
            <li><Link href="/how-we-work" className="no-underline hover:underline">How we work</Link></li>
            <li><Link href="/apply" className="no-underline hover:underline">Apply</Link></li>
            <li><Link href="/about" className="no-underline hover:underline">About</Link></li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
