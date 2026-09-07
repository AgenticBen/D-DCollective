/** Small uppercase label above a heading, or a key line inside a Tile. */
export interface EyebrowProps {
  children?: React.ReactNode;
  /** accent = teal-deep (default), muted = grey (table headers, captions). */
  tone?: 'accent' | 'muted';
  as?: keyof JSX.IntrinsicElements;
  style?: React.CSSProperties;
}
export declare function Eyebrow(props: EyebrowProps): JSX.Element;
