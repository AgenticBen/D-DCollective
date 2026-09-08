import type { PortfolioHolding } from '@/lib/data';

/**
 * A portfolio company as it appears drifting behind the hero: an image plate on
 * top, name and cause beneath. Where no logo has been supplied yet the plate
 * falls back to a monogram on a brand ground, so the card still reads as a card.
 */
export function HeroCard({ holding, index }: { holding: PortfolioHolding; index: number }) {
  const initials = holding.name
    .split(/\s+/)
    .filter((w) => /[A-Za-z]/.test(w[0] ?? ''))
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join('');

  /* The teal family only — the plates should read as D+D, not as the reference
     site this layout came from. Deterministic, so the layout does not reshuffle
     between server and client. */
  const grounds = ['#2A8FA8', '#67AFB7', '#1F5B63', '#3BADB5'];
  const ground = grounds[index % grounds.length];

  return (
    <article
      className="hero-card w-full max-w-[190px] overflow-hidden rounded-tile bg-white shadow-sm"
      style={{
        ['--float-delay' as string]: `${(index % 4) * 0.9}s`,
        ['--float-duration' as string]: `${6.5 + (index % 3)}s`
      }}
    >
      <div className="grid place-items-center" style={{ aspectRatio: '4 / 3', background: ground }}>
        <span className="font-mono text-[1.15rem] tracking-wide text-white/90">{initials}</span>
      </div>
      <div className="px-3 py-2.5">
        <p className="text-[0.9rem] font-medium leading-tight" style={{ color: '#0A0A0A' }}>{holding.name}</p>
        <p className="mt-0.5 text-[0.78rem] leading-tight" style={{ color: '#5B6B78' }}>{holding.cause}</p>
      </div>
    </article>
  );
}

/** One gutter of drifting cards. Hidden below lg, where there is no room. */
export function HeroGutter({ holdings, offset = 0 }: { holdings: PortfolioHolding[]; offset?: number }) {
  return (
    <div aria-hidden="true" className="hidden justify-items-center lg:grid gap-7" style={{ paddingTop: offset }}>
      {holdings.map((h, i) => (
        <div key={h.slug} className="w-full max-w-[190px]" style={{ transform: `translateX(${i % 2 ? 26 : -26}px)` }}>
          <HeroCard holding={h} index={i + offset} />
        </div>
      ))}
    </div>
  );
}
