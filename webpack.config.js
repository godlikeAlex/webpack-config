const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

const plugins = [
  new HtmlWebpackPlugin({
    template: './src/index.pug',
  }),
  new MiniCssExtractPlugin({
    filename: 'index.css'
  }),
  new webpack.HotModuleReplacementPlugin(),
  new ImageMinimizerPlugin({
    minimizerOptions: {
      plugins: [
        ['gifsicle', { interlaced: true }],
        ['jpegtran', { progressive: true }],
        ['optipng', { optimizationLevel: 6 }],
        [
          'svgo',
          {
            plugins: [
              {
                removeViewBox: false,
              },
            ],
          },
        ],
      ],
    },
  }),
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
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        type: 'asset',
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: ImageMinimizerPlugin.loader,
            options: {
              severityError: 'warning', // Ignore errors on corrupted images
              minimizerOptions: {
                plugins: ['gifsicle'],
              },
            },
          }
        ]
      }
    ]
  }
}