/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "admin.nons.ir",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
