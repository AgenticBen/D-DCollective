import type { Metadata } from 'next';
import { DM_Sans, DM_Mono } from 'next/font/google';
import './globals.css';

/* The design system specifies DM Sans throughout and DM Mono for metadata,
   dates and token values. It ships no serif. */
const dmSans = DM_Sans({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'], variable: '--font-text-loaded' });
const dmMono = DM_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono-loaded' });

export const metadata: Metadata = {
  title: 'D+D Collective',
  description: 'Expanding leadership pathways toward the restoration of shalom.',
  robots: { index: false, follow: false }
};

/* Applies the stored theme before first paint so the page never flashes light. */
const themeScript = `try{var t=localStorage.getItem('dd-website-theme');if(t)document.documentElement.setAttribute('data-theme',t)}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${dmMono.variable}`}>
      <head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
      <body>{children}</body>
    </html>
  );
}
