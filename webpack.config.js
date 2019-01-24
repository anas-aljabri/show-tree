module.exports = {
  entry: "./src/index.ts",
  output: {
    filename: "bundle.js"
  },
  // resolve: {
  //   // Add '.ts' and '.tsx' as a resolvable extension.
  //   extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
  // },
  module: {
    rules: [
      // all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
      {
        test: /\.ts?$/,
        loader: "ts-loader"
      },
      {
        test:/\.(s*)css$/,
        use:['style-loader','css-loader', 'sass-loader']
      }
    ]
  }
}