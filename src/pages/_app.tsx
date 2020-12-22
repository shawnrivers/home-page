import '../styles/global.css';
import 'katex/dist/katex.css';
import { Footer } from '../components/utilities/Footer';

export default ({ Component, pageProps }) => (
  <>
    <Component {...pageProps} />
    <Footer />
  </>
);
