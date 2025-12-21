'use client';

import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

let initialized = false;

export const A11yReporter: React.FC = () => {
  useEffect(() => {
    if (initialized) return;
    (async () => {
      const axe = (await import('@axe-core/react')).default;
      await axe(React, ReactDOM, 1000);
      initialized = true;
    })();
  }, []);

  return null;
};
