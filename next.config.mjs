/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/graphql',
        destination: 'https://graphql.anilist.co',
      },
    ]
  },
  images: {
    domains: ['s4.anilist.co'],
  },
}

export default nextConfig
