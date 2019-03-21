const path = require('path');
const fs = require('fs');

const rootDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(rootDirectory, relativePath);

const paths = {
  appHtml: resolveApp('src/public/index.html'),
  clientBuild: resolveApp('dist/client'),
  srcClient: resolveApp('src/client'),
  publicPath: '/',
};

module.exports = paths;
