import * as React from 'react';
import type { AppProps } from 'next/app';
import { MDXProvider } from '@mdx-js/react';
import '../styles/global.css';
import 'focus-visible';
import { BlogWrapper } from '../components/pages/blog/BlogWrapper';
import { DynamicComponent } from '../components/pages/blog/DynamicComponent';
import { Heading } from '../components/pages/blog/Heading';

const App: React.FC<AppProps> = props => {
  const { Component, pageProps } = props;

  return (
    <MDXProvider
      components={{
        wrapper: BlogWrapper,
        h1: Heading.h1,
        h2: Heading.h2,
        h3: Heading.h3,
        code: DynamicComponent.Code,
      }}
    >
      <Component {...pageProps} />
    </MDXProvider>
  );
};

export default App;
