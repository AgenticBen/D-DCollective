/**
 * Website masthead: logo left, text nav right, optional action.
 */
export interface SiteHeaderProps {
  items?: Array<{ id: string; label: string }>;
  /** id of the current page. */
  active?: string;
  onNavigate?: (id: string) => void;
  /** Optional right-hand element, usually a Button. */
  action?: React.ReactNode;
  assetBase?: string;
  /** Use 'lockup-dark' when the header sits on a dark ground. */
  logoVariant?: 'lockup' | 'lockup-dark';
  style?: React.CSSProperties;
}
export declare function SiteHeader(props: SiteHeaderProps): JSX.Element;
