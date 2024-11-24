/** @type {import('next').NextConfig} */
const nextConfig = {
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
