import { cn } from '@/utils/classNames';

type LinkedListProps = {
  items: { text: string; highlighted?: boolean }[];
  className?: string;
};

export const LinkedList: React.FC<LinkedListProps> = ({ items, className }) => {
  return (
    <ul className={className}>
      {items.map((item, index) => (
        <li key={item.text} className="relative">
          <div
            className={cn(
              'absolute top-0 -left-2 box-border h-[1.125rem] w-[1.125rem] rounded-[50%] border-[4px] border-gray-200 dark:border-gray-700',
              item.highlighted ? 'bg-red-400' : 'bg-gray-400',
            )}
          />
          <div
            className={cn(
              'border-l-2 pb-4 pl-4',
              index < items.length - 1
                ? 'border-gray-400'
                : 'border-gray-200 dark:border-gray-700',
            )}
          >
            <p className="whitespace-pre-wrap">{item.text}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};
