import * as React from 'react';

type TagProps = { text: string } & React.HTMLAttributes<HTMLSpanElement>;

export const Tag: React.FC<TagProps> = props => {
  const { text, ...restProps } = props;

  switch (text) {
    case 'React':
      return (
        <span className="tag tag-react" {...restProps}>
          {text}
        </span>
      );
    case 'CSS':
      return (
        <span className="tag tag-css" {...restProps}>
          {text}
        </span>
      );
    case 'Draft':
      return (
        <span className="tag tag-draft" {...restProps}>
          {text}
        </span>
      );

    default:
      return null;
  }
};
