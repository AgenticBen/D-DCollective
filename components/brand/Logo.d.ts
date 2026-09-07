/**
 * The supplied D+D Collective artwork — mark alone or full lockup.
 * Never retype the wordmark; always render the asset.
 */
export interface LogoProps {
  /** Which supplied file to render. */
  variant?: 'lockup' | 'lockup-dark' | 'mark' | 'mark-dark' | 'lockup-transparent' | 'mark-transparent' | 'mark-dark-transparent' | 'lockup-dark-transparent';
  /** Rendered height in px; width follows the artwork. */
  height?: number;
  /** Relative path to the assets directory from the consuming page. */
  assetBase?: string;
  alt?: string;
  style?: React.CSSProperties;
}
export declare function Logo(props: LogoProps): JSX.Element;
