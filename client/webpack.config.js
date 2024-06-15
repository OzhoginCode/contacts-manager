import HtmlWebpackPlugin from "html-webpack-plugin";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import autoprefixer from "autoprefixer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
  entry: "./app/js/main.js",
  output: {
    filename: "main.js",
    path: resolve(__dirname, "dist"),
    clean: true,
  },
  devServer: {
    static: resolve(__dirname, "dist"),
    port: 8080,
    hot: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: resolve(__dirname, "/app/index.html"),
      favicon: resolve(__dirname, "app/icons/favicon.png"),
      minify: true,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(scss)$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [autoprefixer],
              },
            },
          },
          {
            loader: "sass-loader",
          },
        ],
      },
      {
        test: /\.(svg)$/i,
        type: "asset",
      },
    ],
  },
  mode: "development",
};
