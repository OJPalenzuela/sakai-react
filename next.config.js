/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    unoptimized: true
  },

  sassOptions: {
    silenceDeprecations: ['legacy-js-api']
  }
};

module.exports = nextConfig;
