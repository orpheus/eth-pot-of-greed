const webpack = require('webpack')
const merge = require('webpack-merge')
const config = require('config')
const path = require('path')

const common = require('./webpack.common')
module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    compress: true,
    port: config.get('port'),
    hot: true,
    historyApiFallback: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    modules: [path.resolve('node_modules'), 'node_modules']
  }
})
