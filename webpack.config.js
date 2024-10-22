// webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  devtool: "eval-source-map",
  devServer: {
    watchFiles: ["./src/template.html"],
  },
  stats: {
    loggingDebug: ["babel-loader"]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/template.html",
    }),
  ],  
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: {
            and: [/node_modules/], // Exclude libraries in node_modules ...
            not: [
              // Except for a few of them that needs to be transpiled because they use modern syntax
              /unfetch/,
              /d3-array|d3-scale/,
              /@hapi[\\/]joi-date/,
            ]
        },
        use: {
          loader: 'babel-loader',
          options: {
            targets: "defaults",
            presets: [
              ['@babel/preset-env']
            ],
            plugins: ['@babel/plugin-proposal-decorators', { version: "2023-11" }]
          }
        }
      },
        // the 'transform-runtime' plugin tells Babel to
        // require the runtime instead of inlining it.
        {
            test: /\.(?:js|mjs|cjs)$/,
            exclude: /node_modules/,
            use: {
            loader: 'babel-loader',
            options: {
                presets: [
                ['@babel/preset-env', { targets: "defaults" }]
                ],
                plugins: ['@babel/plugin-transform-runtime']
            }
            }
        },
    ],
  },
};
