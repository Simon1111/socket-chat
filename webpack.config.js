var webpack = require("webpack"),
    path = require("path"),
    ExtractTextPlugin = require("extract-text-webpack-plugin");
// var OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin")

module.exports = {
    entry: [__dirname +'/src/index.js', 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000' ],
    output: {
      path: path.resolve(__dirname, 'public'),
      filename: 'bundle.js'
    },
    devtool: 'source-maps',
    module: {
        rules:[
            {
                exclude: /node_modules/,
                test: /\.js$/,
                loader: 'babel-loader'
            },
            {
              test: /\.scss$/,
              use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'sass-loader']
              })
            }
        ]
    },
    resolve: {
        // '@': path.join(__dirname, 'src/')
    },
    plugins: [
        new ExtractTextPlugin("bundle.css"),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ]
  }
  