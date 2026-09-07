/**
 * Heading + gradient rule + optional lede — the standard opener for a page section.
 */
export interface SectionHeaderProps {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  /** Muted intro paragraph, capped at 66ch. */
  lede?: React.ReactNode;
  /** 1 for a page title, 2 for a section (default). */
  level?: 1 | 2;
  style?: React.CSSProperties;
}
export declare function SectionHeader(props: SectionHeaderProps): JSX.Element;
