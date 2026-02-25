import type { NextConfig } from "next";

// Suppress specific deprecation warnings
const originalEmitWarning = process.emitWarning;
process.emitWarning = (warning, ...args) => {
  if (typeof warning === 'string' && warning.includes('url.parse()')) {
    return;
  }
  if (warning && typeof warning === 'object' && 'message' in warning && warning.message.includes('url.parse()')) {
    return;
  }
  // @ts-ignore
  return originalEmitWarning.call(process, warning, ...args);
};

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sekolahgurupemimpin.s3.ap-southeast-1.amazonaws.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'api-minio.muaraenimkab.go.id',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.cdninstagram.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.fbcdn.net',
        pathname: '/**',
      },
    ],
  },
  // @ts-ignore
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  experimental: {
  },
  // webpack(config) {
  //   config.module.rules.push({
  //     test: /\.svg$/,
  //     use: ["@svgr/webpack"],
  //   });
  //   return config;
  // },
};

export default nextConfig;
