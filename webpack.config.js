const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");

const plugins = [
  new HtmlWebpackPlugin({
    template: './src/index.pug',
  }),
  new MiniCssExtractPlugin({
    filename: 'index.css'
  }),
  new webpack.HotModuleReplacementPlugin(),
  new CopyPlugin({
    patterns: [
      { from: "./src/assets", to: "assets" },
    ]
  })
];

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
  },
  plugins,
  output: {
    filename: '[name].[contenthash].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.pug$/i,
        use: [
          {
            loader: 'pug-loader',
            options: {pretty: true}
          }
        ]
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader,
            "css-loader"
        ]
      },
      {
        test:  /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
    ]
  }
}