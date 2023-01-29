export const SKIP_NAV_MAIN_CONTENT_ID = 'main-content';

export const SkipNavLink: React.FC = () => {
  return (
    <a
      href={`#${SKIP_NAV_MAIN_CONTENT_ID}`}
      className="fixed top-0 left-4 inline-block -translate-y-full px-3 py-2 transition-transform focus:translate-y-2 motion-reduce:transition-none"
    >
      Skip to main content
    </a>
  );
};
