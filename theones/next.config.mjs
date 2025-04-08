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
            hostname: "ideakode-v2-1.onrender.com",
          },
        ],
      },
};

export default nextConfig;
