import * as React from 'react';
import type { AppProps } from 'next/app';
import { MDXProvider } from '@mdx-js/react';
import '../styles/global.css';
import 'katex/dist/katex.css';
import 'focus-visible';
import { BlogWrapper } from '../components/pages/blog/BlogWrapper';
import { DynamicComponent } from '../components/pages/blog/DynamicComponent';

const Heading: Record<
  'h1' | 'h2' | 'h3',
  React.FC<{ children?: React.ReactNode }>
> = {
  h1: props => <h1 className="hashtag-heading">{props.children}</h1>,
  h2: props => <h2 className="hashtag-heading">{props.children}</h2>,
  h3: props => <h3 className="hashtag-heading">{props.children}</h3>,
};

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
