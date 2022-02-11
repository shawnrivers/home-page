import { HeadingWithAnchor } from 'app/components/shared/HeadingWithAnchor';

export const Heading: Record<
  'h2' | 'h3',
  React.FC<{ children?: React.ReactNode }>
> = {
  h2: props => (
    <HeadingWithAnchor as="h2" level={1} className="not-prose">
      {props.children}
    </HeadingWithAnchor>
  ),
  h3: props => (
    <HeadingWithAnchor as="h3" level={2} className="not-prose">
      {props.children}
    </HeadingWithAnchor>
  ),
};
