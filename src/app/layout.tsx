import { SCROLL_CONTAINER_ID } from '@/app/constants';
import { A11yReporter } from '@/components/A11yReporter';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { DraftStatusToast } from '@/components/DraftModeStatusToast';
import { SkipNavLink } from '@/components/SkipNavLink';
import { cn } from '@/utils/classNames';
import { Inter, Source_Code_Pro } from 'next/font/google';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});
const sourceCodePro = Source_Code_Pro({
  variable: '--font-source-code-pro',
  subsets: ['latin'],
  display: 'swap',
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
        <SkipNavLink className="z-10" />
        <div
          id={SCROLL_CONTAINER_ID}
          className="isolate flex h-full flex-col overflow-y-scroll"
        >
          <div className="flex-1">
            <Header />
            <DraftStatusToast className="z-10" />
            <div className="isolate px-6 pb-8">{children}</div>
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
