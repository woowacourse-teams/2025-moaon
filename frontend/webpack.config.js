import path from "node:path";
import { fileURLToPath } from "node:url";
import { sentryWebpackPlugin } from "@sentry/webpack-plugin";
import Dotenv from "dotenv-webpack";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  entry: "./src/main.tsx",
  output: {
    filename: "bundle.js",
    publicPath: "/",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    alias: {
      "@shared": path.resolve(__dirname, "src/shared"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@domains": path.resolve(__dirname, "src/domains"),
      "@": path.resolve(__dirname, "src"),
    },
  },

  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/[name][hash][ext]",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new ForkTsCheckerWebpackPlugin(),
    new Dotenv({ path: ".env.local", systemvars: true }),
    sentryWebpackPlugin({
      org: "moaon",
      project: "moaon",
      authToken: process.env.SENTRY_AUTH_TOKEN,
    }),
  ],
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"),
      publicPath: "/",
    },
    port: 3000,
    open: true,
    hot: true,
    historyApiFallback: true,
  },
  mode: "development",
};
