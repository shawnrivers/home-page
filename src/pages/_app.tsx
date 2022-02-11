import 'focus-visible';
import * as React from 'react';
import type { AppProps } from 'next/app';
import { MDXProvider } from '@mdx-js/react';
import 'app/styles/global.css';
import 'app/styles/blog.css';
import { BlogWrapper } from 'app/components/pages/blog/BlogWrapper';
import { DynamicComponent } from 'app/components/pages/blog/DynamicComponent';
import { Heading } from 'app/components/pages/blog/Heading';
import { Pre } from 'app/components/pages/blog/Pre';
import { setupAxe } from 'app/libs/axe';
import { A } from 'app/components/pages/blog/A';

const App: React.FC<AppProps> = props => {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    setupAxe();
  }, []);

  return (
    <MDXProvider
      components={{
        wrapper: BlogWrapper,
        h2: Heading.h2,
        h3: Heading.h3,
        a: A,
        pre: Pre,
        code: DynamicComponent.Code,
      }}
    >
      <Component {...pageProps} />
    </MDXProvider>
  );
};

export default App;
