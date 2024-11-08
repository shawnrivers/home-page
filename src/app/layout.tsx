import { SCROLL_CONTAINER_ID } from '@/app/constants';
import { A11yReporter } from '@/components/A11yReporter';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { DraftStatusToast } from '@/components/DraftModeStatusToast';
import {
  SKIP_NAV_MAIN_CONTENT_ID,
  SkipNavLink,
} from '@/components/SkipNavLink';
import { cn } from '@/utils/classNames';
import { Inter, Source_Code_Pro } from 'next/font/google';
import './globals.css';
import type { Viewport } from 'next';

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

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

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
            <main
              id={SKIP_NAV_MAIN_CONTENT_ID}
              className="isolate mx-auto max-w-6xl px-6 pb-8"
            >
              {children}
            </main>
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
