// [
//   new UglifyJsPlugin({
//     uglifyOptions: {
//       ie8: false,
//       ecma: 8,
//       parse: {...options},
//       mangle: {
//         ...options,
//         properties: {
//           // mangle property options
//         }
//       },
//       output: {
//         comments: false,
//         beautify: false,
//         ...options
//       },
//       compress: {...options},
//       warnings: false
//     }
//   })
// ]

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
        loader: "ts-loader"
      },
      {
        test:/\.(s*)css$/,
        use:['style-loader','css-loader', 'sass-loader']
      }
    ]
  }
}