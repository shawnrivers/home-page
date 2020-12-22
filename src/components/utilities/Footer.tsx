import * as React from 'react';

const START_YEAR = 2020;

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-4 text-center">
      <p className="text-base text-gray-700">
        Copyright @
        {currentYear === START_YEAR
          ? currentYear
          : `${START_YEAR}-${currentYear}`}{' '}
        Usho Ka (Yuxiao He). All rights reserved.
      </p>
    </footer>
  );
};
