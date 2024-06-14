import HtmlWebpackPlugin from 'html-webpack-plugin';
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url';
import autoprefixer from 'autoprefixer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
    entry: './app/js/main.js',
    output: {
      filename: "main.js",
      path: resolve(__dirname, "dist"),
    },
    devServer: {
      static: resolve(__dirname, "dist"),
      port: 8080,
      hot: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: resolve(__dirname, '/app/index.html'),
        minify: true,
      }),
    ],
    module: {
      rules: [
        {
          test: /\.svg$/,
          use: "raw-loader",
        },
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
      ],
    },
    mode: "development",
} 
