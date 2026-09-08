import Link from 'next/link';
import type { CSSProperties, ReactNode } from 'react';

/**
 * The D+D Collective design-system primitives, ported from the design system's
 * components/ (see _ds_bundle.js). Styles are inline custom properties rather
 * than Tailwind classes so they stay a line-for-line mirror of the source —
 * when the design system changes, the diff is obvious. Page layout above these
 * uses Tailwind as usual.
 */

const ASSET = {
  lockup: 'logo-lockup.png',
  'lockup-dark': 'logo-lockup-dark.png',
  'lockup-transparent': 'logo-lockup-transparent.png',
  'lockup-dark-transparent': 'logo-lockup-dark-transparent.png',
  mark: 'logo-mark.png',
  'mark-dark': 'logo-mark-dark.png',
  'mark-transparent': 'logo-mark-transparent.png',
  'mark-dark-transparent': 'logo-mark-dark-transparent.png'
} as const;

export type LogoVariant = keyof typeof ASSET;

/**
 * Raster, not vector — the .ai/.eps files never arrived, so these were traced
 * from screenshots. Replace public/brand/* when real vectors exist.
 */
export function Logo({
  variant = 'lockup', height = 36, alt = 'D+D Collective', className
}: { variant?: LogoVariant; height?: number; alt?: string; className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element -- intrinsic size varies per variant
  return <img src={`/brand/${ASSET[variant]}`} alt={alt} className={className} style={{ height, width: 'auto', display: 'block' }} />;
}

export function Eyebrow({ children, tone = 'accent', style }: { children: ReactNode; tone?: 'accent' | 'muted'; style?: CSSProperties }) {
  return (
    <div style={{
      fontSize: 'var(--fs-eyebrow)', fontWeight: 'var(--fw-medium)',
      letterSpacing: 'var(--ls-eyebrow)', textTransform: 'uppercase',
      color: tone === 'muted' ? 'var(--text-muted)' : 'var(--text-accent)', ...style
    }}>{children}</div>
  );
}

export function GradientRule({ width = 56, palette = 'interface', style }: { width?: number | 'full'; palette?: 'interface' | 'brand'; style?: CSSProperties }) {
  return (
    <div aria-hidden="true" style={{
      height: 'var(--rule-height)', width: width === 'full' ? '100%' : width,
      background: palette === 'brand' ? 'var(--grad-brand)' : 'var(--grad)',
      borderRadius: 'var(--radius-rule)', ...style
    }} />
  );
}

export function SectionHeader({ eyebrow, title, lede, level = 2, style }: {
  eyebrow?: ReactNode; title: ReactNode; lede?: ReactNode; level?: 1 | 2; style?: CSSProperties;
}) {
  const H = (level === 1 ? 'h1' : 'h2') as 'h1' | 'h2';
  return (
    <header style={{ margin: '0 0 20px', ...style }}>
      {eyebrow ? <Eyebrow style={{ marginBottom: 8 }}>{eyebrow}</Eyebrow> : null}
      <H style={{
        fontSize: level === 1 ? 'var(--fs-h1)' : 'var(--fs-h2)',
        fontWeight: 'var(--fw-semibold)',
        letterSpacing: level === 1 ? 'var(--ls-h1)' : 'var(--ls-h2)',
        lineHeight: level === 1 ? 'var(--lh-tight)' : 1.2,
        margin: '0 0 6px', textWrap: 'balance'
      }}>{title}</H>
      <GradientRule style={{ margin: '0 0 18px' }} />
      {lede ? <p style={{ margin: 0, color: 'var(--text-body)', maxWidth: 'var(--measure-lede)' }}>{lede}</p> : null}
    </header>
  );
}

export function Tile({ label, children, style }: { label?: ReactNode; children: ReactNode; style?: CSSProperties }) {
  return (
    <div style={{ background: 'var(--surface-sunken)', borderRadius: 'var(--radius-tile)', padding: 'var(--pad-tile)', ...style }}>
      {label ? <Eyebrow style={{ marginBottom: 6 }}>{label}</Eyebrow> : null}
      <p style={{ margin: 0, fontSize: 'var(--fs-tile)', color: 'var(--text-strong)' }}>{children}</p>
    </div>
  );
}

export function Card({ title, children, style }: { title?: ReactNode; children: ReactNode; style?: CSSProperties }) {
  return (
    <div style={{ background: 'var(--surface-card)', border: 'var(--border-1)', borderRadius: 'var(--radius-card)', padding: 'var(--pad-card)', ...style }}>
      {title ? <h3 style={{ fontSize: 'var(--fs-h3)', fontWeight: 'var(--fw-semibold)', margin: '0 0 8px' }}>{title}</h3> : null}
      {children}
    </div>
  );
}

export function Pill({ children, variant = 'outline' }: { children: ReactNode; variant?: 'outline' | 'solid' }) {
  const solid = variant === 'solid';
  return (
    <span style={{
      display: 'inline-block', fontSize: 'var(--fs-pill)', fontWeight: 'var(--fw-medium)',
      letterSpacing: 'var(--ls-pill)', padding: '2px 8px', borderRadius: 'var(--radius-pill)',
      border: '1px solid var(--teal)', background: solid ? 'var(--teal)' : 'transparent',
      color: solid ? 'var(--text-on-accent)' : 'var(--text-accent)', whiteSpace: 'nowrap'
    }}>{children}</span>
  );
}

export function Quote({ children, cite }: { children: ReactNode; cite?: ReactNode }) {
  return (
    <blockquote style={{
      borderLeft: 'var(--border-accent-left)', padding: '4px 0 4px 18px', margin: '12px 0 18px',
      fontWeight: 'var(--fw-light)', fontSize: 'var(--fs-quote)', lineHeight: 'var(--lh-quote)',
      maxWidth: 'var(--measure-lede)'
    }}>
      {children}
      {cite ? <footer style={{ fontSize: 'var(--fs-meta)', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginTop: 8, fontWeight: 'var(--fw-regular)' }}>{cite}</footer> : null}
    </blockquote>
  );
}

export function Note({ label, children }: { label?: ReactNode; children: ReactNode }) {
  return (
    <div style={{
      background: 'var(--warn-bg)', border: '1px solid var(--warn-line)', color: 'var(--warn-ink)',
      borderRadius: 'var(--radius-note)', padding: 'var(--pad-note)', fontSize: 'var(--fs-meta)'
    }}>
      {label ? <strong style={{ fontWeight: 'var(--fw-semibold)' }}>{label} </strong> : null}
      {children}
    </div>
  );
}

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

const BASE: CSSProperties = {
  fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-nav)', fontWeight: 'var(--fw-medium)',
  letterSpacing: 'var(--ls-brand)', borderRadius: 'var(--radius-pill)', cursor: 'pointer',
  transition: 'var(--transition-color)', display: 'inline-flex', alignItems: 'center',
  justifyContent: 'center', gap: 8, textDecoration: 'none'
};
const SIZES: Record<ButtonSize, CSSProperties> = {
  sm: { padding: '6px 14px' },
  md: { padding: '10px 20px' },
  lg: { padding: '13px 26px', fontSize: 'var(--fs-body)' }
};
function skin(variant: ButtonVariant): CSSProperties {
  if (variant === 'primary') return { background: 'var(--teal-deep)', color: 'var(--text-on-accent)', border: '1px solid var(--teal-deep)' };
  if (variant === 'secondary') return { background: 'transparent', color: 'var(--text-accent)', border: '1px solid var(--teal)' };
  return { background: 'transparent', color: 'var(--text-accent)', border: '1px solid transparent', padding: '6px 4px', borderRadius: 0 };
}

export function buttonStyle(variant: ButtonVariant = 'primary', size: ButtonSize = 'md'): CSSProperties {
  return { ...BASE, ...SIZES[size], ...skin(variant) };
}

/** The Button of the design system, as a link — every use on the site navigates. */
export function ButtonLink({ href, children, variant = 'primary', size = 'md' }: {
  href: string; children: ReactNode; variant?: ButtonVariant; size?: ButtonSize;
}) {
  return <Link href={href} style={buttonStyle(variant, size)}>{children}</Link>;
}

/**
 * The logo, swapped by theme in CSS. Light grounds get the standard artwork;
 * dark grounds get the knocked-out transparent variant, as the design system
 * specifies. Both <img> elements ship; only one is displayed.
 */
export function ThemedLogo({ kind = 'lockup', height = 34, alt = 'D+D Collective' }: {
  kind?: 'lockup' | 'mark'; height?: number; alt?: string;
}) {
  /* Matching the design system's own usage: the lockup sits on the page ground
     and keeps its artwork, while the mark sits on the mist band and uses the
     knocked-out variant so no white square shows. Dark grounds always use the
     transparent dark variant. */
  const light = (kind === 'mark' ? 'mark-transparent' : 'lockup') as LogoVariant;
  const dark = `${kind}-dark-transparent` as LogoVariant;
  return (
    <>
      <span className="logo-light"><Logo variant={light} height={height} alt={alt} /></span>
      <span className="logo-dark"><Logo variant={dark} height={height} alt="" /></span>
    </>
  );
}

export function DataTable({ columns, rows }: { columns: ReactNode[]; rows: ReactNode[][] }) {
  return (
    <div style={{ overflowX: 'auto', border: 'var(--border-1)', borderRadius: 'var(--radius-panel)' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--fs-table)' }}>
        <thead>
          <tr>
            {columns.map((c, i) => (
              <th key={i} style={{
                textAlign: 'left', fontSize: 'var(--fs-micro)', letterSpacing: 'var(--ls-label)',
                textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 'var(--fw-medium)',
                padding: 'var(--pad-head-cell)', background: 'var(--surface-sunken)',
                borderBottom: 'var(--border-1)'
              }}>{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, ri) => (
            <tr key={ri}>
              {r.map((cell, ci) => (
                <td key={ci} style={{
                  padding: 'var(--pad-cell)', verticalAlign: 'top',
                  borderBottom: ri === rows.length - 1 ? 'none' : 'var(--border-1)'
                }}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
