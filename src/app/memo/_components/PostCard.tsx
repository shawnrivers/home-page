import type { Route } from 'next';
import Link from 'next/link';
import { PostImage } from '@/app/memo/_components/PostImage';
import { PostTag } from '@/app/memo/_components/PostTag';
import { getTagCardBorderColor } from '@/app/memo/_utils/tags';
import { cn } from '@/libs/utils/classNames';
import { formatDate } from '@/libs/utils/date';

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
  imagePreload?: boolean;
  emoji?: string;
  className?: string;
}) => {
  const { title, href, date, tags, image, imagePreload, emoji, className } =
    props;

  return (
    <Link
      href={href}
      className={cn(
        'inline-block overflow-hidden rounded-lg border-4 bg-white text-gray-900 no-underline shadow-md hover:scale-105 hover:text-inherit hover:no-underline hover:shadow-xl dark:bg-gray-800 dark:text-white duration-300',
        tags[0] && getTagCardBorderColor(tags[0].color),
        className,
      )}
    >
      <article className="h-full flex flex-col justify-between">
        <div className="hidden lg:block">
          {image ? (
            <PostImage
              preload={imagePreload}
              publicId={image.publicId}
              alt=""
              width={600}
              originalWidth={image.originalWidth}
              originalHeight={image.originalHeight}
              className="aspect-5/3 h-auto w-full object-cover bg-gray-100"
            />
          ) : (
            <div
              aria-hidden
              className="flex aspect-5/3 h-auto w-full font-display items-center justify-center bg-gray-100 dark:bg-gray-900 p-4 text-7xl font-bold tracking-wider text-gray-500 dark:text-gray-300"
            >
              {emoji ?? 'NO IMAGE'}
            </div>
          )}
        </div>
        <div className="px-4 pb-4 pt-2 flex-1 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold">{title}</h2>
            {date && (
              <div className="mt-1 text-base text-gray-500 dark:text-gray-300">
                {formatDate(date)}
              </div>
            )}
          </div>
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
