import dynamic from 'next/dynamic';
import { ExtLink } from './ExtLink';

export const DynamicComponent = {
  // default tags
  ol: 'ol',
  ul: 'ul',
  li: 'li',
  p: 'p',
  blockquote: 'blockquote',
  a: ExtLink,

  Code: dynamic(() => import('./Code')),
  Equation: dynamic(() => import('./Equation')),
};
