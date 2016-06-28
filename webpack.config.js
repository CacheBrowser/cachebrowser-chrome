var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    // 'babel-polyfill',
    './app/scripts/background.js'
  ],
  output: {
      filename: 'background.js'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        loader: "babel-loader",
        query: {
        //   plugins: ['transform-runtime'],
          presets: ['es2015'],
        }
      },
    ]
  },
  debug: true
};
