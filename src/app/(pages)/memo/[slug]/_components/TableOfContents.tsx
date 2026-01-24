'use client';

import { useLayoutEffect, useState, useRef, useCallback } from 'react';
import { useScroll } from '@/hooks/useScroll';
import { SCROLL_CONTAINER_ID } from '@/libs/constants/scroll';
import { cn } from '@/libs/utils/classNames';

export type Toc = { text: string; id: string; level: number };

function findActiveIndexFromScrollPosition(tableOfContents: Toc[]): number {
  const scrollContainer = document.getElementById(SCROLL_CONTAINER_ID);
  if (!scrollContainer) return 0;

  const containerTop = scrollContainer.getBoundingClientRect().top;

  const headingTops: { id: string; top: number }[] = [];
  document.querySelectorAll('h2, h3').forEach(heading => {
    const relativeTop = heading.getBoundingClientRect().top - containerTop;
    headingTops.push({
      id: heading.id,
      top: relativeTop,
    });
  });

  const activeHeading = headingTops.find((heading, index) => {
    const currentTop = heading.top;
    const nextTop = headingTops[index + 1]?.top;
    return currentTop <= 0 && (nextTop == undefined || nextTop > 0);
  });

  if (!activeHeading) return 0;
  const foundIndex = tableOfContents.findIndex(
    toc => toc.id === activeHeading.id,
  );
  return foundIndex >= 0 ? foundIndex : 0;
}

function scrollToHashFragment(hash: string): boolean {
  const targetElement = document.getElementById(hash);
  if (!targetElement) return false;

  const scrollContainer = document.getElementById(SCROLL_CONTAINER_ID);
  if (!scrollContainer) return false;

  const containerRect = scrollContainer.getBoundingClientRect();
  const targetRect = targetElement.getBoundingClientRect();
  const currentScrollTop = scrollContainer.scrollTop;
  const targetScrollTop =
    currentScrollTop + (targetRect.top - containerRect.top);

  scrollContainer.scrollTo({
    top: targetScrollTop,
    behavior: 'instant',
  });

  return true;
}

export const TableOfContents: React.FC<{
  tableOfContents: Toc[];
  className?: string;
}> = ({ tableOfContents, className }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const hasInitialized = useRef(false);

  const handleScroll = useCallback(() => {
    const newActiveIndex = findActiveIndexFromScrollPosition(tableOfContents);
    setActiveIndex(newActiveIndex);
  }, [tableOfContents]);

  useScroll(handleScroll);

  // Handle initial fragment scroll and sync active index with URL hash.
  useLayoutEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    const hash = window.location.hash.slice(1); // Remove the '#'

    if (hash) {
      const hashIndex = tableOfContents.findIndex(toc => toc.id === hash);

      if (hashIndex >= 0) {
        scrollToHashFragment(hash);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setActiveIndex(hashIndex);
        return;
      }
    }

    handleScroll();
  }, [tableOfContents, handleScroll]);

  return (
    <aside
      aria-labelledby="toc"
      className={cn(
        'w-60 max-w-max overflow-auto rounded-lg border-2 border-dashed border-gray-500 bg-gray-50 p-2 dark:border-gray-100 dark:bg-gray-900 font-display',
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
                  activeIndex === index && 'text-red-400 before:bg-red-400',
                  'before:absolute before:bottom-1 before:left-0 before:top-1 before:block before:w-0.75 before:rounded-sm before:transition-colors before:content-[""]',
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
