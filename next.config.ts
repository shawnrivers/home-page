import type { NextConfig } from 'next';
import { parseProcessEnv } from './src/libs/utils/env';

// Validate env vars at build time
parseProcessEnv();

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/blog',
        destination: '/memo',
        permanent: true,
      },
      {
        source: '/blog/:slug',
        destination: '/memo/:slug',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
