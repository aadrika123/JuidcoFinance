/** @type {import('next').NextConfig} */
module.exports = {
    basePath: '/finance',
    env: {
      backend: 'http://jharkhandegov.com:8000',
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

