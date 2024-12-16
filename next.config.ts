import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
    domains: ['utfs.io', 'cejas-pesta-s.vercel.app'], // Agrega tu dominio y el de las imágenes
    
  },
};

export default nextConfig;
