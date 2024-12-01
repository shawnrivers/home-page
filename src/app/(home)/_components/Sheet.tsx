import { cn } from '@/libs/utils/classNames';

type SheetProps = {
  heading: string;
  children?: React.ReactNode;
  className?: string;
};

export const Sheet: React.FC<SheetProps> = ({
  heading,
  children,
  className,
}) => {
  return (
    <article
      className={cn(
        'inline-flex flex-col overflow-hidden rounded-lg border-2 border-gray-500 bg-gray-200 px-8 py-4 text-gray-900 dark:border-gray-300 dark:bg-gray-700 dark:text-white dark:selection:bg-gray-500',
        className,
      )}
    >
      <h3 className="text-xl font-bold uppercase">{heading}</h3>
      <div className="mt-2 border-t border-dashed border-gray-400 dark:border-gray-500" />
      <div className="mt-4 text-sm">{children}</div>
    </article>
  );
};
