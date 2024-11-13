import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   images: {
    remotePatterns: [
      {
        hostname: "api.microlink.io",
      },
    ],
  },
  experimental: {
    reactCompiler: true,
  },
};

export default nextConfig;
