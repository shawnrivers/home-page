import * as React from 'react';
import Link from 'next/link';
import { Tag } from '../../blogs/meta';

const BORDER_COLORS: Record<Tag, string> = {
  react: 'border-react-light',
  css: 'border-css-light',
};

type CardProps = {
  tag?: string;
  href: React.ComponentProps<typeof Link>['href'];
  as: React.ComponentProps<typeof Link>['as'];
} & React.HTMLAttributes<HTMLElement>;

export const Card: React.FC<CardProps> = props => {
  const { tag, href, as, 'aria-label': ariaLabel, children } = props;

  const borderColor = BORDER_COLORS[tag];

  return (
    <Link href={href} as={as}>
      <a tabIndex={0} aria-label={ariaLabel} className="no-underline">
        <article
          className={`card card-shadow card-clickable cursor-pointer border-4  ${
            borderColor ?? 'border-gray-800'
          }`}
        >
          {children}
        </article>
      </a>
    </Link>
  );
};
