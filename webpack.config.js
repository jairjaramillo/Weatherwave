/* eslint-disable no-unused-vars */
/* eslint-disable global-require */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const eslint = {
  test: /\.(js|jsx)$/i,
  enforce: 'pre',
  exclude: /node_modules/,
  use: 'eslint-loader',
};

const font = {
  test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/i,
  use: [{ loader: 'file-loader', options: { name: '[name].[ext]' } }],
};

const fontAwesome = {
  test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/i,
  use: [{
    loader: 'file-loader',
    options: {
      name: '[name].[ext]',
      outputPath: '../fonts/',
      publicPath: '../static/fonts',
    },
  }],
};

const scss = {
  test: /\.s[ac]ss$/i,
  use: [
    { loader: 'style-loader' },
    { loader: 'css-loader' },
    { loader: 'sass-loader' },
    { loader: 'postcss-loader', options: { plugins() { return [require('autoprefixer')]; } } },
  ],
};

module.exports = {
  mode: 'development',
  entry: `${__dirname}/src/index.js`,
  output: {
    path: `${__dirname}/dist`,
    filename: 'main.js',
  },
  module: {
    rules: [
      eslint,
      scss,
      font,
      fontAwesome,
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      title: 'Weatherwave',
      template: `${__dirname}/src/dom/index.html`,
      filename: 'index.html',
    }),
  ],
};
