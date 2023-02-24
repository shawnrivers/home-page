import { Metadata } from 'next';

export const sharedMetadata: Metadata = {
  icons: '/favicon.ico',
  viewport: 'width=device-width, initial-scale=1',
  twitter: {
    creator: '@yuxiao_he',
    card: 'summary_large_image',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
  },
};
