import dynamic from 'next/dynamic';

export const DynamicComponent = {
  Code: dynamic(() => import('./Code')),
};
