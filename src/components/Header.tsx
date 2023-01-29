'use client';

import { cn } from '@/utils/classNames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Blog', href: '/blog' },
] satisfies { label: string; href: string }[];

export const Header: React.FC = () => {
  const pathname = usePathname();

  return (
    <header className="mb-8">
      <nav aria-label="main-nav">
        <ul className="flex items-center justify-center gap-2 px-4">
          {navItems.map(({ label, href }) => {
            const isCurrent = pathname === href;
            return (
              <li className="inline-block py-4" key={label}>
                <Link
                  aria-current={isCurrent ? 'page' : undefined}
                  href={href}
                  className={cn(
                    ' p-2 text-xl font-bold uppercase',
                    isCurrent && 'text-red-400',
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
