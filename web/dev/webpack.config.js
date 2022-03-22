const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: {
    index: '../index.jsx',
    styleguide: '../styleguide.jsx',
  },
  devtool: false,
  output: {
    path: path.join(__dirname, '../'),
    filename: '[name].min.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      }
    ]
  }
};
