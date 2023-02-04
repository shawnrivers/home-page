import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...args: Parameters<typeof clsx>): string | undefined {
  const merged = twMerge(clsx(args));
  return merged !== '' ? merged : undefined;
}
