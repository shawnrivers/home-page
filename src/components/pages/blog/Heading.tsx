const generateHeadingId = (node: React.ReactNode): string => {
  if (node instanceof Array) {
    return node.map(generateHeadingId).join('');
  }
  if (typeof node === 'object' && 'props' in node) {
    return generateHeadingId(node.props.children);
  }
  return node.toString();
};

export const Heading: Record<
  'h1' | 'h2' | 'h3',
  React.FC<{ children?: React.ReactNode }>
> = {
  h1: props => <h1 className="hashtag-heading">{props.children}</h1>,
  h2: props => {
    const id = generateHeadingId(props.children);
    return (
      <h2 id={id} className="hashtag-heading">
        <a href={`#${id}`} className="group">
          {props.children}
        </a>
      </h2>
    );
  },
  h3: props => {
    const id = generateHeadingId(props.children);
    return (
      <h3 id={id} className="hashtag-heading">
        <a href={`#${id}`} className="group">
          {props.children}
        </a>
      </h3>
    );
  },
};
