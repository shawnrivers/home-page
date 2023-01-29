import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...args: Parameters<typeof clsx>): string {
  return twMerge(clsx(args));
}
