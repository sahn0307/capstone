/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          source: '/api/v1/:path*',
          destination: 'http://localhost:5555/api/v1/:path*',
        },
      ];
    },
  };
  
  export default nextConfig;