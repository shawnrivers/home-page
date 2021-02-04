export const Heading: Record<
  'h1' | 'h2' | 'h3',
  React.FC<{ children?: React.ReactNode }>
> = {
  h1: props => <h1 className="hashtag-heading">{props.children}</h1>,
  h2: props => <h2 className="hashtag-heading">{props.children}</h2>,
  h3: props => <h3 className="hashtag-heading">{props.children}</h3>,
};
