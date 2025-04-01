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
    domains: [
      'flowbite.com',
      "localhost",
      "img.daisyui.com",
      "zos.alipayobjects.com",
      "http://localhost:2200",
      "https://ideakode-v2-1.onrender.com"
    ], 
  },
};

export default nextConfig;
