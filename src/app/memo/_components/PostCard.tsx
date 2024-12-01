import { PostTag } from '@/app/memo/_components/PostTag';
import { getTagCardBorderColor } from '@/app/memo/_utils/tags';
import { PostImage } from '@/app/memo/_components/PostImage';
import { cn } from '@/libs/utils/classNames';
import { formatDate } from '@/libs/utils/date';
import Link from 'next/link';
import type { Route } from 'next';

export const PostCard = <T extends string>(props: {
  title: string;
  href: Route<T>;
  date: string;
  tags: { name: string; color: string }[];
  image?: {
    publicId: string;
    originalWidth: number;
    originalHeight: number;
  };
  imagePriority?: boolean;
  emoji?: string;
  className?: string;
}) => {
  const { title, href, date, tags, image, imagePriority, emoji, className } =
    props;

  return (
    <Link
      href={href}
      className={cn(
        'inline-block overflow-hidden rounded-lg border-4 bg-white text-gray-900 no-underline shadow-md hover:bg-gray-100 hover:text-inherit hover:no-underline hover:shadow-lg dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600',
        tags.length > 0 && getTagCardBorderColor(tags[0].color),
        className,
      )}
    >
      <article>
        {image ? (
          <PostImage
            priority={imagePriority}
            publicId={image.publicId}
            alt=""
            width={600}
            originalWidth={image.originalWidth}
            originalHeight={image.originalHeight}
            className="aspect-[3/2] h-auto w-full object-cover"
          />
        ) : (
          <div
            aria-hidden
            className="flex aspect-[3/2] h-auto w-full items-center justify-center bg-gray-100 p-4 text-7xl font-bold tracking-wider text-gray-500 dark:bg-gray-800 dark:text-gray-300"
          >
            {emoji ?? 'NO IMAGE'}
          </div>
        )}
        <div className="mx-4 mb-4 mt-2">
          <h2 className="text-xl font-bold">{title}</h2>
          {date && (
            <div className="mt-1 text-base text-gray-500 dark:text-gray-300">
              {formatDate(date)}
            </div>
          )}
          {tags.length > 0 && (
            <div className="mt-2 space-x-2">
              {tags.map(tag => (
                <PostTag key={tag.name} name={tag.name} color={tag.color} />
              ))}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
};
