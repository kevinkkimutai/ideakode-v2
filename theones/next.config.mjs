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
      
};

export default nextConfig;
