const { createJiti } = require('jiti');

// Validate env vars at build time
const jiti = createJiti(__filename);
jiti('./src/libs/utils/env.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: true,
  },
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

module.exports = nextConfig;
