/* eslint-disable no-console */
import Express from 'express';
import session from 'express-session';
import connectPgSimple from 'connect-pg-simple';

import client from './db.js';
import accountsRouter from './routes/accounts.js';
import usersRouter from './routes/users.js';
import sessionsRouter from './routes/sessions.js';

export default () => {
  const app = new Express();
  const PgSession = connectPgSimple(session);

  app.use(Express.json());
  app.use(session({
    store: new PgSession({
      pool: client,
    }),
    secret: 'secret key',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000,
    },
  }));

  app.use('/accounts', accountsRouter);
  app.use('/users', usersRouter);
  app.use('/sessions', sessionsRouter);

  app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    console.error(err.stack);
    res.status(500).end();
  });

  return app;
};
