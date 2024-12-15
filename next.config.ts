import { fileURLToPath } from 'node:url';
import { createJiti } from 'jiti';
import type { NextConfig } from 'next';

// Validate env vars at build time
const jiti = createJiti(fileURLToPath(import.meta.url));
jiti('./src/libs/utils/env.ts');

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
