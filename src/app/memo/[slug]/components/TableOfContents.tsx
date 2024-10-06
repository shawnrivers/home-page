'use client';

import { useScroll } from '@/hooks/useScroll';
import { cn } from '@/utils/classNames';
import { useCallback, useEffect, useState } from 'react';

export type Toc = { text: string; url: string; level: number };

export const TableOfContents: React.FC<{
  tableOfContents: Toc[];
  className?: string;
}> = ({ tableOfContents, className }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = useCallback(() => {
    const headingTops: { text: string | null; top: number }[] = [];
    document.querySelectorAll('h2, h3').forEach(heading => {
      headingTops.push({
        text: heading.textContent,
        top: heading.getBoundingClientRect().top,
      });
    });
    const activeHeading = headingTops.find((heading, index) => {
      const currentTop = heading.top;
      const nextTop = headingTops[index + 1]?.top;
      return currentTop <= 10 && (nextTop > 10 || nextTop == null);
    });
    if (!activeHeading) return;
    const activeIndex = tableOfContents.findIndex(
      toc => toc.text === activeHeading.text,
    );
    setActiveIndex(activeIndex);
  }, [tableOfContents]);

  useScroll(handleScroll);

  return (
    <aside
      className={cn(
        'w-60 max-w-max overflow-auto rounded-lg border-2 border-gray-500 bg-gray-100 p-2 dark:border-gray-100 dark:bg-gray-800',
        className,
      )}
    >
      <nav id="toc" aria-label="Table of contents">
        <p className="font-bold uppercase">Table of Contents</p>
        <ul className="mt-2 flex flex-col gap-1">
          {tableOfContents.map((toc, index) => (
            <li key={toc.url} className={cn('text-sm font-medium')}>
              <a
                href={toc.url}
                aria-current={activeIndex === index ? 'location' : false}
                className={cn(
                  'relative inline-block px-2 text-base leading-[1.1] no-underline hover:text-gray-900 dark:hover:text-white',
                  toc.level === 3
                    ? 'ml-4 py-0.5 text-sm text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200'
                    : 'py-1',
                  activeIndex === index &&
                    'bg-red-400/20 before:bg-red-400 dark:bg-red-400/10',
                  'before:absolute before:bottom-0 before:left-[1px] before:top-0 before:block before:w-[2px] before:rounded before:transition-colors before:content-[""]',
                )}
              >
                {toc.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};
