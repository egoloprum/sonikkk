/** @type {import('next').NextConfig} */
const nextConfig = {
  // redirects() {
  //   return [
  //     {
  //       source: '/',
  //       destination: '/planner',
  //       permanent: false
  //     },
  //   ];
  // },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.buzzfeed.com',
        port: '',
        pathname: '/video-api-prod/assets/**',
      },
    ],
  },
  // experimental: {
  //   serverActions: true,
  // },
};

export default nextConfig;
