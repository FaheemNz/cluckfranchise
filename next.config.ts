import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cluckcluckschicken.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cluckclucksfranchise.com",
        pathname: "/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;