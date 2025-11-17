import { sentryWebpackPlugin } from "@sentry/webpack-plugin";
import TerserPlugin from "terser-webpack-plugin";

export default {
  mode: "production",
  output: {
    filename: "[name].[contenthash].js",
    chunkFilename: "[name].[contenthash].js",
  },
  optimization: {
    minimize: true,
    moduleIds: "deterministic",
    runtimeChunk: "single",
    splitChunks: {
      maxInitialRequests: 25,
      maxAsyncRequests: 25,
      maxSize: 200_000,
      chunks: "all",
      cacheGroups: {
        react: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: "react",
          priority: 30,
        },
        emotion: {
          test: /[\\/]node_modules[\\/](@emotion|emotion)[\\/]/,
          name: "emotion",
          priority: 30,
        },
        tanstackQuery: {
          test: /[\\/]node_modules[\\/](@tanstack)[\\/]/,
          name: "tanstack-query",
          priority: 30,
        },
        reactRouter: {
          test: /[\\/]node_modules[\\/]react-router[\\/]/,
          name: "react-router",
          priority: 30,
        },
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          priority: 20,
        },
        common: {
          name: "common",
          minChunks: 2,
          reuseExistingChunk: true,
          priority: 10,
        },
      },
    },
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false,
          },
          compress: {
            drop_console: false,
          },
        },
        extractComments: false,
      }),
    ],
  },
  plugins: [
    sentryWebpackPlugin({
      org: "moaon",
      project: "moaon",
      authToken: process.env.SENTRY_AUTH_TOKEN,
    }),
  ],
};
