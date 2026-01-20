/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  distDir: 'out',
  images: {
    unoptimized: true,
    remotePatterns: [],
    domains: ['webvy.online'],
  },
  basePath: '',
  assetPrefix: '',
  trailingSlash: true,
};

module.exports = nextConfig;
