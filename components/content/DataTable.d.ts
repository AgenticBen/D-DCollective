/**
 * Rounded, hairline-framed table for partner, portfolio and scholar listings.
 */
export interface DataTableProps {
  /** Column headers, rendered uppercase in muted grey on mist. */
  columns?: React.ReactNode[];
  /** Row cells, one array per row; cells may contain Pills. */
  rows?: React.ReactNode[][];
  style?: React.CSSProperties;
}
export declare function DataTable(props: DataTableProps): JSX.Element;
