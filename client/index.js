import React from 'react';
import ReactDOM from 'react-dom';
import Loadable from 'react-loadable';
import { BrowserRouter as Router } from 'react-router-dom';
import JssProvider from 'react-jss/lib/JssProvider';
import {
  MuiThemeProvider,
  createMuiTheme,
  createGenerateClassName,
} from '@material-ui/core/styles';

import App from './App';
import './index.css';

const theme = createMuiTheme({
  palette: {
    type: 'light',
  },
  typography: {
    useNextVariants: true,
  },
});

const generateClassName = createGenerateClassName();

Loadable.preloadReady().then(() => {
  ReactDOM.hydrate(
    <JssProvider generateClassName={generateClassName}>
      <MuiThemeProvider theme={theme}>
        <Router>
          <App />
        </Router>
      </MuiThemeProvider>
    </JssProvider>,
    document.getElementById('root'),
  );
});

if (module.hot) {
  module.hot.accept();
}
