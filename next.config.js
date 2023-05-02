const axios = require("axios");
const withSass = require("@zeit/next-sass");
const withCSS = require("@zeit/next-css");
const withImages = require("next-images");
const withFonts = require("next-fonts");
// const withPWA = require("next-pwa");
// const { i18n} = require('./next-i18next.config')
const webpack = require("webpack");
module.exports = withFonts(
  withSass(
    withCSS(
      withImages({
        // i18n,
        pwa: {
          dest: "public",
          register: true,
          skipWaiting: true,
          disable: true,
        },
        webpack: (config) => {
          config.node = {
            // fs: "empty",
          };
          config.plugins.push(
            new webpack.ProvidePlugin({
              $: "jquery",
              jQuery: "jquery",
            })
          );
          config.module.rules.push({
            test: /\.(eot|woff|woff2|ttf|otf|)$/,
            use: {
              loader: "url-loader",
              options: {
                limit: 100000,
                name: "[name].[ext]",
                esModule: false,
              },
            },
          });
          return config;
        },
        useFileSystemPublicRoutes: false,
        distDir: "build",
      })
    )
  )
);
