const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const webpackBaseConfig = require('./webpack.base.conf.js')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const webpackConfig = merge(webpackBaseConfig, {
  entry: {
    app: './examples/index.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist-examples'),
    publicPath: '',
    filename: '[name].[hash:8].js',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: path.resolve(__dirname, '../dist-examples')
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './examples/index.html',
      inject: true,
      chunksSortMode: 'dependency'
    }),
    new UglifyJsPlugin({
      uglifyOptions: {
        warnings: false
      },
      // exclude: /\/node_modules/,
      cache: true,
      parallel: true
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new ExtractTextPlugin({
      filename: 'epage-iview.css'
    }),
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    })
  ]
})

if (process.env.npm_config_report) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
