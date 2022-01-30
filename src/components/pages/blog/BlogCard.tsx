import * as React from 'react';
import Link from 'next/link';
import { Tag } from 'app/pages/blog/meta';
import { joinClassNames } from 'app/utils/class';

const BORDER_COLORS: Record<Tag, string> = {
  react: 'border-react-default',
  css: 'border-css-default',
  html: 'border-html-default',
  a11y: 'border-a11y-default',
};

type BlogCardProps = {
  tag?: Tag;
  href: React.ComponentProps<typeof Link>['href'];
  as: React.ComponentProps<typeof Link>['as'];
  className?: string;
  children?: React.ReactNode;
} & Pick<React.ComponentProps<'a'>, 'aria-label'>;

export const BlogCard: React.FC<BlogCardProps> = props => {
  const { tag, href, as, 'aria-label': ariaLabel, className, children } = props;

  const borderColor = BORDER_COLORS[tag];

  return (
    <Link href={href} as={as}>
      <a
        aria-label={ariaLabel}
        className={joinClassNames('no-underline h-fit', className)}
      >
        <article
          className={`card card-shadow card-clickable cursor-pointer border-4 ${
            borderColor ?? 'border-zinc-800'
          }`}
        >
          {children}
        </article>
      </a>
    </Link>
  );
};
