import * as React from 'react';
import type { AppProps } from 'next/app';
import '../styles/global.css';
import 'katex/dist/katex.css';
import { Footer } from '../components/utils/Footer';

const App: React.FC<AppProps> = props => {
  const { Component, pageProps } = props;

  return (
    <div className="flex flex-col min-h-screen">
      <Component {...pageProps} />
      <Footer />
    </div>
  );
};

export default App;
