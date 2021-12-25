import 'focus-visible';
import * as React from 'react';
import type { AppProps } from 'next/app';
import { MDXProvider } from '@mdx-js/react';
import 'styles/global.css';
import 'styles/blog.css';
import { BlogWrapper } from 'components/pages/blog/BlogWrapper';
import { DynamicComponent } from 'components/pages/blog/DynamicComponent';
import { Heading } from 'components/pages/blog/Heading';
import { Pre } from 'components/pages/blog/Pre';
import { setupAxe } from 'libs/axe';

const App: React.FC<AppProps> = props => {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    setupAxe();
  }, []);

  return (
    <MDXProvider
      components={{
        wrapper: BlogWrapper,
        h1: Heading.h1,
        h2: Heading.h2,
        h3: Heading.h3,
        pre: Pre,
        code: DynamicComponent.Code,
      }}
    >
      <Component {...pageProps} />
    </MDXProvider>
  );
};

export default App;
