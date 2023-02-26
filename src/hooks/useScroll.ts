import { SCROLL_CONTAINER_ID } from '@/app/constants';
import { useCallback, useEffect, useRef, useState } from 'react';

type ScrollDirection = 'up' | 'down' | null;

export function useScroll(onScroll?: () => void): {
  scrollTo: (position: number) => void;
  scrollDirection: ScrollDirection;
} {
  const prevOffset = useRef(0);
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>(null);

  useEffect(() => {
    const scrollContainer = document.getElementById(SCROLL_CONTAINER_ID);

    const handleScroll = () => {
      onScroll?.();
      const scrollTop = scrollContainer?.scrollTop ?? 0;
      if (scrollTop === 0) {
        setScrollDirection(null);
      } else if (scrollTop > prevOffset.current) {
        setScrollDirection('down');
      } else if (scrollTop < prevOffset.current) {
        setScrollDirection('up');
      }
      prevOffset.current = scrollTop;
    };

    scrollContainer?.addEventListener('scroll', handleScroll, {
      passive: true,
    });
    return () => scrollContainer?.removeEventListener('scroll', handleScroll);
  }, [onScroll]);

  const scrollTo = useCallback((position: number) => {
    const scrollContainer = document.getElementById(SCROLL_CONTAINER_ID);
    scrollContainer?.scrollTo({ top: position, behavior: 'smooth' });
  }, []);

  return { scrollDirection, scrollTo };
}
