/** @type {import('next').NextConfig} */

const isProduction = process.env.NODE_ENV === "production";

const config = {
  experimental: {
    appDir: true,
  },
};

const nextConfig = require("next-pwa")({
  dest: "public",
  swSrc: "./service-worker.js",
})(config);

module.exports = nextConfig;
