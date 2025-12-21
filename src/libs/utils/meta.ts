import type { Metadata } from 'next';

export const sharedMetadata: Metadata = {
  metadataBase: 'https://usho.dev',
  icons: '/favicon.ico',
  twitter: {
    creator: '@yuxiao_he',
    card: 'summary_large_image',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
  },
};
