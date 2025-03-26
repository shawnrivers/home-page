const startYear = 2020;

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const copyrightYears =
    currentYear === startYear ? currentYear : `${startYear}-${currentYear}`;

  return (
    <footer className="bg-gray-800 pt-4 pb-[calc(env(safe-area-inset-bottom)+1rem)] pl-[calc(env(safe-area-inset-left)+1rem)] pr-[calc(env(safe-area-inset-right)+1rem)] text-center">
      <p className="text-base text-white selection:bg-gray-600">
        Copyright @ {copyrightYears} Usho Ka (Yuxiao He). All rights reserved.
      </p>
    </footer>
  );
};
