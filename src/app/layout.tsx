import { SCROLL_CONTAINER_ID } from '@/app/constants';
import { A11yReporter } from '@/components/A11yReporter';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { SkipNavLink } from '@/components/SkipNavLink';
import { cn } from '@/utils/classNames';
import { Inter, Source_Code_Pro } from '@next/font/google';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: 'variable',
  display: 'optional',
});
const sourceCodePro = Source_Code_Pro({
  variable: '--font-source-code-pro',
  subsets: ['latin'],
  weight: 'variable',
  display: 'optional',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn(inter.variable, sourceCodePro.variable)}>
      <head />
      <body>
        <SkipNavLink />
        <div
          id={SCROLL_CONTAINER_ID}
          className="relative flex h-full flex-col overflow-y-scroll"
        >
          <div className="flex-1">
            <Header />
            <div className="px-6 pb-8">{children}</div>
          </div>
          <div>
            <Footer />
          </div>
        </div>
        <A11yReporter />
      </body>
    </html>
  );
}
