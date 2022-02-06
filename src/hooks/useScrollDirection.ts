import { useEffect, useRef, useState } from 'react';

type ScrollDirection = 'up' | 'down' | null;

export function useScrollDirection(): ScrollDirection {
  const prevOffset = useRef(0);
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY === 0) {
        setScrollDirection(null);
      } else if (scrollY > prevOffset.current) {
        setScrollDirection('down');
      } else if (scrollY < prevOffset.current) {
        setScrollDirection('up');
      }
      prevOffset.current = scrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return scrollDirection;
}
