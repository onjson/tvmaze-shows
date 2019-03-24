/* eslint-disable global-require */

import { getAppEnv } from '../config/env';

const env = getAppEnv();
const { NODE_ENV, PUBLIC_URL = '' } = env.raw;

let assetManifest;
if (NODE_ENV === 'production') {
  assetManifest = require('../build/asset-manifest.json');
} else {
  assetManifest = {
    'main.js': '/main.bundle.js',
  };
}

const preloadScripts = (bundles) => {
  const mainJS = assetManifest['main.js'];
  const bundleFilePaths = bundles
    .filter((bundle) => bundle.file.match(/\.js$/))
    .map((jsBundle) => `${PUBLIC_URL}/${jsBundle.file}`);

  return [...bundleFilePaths, mainJS]
    .map(
      (jsFilePath) =>
        `<link rel="preload" as="script" href="${jsFilePath}"></script>`,
    )
    .join('');
};

const cssLinks = () => {
  if (NODE_ENV !== 'production') {
    return '';
  }

  return Object.keys(assetManifest)
    .filter((file) => file.match(/\.css$/))
    .map((cssFile) => assetManifest[cssFile])
    .map((cssFilePath) => `<link rel="stylesheet" type="text/css" href="${cssFilePath}">`)
    .join('');
};

const jsScripts = (bundles) => {
  const mainJS = assetManifest['main.js'];
  const bundleFilePaths = bundles
    .filter((bundle) => bundle.file.match(/\.js$/))
    .map((jsBundle) => `${PUBLIC_URL}/${jsBundle.file}`);

  return [...bundleFilePaths, mainJS]
    .map(
      (jsFilePath) =>
        `<script type="text/javascript" src="${jsFilePath}"></script>`,
    )
    .join('');
};

export default ({ helmet, content, bundles, mui }) => {
  const htmlAttrs = helmet.htmlAttributes.toString();
  const bodyAttrs = helmet.bodyAttributes.toString();

  return `
    <!doctype html>
    <html lang="en" ${htmlAttrs}>
      <head>
        <meta charset="utf-8">
        <base href="/">
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${preloadScripts(bundles)}
        ${helmet.link.toString()}
        ${cssLinks()}
        ${helmet.style.toString()}
        ${helmet.script.toString()}
        ${helmet.noscript.toString()}
        <style id="jss-server-side">${mui}</style>
      </head>
      <body ${bodyAttrs}>
        <div id="root">${content}</div>
        ${jsScripts(bundles)}
      </body>
    </html>
  `;
};
