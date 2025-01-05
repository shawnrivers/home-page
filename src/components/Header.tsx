'use client';

import { cn } from '@/libs/utils/classNames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { label: 'Home', href: '/', highlightRegex: /^\/$/ },
  { label: 'Memo', href: '/memo', highlightRegex: /^\/memo.*/ },
  { label: 'Job', href: '/job', highlightRegex: /^\/job$/ },
] as const;

export const Header: React.FC<{ className?: string }> = ({ className }) => {
  const pathname = usePathname();

  return (
    <header className={className}>
      <nav aria-label="main-nav">
        <ul className="flex flex-wrap items-center justify-center gap-2 p-4">
          {navItems.map(({ label, href, highlightRegex }) => {
            const isCurrent = highlightRegex.test(pathname ?? '');
            return (
              <li className="inline-block" key={label}>
                <Link
                  aria-current={isCurrent ? 'page' : undefined}
                  href={href}
                  className={cn(
                    'p-2 text-xl font-bold uppercase',
                    isCurrent && 'text-red-400 hover:text-red-500',
                  )}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};
