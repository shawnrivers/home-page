import { cn } from '@/utils/classNames';

export const SKIP_NAV_MAIN_CONTENT_ID = 'main-content';

export const SkipNavLink: React.FC<{ className?: string }> = ({
  className,
}) => {
  return (
    <a
      href={`#${SKIP_NAV_MAIN_CONTENT_ID}`}
      className={cn(
        'fixed left-4 top-0 inline-block -translate-y-full bg-white px-3 py-2 font-bold transition-transform focus:translate-y-2 motion-reduce:transition-none dark:bg-gray-900',
        className,
      )}
    >
      Skip to main content
    </a>
  );
};
