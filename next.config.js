const { i18n } = require("./next-i18next.config");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "localhost",
      "www.gastudio-server.click",
      "gastudio-server.click",
      "eminently-suitable-sheep.ngrok-free.app",
    ],
  },
  i18n,
  output: "export",
};

module.exports = nextConfig;
