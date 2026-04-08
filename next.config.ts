import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   images: { 
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      {
        protocol: 'https',
        hostname: 'static.tvmaze.com', // TVMaze'in asıl resimleri buradan gelir
      },
    ], }
  /* config options here */
  
};

export default nextConfig;
