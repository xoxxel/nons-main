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
  output: 'standalone', 
};

export default nextConfig;
