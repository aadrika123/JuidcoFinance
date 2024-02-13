/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          // destination: 'http://localhost:5001/api/:path*' // Proxy to Backend
          destination: 'http://192.168.70.147:5001/api/:path*'
        }
      ]
    },
  }

module.exports = nextConfig

