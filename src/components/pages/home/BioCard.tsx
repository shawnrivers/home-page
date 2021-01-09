import * as React from 'react';
import { joinClassNames } from '../../../lib/utils/class';

type BioCardProps = {
  className?: string;
  heading: string;
  text: string;
};

export const BioCard: React.FC<BioCardProps> = props => {
  return (
    <article
      className={joinClassNames(
        'inline-flex flex-col items-center text-center px-8 py-4 rounded-xl bg-gray-200 max-w-xs min-w-2xs',
        props.className,
      )}
    >
      <h3 className="uppercase font-bold text-xl">{props.heading}</h3>
      <p className="text-sm mt-4">{props.text}</p>
    </article>
  );
};
