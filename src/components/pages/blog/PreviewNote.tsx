import Link from 'next/link';
import * as React from 'react';

type PreviewNoteProps = {
  clearLink: string;
};

export const PreviewNote: React.FC<PreviewNoteProps> = props => {
  return (
    <div className="flex justify-center">
      <div className="inline-flex flex-wrap items-center justify-center border-gray-200 border-2 w-max p-3 rounded">
        <span>
          <b className="font-bold">Note:</b>
          {` `}Viewing in preview mode{' '}
        </span>
        <div className="inline-block ml-4">
          <Link href={props.clearLink}>
            <button className="bg-gray-800 text-white rounded px-1.5 py-0.5 hover:bg-black">
              Exit Preview
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
