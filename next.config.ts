import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        port: '',
        pathname: '/mediloon/**',
      },
    ],
    minimumCacheTTL: 60,
  },
};

export default nextConfig;
