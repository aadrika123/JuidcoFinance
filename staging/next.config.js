/** @type {import('next').NextConfig} */
module.exports = {
    basePath: '/finance',
    env: {
      backend: 'https://aadrikainfomedia.com/auth',
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

