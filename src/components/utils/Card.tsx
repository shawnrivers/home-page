import * as React from 'react';
import Link from 'next/link';

const BORDER_COLORS = {
  React: 'border-react-light',
  CSS: 'border-css-light',
};

type CardProps = {
  tag?: string;
  href: React.ComponentProps<typeof Link>['href'];
  as: React.ComponentProps<typeof Link>['as'];
} & React.HTMLAttributes<HTMLElement>;

export const Card: React.FC<CardProps> = props => {
  const borderColor = BORDER_COLORS[props.tag];

  return (
    <Link href={props.href} as={props.as}>
      <a tabIndex={0} className="no-underline">
        <article
          className={`card card-shadow card-clickable cursor-pointer border-4  ${
            borderColor ?? 'border-gray-800'
          }`}
        >
          {props.children}
        </article>
      </a>
    </Link>
  );
};
