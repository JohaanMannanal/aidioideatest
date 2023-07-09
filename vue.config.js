const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      // Add other rules for handling CSS, images, etc.
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  devServer: {
    allowedHosts: "all",
    port: 3000,
    open: true,
  },
};
