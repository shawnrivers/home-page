import * as React from 'react';

const START_YEAR = 2020;

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <p>
        Copyright @
        {currentYear === START_YEAR
          ? currentYear
          : `${START_YEAR}-${currentYear}`}{' '}
        Usho Ka (Yuxiao He). All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
