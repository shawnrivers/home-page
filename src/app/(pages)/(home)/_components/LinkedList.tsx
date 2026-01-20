import type React from 'react';
import { cn } from '@/libs/utils/classNames';

type LinkedListProps = {
  items: { text: React.ReactNode; highlighted?: boolean }[];
  className?: string;
};

export const LinkedList: React.FC<LinkedListProps> = ({ items, className }) => {
  return (
    <ul className={className}>
      {items.map((item, index) => (
        <li key={index} className="relative">
          <div
            className={cn(
              'absolute -left-2 top-0 box-border h-4.5 w-4.5 rounded-[50%] border-4 border-white dark:border-gray-800',
              item.highlighted ? 'bg-red-400' : 'bg-gray-400',
            )}
          />
          <div
            className={cn(
              'border-l-2 pb-4 pl-4',
              index < items.length - 1
                ? 'border-gray-400'
                : 'border-transparent',
            )}
          >
            <p className="whitespace-pre-wrap">{item.text}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};
