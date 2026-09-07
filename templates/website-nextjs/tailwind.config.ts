import type { Config } from 'tailwindcss';

/**
 * Every value here points at a CSS custom property declared once in
 * app/globals.css. Swapping the client's real logo palette is a one-file edit.
 */
export default {
  content: ['./app/**/*.{ts,tsx,mdx}', './components/**/*.{ts,tsx}', './content/**/*.mdx'],
  theme: {
    extend: {
      colors: {
        ink: 'var(--ink)',
        paper: 'var(--paper)',
        field: 'var(--field)',
        teal: 'var(--teal)',
        'teal-ink': 'var(--teal-ink)',
        rule: 'var(--rule)'
      },
      fontFamily: {
        text: ['var(--font-text)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'Georgia', 'serif']
      },
      maxWidth: { measure: '68ch', display: '34ch' }
    }
  },
  plugins: []
} satisfies Config;
