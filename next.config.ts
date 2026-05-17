import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 80, 96, 120, 240],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
  },
  // Prevent SSR bundling issues with leaflet, react-leaflet, and AI SDK
  serverExternalPackages: ['leaflet', 'z-ai-web-dev-sdk'],
  // Better tree-shaking for large icon/animation libraries
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion', 'react-leaflet'],
  },
  // Strip console.log in production (keep error/warn)
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
      ? { exclude: ['error', 'warn'] }
      : false,
  },
  // Allow cross-origin requests from preview panels (dev only)
  allowedDevOrigins: [
    '.space-z.ai',
    '.space.chatglm.site',
  ],
};

export default nextConfig;
