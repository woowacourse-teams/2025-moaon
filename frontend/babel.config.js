import babelPresetEnv from "@babel/preset-env";
import babelPresetReact from "@babel/preset-react";
import babelPresetTypescript from "@babel/preset-typescript";
import emotionPlugin from "@emotion/babel-plugin";

export default {
  presets: [
    [babelPresetEnv, { targets: "defaults" }],
    [babelPresetReact, { runtime: "automatic" }],
    babelPresetTypescript,
  ],
  plugins: [emotionPlugin],
};
