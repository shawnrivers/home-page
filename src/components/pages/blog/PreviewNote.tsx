import Link from 'next/link';
import * as React from 'react';
import { joinClassNames } from '../../../lib/utils/class';

type PreviewNoteProps = {
  clearLink: string;
  className?: string;
};

export const PreviewNote: React.FC<PreviewNoteProps> = props => {
  return (
    <div className={joinClassNames('flex justify-center', props.className)}>
      <div className="inline-flex flex-wrap items-center justify-center border-gray-700 dark:border-gray-200 border-2 w-max p-3 rounded-lg">
        <span>
          <b className="font-bold">Note:</b>
          {` `}Viewing in preview mode{' '}
        </span>
        <div className="inline-block ml-4">
          <Link href={props.clearLink}>
            <button className="bg-gray-600 text-white hover:bg-gray-900 dark:hover:bg-gray-500 rounded px-1.5 py-0.5">
              Exit Preview
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
