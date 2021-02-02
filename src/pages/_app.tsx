import * as React from 'react';
import type { AppProps } from 'next/app';
import { MDXProvider } from '@mdx-js/react';
import '../styles/global.css';
import 'katex/dist/katex.css';
import 'focus-visible';
import { Page } from '../components/utils/Page';
import { BlogMeta } from '../types/BlogMeta';

const BlogWrapper: React.FC<{
  children?: React.ReactNode;
  meta: BlogMeta;
}> = props => {
  const { meta, children } = props;

  return (
    <Page titlePre={meta.title}>
      <article className="prose post break-words">{children}</article>
    </Page>
  );
};

const App: React.FC<AppProps> = props => {
  const { Component, pageProps } = props;

  return (
    <MDXProvider components={{ wrapper: BlogWrapper }}>
      <Component {...pageProps} />
    </MDXProvider>
  );
};

export default App;
