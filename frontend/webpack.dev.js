import path from "node:path";
import { __dirname } from "./webpack.common.js";

export default {
  mode: "development",
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
};
