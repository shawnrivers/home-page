import React from 'react';
import ReactDOM from 'react-dom';
import { isProduction, isServer } from 'utils/env';

export const setupAxe = async (): Promise<void> => {
  if (!isProduction() && !isServer()) {
    const axe = await import('@axe-core/react');
    axe.default(React, ReactDOM, 1000, {
      rules: [{ id: 'wcag-21-aa-guideline', tags: ['wcag21aa'] }],
    });

    console.log('axe setup finished.');
  }
};
