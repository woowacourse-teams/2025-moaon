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
    runtimeChunk: "single",
    moduleIds: "deterministic",
    splitChunks: {
      chunks: "all",
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
