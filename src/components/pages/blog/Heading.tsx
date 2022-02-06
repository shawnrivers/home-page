import { convertNodeToString } from 'app/utils/string';

export const Heading: Record<
  'h1' | 'h2' | 'h3',
  React.FC<{ children?: React.ReactNode }>
> = {
  h1: props => <h1 className="hashtag-heading">{props.children}</h1>,
  h2: props => {
    const id = convertNodeToString(props.children);
    return (
      <h2 id={id} className="hashtag-heading">
        <a href={`#${id}`} className="group">
          {props.children}
        </a>
      </h2>
    );
  },
  h3: props => {
    const id = convertNodeToString(props.children);
    return (
      <h3 id={id} className="hashtag-heading">
        <a href={`#${id}`} className="group">
          {props.children}
        </a>
      </h3>
    );
  },
};
