import type { Metadata } from 'next';
import { DM_Sans, Newsreader } from 'next/font/google';
import './globals.css';
import { SiteNav } from '@/components/site-nav';
import { SiteFooter } from '@/components/site-footer';

const dmSans = DM_Sans({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-text-loaded' });
const newsreader = Newsreader({ subsets: ['latin'], weight: ['300', '400'], style: ['normal', 'italic'], variable: '--font-display-loaded' });

export const metadata: Metadata = {
  title: 'D+D Collective',
  description: 'Expanding leadership pathways toward the restoration of shalom.',
  robots: { index: false, follow: false }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${newsreader.variable}`}>
      <body>
        <a className="skip" href="#main">Skip to content</a>
        <SiteNav />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
