/** Mist-filled site footer: logo, one-line note, link columns. */
export interface SiteFooterProps {
  columns?: Array<{ title: string; links: string[] }>;
  /** Short line under the logo, e.g. the mission sentence. */
  note?: React.ReactNode;
  /** Full-width row below the columns, separated by a hairline. */
  bottom?: React.ReactNode;
  assetBase?: string;
  /** Use 'lockup-dark' when the footer sits on a dark ground. */
  logoVariant?: 'lockup' | 'lockup-dark';
  style?: React.CSSProperties;
}
export declare function SiteFooter(props: SiteFooterProps): JSX.Element;
