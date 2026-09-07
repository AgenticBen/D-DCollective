/** Radio or checkbox set rendered as selectable hairline rows. */
export interface ChoiceGroupProps {
  name?: string;
  options?: Array<string | { value: string; label: string }>;
  /** 'radio' for one answer (default), 'checkbox' for many. */
  type?: 'radio' | 'checkbox';
  /** Selected value, or array of values for checkbox groups. */
  value?: string | string[];
  onChange?: (value: string) => void;
  /** Grid columns; 2 works well for short taxonomy options. */
  columns?: number;
  style?: React.CSSProperties;
}
export declare function ChoiceGroup(props: ChoiceGroupProps): JSX.Element;
