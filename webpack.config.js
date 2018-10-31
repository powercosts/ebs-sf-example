'use strict'

const os = require('os')
const path = require('path')
const slsw = require('serverless-webpack')
const webpack = require('webpack')

module.exports = {
  entry: slsw.lib.entries,
  target: 'node',
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  stats: 'minimal',
  performance: {
    // Turn off size warnings for entry points
    hints: false
  },
  optimization: {
    namedModules: true
  },
  resolve: {
    extensions: ['.ts', '.js'],
    symlinks: false
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'cache-loader'
          },
          {
            loader: 'thread-loader',
            options: {
              // There should be 1 cpu for the
              // fork-ts-checker-webpack-plugin
              workers: os.cpus().length - 1
            }
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              happyPackMode: true
            }
          }
        ]
      },
      {
        test: /\.(js)$/,
        include: process.cwd(),
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      }
    ]
  },
  output: {
    libraryTarget: 'commonjs2',
    path: path.join(process.cwd(), '.webpack'),
    filename: '[name].js'
  },
  plugins: [new webpack.DefinePlugin({ 'global.GENTLY': false })]
}
