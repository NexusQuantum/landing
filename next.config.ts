import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin tracing root to this project to avoid multi-lockfile inference warning
  outputFileTracingRoot: __dirname,
  // Only use static export for production builds, not in dev mode
  ...(process.env.NODE_ENV === 'production' && { output: 'export' }),
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
