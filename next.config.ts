import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  output: 'export',          // generates a static "out/" folder
  images: { unoptimized: true }, // required for static export (no Next.js image server)
  trailingSlash: true,       // makes /Events → /Events/index.html (works on all hosts)
};

export default nextConfig;
