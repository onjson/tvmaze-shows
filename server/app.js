import path from 'path';
import express from 'express';
import compression from 'compression';
import helmet from 'helmet';
import morgan from 'morgan';

import render from './render';

const app = express();
const { PUBLIC_URL = '', NOW = false } = process.env;

app.use(compression());
app.use(helmet());

if (!NOW) {
  app.use(
    PUBLIC_URL,
    express.static(path.resolve(__dirname, '../build'), {
      maxage: Infinity,
    }),
  );
}

app.use(morgan('tiny'));

app.use(render);
export { app };
export default app;
