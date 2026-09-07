/** Small teal capsule for taxonomy: return posture, faith alignment, leadership. */
export interface PillProps {
  children?: React.ReactNode;
  /** outline (default) or solid teal for emphasis. */
  variant?: 'outline' | 'solid';
  style?: React.CSSProperties;
}
export declare function Pill(props: PillProps): JSX.Element;
