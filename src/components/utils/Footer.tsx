import * as React from 'react';
import { joinClassNames } from '../../lib/utils/class';

const START_YEAR = 2020;

export const Footer: React.FC<{
  className?: string;
}> = props => {
  const currentYear = new Date().getFullYear();
  const copyrightYears =
    currentYear === START_YEAR ? currentYear : `${START_YEAR}-${currentYear}`;

  return (
    <footer className={joinClassNames('py-8 text-center', props.className)}>
      <p className="text-base text-gray-700">
        Copyright @ {copyrightYears} Usho Ka (Yuxiao He). All rights reserved.
      </p>
    </footer>
  );
};
