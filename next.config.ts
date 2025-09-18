/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // ⚠️ Ignore ESLint errors during builds (temporary fix)
    ignoreDuringBuilds: true,
  },
  typescript: {
    // ⚠️ Ignore TS errors during builds (temporary fix)
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
