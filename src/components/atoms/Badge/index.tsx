import * as React from 'react';

type BadgeProps = { text: string } & React.HTMLAttributes<HTMLSpanElement>;

export const Badge: React.FC<BadgeProps> = props => {
  const { text, ...restProps } = props;

  switch (text) {
    case 'React':
      return (
        <span className="badge badge-react" {...restProps}>
          {text}
        </span>
      );
    case 'CSS':
      return (
        <span className="badge badge-css" {...restProps}>
          {text}
        </span>
      );
    case 'Draft':
      return (
        <span className="badge badge-draft" {...restProps}>
          {text}
        </span>
      );

    default:
      return null;
  }
};
