const i18nConfig = require("./next-i18next.config");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // Required for static export
  },
  i18n: {
    locales: i18nConfig.i18n.locales,
    defaultLocale: i18nConfig.i18n.defaultLocale,
    localeDetection: i18nConfig.i18n.localeDetection,
  },
};

module.exports = nextConfig;
