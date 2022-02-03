import Image from 'next/image';
import { joinClassNames } from 'app/utils/class';
import { ArrowRightIcon } from 'app/components/icons/ArrowRightIcon';

type WorkCardProps = {
  className?: string;
  heading: string;
  description: string;
  image: string | StaticImageData;
  imagePriority?: boolean;
  to: string;
};

export const WorkCard: React.FC<WorkCardProps> = props => {
  return (
    <a
      href={props.to}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={props.heading}
      className={joinClassNames(
        'inline-block text-center text-zinc-900 no-underline hover:no-underline group',
        props.className,
      )}
    >
      <article className="card card-shadow card-clickable overflow-visible relative inline-flex flex-col items-center text-center px-8 py-4 border-4 border-zinc-800 dark:border-white max-w-xs min-w-2xs">
        <div className="next-image-wrapper inline-block overflow-hidden rounded-full border-4 border-zinc-700 dark:border-white -mt-20 mb-4">
          <Image
            src={props.image}
            width="128"
            height="128"
            alt=""
            role="presentation"
            priority={props.imagePriority}
          />
        </div>
        <h3 className="uppercase font-bold text-xl">{props.heading}</h3>
        <p className="text-sm mt-4">{props.description}</p>
        <div className="absolute -bottom-4 -right-4 inline-block p-2 rounded-full bg-zinc-700 dark:bg-white card-shadow">
          <ArrowRightIcon className="fill-current text-white dark:text-zinc-700" />
        </div>
      </article>
    </a>
  );
};
