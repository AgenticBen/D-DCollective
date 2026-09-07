/** The 56×2px teal gradient bar that opens every section. */
export interface GradientRuleProps {
  /** Bar length in px, or 'full' to span the container. */
  width?: number | 'full';
  /** interface = brief gradient (default); brand = logo-teal gradient. */
  palette?: 'interface' | 'brand';
  style?: React.CSSProperties;
}
export declare function GradientRule(props: GradientRuleProps): JSX.Element;
