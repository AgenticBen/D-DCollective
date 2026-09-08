import Link from 'next/link';
import type { Metadata } from 'next';
import { title, body, markers, closing } from '@/content/about';

export const metadata: Metadata = { title: 'About — D+D Collective' };

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-container px-6 pb-12 pt-16 sm:pt-20">
      <h1 className="page-title">
        {title}
      </h1>

      {body.map((p: string) => (
        <p key={p.slice(0, 24)} className="mt-6 max-w-measure text-body">{p}</p>
      ))}

      <h2 className="mt-14 section-title">Also worth knowing</h2>
      <ul className="mt-6 border-t border-rule">
        {markers.map((m: string) => (
          <li key={m.slice(0, 24)} className="max-w-measure border-b border-rule py-4">{m}</li>
        ))}
      </ul>

      <p className="mt-10 max-w-measure text-body">{closing}</p>
      <p className="mt-6">
        <Link href="/mission" className="text-accent underline decoration-rule hover:decoration-accent">
          Mission and values
        </Link>
      </p>
    </section>
  );
}
