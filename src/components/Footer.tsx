const startYear = 2020;

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const copyrightYears =
    currentYear === startYear ? currentYear : `${startYear}-${currentYear}`;

  return (
    <footer className="border-t-2 border-dashed text-gray-700 dark:text-gray-200 border-gray-400 dark:border-gray-600 pt-4 pb-[calc(env(safe-area-inset-bottom)+1rem)] pl-[calc(env(safe-area-inset-left)+1rem)] pr-[calc(env(safe-area-inset-right)+1rem)]">
      <p className="text-sm text-center font-serif">
        Copyright @ {copyrightYears} Usho Ka (Yuxiao He). All rights reserved.
      </p>
    </footer>
  );
};
