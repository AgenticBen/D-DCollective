/**
 * The one loud room in the whole site. The manifesto vision paragraph is set
 * large on the ink ground; nothing else on any page is allowed this scale.
 */
export function VisionStatement({ children }: { children: React.ReactNode }) {
  return (
    <section className="on-ink bg-ink text-paper" aria-labelledby="vision-heading">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <h2 id="vision-heading" className="sr-only">Our vision</h2>
        <blockquote className="max-w-[30ch] font-display text-[clamp(1.9rem,5.2vw,3.5rem)] font-light leading-[1.14] tracking-[-0.015em] [text-wrap:balance] sm:max-w-[34ch]">
          {children}
        </blockquote>
        <p className="mt-10 max-w-measure text-[0.95rem] text-paper/70">
          From the Praxis Capital Fellowship manifesto, which shapes how we read every grant and every
          investment.
        </p>
      </div>
    </section>
  );
}
