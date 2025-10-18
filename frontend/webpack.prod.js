import { sentryWebpackPlugin } from "@sentry/webpack-plugin";

export default {
  mode: "production",
  output: {
    filename: "[name].[contenthash].js",
    chunkFilename: "[name].[contenthash].js",
  },
  optimization: {
    minimize: true,
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },
  plugins: [
    sentryWebpackPlugin({
      org: "moaon",
      project: "moaon",
      authToken: process.env.SENTRY_AUTH_TOKEN,
    }),
  ],
};
