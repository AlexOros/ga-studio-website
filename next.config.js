/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost"],
  },
  i18n: {
    locales: ["en", "ro"],
    defaultLocale: "ro",
    localeDetection: false,
  },
};

module.exports = nextConfig;
