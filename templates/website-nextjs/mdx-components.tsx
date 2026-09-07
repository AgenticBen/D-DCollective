import type { MDXComponents } from 'mdx/types';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: (props) => <h2 className="font-display text-[1.6rem] leading-tight" {...props} />,
    h3: (props) => <h3 className="text-[0.95rem] font-medium" {...props} />,
    p: (props) => <p className="mt-4 max-w-measure" {...props} />,
    a: (props) => <a className="text-teal-ink underline decoration-rule" {...props} />,
    ...components
  };
}
