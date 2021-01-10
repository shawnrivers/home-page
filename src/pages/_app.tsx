import * as React from 'react';
import type { AppProps } from 'next/app';
import '../styles/global.css';
import 'katex/dist/katex.css';
import { Footer } from '../components/utils/Footer';

const App: React.FC<AppProps> = props => {
  const { Component, pageProps } = props;

  return (
    <>
      <Component {...pageProps} />
      <Footer />
    </>
  );
};

export default App;
