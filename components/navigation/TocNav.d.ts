/** Inline numbered contents row used at the top of long internal documents. */
export interface TocNavProps {
  items?: Array<{ id: string; label: string }>;
  onSelect?: (id: string) => void;
  style?: React.CSSProperties;
}
export declare function TocNav(props: TocNavProps): JSX.Element;
