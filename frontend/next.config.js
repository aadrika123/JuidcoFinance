/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: '/finance',
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'http://localhost:5001/finance/api/:path*' // Proxy to Backend
          // destination: 'http://192.168.70.147:5001/api/:path*'
        }
      ]
    },
    async redirects() {
      return [
        {
          source: '/',
          destination: '/home',
          permanent: true,
        },
      ]
    },
  }

module.exports = nextConfig

