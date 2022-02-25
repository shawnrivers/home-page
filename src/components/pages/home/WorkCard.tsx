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
        'group inline-block text-center text-zinc-900 no-underline hover:no-underline',
        props.className,
      )}
    >
      <article className="card card-shadow card-clickable relative inline-flex min-w-2xs max-w-xs flex-col items-center overflow-visible border-4 border-zinc-800 px-8 py-4 text-center dark:border-white">
        <div className="next-image-wrapper -mt-20 mb-4 inline-block overflow-hidden rounded-full border-4 border-zinc-700 dark:border-white">
          <Image
            src={props.image}
            width="128"
            height="128"
            alt=""
            role="presentation"
            priority={props.imagePriority}
          />
        </div>
        <h3 className="text-xl font-bold uppercase">{props.heading}</h3>
        <p className="mt-4 text-sm">{props.description}</p>
        <div className="card-shadow absolute -bottom-4 -right-4 inline-block rounded-full bg-zinc-700 p-2 dark:bg-white">
          <ArrowRightIcon className="fill-current text-white dark:text-zinc-700" />
        </div>
      </article>
    </a>
  );
};
