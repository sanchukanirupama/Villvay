/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    outputFileTracingRoot: undefined,
  },
  // Disable image optimization in development
  images: {
    unoptimized: process.env.NODE_ENV !== 'production',
  },
}

module.exports = nextConfig
