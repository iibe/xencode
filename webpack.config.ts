import path from "path";
import type { Configuration } from "webpack";

const app = (...args: string[]): string => path.resolve(__dirname, ...args);

export default {
  mode: "production",
  devtool: "inline-source-map",
  entry: app("./src/index.ts"),
  output: {
    filename: "index.js",
    path: app("./dist"),
    clean: true,
  },
  devServer: {
    open: true,
    host: "localhost",
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: [".ts", ".tsx", ".js"],
    // Add support for TypeScripts fully qualified ESM imports.
    extensionAlias: {
      ".js": [".js", ".ts"],
      ".cjs": [".cjs", ".cts"],
      ".mjs": [".mjs", ".mts"],
    },
  },
  module: {
    rules: [
      {
        // All files with a `.ts`, `.cts`, `.mts` or `.tsx` extension will be handled by `ts-loader`
        test: /\.([cm]?ts|tsx)$/,
        use: {
          loader: "ts-loader",
          options: { configFile: app("./configs/tsconfig.webpack.json") },
        },
        exclude: /node_modules/,
      },
    ],
  },
} as Configuration;
