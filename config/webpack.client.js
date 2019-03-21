const path = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = require('./paths');

module.exports = {
  entry: `${paths.srcClient}/index.js`,
  output: {
    path: path.join(paths.clientBuild, paths.publicPath),
    filename: 'main.js',
    publicPath: paths.publicPath,
    chunkFilename: '[name].[chunkhash:8].chunk.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['eslint-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: paths.appHtml,
    }),
  ],
};
