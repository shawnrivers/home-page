import { A11yReporter } from '@/components/A11yReporter';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { DraftStatusToast } from '@/components/DraftModeStatusToast';
import {
  SKIP_NAV_MAIN_CONTENT_ID,
  SkipNavLink,
} from '@/components/SkipNavLink';
import { cn } from '@/libs/utils/classNames';
import { Parkinsans, Source_Code_Pro } from 'next/font/google';
import '@/libs/styles/globals.css';
import type { Viewport } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { SCROLL_CONTAINER_ID } from '@/libs/constants/scroll';
import { unstable_ViewTransition as ViewTransition } from 'react';

const inter = Parkinsans({
  variable: '--font-parkinsans',
  subsets: ['latin'],
  display: 'swap',
});

const sourceCodePro = Source_Code_Pro({
  variable: '--font-source-code-pro',
  subsets: ['latin'],
  display: 'swap',
  style: ['normal', 'italic'],
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
        <ViewTransition>
          <SkipNavLink className="z-10" />
          <div
            id={SCROLL_CONTAINER_ID}
            className="isolate flex h-full flex-col overflow-y-scroll gap-10"
          >
            <div className="flex-1 flex flex-col gap-6">
              <Header />
              <main
                id={SKIP_NAV_MAIN_CONTENT_ID}
                className="isolate mx-auto max-w-6xl px-6"
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
