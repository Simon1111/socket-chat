// var webpack = require("webpack")
var ExtractTextPlugin = require("extract-text-webpack-plugin");
// var OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin")

module.exports = {
    entry: [__dirname +'/src/index.js'],
    output: {
      path: __dirname + '/public',
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
    plugins: [
        new ExtractTextPlugin("bundle.css")
    ]
  }
  