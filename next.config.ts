import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverComponentsHmrCache: false,
  },
  /* config options here */
  images: {
    domains: ["dummyimage.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "smpspoznsbkrrawzmqmh.supabase.co",
      },
    ],
  },
};

export default nextConfig;
