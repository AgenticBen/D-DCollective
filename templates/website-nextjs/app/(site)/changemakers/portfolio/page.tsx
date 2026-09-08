import { redirect } from 'next/navigation';

/** The portfolio is a tab on /changemakers in the design, not its own page. */
export default function PortfolioPage() {
  redirect('/changemakers');
}
