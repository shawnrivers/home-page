import { cn } from '@/utils/classNames';
import { convertNodeToString } from '@/utils/string';

type As = 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

const getBeforeContent = (as: As): string => {
  switch (as) {
    case 'h2':
      return 'before:content-["#"]';
    case 'h3':
      return 'before:content-["##"]';
    default:
      return 'before:content-["###"]';
  }
};

type HeadingAnchorProps = {
  as: As;
  className?: string;
  children?: React.ReactNode;
};

export const HeadingAnchor: React.FC<HeadingAnchorProps> = ({
  as: Component,
  className,
  children,
}) => {
  const id = convertNodeToString(children);

  return (
    <Component id={id} className={className}>
      <a
        href={`#${id}`}
        className="group px-0.5 no-underline hover:underline focus-visible:underline"
      >
        <span
          className={cn(
            'uppercase before:mr-1 before:-tracking-widest before:text-gray-500 group-hover:before:text-gray-400',
            getBeforeContent(Component),
          )}
        >
          {children}
        </span>
      </a>
    </Component>
  );
};
