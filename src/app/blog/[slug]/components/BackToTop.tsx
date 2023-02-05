'use client';

import { useScroll } from '@/hooks/useScroll';
import { cn } from '@/utils/classNames';
import { useState, useEffect } from 'react';

export const BackToTop: React.FC = () => {
  const { scrollDirection, scrollTo } = useScroll();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (scrollDirection === 'up') {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [scrollDirection]);

  return (
    <button
      tabIndex={visible ? 0 : -1}
      className={cn(
        'fixed right-8 z-10 rounded-lg border-2 border-gray-500 bg-gray-100 p-2 text-gray-800 shadow-lg transition-all duration-300 hover:bg-gray-200 dark:border-gray-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700',
        visible ? 'bottom-4 opacity-100' : '-bottom-12 opacity-0',
      )}
      aria-label="Back to top"
      onClick={() => {
        scrollTo(0);
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="h-6 w-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18"
        />
      </svg>
    </button>
  );
};
