/** @type {import('next').NextConfig} */
const nextConfig = {
      images: {
        remotePatterns: [
          {
            protocol: "http",
            hostname: "localhost",
          },
          {
            protocol: "https",
            hostname: "admin.netiqa.co.ke",
          },
          {
            protocol: "https",
            hostname: "netiqa.co.ke",
          },
          {
            protocol: "https",
            hostname: "netiqa",
          },
          {
            protocol: "https",
            hostname: "ideakode-v2-1.onrender.com",
          },
          {
            protocol: "https",
            hostname: "api.netiqa.co.ke",
          },
          {
            protocol: "https",
            hostname: "assets.netiqa.co.ke",
          },
        ],
        formats: ['image/avif', 'image/webp'],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
      },
      
      // Security headers
      async headers() {
        return [
          {
            source: '/:path*',
            headers: [
              {
                key: 'X-DNS-Prefetch-Control',
                value: 'on'
              },
              {
                key: 'Strict-Transport-Security',
                value: 'max-age=63072000; includeSubDomains; preload'
              },
              {
                key: 'X-Frame-Options',
                value: 'SAMEORIGIN'
              },
              {
                key: 'X-Content-Type-Options',
                value: 'nosniff'
              },
              {
                key: 'X-XSS-Protection',
                value: '1; mode=block'
              },
              {
                key: 'Referrer-Policy',
                value: 'origin-when-cross-origin'
              },
              {
                key: 'Permissions-Policy',
                value: 'camera=(), microphone=(), geolocation=()'
              }
            ],
          },
        ];
      },
      
      // Ensure GEO files are properly served
      async rewrites() {
        return [
          {
            source: '/robots.txt',
            destination: '/robots.txt'
          },
          {
            source: '/llm.txt', 
            destination: '/llm.txt'
          }
        ];
      },
      
      // Optimize production builds
      compress: true,
      poweredByHeader: false,
      
};

export default nextConfig;
