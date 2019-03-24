import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import Helmet from 'react-helmet';
import Loadable from 'react-loadable';
import { getBundles } from 'react-loadable/webpack';
import { SheetsRegistry } from 'jss';
import JssProvider from 'react-jss/lib/JssProvider';
import {
  MuiThemeProvider,
  createMuiTheme,
  createGenerateClassName,
} from '@material-ui/core/styles';

import App from '../client/App';
import template from './template';
import stats from '../build/react-loadable.json';

function renderApp(req, res) {
  const context = {};
  const modules = [];

  const sheetsRegistry = new SheetsRegistry();
  const sheetsManager = new Map();
  const generateClassName = createGenerateClassName();
  const theme = createMuiTheme({
    palette: {
      type: 'light',
    },
    typography: {
      useNextVariants: true,
    },
  });

  const content = ReactDOMServer.renderToString(
    <Loadable.Capture report={(moduleName) => modules.push(moduleName)}>
      <JssProvider
        registry={sheetsRegistry}
        generateClassName={generateClassName}
      >
        <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
          <StaticRouter location={req.url} context={context}>
            <App />
          </StaticRouter>
        </MuiThemeProvider>
      </JssProvider>
    </Loadable.Capture>,
  );

  const mui = sheetsRegistry.toString();

  if (context.url) {
    res.redirect(context.url);
  } else {
    const fullMarkup = template({
      helmet: Helmet.renderStatic(),
      bundles: getBundles(stats, modules),
      content,
      mui,
    });

    res.status(200).set('Content-Type', 'text/html').send(fullMarkup);
  }
}

export default (req, res) => {
  Loadable.preloadAll().then(() => renderApp(req, res));
};
