import Link from 'next/link';
import { Pathways } from '@/components/pathways';
import { mission, intro, pathways, fitYes, fitNo } from '@/content/home.mdx';

export default function HomePage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-6 pb-16 pt-16 sm:pb-24 sm:pt-24">
        <h1 className="max-w-display font-display text-[clamp(2rem,4.6vw,3.1rem)] font-light leading-[1.14] tracking-[-0.015em] [text-wrap:balance]">
          {mission}
        </h1>
        <p className="mt-8 max-w-measure text-ink/85">{intro}</p>
        <p className="mt-6">
          <Link href="/mission" className="text-teal-ink underline decoration-rule hover:decoration-teal-ink">
            Read the mission and values
          </Link>
        </p>
      </section>

      <h2 className="sr-only">Three ways we work</h2>
      <Pathways items={pathways} />

      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20" aria-labelledby="fit">
        <h2 id="fit" className="font-display text-[1.6rem] leading-tight">
          Whether this is a fit
        </h2>
        <p className="mt-3 max-w-measure text-ink/85">
          We would rather you know quickly. If the right-hand column describes you, a conversation with us is
          probably not the best use of your week — and we would still rather tell you that here than after
          three emails.
        </p>
        <div className="mt-10 grid gap-10 sm:grid-cols-2">
          <div>
            <h3 className="text-[0.95rem] font-medium">Usually a fit</h3>
            <ul className="mt-4 space-y-3 border-t border-rule pt-4">
              {fitYes.map((t: string) => (
                <li key={t} className="max-w-measure border-b border-rule pb-3">{t}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-[0.95rem] font-medium">Usually not</h3>
            <ul className="mt-4 space-y-3 border-t border-rule pt-4">
              {fitNo.map((t: string) => (
                <li key={t} className="max-w-measure border-b border-rule pb-3 text-ink/75">{t}</li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-10">
          <Link href="/apply" className="text-teal-ink underline decoration-rule hover:decoration-teal-ink">
            Start a conversation
          </Link>
        </p>
      </section>
    </>
  );
}
