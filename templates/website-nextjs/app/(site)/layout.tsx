import { SiteNav } from '@/components/site-nav';
import { SiteFooter } from '@/components/site-footer';

/** Public chrome. The admin sits outside this group and has its own header. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <SiteNav />
      <main id="main">{children}</main>
      <SiteFooter />
    </>
  );
}
