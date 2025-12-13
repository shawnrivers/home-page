import '@/libs/styles/globals.css';
import { A11yReporter } from '@/components/A11yReporter';
import { AppBackground } from '@/components/AppBackground';
import { DraftStatusToast } from '@/components/DraftModeStatusToast';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import {
  SKIP_NAV_MAIN_CONTENT_ID,
  SkipNavLink,
} from '@/components/SkipNavLink';
import { SCROLL_CONTAINER_ID } from '@/libs/constants/scroll';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Viewport } from 'next';
import { ViewTransition } from 'react';
import { Google_Sans_Code, Outfit, TikTok_Sans } from 'next/font/google';
import { cn } from '@/libs/utils/classNames';

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-outfit',
});

const googleSansCode = Google_Sans_Code({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-google-sans-code',
});

const tiktokSans = TikTok_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-tiktok-sans',
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
      className={cn(
        outfit.variable,
        googleSansCode.variable,
        tiktokSans.variable,
      )}
    >
      <head />
      <body className="overflow-hidden">
        <AppBackground />
        <div className="relative z-10 h-full">
          <ViewTransition>
            <SkipNavLink className="z-10" />
            <div
              id={SCROLL_CONTAINER_ID}
              className="isolate flex h-full flex-col overflow-y-scroll gap-10 overflow-x-hidden"
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
        </div>
      </body>
    </html>
  );
}
