module.exports = {
  entry: "./src/lib/index.ts",
  output: {
    filename: "show-tree.js",
    library: 'showTree',
    // libraryTarget: 'var'
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
        loader: "ts-loader",
        exclude: /node_modules/
      },
      {
        test:/\.(s*)css$/,
        use:['style-loader','css-loader', 'sass-loader']
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  } 
}