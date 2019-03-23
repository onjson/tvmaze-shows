/* eslint-disable global-require, import/no-extraneous-dependencies */

const path = require('path');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const eslintFormatter = require('react-dev-utils/eslintFormatter');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const { ReactLoadablePlugin } = require('react-loadable/webpack');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');

const { getAppEnv } = require('./env');

const env = getAppEnv();
const { PUBLIC_URL = '' } = env.raw;
const resolvePath = (relativePath) => path.resolve(__dirname, relativePath);

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  entry: [
    'webpack-hot-middleware/client?path=/__webpack_hmr&reload=true',
    resolvePath('../client/index.js'),
  ],
  output: {
    path: resolvePath('../build'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.js',
    publicPath: `${PUBLIC_URL}/`,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        use: [
          {
            options: {
              formatter: eslintFormatter,
              emitWarning: true,
            },
            loader: 'eslint-loader',
          },
        ],
        include: resolvePath('../client'),
      },
      {
        test: /\.(js|jsx)$/,
        include: resolvePath('../client'),
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
        },
      },
      {
        test: /\.s?css$/,
        exclude: [resolvePath('../client')],
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              camelCase: true,
              modules: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                autoprefixer({
                  browsers: ['last 2 versions', 'not ie < 11'],
                  flexbox: 'no-2009',
                }),
              ],
            },
          },
          'sass-loader',
          'import-glob-loader',
        ],
      },
      {
        test: /\.s?css$/,
        include: [resolvePath('../client')],
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                autoprefixer({
                  browsers: ['last 2 versions', 'not ie < 11'],
                  flexbox: 'no-2009',
                }),
              ],
            },
          },
          'sass-loader',
          'import-glob-loader',
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin(env.forWebpackDefinePlugin),
    new webpack.HotModuleReplacementPlugin(),
    new CaseSensitivePathsPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new LodashModuleReplacementPlugin(),
    new ErrorOverlayPlugin(),
    new ReactLoadablePlugin({
      filename: 'build/react-loadable.json',
    }),
  ],
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
};
