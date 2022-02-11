import { joinClassNames } from 'app/utils/class';
import { convertNodeToString } from 'app/utils/string';

type HeadingElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

type HeadingWithAnchorProps = {
  as: HeadingElement;
  level?: 1 | 2 | 3;
  className?: string;
  children?: React.ReactNode;
};

export const HeadingWithAnchor: React.FC<HeadingWithAnchorProps> = props => {
  const { as: Component, level = 1, className, children } = props;
  const id = convertNodeToString(children);

  return (
    <Component id={id} className={joinClassNames(className)}>
      <a
        href={`#${id}`}
        aria-label="Anchor"
        className="no-underline px-0.5 mr-1.5 mouse-hover:hover:underline focus-visible:underline"
      >
        <span className="text-zinc-500 -tracking-widest" aria-hidden="true">
          {'#'.repeat(level)}
        </span>
      </a>
      <span>{children}</span>
    </Component>
  );
};
