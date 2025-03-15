import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'images.igdb.com',
        pathname: '/igdb/image/upload/**',
        protocol: 'https',
      },
    ],
  },
}

export default nextConfig
