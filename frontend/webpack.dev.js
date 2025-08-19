import path from "node:path";
import { merge } from "webpack-merge";
import common, { __dirname } from "./webpack.common.js";

export default merge(common, {
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
});
