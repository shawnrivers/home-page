'use client';

export const ExitPreviewButton: React.FC = () => {
  return (
    // eslint-disable-next-line @next/next/no-html-link-for-pages
    <a
      href="/api/exit-preview"
      className="bg-gray-800 px-2 py-1 text-sm text-white no-underline dark:bg-white dark:text-gray-800"
    >
      Exit
    </a>
  );
};
