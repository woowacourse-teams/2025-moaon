import { sentryWebpackPlugin } from "@sentry/webpack-plugin";
import TerserPlugin from "terser-webpack-plugin";
import webpack from "webpack";
import { WebpackManifestPlugin } from "webpack-manifest-plugin";
import { InjectManifest } from "workbox-webpack-plugin";
import packageJson from "./package.json" with { type: "json" };

const version = packageJson.version;
const buildHash = Date.now().toString(36); // 커밋 해시

export default {
  mode: "production",
  output: {
    filename: "[name].[contenthash].js",
    chunkFilename: "[name].[contenthash].js",
  },
  optimization: {
    minimize: true,
    moduleIds: "deterministic", // 모듈 ID 고정으로 hash 안정화
    runtimeChunk: "single", // 런타임 코드 분리
    splitChunks: {
      cacheGroups: {
        // React 별도 분리
        react: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: "react",
          chunks: "all",
          priority: 30,
        },
        // workbox 별도 분리
        workbox: {
          test: /[\\/]node_modules[\\/]workbox-[^\\/]+[\\/]/,
          name: "workbox",
          chunks: "all",
          priority: 30,
        },
        // 라이브러리 별도 분리
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
          priority: 20,
        },
        // 공통 모듈 분리
        common: {
          name: "common",
          minChunks: 2, // 2번 이상 사용된 모듈
          chunks: "all",
          priority: 10,
          reuseExistingChunk: true,
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
    new webpack.DefinePlugin({
      "process.env.APP_VERSION": JSON.stringify(version),
      "process.env.BUILD_HASH": JSON.stringify(buildHash),
    }),
    new WebpackManifestPlugin({
      fileName: "asset-manifest.json",
      generate: (seed, files, entries) => {
        const manifestFiles = files.reduce((manifest, file) => {
          manifest[file.name] = file.path;
          return manifest;
        }, seed);

        return {
          files: manifestFiles,
          entrypoints: entries.main,
          version,
          buildHash,
          buildTime: new Date().toISOString(),
        };
      },
    }),
    // Service Worker 플러그인 추가
    // new InjectManifest({
    //   swSrc: "./src/service-worker.js", // Service Worker 소스 파일
    //   swDest: "sw.js", // 빌드 후 출력 파일명
    //   maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5MB
    //   // 프리캐시할 파일 패턴
    //   include: [
    //     /\.html$/,
    //     /\.js$/,
    //     /\.css$/,
    //     /\.png$/,
    //     /\.svg$/,
    //     /\.avif$/,
    //     /\.ico$/,
    //   ],
    //   exclude: [/asset-manifest\.json$/, /^sw\.js$/],
    // }),
  ],
};
