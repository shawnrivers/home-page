'use client';

import { useEffect } from 'react';
import React from 'react';
import ReactDOM from 'react-dom';

let initialized = false;

export const A11yReporter: React.FC = () => {
  useEffect(() => {
    if (initialized || process.env.NODE_ENV === 'production') return;
    (async () => {
      const axe = (await import('@axe-core/react')).default;
      await axe(React, ReactDOM, 1000);
      initialized = true;
    })();
  }, []);

  return null;
};
