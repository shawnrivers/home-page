import { A11yReporter } from '@/components/A11yReporter';
import { DraftStatusToast } from '@/components/DraftModeStatusToast';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import {
  SKIP_NAV_MAIN_CONTENT_ID,
  SkipNavLink,
} from '@/components/SkipNavLink';
import { SCROLL_CONTAINER_ID } from '@/libs/constants/scroll';
import '@/libs/styles/globals.css';
import { cn } from '@/libs/utils/classNames';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Viewport } from 'next';
import { Alegreya, Geist_Mono, Nunito_Sans } from 'next/font/google';
import { unstable_ViewTransition as ViewTransition } from 'react';

const nunitoSans = Nunito_Sans({
  variable: '--font-nunito-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

const algreya = Alegreya({
  variable: '--font-alegreya',
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
    <html
      lang="en"
      className={cn(nunitoSans.variable, geistMono.variable, algreya.variable)}
    >
      <head />
      <body>
        <ViewTransition>
          <SkipNavLink className="z-10" />
          <div
            id={SCROLL_CONTAINER_ID}
            className="isolate flex h-full flex-col overflow-y-scroll gap-10"
          >
            <div className="flex-1">
              <Header />
              <main
                id={SKIP_NAV_MAIN_CONTENT_ID}
                className="isolate mx-auto max-w-6xl pl-[calc(env(safe-area-inset-left)+1.5rem)] pr-[calc(env(safe-area-inset-right)+1.5rem)] mt-6"
              >
                {children}
              </main>
            </div>
            <Footer />
          </div>
          <DraftStatusToast className="z-10" />
        </ViewTransition>
        <A11yReporter />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
