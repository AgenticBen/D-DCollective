import Link from 'next/link';
import type { Metadata } from 'next';
import { title, body, markers, closing } from '@/content/about.mdx';

export const metadata: Metadata = { title: 'About — D+D Collective' };

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-12 pt-16 sm:pt-20">
      <h1 className="max-w-display font-display text-[clamp(1.8rem,4vw,2.6rem)] font-light leading-[1.16] tracking-[-0.015em]">
        {title}
      </h1>

      {body.map((p: string) => (
        <p key={p.slice(0, 24)} className="mt-6 max-w-measure text-ink/85">{p}</p>
      ))}

      <h2 className="mt-14 font-display text-[1.6rem] leading-tight">Also worth knowing</h2>
      <ul className="mt-6 border-t border-rule">
        {markers.map((m: string) => (
          <li key={m.slice(0, 24)} className="max-w-measure border-b border-rule py-4">{m}</li>
        ))}
      </ul>

      <p className="mt-10 max-w-measure text-ink/85">{closing}</p>
      <p className="mt-6">
        <Link href="/mission" className="text-teal-ink underline decoration-rule hover:decoration-teal-ink">
          Mission and values
        </Link>
      </p>
    </section>
  );
}
