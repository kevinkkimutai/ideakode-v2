import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
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
        hostname: "api.netiqa.co.ke"
      },
      {
        protocol: "https",
        hostname: "assets.netiqa.co.ke"
      }
    ],
  },
};

export default nextConfig;
