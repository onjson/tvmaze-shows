import path from 'path';
import express from 'express';
import compression from 'compression';
import helmet from 'helmet';
import morgan from 'morgan';

import render from './render';

export const app = express();
const { PUBLIC_URL = '' } = process.env;

app.use(compression());
app.use(helmet());

app.use(
  PUBLIC_URL,
  express.static(path.resolve(__dirname, '../build'), {
    maxage: Infinity,
  }),
);

app.use(
  PUBLIC_URL,
  express.static(path.resolve(__dirname, '../public'), {
    maxage: '30 days',
  }),
);

app.use(morgan('tiny'));

app.use(render);
