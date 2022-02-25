import * as React from 'react';
import { joinClassNames } from 'app/utils/class';

const START_YEAR = 2020;

export const Footer: React.FC<{
  className?: string;
}> = props => {
  const currentYear = new Date().getFullYear();
  const copyrightYears =
    currentYear === START_YEAR ? currentYear : `${START_YEAR}-${currentYear}`;

  return (
    <footer
      className={joinClassNames(
        'bg-zinc-800 py-8 text-center',
        props.className,
      )}
    >
      <p className="px-4 text-base text-white">
        Copyright @ {copyrightYears} Usho Ka (Yuxiao He). All rights reserved.
      </p>
    </footer>
  );
};
