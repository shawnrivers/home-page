import { BlogTag } from '@/app/blog/components/BlogTag';
import { getTagCardBorderColor } from '@/app/blog/utils/tags';
import { BlogImage } from '@/app/blog/components/BlogImage';
import { cn } from '@/utils/classNames';
import { formatDate } from '@/utils/date';
import Link from 'next/link';

type BlogCardProps = {
  title: string;
  href: string;
  date: string;
  tags: { name: string; color: string }[];
  image?: {
    publicId: string;
    originalWidth: number;
    originalHeight: number;
  };
  imagePriority?: boolean;
  className?: string;
};

export const BlogCard: React.FC<BlogCardProps> = ({
  title,
  href,
  date,
  tags,
  image,
  imagePriority,
  className,
}) => {
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
        {image && (
          <BlogImage
            priority={imagePriority}
            publicId={image.publicId}
            alt=""
            width={600}
            originalWidth={image.originalWidth}
            originalHeight={image.originalHeight}
            className="aspect-[3/2] h-auto w-full object-cover"
          />
        )}
        <div className="mx-4 mt-2 mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          {date && (
            <div className="mt-1 text-base text-zinc-500 dark:text-zinc-300">
              {formatDate(date)}
            </div>
          )}
          {tags.length > 0 && (
            <div className="mt-2 space-x-2">
              {tags.map(tag => (
                <BlogTag key={tag.name} name={tag.name} color={tag.color} />
              ))}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
};
