import '../styles/global.css';
import 'katex/dist/katex.css';
import { Footer } from '../components/utils/Footer';

export default ({ Component, pageProps }) => (
  <>
    <Component {...pageProps} />
    <Footer />
  </>
);
