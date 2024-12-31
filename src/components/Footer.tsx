const startYear = 2020;

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const copyrightYears =
    currentYear === startYear ? currentYear : `${startYear}-${currentYear}`;

  return (
    <footer className="bg-gray-800 py-6 text-center">
      <p className="px-4 text-base text-white selection:bg-gray-600">
        Copyright @ {copyrightYears} Usho Ka (Yuxiao He). All rights reserved.
      </p>
    </footer>
  );
};
