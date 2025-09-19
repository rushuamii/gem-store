/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",         // leave empty
        pathname: "/images/**",
      },
    ],
  },
};

module.exports = nextConfig;
