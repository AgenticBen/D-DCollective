/** Pill button. Primary is solid teal-deep; secondary is a teal outline; ghost is a text link. */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}
export declare function Button(props: ButtonProps): JSX.Element;
