'use client';

import { useScroll } from '@/hooks/useScroll';
import { cn } from '@/utils/classNames';
import { Menu, Transition } from '@headlessui/react';
import { useState, useEffect, Fragment, forwardRef } from 'react';

export type TableOfContent = { text: string; url: string; level: number };

export const TableOfContentMenu: React.FC<{
  content: TableOfContent[];
  className?: string;
}> = props => {
  const { content, className } = props;
  const { scrollDirection } = useScroll();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (scrollDirection === 'up') {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [scrollDirection]);

  return (
    <Menu
      as="div"
      className={cn(
        'fixed top-4 z-10 transition-all duration-300',
        visible ? 'opacity-100' : '-top-12 opacity-0',
        className,
      )}
    >
      <Menu.Button
        aria-hidden={visible ? 'false' : 'true'}
        tabIndex={visible ? 0 : -1}
        className="relative inline-flex items-center rounded-lg border-2 border-gray-500 bg-gray-100 py-1 pl-2 pr-3 text-gray-800 shadow-lg transition-colors hover:bg-gray-200  dark:border-gray-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="mr-2 h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
          />
        </svg>
        <span className="text-base">Table of Content</span>
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-150"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          as="nav"
          className="absolute left-0 mt-1 flex w-[300px] max-w-max origin-top-right flex-col space-y-1 overflow-hidden rounded-lg border-2 border-gray-500 bg-gray-100 p-2 shadow-lg focus-visible:outline-none dark:border-gray-100 dark:bg-gray-800"
        >
          {content.map(item => (
            <Menu.Item key={item.text}>
              {({ active }) => (
                <TableOfContentItem
                  {...item}
                  active={active}
                  onClick={() => setTimeout(() => setVisible(false), 100)}
                />
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

const TableOfContentItem = forwardRef<
  HTMLAnchorElement,
  TableOfContent & {
    className?: string;
    active?: boolean;
    onClick?: () => void;
  }
>(function TableOfContentItem(
  { text, url, level, active, className, onClick },
  ref,
) {
  return (
    <a
      ref={ref}
      href={url}
      className={cn(
        'rounded px-2 text-base leading-[1.1] no-underline hover:text-gray-900 dark:hover:text-white',
        level === 3
          ? 'ml-4 py-0.5 text-sm text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200'
          : 'py-1',
        active !== undefined
          ? active
            ? 'ring-4 ring-gray-400 ring-opacity-70'
            : ''
          : 'focus-visible:ring-4 focus-visible:ring-gray-400 focus-visible:ring-opacity-70',
        className,
      )}
      onClick={onClick}
    >
      {text}
    </a>
  );
});
