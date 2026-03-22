import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  transpilePackages: ["@splinetool/react-spline", "@splinetool/runtime"],
  images: {
    domains: ["res.cloudinary.com"],
  },
};
export default nextConfig;
