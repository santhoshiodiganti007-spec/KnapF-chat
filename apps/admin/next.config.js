/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@nova/ui', '@nova/utils', '@nova/types'],
};

module.exports = nextConfig;
