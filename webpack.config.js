const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const webpack = require("webpack");
const path = require("path");

// read mode (production vs. development)
const { NODE_ENV } = process.env;
if (NODE_ENV !== "production" && NODE_ENV !== "development") {
  throw new Error("Must set NODE_ENV to either production or development.");
}
const IS_PROD = NODE_ENV === "production";

// used below to define css loaders for various cases
function cssLoaders(modules) {
  return [
    IS_PROD ? MiniCSSExtractPlugin.loader : "style-loader",
    {
      loader: "css-loader",
      options: {
        sourceMap: true,
        // Enable CSS Modules: https://github.com/css-modules/css-modules
        modules,
        // in productive builds, minify generated CSS
        minimize: IS_PROD
      }
    }
  ];
}

module.exports = {
  mode: NODE_ENV,
  context: __dirname,
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: true,
        uglifyOptions: {
          ecma: 8,
          safari10: true
        }
      })
    ]
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"], // extensions of source files; allow Typescript to be treated as source
    modules: [
      path.join(__dirname, "src"), // allows absolute import syntax for children of "src"
      "node_modules"
    ]
  },
  // Enable source maps in dev mode
  devtool: IS_PROD ? "source-map" : "inline-source-map",
  entry: "./src/index.tsx", // javascript entry point
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/"
  },

  module: {
    rules: [
      {
        // use css-loader with CSS modules for css files
        test: /\.css$/,
        exclude: /node_modules/,
        use: cssLoaders((modules = true))
      },
      {
        test: /\.css$/, // use css-loader without CSS modules for 3rd party modules
        include: /node_modules/,
        use: cssLoaders((modules = false))
      },
      {
        test: /\.tsx?$/, // use tslint/ts/babel for typescript files
        exclude: /node_modules/,
        use: [
          "babel-loader",
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true
            }
          }
        ]
      },
      {
        test: /\.md$/,
        exclude: /node_modules/,
        use: "raw-loader"
      },
      {
        test: /\.(woff2?|png|gif|tiff?|jpe?g)$/,
        use: [
          {
            // Include files as data urls
            loader: "url-loader",
            options: { limit: 10000 } // embed small files
          }
        ]
      }
    ]
  },
  plugins: [
    ...[
      // copy index.html to dist folder
      new CopyWebpackPlugin(["src/index.html"]),
      // type checking & linting in parallel process
      new ForkTsCheckerWebpackPlugin({ tslint: true }),
      // Inject proper value for NODE_ENV into build
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify(NODE_ENV)
      })
    ],
    ...(IS_PROD
      ? [new MiniCSSExtractPlugin({ filename: "main.css" })]
      : [
          // Enable HMR
          new webpack.HotModuleReplacementPlugin(),
          // More readable module names in HMR
          new webpack.NamedModulesPlugin()
        ])
  ],

  devServer: {
    port: 5678,
    // contentBase: './dist', // serve files under "dist"
    hotOnly: true, // enable hot reloading
    historyApiFallback: true, // always serve index.html (for react router)
    publicPath: "/"
  }
};
