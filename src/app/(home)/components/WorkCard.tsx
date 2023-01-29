import Image, { ImageProps } from 'next/image';
import { cn } from '@/utils/classNames';
import { useId } from 'react';

type WorkCardProps = {
  heading: string;
  description: string;
  image: ImageProps['src'];
  imagePriority?: boolean;
  to: string;
  className?: string;
};

export const WorkCard: React.FC<WorkCardProps> = ({
  heading,
  description,
  image,
  to,
  className,
}) => {
  const headingId = useId();

  return (
    <a
      href={to}
      target="_blank"
      rel="noreferrer"
      aria-labelledby={headingId}
      className={cn(
        'group inline-block no-underline hover:no-underline',
        className,
      )}
    >
      <article className="relative mt-20 inline-flex min-w-[20rem] max-w-xs flex-col items-center gap-4 rounded-lg border-4 border-gray-800 bg-white px-8 pb-4 text-center text-gray-900 shadow-md hover:shadow-lg group-hover:bg-gray-100 dark:border-white dark:bg-gray-700 dark:text-white dark:group-hover:bg-gray-600">
        <Image
          src={image}
          width="128"
          height="128"
          alt=""
          role="presentation"
          placeholder="blur"
          className="-mt-20 inline-block overflow-hidden rounded-full border-4 border-gray-700 object-cover dark:border-white"
        />
        <h3 id={headingId} className="text-xl font-bold uppercase">
          {heading}
        </h3>
        <p className="text-sm">{description}</p>
        <span className="absolute -bottom-4 -right-4 inline-block rounded-full bg-gray-700 p-2 dark:bg-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-6 w-6 text-white dark:text-gray-700"
            role="presentation"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </span>
      </article>
    </a>
  );
};
