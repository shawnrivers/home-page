import * as React from 'react';
import badgeStyles from './Badge.module.css';

type BadgeProps = { text: string } & React.HTMLAttributes<HTMLSpanElement>;

export const Badge: React.FC<BadgeProps> = props => {
  const { text, ...restProps } = props;

  switch (text) {
    case 'React':
      return (
        <span
          className={`${badgeStyles.badge} ${badgeStyles.react}`}
          {...restProps}
        >
          React
        </span>
      );
    case 'CSS':
      return (
        <span
          className={`${badgeStyles.badge} ${badgeStyles.css}`}
          {...restProps}
        >
          CSS
        </span>
      );
    case 'Draft':
      return (
        <span
          className={`${badgeStyles.badge} ${badgeStyles.draft}`}
          {...restProps}
        >
          Draft
        </span>
      );

    default:
      return null;
  }
};
