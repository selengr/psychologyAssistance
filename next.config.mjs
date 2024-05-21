/** @type {import('next').NextConfig} */
const nextConfig = {

  experimental: {
    // ppr: true,
    serverActions: true,
    optimizePackageImports: [
      '@emotion/react',
      'axios',
      'notistack',
      'eslint',
      'prettier',
  ],
  },
  reactStrictMode: true,
  output: 'standalone',

    env: {
      BASE_URL_API: 'http://localhost:8080',
      },
};

export default nextConfig;
