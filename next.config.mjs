/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['imgur.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'imgur.com',
        pathname: '**',
      },
    ],
  }
};

export default nextConfig;
