import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  i18n: {
    locales: ['en', 'pt'],
    defaultLocale: 'en',
    // localeDetection: true,
  },
  async rewrites() {
    return [
      // Keep URLs clean - no locale prefixes
      {
        source: '/:path*',
        destination: '/:path*',
      },
    ];
    },
    
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "flowbite.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "img.daisyui.com",
      },
      {
        protocol: "https",
        hostname: "zos.alipayobjects.com",
      },
      {
        protocol: "https",
        hostname: "ideakode-v2-1.onrender.com",
      },
      {
        protocol: "https",
        hostname: "api.gateway.co.ke"
      },
      {
        protocol: "https",
        hostname: "gateway.co.ke"
      }
    ],
  },
};

export default nextConfig;
