import type { Config } from 'tailwindcss';

/**
 * Every value points at a custom property declared in app/globals.css, which is
 * a verbatim port of the design system's tokens/. Change tokens there.
 */
export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './content/**/*.ts'],
  theme: {
    extend: {
      colors: {
        ink: 'var(--text-strong)',
        body: 'var(--text-body)',
        muted: 'var(--text-muted)',
        accent: 'var(--text-accent)',
        'on-accent': 'var(--text-on-accent)',
        paper: 'var(--surface-page)',
        card: 'var(--surface-card)',
        mist: 'var(--surface-sunken)',
        rule: 'var(--border-hairline)',
        teal: 'var(--teal)',
        'teal-deep': 'var(--teal-deep)',
        'teal-mid': 'var(--teal-mid)',
        'logo-teal': 'var(--logo-teal)'
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
        mono: ['var(--font-mono)']
      },
      fontSize: {
        eyebrow: 'var(--fs-eyebrow)', pill: 'var(--fs-pill)', meta: 'var(--fs-meta)',
        nav: 'var(--fs-nav)', tile: 'var(--fs-tile)', body: 'var(--fs-body)',
        h3: 'var(--fs-h3)', quote: 'var(--fs-quote)', h2: 'var(--fs-h2)', h1: 'var(--fs-h1)'
      },
      maxWidth: { measure: 'var(--measure-prose)', lede: 'var(--measure-lede)', container: 'var(--container-max)' },
      borderRadius: { pill: 'var(--radius-pill)', note: 'var(--radius-note)', tile: 'var(--radius-tile)', card: 'var(--radius-card)' }
    }
  },
  plugins: []
} satisfies Config;
