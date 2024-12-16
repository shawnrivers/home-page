/**
 * Only render this component in non-production environment.
 */
export const EnterDraftModeButton: React.FC = () => {
  return (
    // eslint-disable-next-line @next/next/no-html-link-for-pages
    <a
      href={`/api/draft/enable?secret=${process.env.DRAFT_API_SECRET}`}
      className="bg-gray-800 px-2 py-1 text-sm text-white no-underline dark:bg-white dark:text-gray-800"
    >
      Enter
    </a>
  );
};
