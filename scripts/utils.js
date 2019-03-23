/* eslint-disable global-require, import/no-extraneous-dependencies, consistent-return */
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import chokidar from 'chokidar';

import config from '../config/webpack.client.dev';

export const purgeCacheOnChange = (path) => {
  const watcher = chokidar.watch(path);

  watcher.on('ready', () => {
    watcher.on('all', () => {
      console.log('Reloading server...');

      Object.keys(require.cache).forEach((id) => {
        if (/[/\\](src|server)[/\\]/.test(id)) {
          delete require.cache[id];
        }
      });
    });
  });
};

export const applyDevMiddleware = (app) => {
  const compiler = webpack(config);

  app.use(
    webpackDevMiddleware(compiler, {
      hot: true,
      publicPath: config.output.publicPath,
      progress: true,
      stats: {
        colors: true,
        assets: true,
        chunks: false,
        modules: false,
        hash: false,
      },
    }),
  );

  app.use(
    webpackHotMiddleware(compiler, {
      path: '/__webpack_hmr',
      heartbeat: 4000,
    }),
  );
};
