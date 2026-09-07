/** Dropdown for the fixed taxonomies (return tier, faith alignment, geography). */
export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options?: Array<string | { value: string; label: string }>;
  placeholder?: string;
}
export declare function Select(props: SelectProps): JSX.Element;
