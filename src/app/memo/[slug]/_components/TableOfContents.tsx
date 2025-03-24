'use client';

import { useScroll } from '@/hooks/useScroll';
import { cn } from '@/libs/utils/classNames';
import { useCallback, useState } from 'react';

export type Toc = { text: string; id: string; level: number };

export const TableOfContents: React.FC<{
  tableOfContents: Toc[];
  className?: string;
}> = ({ tableOfContents, className }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = useCallback(() => {
    const headingTops: { id: string; top: number }[] = [];
    // biome-ignore lint/complexity/noForEach: The array is small and the performance impact is negligible
    document.querySelectorAll('h2, h3').forEach(heading => {
      headingTops.push({
        id: heading.id,
        top: heading.getBoundingClientRect().top,
      });
    });
    const activeHeading = headingTops.find((heading, index) => {
      const currentTop = heading.top;
      const nextTop = headingTops[index + 1]?.top ?? 0;
      return currentTop <= 10 && (nextTop > 10 || nextTop == null);
    });
    if (!activeHeading) return;
    const activeIndex = tableOfContents.findIndex(
      toc => toc.id === activeHeading.id,
    );
    setActiveIndex(activeIndex);
  }, [tableOfContents]);

  useScroll(handleScroll);

  return (
    <aside
      aria-labelledby="toc"
      className={cn(
        'w-60 max-w-max overflow-auto rounded-lg border-2 border-gray-500 bg-gray-50 p-2 dark:border-gray-100 dark:bg-gray-900',
        className,
      )}
    >
      <nav id="toc" aria-label="Table of contents">
        <ul className="flex flex-col gap-1 py-2">
          {tableOfContents.map((toc, index) => (
            <li key={toc.id} className={cn('text-sm font-medium')}>
              <a
                href={`#${toc.id}`}
                aria-current={activeIndex === index ? 'location' : false}
                className={cn(
                  'relative block px-2 text-base leading-[1.1] no-underline hover:underline',
                  toc.level === 3
                    ? 'ml-4 py-0.5 text-sm text-gray-600 dark:text-gray-300'
                    : 'py-1',
                  activeIndex === index &&
                    'bg-red-400/20 before:bg-red-400 dark:bg-red-400/10',
                  'before:absolute before:bottom-0 before:left-[1px] before:top-0 before:block before:w-[3px] before:rounded-sm before:transition-colors before:content-[""]',
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
