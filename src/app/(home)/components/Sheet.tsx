import { cn } from '@/utils/classNames';

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
        'inline-flex min-w-[20rem] max-w-xs flex-col items-center overflow-hidden rounded-lg bg-gray-200 px-8 py-4 text-gray-900 dark:bg-gray-700 dark:text-white dark:selection:bg-gray-500',
        className,
      )}
    >
      <h3 className="text-xl font-bold uppercase">{heading}</h3>
      <div className="mt-4 text-sm">{children}</div>
    </article>
  );
};
