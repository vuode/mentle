/** @type {import('next').NextConfig} */
module.exports = {
  transpilePackages: ["@mentle/ui"],
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};
