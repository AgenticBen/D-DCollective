/** Amber advisory block — compliance cautions, known gaps, consent reminders. */
export interface NoteProps {
  /** Bold lead-in, e.g. "Scholarship caution:". */
  label?: React.ReactNode;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function Note(props: NoteProps): JSX.Element;
