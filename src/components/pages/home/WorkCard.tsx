import * as React from 'react';
import Image from 'next/image';
import { joinClassNames } from '../../../lib/utils/class';
import { ArrowRightIcon } from '../../icons/ArrowRightIcon';

type WorkCardProps = {
  className?: string;
  heading: string;
  description: string;
  image: string;
  to: string;
};

export const WorkCard: React.FC<WorkCardProps> = props => {
  return (
    <a
      href={props.to}
      rel="noopener"
      className={joinClassNames(
        'inline-block text-center text-gray-900 no-underline hover:no-underline hover:text-gray-900 group',
        props.className,
      )}
    >
      <article className="card card-shadow overflow-visible relative inline-flex flex-col items-center text-center px-8 py-4 rounded-xl border-4 border-gray-800 bg-white max-w-xs min-w-2xs group-hover:shadow-xl">
        <div className="next-image-wrapper inline-block overflow-hidden rounded-full border-4 border-gray-800 -mt-20 mb-4">
          <Image
            src={props.image}
            width="128"
            height="128"
            alt=""
            role="presentation"
          />
        </div>
        <h3 className="uppercase font-bold text-xl">{props.heading}</h3>
        <p className="text-sm mt-4">{props.description}</p>
        <div className="absolute -bottom-4 -right-4 inline-block p-2 rounded-full bg-gray-700 card-shadow">
          <ArrowRightIcon className="fill-current text-white" />
        </div>
      </article>
    </a>
  );
};
