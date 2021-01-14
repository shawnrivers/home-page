function collectText(el, acc = []): string {
  if (el) {
    if (typeof el === 'string') acc.push(el);
    if (Array.isArray(el)) el.map(item => collectText(item, acc));
    if (typeof el === 'object') collectText(el.props && el.props.children, acc);
  }
  return acc.join('').trim();
}

export type HeadingProps = {
  id?: string;
  element: Extract<React.ElementType, 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'>;
  children?: React.ReactNode;
};

export const Heading: React.FC<HeadingProps> = props => {
  const { id, element: Element, children } = props;
  const text = children || '';

  const defaultId = collectText(text)
    .toLowerCase()
    .replace(/\s/g, '-')
    .replace(/[?!:]/g, '');

  return Element === 'h1' || Element === 'h2' ? (
    <Element className="hashtag-heading" id={id ?? defaultId}>
      <a href={`#${id ?? defaultId}`}>{children}</a>
    </Element>
  ) : (
    <Element className="hashtag-heading">{children}</Element>
  );
};
