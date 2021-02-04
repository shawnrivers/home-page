const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
});

module.exports = withMDX({
  target: 'experimental-serverless-trace',
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  webpack(cfg, { dev, isServer }) {
    if (dev || !isServer) return cfg;

    // we're in build mode so enable shared caching for Notion data
    process.env.USE_CACHE = 'true';
    return cfg;
  },
  images: {
    domains: ['s3.us-west-2.amazonaws.com', 's3-us-west-2.amazonaws.com'],
  },
});
