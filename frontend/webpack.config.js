import { merge } from "webpack-merge";
import common from "./webpack.common.js";
import devConfig from "./webpack.dev.js";
import prodConfig from "./webpack.prod.js";

export default (env = {}) => {
  if (env.production) {
    return merge(common, prodConfig);
  }
  return merge(common, devConfig);
};
